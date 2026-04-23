import React from 'react'
import ProductTable from '../components/ProductTable'
import { headerTable } from '../data/data'
import useProduct from '../hooks/useProduct'
import Title from '../../../shared/components/ui/Title'
import ButtonCardCreate from '../../../shared/components/ui/ButtonCardCreate'

const Product = () => {

  const { products } = useProduct()

  return (
    <div>
      <div>
        <Title title="Productos" description="Lista de productos disponibles"/>
        <ButtonCardCreate/>
      </div>
      <ProductTable header={headerTable} data={products}/>
    </div>
  )
}

export default Product
