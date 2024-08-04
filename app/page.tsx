import { ModeToggle } from '@/components/ThemeToggle'
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

import screenshot from '@/public/images/live-docx-screenshot.webp'

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
      <div className="bg-background py-24 sm:py-32 rounded-md drop-shadow-lg relative">
        <div className="flex w-fit absolute top-4 right-4">
          <ModeToggle />
        </div>
        <div className="flex flex-col justify-center items-center mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-base font-semibold tracking-tight leading-7 text-primary">
              Your Interactive Document Companion
            </h2>
            <p className="mt-2 text-foreground text-3xl font-bold tracking-tight sm:text-6xl">
              Transform Your PDFs into Interactive Conversations
            </p>
            <p className="mt-6 text-lg leading-8 text-secondary-foreground">
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
        <div className="relative overflow-hidden pt-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Image
              src={screenshot}
              alt="app screenshot"
              width={3122}
              height={1958}
              className="mv-[-0%] rounded-xl shadow-2xl ring-1 ring-border"
            />
            <div aria-hidden="true" className="relative">
              <div className="absolute bottom-0 -inset-x-32 bg-gradient-to-t from-background/95 pt-[5%]" />
            </div>
          </div>
        </div>
        <div className="px-6 lg:px-8 mx-auto max-w-7xl mt-16 sm:mt-20 md:mt-24">
          <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-slate-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-9">
                <dt className="inline font-semibold">
                  <feature.icon
                    aria-hidden="true"
                    className="absolute left-1 top-1 h-5 w-5 text-primary"
                  />
                </dt>
                <dd className="text-secondary-foreground">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </main>
  )
}
