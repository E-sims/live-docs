'use client'

import { FormEvent, useEffect, useRef, useState, useTransition } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'

import { BotIcon, Loader2Icon, User } from 'lucide-react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useUser } from '@clerk/nextjs'
import { collection, orderBy, query } from 'firebase/firestore'
import { db } from '@/firebase/firebase'
import askQuestion from '@/actions/askQuestion'
import ChatMessage from './ChatMessage'
import { useToast } from './ui/use-toast'

export type Message = {
  id?: string
  role: 'human' | 'ai' | 'placeholder'
  message: string
  createdAt: Date
}

function Chat({ id }: { id: string }) {
  const { user } = useUser()
  const { toast } = useToast()

  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isPending, startTransition] = useTransition()
  const bottomOfChatRef = useRef<HTMLDivElement>(null)

  const [snapshot, loading, error] = useCollection(
    user &&
      query(
        collection(db, 'users', user?.id, 'files', id, 'chat'),
        orderBy('createdAt', 'asc')
      )
  )

  useEffect(() => {
    bottomOfChatRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (!snapshot) return

    console.log('Updated snapshot', snapshot.docs)

    // get second last message to check if AI is thinking
    const lastMessage = messages.pop()

    if (lastMessage?.role === 'ai' && lastMessage.message === 'Thinking...') {
      // return as this is a dummy placeholder message
      return
    }

    const newMessages = snapshot.docs.map((doc) => {
      const { role, message, createdAt } = doc.data()

      return {
        id: doc.id,
        role,
        message,
        createdAt: createdAt.toDate(),
      }
    })

    // ignore messages dependency here to avoid infinite loop
    setMessages(newMessages)
  }, [snapshot])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const q = input

    setInput('')

    // Optimistic UI Update
    setMessages((prev) => [
      ...prev,
      { role: 'human', message: q, createdAt: new Date() },
      { role: 'ai', message: 'Thinking...', createdAt: new Date() },
    ])

    startTransition(async () => {
      const { success, message } = await askQuestion(id, q)

      if (!success) {
        // Toast
        toast({
          variant: 'destructive',
          title: 'Uh oh!',
          description: message,
        })

        setMessages((prev) =>
          prev.slice(0, prev.length - 1).concat([
            {
              role: 'ai',
              message: `Whoops... ${message}`,
              createdAt: new Date(),
            },
          ])
        )
      }
    })
  }

  return (
    <div className="grid grid-cols-1 h-full w-full overflow-scroll border-r border-border relative">
      {/* Chat contents */}
      <div className="w-full h-full flex items-center justify-center">
        {/* Chat messages */}

        {loading ? (
          <Loader2Icon className="h-20 w-20 animate-spin text-primary mt-20" />
        ) : (
          <div className="p-5">
            {messages.length === 0 && (
              <ChatMessage
                key={'placeholder'}
                message={{
                  role: 'ai',
                  message: 'Ask me anything about the document!',
                  createdAt: new Date(),
                }}
              />
            )}
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}

            <div ref={bottomOfChatRef} />
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex space-x-2 h-fit w-full sticky bottom-2 z-50 bg-secondary/50 backdrop-filter backdrop-blur-lg bg-opacity-50 p-2 rounded-lg border border-border mx-auto"
      >
        <Input
          placeholder="Ask a question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border-border"
        />

        <Button
          type="submit"
          variant="default"
          disabled={!input || isPending}
          className="dark:text-foreground"
        >
          {isPending ? (
            <Loader2Icon className="h-4 w-4 animate-spin text-primary" />
          ) : (
            'Ask'
          )}
        </Button>
      </form>
    </div>
  )
}

export default Chat
