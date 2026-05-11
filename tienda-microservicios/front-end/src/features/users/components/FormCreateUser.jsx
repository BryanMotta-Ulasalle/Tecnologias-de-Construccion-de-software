import { useState } from 'react'
import PropTypes from 'prop-types'
import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Form from '../../../shared/components/ui/Form'
import CardCreate from '../../../shared/components/ui/CardCreate'
import { formUsersName, formUsersEmail, formUsersRole, formUsersStatus } from '../data/data'
import Button from '../../../shared/components/ui/Button'
import LabelInput from '../../../shared/components/ui/LabelInput'
import LabelSelect from '../../../shared/components/ui/LabelSelect'
import validateName from '../../../validators/name.validator'
import { validateEmail } from '../../../validators/email.validator'

const FormCreateUser = ({ onClose, onCreateUser, handleClose }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState({})
  const { t } = useTranslation(['users', 'common'])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (name.trim() === '' || email.trim() === '') {
      alert(t('users:form.validation'))
      return
    }

    const nameError = validateName(name)
    const emailError = validateEmail(email)
    setError({ name: nameError, email: emailError })

    if (nameError || emailError) {
      return
    }

    setIsSubmitting(true)

    try {
      await onCreateUser({ nombre: name.trim(), email: email.trim() })
      setName('')
      setEmail('')
      onClose()
    } catch {
      alert(t('users:form.error'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <CardCreate>
      <div className="flex items-center justify-between border-b border-tableBorder p-5">
        <h1 className="text-text2 text-2xl">{t('users:title')}</h1>
        <Button type="button" onClick={handleClose} variant="none" ariaLabel={t('common:actions.close')}>
          <X className="w-6 h-6 text-text2" />
        </Button>
      </div>
      <Form action={handleSubmit}>
        <div className="px-5 py-4 flex flex-col">
          <LabelInput
            label={t('users:form.name.label')}
            id={formUsersName.name}
            type={formUsersName.type}
            placeholder={t('users:form.name.placeholder')}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {error.name && <p className="text-red-500 text-sm mb-2">{error.name}</p>}

          <LabelInput
            label={t('users:form.email.label')}
            id={formUsersEmail.name}
            type={formUsersEmail.type}
            placeholder={t('users:form.email.placeholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error.email && <p className="text-red-500 text-sm mb-2">{error.email}</p>}

          <div className="flex flex-row gap-8">
            <div className="flex-1">
              <LabelSelect selectOptions={formUsersRole} htmlFor="Rol" children={t('users:form.role.label')} />
            </div>
            <div className="flex-1">
              <LabelSelect selectOptions={formUsersStatus} htmlFor="Estado" children={t('users:form.status.label')} />
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-end py-4 px-5 border-t border-tableBorder">
          <Button type="button" onClick={handleClose} className="" variant="cancel">
            {t('common:actions.cancel')}
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? t('users:form.creating') : t('users:addUser')}
          </Button>
        </div>
      </Form>
    </CardCreate>
  )
}

FormCreateUser.propTypes = {
  onClose: PropTypes.func.isRequired,
  onCreateUser: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
}

export default FormCreateUser
