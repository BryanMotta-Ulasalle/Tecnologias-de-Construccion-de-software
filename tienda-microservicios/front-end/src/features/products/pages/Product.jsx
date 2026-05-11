import ProductTable from '../components/ProductTable'
import { headerTable } from '../data/data'
import useProduct from '../hooks/useProduct'
import Title from '../../../shared/components/ui/Title'
import ButtonCardCreate from '../../../shared/components/ui/ButtonCardCreate'
import FormCreateProduct from '../components/FormCreateProduct'
import useClose from '../../../shared/components/hooks/useClose'
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next'

const Product = () => {

  const { products, createNewProduct, isLoading, error, refreshProducts } = useProduct()
  const { isOpen, handleOpen, handleClose } = useClose()

  const {t} = useTranslation(['products'])

  return (
    <div>
      <div className='py-10 flex items-center justify-between px-10'>
        <Title title={t('products:title')} description={t('products:subtitle')}/>
        <ButtonCardCreate handleOpen={handleOpen} isOpen={isOpen} name={t('products:addProduct')} Icon={Plus}>
          <FormCreateProduct onClose={handleClose} handleClose={handleClose} onCreateProduct={createNewProduct}/>
        </ButtonCardCreate>
      </div>
      <div className='p-10'>
        {error && <p role="alert" className="text-red-400 mb-4">No se pudieron cargar los productos.</p>}
        {isLoading ? <p className="text-text1">Cargando productos...</p> : <ProductTable header={headerTable} data={products}/>}
        {error && <button type="button" onClick={refreshProducts} className="mt-4 text-text2 underline">Reintentar</button>}
      </div>
    </div>
  )
}

export default Product
