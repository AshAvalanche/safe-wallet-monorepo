import type { SpendingLimitState } from '@/store/spendingLimitsSlice'
import { getSafeSDK } from '@/hooks/coreSDK/safeCoreSDK'
import {
  getLatestSpendingLimitAddress,
  getDeployedSpendingLimitModuleAddress,
} from '@/services/contracts/spendingLimitContracts'
import type { MetaTransactionData } from '@safe-global/types-kit'
import {
  createAddDelegateTx,
  createEnableModuleTx,
  createResetAllowanceTx,
  createSetAllowanceTx,
} from '@/services/tx/spendingLimitParams'
import type { ChainInfo } from '@safe-global/safe-gateway-typescript-sdk'
import { type SafeState } from '@safe-global/store/gateway/AUTO_GENERATED/safes'
import { parseUnits } from 'ethers'
import { currentMinutes } from '@safe-global/utils/utils/date'
import { createMultiSendCallOnlyTx } from '@/services/tx/tx-sender/create'

export type NewSpendingLimitData = {
  beneficiary: string
  tokenAddress: string
  amount: string
  resetTime: string
}

export const createNewSpendingLimitTx = async (
  data: NewSpendingLimitData,
  spendingLimits: SpendingLimitState[],
  chainId: string,
  chain: ChainInfo,
  safeModules: SafeState['modules'],
  deployed: boolean,
  tokenDecimals?: number | null,
  existingSpendingLimit?: SpendingLimitState,
) => {
  const sdk = getSafeSDK()
  if (!sdk) return

  let spendingLimitAddress = deployed && getDeployedSpendingLimitModuleAddress(chainId, safeModules)
  const isModuleEnabled = !!spendingLimitAddress
  if (!isModuleEnabled) {
    spendingLimitAddress = getLatestSpendingLimitAddress(chainId)
  }
  if (!spendingLimitAddress) return

  const txs: MetaTransactionData[] = []

  if (!deployed) {
    const enableModuleTx = await createEnableModuleTx(
      chain,
      await sdk.getAddress(),
      sdk.getContractVersion(),
      spendingLimitAddress,
    )

    const tx = {
      to: enableModuleTx.to,
      value: '0',
      data: enableModuleTx.data,
    }

    txs.push(tx)
  } else {
    if (!isModuleEnabled) {
      const enableModuleTx = await sdk.createEnableModuleTx(spendingLimitAddress)

      const tx = {
        to: enableModuleTx.data.to,
        value: '0',
        data: enableModuleTx.data.data,
      }
      txs.push(tx)
    }
  }

  const existingDelegate = spendingLimits.find((spendingLimit) => spendingLimit.beneficiary === data.beneficiary)
  if (!existingDelegate) {
    txs.push(createAddDelegateTx(data.beneficiary, spendingLimitAddress))
  }

  if (existingSpendingLimit && existingSpendingLimit.spent !== '0') {
    txs.push(createResetAllowanceTx(data.beneficiary, data.tokenAddress, spendingLimitAddress))
  }

  const tx = createSetAllowanceTx(
    data.beneficiary,
    data.tokenAddress,
    parseUnits(data.amount, tokenDecimals ?? undefined).toString(),
    parseInt(data.resetTime),
    data.resetTime !== '0' ? currentMinutes() - 30 : 0,
    spendingLimitAddress,
  )

  txs.push(tx)

  return createMultiSendCallOnlyTx(txs)
}
