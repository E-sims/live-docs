import { Button } from '@/components/ui/button'
import {
  BrainCogIcon,
  EyeIcon,
  GlobeIcon,
  MonitorSmartphoneIcon,
  ServerCogIcon,
  ZapIcon,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const features = [
  {
    name: 'Store your PDF Documents',
    description:
      'Keep all your important PDF files securely stored and easily accessible anytime, anywhere.',
    icon: GlobeIcon,
  },
  {
    name: 'Blazing Fast Responses',
    description:
      'Experience lightning-fast answers to your queries, ensuring a seamless user experience.',
    icon: ZapIcon,
  },
  {
    name: 'Chat Memorisation',
    description:
      'Our intelligent chatbot remembers previous interactions, providing a seamless conversation experience.',
    icon: BrainCogIcon,
  },
  {
    name: 'Interactive PDF Viewer',
    description:
      'Engage with your PDFs like never before using our intuitive PDF viewer, enhancing your reading experience.',
    icon: EyeIcon,
  },
  {
    name: 'Cloud Backup',
    description:
      'Rest assured knowing your documents are safely backed up on the cloud, protected from loss or damage.',
    icon: ServerCogIcon,
  },
  {
    name: 'Responsive Across Devices',
    description:
      "Access and chat with your PDFs seamlessly on any device, whether it's your desktop, tablet, or smartphone.",
    icon: MonitorSmartphoneIcon,
  },
]

export default function Home() {
  return (
    <main className="flex-1 overflow-scroll p-2 lg:p-5 bg-gradient-to-bl from-white to-primary">
      <div className="bg-white py-24 sm:py-32 rounded-md drop-shadow-lg">
        <div className="flex flex-col justify-center items-center mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-base font-semibold tracking-tight leading-7 text-primary">
              Your Interactive Document Companion
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-6xl">
              Transform Your PDFs into Interactive Conversations
            </p>
            <p className="mt-6 text-lg leading-8 text-zinc-600">
              Introducing{' '}
              <span className="font-bold text-primary">Live Docs</span>
              <br />
              <br /> Upload your document, and our chatbot will answer
              questions, summarize content, and answer all your Qestions. Ideal
              for everyone, <span className="text-primary">Live Docs</span>{' '}
              turns static documents into{' '}
              <span className="font-bold">dynamic conversations</span>,
              enhancing productivity 10x fold faster.
            </p>
          </div>
          <Button asChild className="mt-4">
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>

        <div>
          <div>
            <Image
              src="https://i.imgur.com/VciRSTI.jpeg"
              alt="app screenshot"
              width={2432}
              height={1442}
              className="mv-[-0%] rounded-xl shadow-2xl ring-1 ring-ring/10"
            />
          </div>
        </div>
      </div>
    </main>
  )
}
