

export default function Loading() {
    return (
        <>
            <div className={`p-10 flex-grow h-screen justify-center flex items-center`}>
                <div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
            </div>
        </>
    )
}