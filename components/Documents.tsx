import PlaceHolderDocument from './PlaceHolderDocument'
import { auth } from '@clerk/nextjs/server'
import { adminDb } from '@/firebase/firebaseAdmin'
import Document from './Document'

async function Documents() {
  auth().protect()

  const { userId } = await auth()
  if (!userId) {
    throw new Error('User not found')
  }

  const documentsSnapshot = await adminDb
    .collection('users')
    .doc(userId)
    .collection('files')
    .get()

  return (
    <div className="flex flex-wrap p-5 mt-4 bg-secondary/20 justify-center lg:justify-start rounded-xl drop-shadow-md gap-5 max-w-7xl mx-auto border border-border">
      {/* Map through documents */}
      {documentsSnapshot.docs.map((doc) => {
        const { name, downloadUrl, size } = doc.data()

        return (
          <Document
            key={doc.id}
            id={doc.id}
            name={name}
            size={size}
            downloadUrl={downloadUrl}
          />
        )
      })}

      <PlaceHolderDocument />
    </div>
  )
}

export default Documents
