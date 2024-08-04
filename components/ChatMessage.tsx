'use client'

import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Markdown from 'react-markdown'
import { BotIcon, Loader2Icon, User } from 'lucide-react'
import { Message } from './Chat'

function ChatMessage({ message }: { message: Message }) {
  const isHuman = message.role === 'human'
  const { user } = useUser()

  return (
    <div className={`chat ${isHuman ? 'chat-end' : 'chat-start'}`}>
      <div className="chat-image avatar">
        <div>
          {isHuman ? (
            user?.imageUrl && (
              <Image
                src={user?.imageUrl}
                alt="Profile Picture"
                width={40}
                height={40}
                className="rounded-full"
              />
            )
          ) : (
            <div className="h-10 w-10 bg-primary flex items-center justify-center rounded-full">
              <BotIcon className="text-slate-50" />
            </div>
          )}
        </div>
      </div>
      <div
        className={`chat-bubble prose ${
          isHuman && 'bg-primary/70 text-slate-50'
        }`}
      >
        {message.message === 'Thinking...' ? (
          <div className="flex items-center justify-center">
            <Loader2Icon className="animate-spin h-5 w-5 text-slate-50" />
          </div>
        ) : (
          <Markdown>{message.message}</Markdown>
        )}
      </div>
    </div>
  )
}

export default ChatMessage
