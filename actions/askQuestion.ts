'use server'

import { Message } from '@/components/Chat'
import { adminDb } from '@/firebase/firebaseAdmin'
import { generateLangchainCompletion } from '@/lib/langchain'
import { auth } from '@clerk/nextjs/server'
// import { generateLangchainCompletion } from "@/lib/langchain"

const FREE_LIMIT = 4
const PRO_LIMIT = 100

async function askQuestion(id: string, question: string) {
  auth().protect // Protect with Clerk
  const { userId } = await auth()

  const chatRef = adminDb
    .collection('users')
    .doc(userId!)
    .collection('files')
    .doc(id)
    .collection('chat')

  // check for user message count
  const chatSnapshot = await chatRef.get()
  const userMessages = chatSnapshot.docs.filter(
    (doc) => doc.data().role === 'human'
  )

  const userMessage: Message = {
    role: 'human',
    message: question,
    createdAt: new Date(),
  }

  await chatRef.add(userMessage)

  // Generate AI response
  const reply = await generateLangchainCompletion(id, question)

  const aiMessage: Message = {
    role: 'ai',
    message: reply,
    createdAt: new Date(),
  }

  await chatRef.add(aiMessage)

  return { success: true, message: null }
}

export default askQuestion
