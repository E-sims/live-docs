'use server'

import { generateEmbeddingsInPineconeVectorStore } from '@/lib/langchain'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

export async function generateEmbeddings(docId: string) {
  auth().protect // Protect this route with Clerk

  // Transform pdf to vector store
  await generateEmbeddingsInPineconeVectorStore(docId)

  revalidatePath('/dashboard')

  return {
    success: true,
  }
}
