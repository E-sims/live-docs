import { ChatOpenAI } from '@langchain/openai'
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { OpenAIEmbeddings } from '@langchain/openai'
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { createRetrievalChain } from 'langchain/chains/retrieval'
import { createHistoryAwareRetriever } from 'langchain/chains/history_aware_retriever'
import { HumanMessage, AIMessage } from '@langchain/core/messages'
import pineconeClient from './pinecone'
import { PineconeStore } from '@langchain/pinecone'
import { PineconeConflictError } from '@pinecone-database/pinecone/dist/errors'
import { Index, RecordMetadata } from '@pinecone-database/pinecone'
import { adminDb } from '@/firebase/firebaseAdmin'
import { auth } from '@clerk/nextjs/server'

const model = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  modelName: 'gpt-4o',
})

export const indexName = 'live-docx'

async function namespaceExists(
  index: Index<RecordMetadata>,
  namespace: string
) {
  if (namespace === null) throw new Error('No namespace provided')
  const { namespaces } = await index.describeIndexStats()
  return namespaces?.[namespace] !== undefined
}

export async function generateDocs(docId: string) {
  const { userId } = await auth()
  if (!userId) {
    throw new Error('User is not logged in')
  }

  console.log('--- Fetching the download URL from Firebase... ---')

  const firebaseRef = await adminDb
    .collection('users')
    .doc(userId)
    .collection('files')
    .doc(docId)
    .get()

  const downloadUrl = firebaseRef.data()?.downloadUrl
  if (!downloadUrl) {
    throw new Error('No download URL found')
  }

  console.log(`--- Download URL fetched successfully: ${downloadUrl} ---`)

  // Fetch the PDF from the assigned URL
  const response = await fetch(downloadUrl)

  // Load the PDF into a PDFDocument object
  const data = await response.blob()

  // Load the PDF document from the specified path
  console.log('--- Loading the PDF document... ---')
  const loader = new PDFLoader(data)
  const docs = await loader.load()

  // Split the loaded document into smaller chunks for AI processing
  console.log('--- Splitting the document into smaller chunks... ---')
  const splitter = new RecursiveCharacterTextSplitter()

  const splitDocs = await splitter.splitDocuments(docs)
  console.log(`--- Split into ${splitDocs.length} chunks ---`)

  return splitDocs
}

export async function generateEmbeddingsInPineconeVectorStore(docId: string) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('User is not logged in')
  }

  let pineconeVectorStore

  // Generate embeddings for the split documents
  console.log('--- Generating embeddings... ---')
  const embeddings = new OpenAIEmbeddings()

  const index = await pineconeClient.Index(indexName)
  const namespaceAlreadyExists = await namespaceExists(index, docId)

  if (namespaceAlreadyExists) {
    console.log(
      `--- Namespace ${docId} already exists, reusing existing embeddings... ---`
    )

    pineconeVectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex: index,
      namespace: docId,
    })

    return pineconeVectorStore
  } else {
    // If the namespace does not exist, download the PDF from firestore via the stored download URL & generate the embeddings then store them in the Pincone vector store
    const splitDocs = await generateDocs(docId)

    console.log(
      `--- Storing the embeddings in namespace ${docId} in the ${indexName} Pinecone vector store... ---`
    )

    pineconeVectorStore = await PineconeStore.fromDocuments(
      splitDocs,
      embeddings,
      {
        pineconeIndex: index,
        namespace: docId,
      }
    )

    return pineconeVectorStore
  }
}
