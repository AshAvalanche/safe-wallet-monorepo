import type { ConnectedWallet } from '@/hooks/wallets/useOnboard'
import type { SafeTransaction } from '@safe-global/types-kit'
import { type SafeState } from '@safe-global/store/gateway/AUTO_GENERATED/safes'
import { checksumAddress } from '@safe-global/utils/utils/addresses'

export const getAvailableSigners = (
  wallet: ConnectedWallet | null | undefined,
  nestedSafeOwners: string[] | null,
  safe: SafeState,
  tx: SafeTransaction | undefined,
) => {
  if (!wallet || !nestedSafeOwners || !tx) {
    return []
  }
  const walletAddress = checksumAddress(wallet.address)

  const isDirectOwner = safe.owners.map((owner) => checksumAddress(owner.value)).includes(walletAddress)
  const isFullySigned = tx.signatures.size >= safe.threshold
  const availableSigners = nestedSafeOwners ? nestedSafeOwners.map(checksumAddress) : []

  const signers = Array.from(tx.signatures.keys()).map(checksumAddress)

  if (isDirectOwner && !signers.includes(walletAddress)) {
    availableSigners.push(walletAddress)
  }

  if (!isFullySigned) {
    // Filter signers that already signed
    return availableSigners.filter((signer) => !signers.includes(signer))
  }
  return availableSigners
}
