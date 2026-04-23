
import { headerTable } from '../data/data'

import UserTable from '../components/UserTable'
import Title from '../../../shared/components/ui/Title'
import ButtonCardCreate from '../../../shared/components/ui/ButtonCardCreate'
import useUsers from '../hooks/useUsers'

const User = () => {

  const { users, createNewUser } = useUsers()
  
  return (
    <main>
      <div className='p-3 flex items-center justify-between px-10'>
        <Title title='Usuarios' description='Listado de usuarios registrados en la plataforma' />
        <ButtonCardCreate onCreateUser={createNewUser}/>
      </div>

      <div className='p-5'>
        <UserTable header={headerTable} data={users} />
      </div>

      
    </main>
  )
}

export default User
