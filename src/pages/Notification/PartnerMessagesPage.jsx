import { Search, SquarePlus } from 'lucide-react'

const PartnerMessages = () => {
  return (
    <div className="wrapper">
            <div className="users-header flex items-center justify-between">
                <div className="relative p-2 flex gap-1 items-center">
                    <h1 className="title lg:text-4xl md:text-3xl text-xl">Partner Messages</h1>
                </div>
                <div className="flex items-center gap-3 mb-1 p-3 border-green-900">
                    <div className="flex relative">
                        <input
                            className="form-control font-semibold text-green md:w-80 sm:w-40 w-32 p-2 border outline-none rounded-md"
                            placeholder="Search"
                        // value={search}
                        // onChange={(event) => setSearch(event.target.value)}
                        />
                        <Search className="search-icon" />
                    </div>

                    <button
                        // onClick={handleCreateClick}
                        className="text-green"
                        style={{ borderRadius: "25%" }}
                    >
                        <SquarePlus size={40} />
                    </button>
                </div>
            </div>
            </div>
  )
}

export default PartnerMessages
