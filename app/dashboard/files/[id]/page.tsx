import Chat from '@/components/Chat'
import PdfView from '@/components/PdfView'
import { adminDb } from '@/firebase/firebaseAdmin'
import { auth } from '@clerk/nextjs/server'

async function ChatToFilePage({ params: { id } }: { params: { id: string } }) {
  auth().protect()
  const { userId } = await auth()

  const ref = await adminDb
    .collection('users')
    .doc(userId!)
    .collection('files')
    .doc(id)
    .get()

  const url = ref.data()?.downloadUrl

  return (
    <div className="grid lg:grid-cols-5 h-full overflow-hidden max-w-[90rem] mx-auto">
      {/* Right Side */}
      <div className="col-span-5 lg:col-span-2 overflow-y-auto relative p-2 items-center">
        {/* Chat */}
        <Chat id={id} />
      </div>

      {/* Left Side */}
      <div className="h-full col-span-5 lg:col-span-3 border-x-2 lg:border-border lg:-order-1 overflow-auto bg-secondary">
        {/* PDF Preview */}
        <PdfView url={url} />
      </div>
    </div>
  )
}

export default ChatToFilePage
