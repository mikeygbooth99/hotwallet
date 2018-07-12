import { bindActionCreators } from 'redux'

import * as app from './app'
import * as binance from './binance'
import * as securities from './securities'
import * as portfolio from './portfolio'
import * as prices from './prices'
import * as transactions from './transactions'
import * as user from './user'
import * as wallets from './wallets'
import * as notifications from './notifications'

export const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    ...app,
    ...binance,
    ...portfolio,
    ...prices,
    ...securities,
    ...transactions,
    ...user,
    ...wallets,
    ...notifications
  }, dispatch)
}
