import {Link} from 'react-router-dom'

const ProductCard = ({id,imageUrl ,category, name, price, onAddToCart,actions}) => {
  return (
    <article>
        <Link>
            <img src={imageUrl} alt="" />
        </Link>
        <div>
            <p>{category}</p>
            <h3>{name}</h3>
            <div>
                <span>{price}</span>
                {onAddToCart && (
                    <button onClick={()=> onAddToCart(id)} >Agregar</button>
                )}

                {actions}

            </div>
        </div>
    </article>
  )
}

export default ProductCard