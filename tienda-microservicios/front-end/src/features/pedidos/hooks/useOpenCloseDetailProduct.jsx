import {useState} from 'react'

const useOpenCloseDetailProduct = () => {

    const [isOpenDetail, setIsOpenDetail] = useState(false)
    
        const handleOpenDetail = () => {
            console.log("click para abrir")
            setIsOpenDetail(true)
    
            
        }
    
        const handleCloseDetail = () => {
            setIsOpenDetail(false)
            console.log("se hixo click en un boton de cerrar")
        }

  return {
    isOpenDetail,
    handleOpenDetail,
    handleCloseDetail
  }
}

export default useOpenCloseDetailProduct