import { useCallback, useState } from 'react'

const useOpenCloseDetailProduct = () => {

    const [isOpenDetail, setIsOpenDetail] = useState(false)
    
        const handleOpenDetail = useCallback(() => {
          setIsOpenDetail(true)
        }, [])
    
        const handleCloseDetail = useCallback(() => {
          setIsOpenDetail(false)
        }, [])

  return {
    isOpenDetail,
    handleOpenDetail,
    handleCloseDetail
  }
}

export default useOpenCloseDetailProduct