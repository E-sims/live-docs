'use server'

import { Message } from '@/components/Chat'
import { adminDb } from '@/firebase/firebaseAdmin'
import { generateLangchainCompletion } from '@/lib/langchain'
import { auth } from '@clerk/nextjs/server'
// import { generateLangchainCompletion } from "@/lib/langchain"

const MESSAGES_FREE_LIMIT = 5
const MESSAGES_PRO_LIMIT = 99

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

  // Check membership limits for messages in a document
  const userRef = await adminDb.collection('users').doc(userId!).get()

  // Limit the  Pro/Free users

  // Check if user is on FREE plan and has asked more than the FREE number of questions
  if (!userRef.data()?.hasActiveMembership) {
    if (userMessages.length >= MESSAGES_FREE_LIMIT) {
      return {
        success: false,
        message: `You'll need to upgrade to PRO to ask more than ${MESSAGES_FREE_LIMIT} questions! 😢`,
      }
    }
  }

  // Check if user is on PRO plan and has asked more than the PRO number of questions
  if (userRef.data()?.hasActiveMembership) {
    if (userMessages.length >= MESSAGES_PRO_LIMIT) {
      return {
        success: false,
        message: `You've reached the PRO limit of ${MESSAGES_PRO_LIMIT} questions! 😢`,
      }
    }
  }

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
