import {Link} from 'react-router-dom'
import Button from '../../../../components/Button'

const ProductCard = ({id,imageUrl ,category, name, price, onAddToCart,actions}) => {
  return (
    <article className='w-45 h-70 bg-white rounded-xl overflow-hidden shadow-lg flex flex-col hover:shadow-2xl
                        lg:w-70 lg:h-100 '>
        <Link className='flex-5 bg-gray-500'>
            <img src={imageUrl} alt="" />
        </Link>
        <div className='flex-3 p-3 flex flex-col lg:p-5'>
            <p className='text-golden uppercase text-sm font-medium lg:text-lg'>{category}</p>
            <Link to={`/tienda/productos/${id}/`} className='font-medium lg:text-xl cursor-pointer hover:underline '>{name}</Link>
            <div className='flex flex-row justify-between mt-auto'>
                <span className='font-medium lg:text-lg'>{price}</span>
                {onAddToCart && (
                    <Button children="Agregar" color="black" size="sm"/>
                )}

                {actions}

            </div>
        </div>
    </article>
  )
}

export default ProductCard