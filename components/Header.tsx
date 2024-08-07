import { SignedIn, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from './ui/button'
import { FilePlus2 } from 'lucide-react'
import { ModeToggle } from './ThemeToggle'
import UpgradeButton from './UpgradeButton'
import Image from 'next/image'
import logoWordmark from '@/public/images/svgs/wordmark.svg'
import LogoMark from '@/components/LogoMark'

type Props = {}

function Header({}: Props) {
  return (
    <div className="flex p-4 border-b border-border items-center justify-between text-foreground mx-auto w-full max-w-[90rem]">
      <div className="flex items-center justify-center gap-x-2">
        <Link
          href="/dashboard"
          className="text-2xl font-semibold tracking-tight"
        >
          <div className="flex max-h-10 w-fit">
            <LogoMark />
          </div>
        </Link>
        <ModeToggle />
      </div>
      <SignedIn>
        <div className="flex items-center space-x-2">
          <Button
            asChild
            variant="link"
            className="rounded-full hidden md:flex hover:no-underline"
          >
            <Link href={'/dashboard/upgrade'}>Pricing</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <Link href={'/dashboard'}>My Docs</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <Link href={'/dashboard/upload'}>
              <FilePlus2 />
            </Link>
          </Button>
          <UpgradeButton />
          <UserButton />
        </div>
      </SignedIn>
    </div>
  )
}

export default Header
