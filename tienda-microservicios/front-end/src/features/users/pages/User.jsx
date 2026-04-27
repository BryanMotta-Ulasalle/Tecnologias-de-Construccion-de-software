
import { headerTable } from '../data/data'

import UserTable from '../components/UserTable'
import Title from '../../../shared/components/ui/Title'
import ButtonCardCreate from '../../../shared/components/ui/ButtonCardCreate'
import useUsers from '../hooks/useUsers'
import FormCreateUser from '../components/FormCreateUser'
import useClose from '../../../shared/components/hooks/useClose'
import { Plus } from 'lucide-react';

const User = () => {

  const { users, createNewUser } = useUsers()
  const { isOpen, handleOpen, handleClose } = useClose()
  
  return (
    <main>
      <div className='py-10 flex items-center justify-between px-10'>
        <Title title='Administrar Usuarios' description='Listado de usuarios registrados en la plataforma' />
        <ButtonCardCreate handleOpen={handleOpen} isOpen={isOpen} name='Crear Usuario' Icon={Plus}>
          <FormCreateUser onCreateUser={createNewUser} onClose={ handleClose} handleClose={handleClose} />
        </ButtonCardCreate>
      </div>

      <div className='p-10'>
        <UserTable header={headerTable} data={users} />
      </div>

      
    </main>
  )
}

export default User
