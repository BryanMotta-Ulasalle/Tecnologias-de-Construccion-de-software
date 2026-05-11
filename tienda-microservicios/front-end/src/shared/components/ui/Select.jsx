import PropTypes from 'prop-types'

import useLoading from '../hooks/useLoading'
import { useTranslation } from 'react-i18next'

const Select = ({ id, select = [], type = 'normal', value, onChange, disabled = false }) => {
  const { isLoading } = useLoading()
  const { t } = useTranslation(['common', 'orders'])

  return (
    <div>
      
      {type === "normal" &&
        <select className='border border-tableBorder p-2 rounded-lg mb-1 bg-sidebar text-text2 w-full'
        id={id}
        value={value} onChange={onChange} required disabled={disabled}>
        {select.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      }

  


        { type === "users" && 
          <select className='border border-tableBorder p-2 rounded-lg mb-1 bg-sidebar text-text2 w-full'
          id={id}
          value={value} onChange={onChange} required disabled={disabled || isLoading}>
            <option value=""> {t('orders:form.user.defaultOption')} </option>
          {select.map((option) => (
          <option key={option.id} value={option.id} >
            {option.nombre}
          </option>
        ))}

        </select>
        }

        { type === "products" && 
          <select className='border border-tableBorder p-2 rounded-lg mb-1 bg-sidebar text-text2 w-full'
          id={id}
          value={value} onChange={onChange} required disabled={disabled || isLoading}>
            <option value=""> {t('orders:form.product.defaultOption')} </option>
          {select.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nombre}
          </option>
        ))}
        </select>
        }
    </div>




  )
}

Select.propTypes = {
  id: PropTypes.string,
  select: PropTypes.array,
  type: PropTypes.oneOf(['normal', 'users', 'products']),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
}

export default Select