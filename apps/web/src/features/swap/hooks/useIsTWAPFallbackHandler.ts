import { useMemo } from 'react'
import useSafeInfo from '@/hooks/useSafeInfo'
import { TWAP_FALLBACK_HANDLER, TWAP_FALLBACK_HANDLER_NETWORKS } from '../helpers/utils'
import { sameAddress } from '@safe-global/utils/utils/addresses'

export const useTWAPFallbackHandlerAddress = () => {
  const { safe } = useSafeInfo()

  return useMemo(
    () => (TWAP_FALLBACK_HANDLER_NETWORKS.includes(safe.chainId) ? TWAP_FALLBACK_HANDLER : undefined),
    [safe.chainId],
  )
}

/**
 * Hook to check if the Safe's fallback handler (or optionally a provided address) is the TWAP fallback handler.
 * @param fallbackHandler Optional fallback handler address (if not provided, it will be taken from the Safe info)
 * @returns Boolean indicating if the provided fallback handler is the TWAP fallback handler
 */
export const useIsTWAPFallbackHandler = (fallbackHandler?: string) => {
  const { safe } = useSafeInfo()
  const twapFallbackHandler = useTWAPFallbackHandlerAddress()

  const fallbackHandlerAddress = fallbackHandler || safe.fallbackHandler?.value

  return useMemo(
    () => sameAddress(fallbackHandlerAddress, twapFallbackHandler),
    [fallbackHandlerAddress, twapFallbackHandler],
  )
}
