import PlaceHolderDocument from './PlaceHolderDocument'

function Documents() {
  return (
    <div className="flex flex-wrap p-5 bg-secondary/20 justify-center lg:justify-start rounded-sm gap-5 max-w-7xl mx-auto">
      {/* Map through documents */}
      <PlaceHolderDocument />
    </div>
  )
}

export default Documents
