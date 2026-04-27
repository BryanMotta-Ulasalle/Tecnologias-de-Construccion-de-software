import useState from 'react'
import usePedidos from '../hooks/usePedidos';
import TablePedidos from '../components/TablePedidos';
import { header } from '../data/data';
import ButtonDetalleProductos from '../components/ButtonDetalleProductos';
import useClose from '../../../shared/components/hooks/useClose';
import CardDetalleProductos from '../components/cardDetalleProductos';
import Title from '../../../shared/components/ui/Title';
import ButtonCardCreate from '../../../shared/components/ui/ButtonCardCreate'
import FormCreatePedido from '../components/FormCreatePedido';
import { Plus } from 'lucide-react';
import useOpenCloseDetailProduct from '../hooks/useOpenCloseDetailProduct';
import useUsers from '../../users/hooks/useUsers';
import useProtuct from '../../products/hooks/useProduct';


const Pedidos = () => {

    const { pedidos, createNewPedido, handleDetail, selectedPedido, handleCloseDetail2 } = usePedidos();
    const { isOpen, handleOpen, handleClose } = useClose();
    const {isOpenDetail, handleOpenDetail, handleCloseDetail} = useOpenCloseDetailProduct()
    const {usersList} = useUsers()
    const {products} = useProtuct()


    return (
        <main>
            <div className='py-10 flex items-center justify-between px-10'>
                <Title title="Gestion de Pedidos" description="Administra los pedidos de la tienda" />
                <ButtonCardCreate handleOpen={handleOpen} isOpen={isOpen} name='Crear Pedido' Icon={Plus}>
                    <FormCreatePedido onCreatePedido={createNewPedido} handleClose={handleClose} selectOptionsUsers={usersList} selectOptionsProducts={products}/>
                </ButtonCardCreate>
            </div>
            <TablePedidos header={header} data={pedidos} handleDetail={handleDetail} open={handleOpenDetail}/>
            <ButtonDetalleProductos isOpen={isOpenDetail} >
                <CardDetalleProductos data={selectedPedido} handleClose={() => { handleCloseDetail()}} />
            </ButtonDetalleProductos>
        </main>
    )
}

export default Pedidos