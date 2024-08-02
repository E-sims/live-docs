import { SignedIn, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from './ui/button'
import { FilePlus2 } from 'lucide-react'
import { ModeToggle } from './ThemeToggle'

type Props = {}

function Header({}: Props) {
  return (
    <div className="flex p-4 border-b border-border items-center justify-between text-foreground mx-auto w-full max-w-[90rem]">
      <div className="flex items-center gap-x-4">
        <Link
          href="/dashboard"
          className="text-2xl font-semibold tracking-tight"
        >
          Live<span className="text-primary">DocX</span>
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
          <UserButton />
        </div>
      </SignedIn>
    </div>
  )
}

export default Header
