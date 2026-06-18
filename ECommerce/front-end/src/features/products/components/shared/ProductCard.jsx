import {Link} from 'react-router-dom'
import Button from '../../../../components/Button'

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
                    <Button children="Agregar" />
                )}

                {actions}

            </div>
        </div>
    </article>
  )
}

export default ProductCard