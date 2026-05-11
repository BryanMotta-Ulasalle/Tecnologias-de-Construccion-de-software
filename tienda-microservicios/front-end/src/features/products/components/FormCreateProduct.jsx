import { useState } from 'react'
import PropTypes from 'prop-types'
import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import CardCreate from '../../../shared/components/ui/CardCreate'
import Form from '../../../shared/components/ui/Form'
import Button from '../../../shared/components/ui/Button'
import LabelInput from '../../../shared/components/ui/LabelInput'
import { formProductName, formProductStock, formProductPrice } from '../data/data'
import validateName from '../../../validators/name.validator'
import { validatePrice } from '../../../validators/price.validator'
import { validateStock } from '../../../validators/stock.validator'

const FormCreateProduct = ({ onClose, onCreateProduct, handleClose }) => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState({})
  const { t } = useTranslation(['products', 'common'])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (name.trim() === '' || price === '' || stock === '') {
      alert(t('products:form.validation'))
      return
    }

    const nameError = validateName(name)
    const priceError = validatePrice(price)
    const stockError = validateStock(stock)

    setError({ name: nameError, price: priceError, stock: stockError })

    if (nameError || priceError || stockError) {
      return
    }

    setIsSubmitting(true)

    try {
      await onCreateProduct({
        nombre: name.trim(),
        precio: Number(price),
        stock: Number(stock),
      })

      setName('')
      setPrice('')
      setStock('')
      onClose()
    } catch {
      alert(t('products:form.validation2'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <CardCreate>
      <div className="flex items-center justify-between border-b border-tableBorder p-5">
        <h1 className="text-text2 text-2xl">{t('products:form.addProduct')}</h1>
        <Button type="button" onClick={handleClose} variant="none" ariaLabel={t('common:actions.close')}>
          <X className="w-6 h-6 text-text2" />
        </Button>
      </div>
      <Form action={handleSubmit}>
        <div className="px-5 py-4 flex flex-col">
          <LabelInput
            label={t('products:form.name.label')}
            id={formProductName.name}
            type={formProductName.type}
            placeholder={t('products:form.name.placeholder')}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {error.name && <p className="text-red-500 text-sm mt-1">{error.name}</p>}

          <LabelInput
            label={t('products:form.price.label')}
            id={formProductPrice.name}
            type={formProductPrice.type}
            placeholder={t('products:form.price.placeholder')}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min={1}
          />
          {error.price && <p className="text-red-500 text-sm mt-1">{error.price}</p>}

          <LabelInput
            label={t('products:form.stock.label')}
            id={formProductStock.name}
            type={formProductStock.type}
            placeholder={t('products:form.stock.placeholder')}
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            min={0}
          />
          {error.stock && <p className="text-red-500 text-sm mt-1">{error.stock}</p>}
        </div>
        <div className="flex flex-row justify-end py-4 px-5 border-t border-tableBorder">
          <Button type="button" onClick={handleClose} className="" variant="cancel">
            {t('common:actions.cancel')}
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? t('products:form.creating') : t('products:form.addProduct')}
          </Button>
        </div>
      </Form>
    </CardCreate>
  )
}

FormCreateProduct.propTypes = {
  onClose: PropTypes.func.isRequired,
  onCreateProduct: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
}

export default FormCreateProduct