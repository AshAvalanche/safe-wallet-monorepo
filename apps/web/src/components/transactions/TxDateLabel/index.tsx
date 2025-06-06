import type { DateLabel as SafeMessageDateLabel } from '@safe-global/store/gateway/AUTO_GENERATED/messages'
import type { DateLabel } from '@safe-global/safe-gateway-typescript-sdk'
import type { ReactElement } from 'react'

import { formatWithSchema } from '@safe-global/utils/utils/date'

import css from './styles.module.css'

const TxDateLabel = ({ item }: { item: DateLabel | SafeMessageDateLabel }): ReactElement => {
  return (
    <div className={css.container}>
      <span>{formatWithSchema(item.timestamp, 'MMM d, yyyy')}</span>
    </div>
  )
}

export default TxDateLabel
