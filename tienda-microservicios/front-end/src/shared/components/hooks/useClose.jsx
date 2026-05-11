import { useCallback, useState } from 'react'

const useClose = () => {

    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = useCallback(() => {
      setIsOpen(true)
    }, [])

    const handleClose = useCallback(() => {
      setIsOpen(false)
    }, [])


  return {
    isOpen,
    handleOpen,
    handleClose
  }
}

export default useClose
