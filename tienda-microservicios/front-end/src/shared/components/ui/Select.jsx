import React from 'react'
import useLoading from '../hooks/useLoading'

const Select = ({ select, type = "normal", value, onChange }) => {

  const {isLoading} = useLoading()

  return (
    <div>
      
      {type === "normal" &&
        <select className='border border-tableBorder p-2 rounded-lg mb-1 bg-sidebar text-text2 w-full'
        value={value} onChange={onChange} required disabled={isLoading}>
        {select.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      }

  


        { type === "users" && 
          <select className='border border-tableBorder p-2 rounded-lg mb-1 bg-sidebar text-text2 w-full'
          value={value} onChange={onChange} required disabled={isLoading}>
            <option value="">Selecciona un usuario</option>
          {select.map((option) => (
          <option key={option.id} value={option.id} >
            {option.nombre}
          </option>
        ))}

        </select>
        }

        { type === "products" && 
          <select className='border border-tableBorder p-2 rounded-lg mb-1 bg-sidebar text-text2 w-full'
          value={value} onChange={onChange} required disabled={isLoading}>
            <option value="">Selecciona un producto</option>
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

export default Select