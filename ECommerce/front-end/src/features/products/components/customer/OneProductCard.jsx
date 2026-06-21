

const OneProductCard = ({category, status, name, price, description}) => {
  return (
    <div>
        <div>
            <img src="" alt="" />
        </div>
        <div>
             <div>
                <p className='text-golden uppercase text-sm font-medium lg:text-lg'>{category}</p>
                <span>{status}</span>
             </div>
             <h2>{name}</h2>
             <span>{price}</span>
             <p>{description}</p>
        </div>
    </div>
  )
}

export default OneProductCard