

const Notification = ({searchParams} : {searchParams : any}) => {


    return (
        <div className="flex h-screen w-full items-center justify-center">
            <h1>{searchParams.message}</h1>
        </div>
    )
}

export default Notification