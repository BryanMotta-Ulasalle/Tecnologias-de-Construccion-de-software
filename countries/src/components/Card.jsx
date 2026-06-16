

const Card = ({title, etc}) => {
  return (
    <div className="p-8  border rounded-lg flex-1 border-[#C2C6D6] bg-linear-to-b from-white to-[#EDF0FF]">
        <h1 className="text-xl font-medium pb-2">{title}</h1>
        {etc}
    </div>
  )
}

export default Card