const Card = (props) => {
    const { name, age, address, gender, created_at } = props
    return (
        <div className="p-5 w-[450px] bg-white rounded-2xl shadow-2xl text-slate-600">
            <h2 className="text-xl font-semibold mb-3 text-center">Information Users</h2>
            <div className="flex justify-between  mx-auto">
                <p>Name</p>
                <p className="font-semibold">{name}</p>
            </div>
            <div className="flex justify-between  mx-auto">
                <p>Gender</p>
                <p className="font-semibold">{gender}</p>
            </div>
            <div className="flex justify-between  mx-auto">
                <p>Age</p>
                <p className="font-semibold">{age}</p>
            </div>
            <div className="flex justify-between  mx-auto">
                <p>Address</p>
                <p className="font-semibold">{address}</p>
            </div>
            <div className="flex justify-between  mx-auto">
                <p>Account Created</p>
                <p className="font-semibold">{created_at}</p>
            </div>
        </div>
    )
}

export default Card