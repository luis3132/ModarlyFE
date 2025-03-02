

export default function ErrorScreen({error}: {error: string}) {
    return (
        <>
            <div className={`p-10 flex-grow h-screen justify-center  items-center`}>
                <div className="h-screen text-center">
                    <h1 className="text-4xl text-red-500">{error}</h1>
                </div>
            </div>
        </>
    )
}