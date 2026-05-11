/*
  Código anterior (fragmento estimado, recuperado como comentario):

  // import { useEffect, useState } from 'react'
  // import { getPedidos, createPedido } from '../services/pedidosServices'
  //
  // const usePedidos = () => {
  //   const [pedidos, setPedidos] = useState([])
  //   const [isLoading, setIsLoading] = useState(true)
  //   const [error, setError] = useState(null)
  //
  //   useEffect(() => {
  //     let mounted = true
  //     getPedidos().then(d => { if (mounted) setPedidos(d) })
  //       .catch(e => { if (mounted) setError(e) })
  //       .finally(() => { if (mounted) setIsLoading(false) })
  //     return () => { mounted = false }
  //   }, [])
  //
  //   const createNewPedido = async (pd) => {
  //     const res = await createPedido(pd)
  //     setPedidos(prev => [...prev, res])
  //     return res
  //   }
  //
  //   return { pedidos, createNewPedido, isLoading, error }
  // }

  Ahora: reutiliza `useResource` para cargar `pedidos`.
*/

import { getPedidos, createPedido } from '../services/pedidosServices'
import { useCallback, useState } from 'react'
import useResource from '../../../shared/hooks/useResource'

const usePedidos = () => {

    const {
      data: pedidos,
      setData: setPedidos,
      isLoading,
      error,
      refetch,
    } = useResource({
      cacheKey: 'pedidos',
      fetcher: getPedidos,
      initialValue: [],
    })

    const [selectedPedido, setSelectedPedido] = useState(null)

    const createNewPedido = useCallback(async (pedidoData) => {
        const newPedido = await createPedido(pedidoData)
        setPedidos((prevPedidos) => [...prevPedidos, newPedido])
        return newPedido
    }, [setPedidos])

    const handleDetail = useCallback((pedidoId) => {
        const pedido = pedidos.find((currentPedido) => currentPedido.id === pedidoId)
        setSelectedPedido(pedido ?? null)
    }, [pedidos])

    const handleCloseDetail2 = useCallback(() => {
        setSelectedPedido(null)
    }, [])

  return {
    pedidos,
    createNewPedido,
    handleDetail,
    selectedPedido,
    handleCloseDetail2,
    isLoading,
    error,
    refetch,
  }
}

export default usePedidos