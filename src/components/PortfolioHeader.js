import React from 'react'
import { connect } from 'react-redux'
import { mobilePadding, desktopPadding, border, smallFontSize } from '../lib/styles'
import { formatFiat, formatPercentChange } from '../lib/formatNumber'
import { getSecurities } from '../selectors/securities'
import { getBalancesBySymbol } from '../selectors/transactions'

class PortfolioHeader extends React.PureComponent {
  getTotalValue() {
    const baseCurrency = this.props.baseCurrency
    const balancesBySymbol = this.props.balancesBySymbol
    return Object.keys(balancesBySymbol).reduce((total, symbol) => {
      const security = this.props.securities && this.props.securities.find(s =>
        s.symbol === symbol && s.baseCurrency === baseCurrency
      )
      if (!security) return total

      return total + balancesBySymbol[symbol] * security.price
    }, 0)
  }

  getChangeDiv({ days }) {
    const change = formatPercentChange(this.getChange({ days }))
    return (
      <div style={change.style}>
        {change.value}
      </div>
    )
  }

  getChange({ days }) {
    const chartData = this.props.chartData
    if (!Array.isArray(chartData)) return 0
    const data = chartData.slice(0).reverse()
    const today = data[0] && data[0][1]
    if (!today) return 0
    const priorDay = data[days] && data[days][1]
    if (!priorDay) return 0
    const change = today - priorDay
    return Math.round(change / priorDay * 1000) / 10
  }

  render() {
    const isMobile = this.props.isMobile
    const baseCurrency = this.props.baseCurrency
    const padding = isMobile ? mobilePadding : desktopPadding
    const rowStyle = {
      padding,
      fontSize: 20,
      fontWeight: 100,
      margin: 0,
      borderBottom: border
    }
    const colStyle = {
      display: 'inline-block',
      paddingRight: padding,
      borderRight: border,
      marginRight: padding
    }
    const labelStyle = {
      fontSize: smallFontSize
    }
    return (
      <div style={rowStyle}>
        <div style={colStyle}>
          <div style={labelStyle}>Total value</div>
          <div>{formatFiat(this.getTotalValue(), baseCurrency)}</div>
        </div>
        <div style={colStyle}>
          <div style={labelStyle}>Today</div>
          {this.getChangeDiv({ days: 1 })}
        </div>
        <div style={colStyle}>
          <div style={labelStyle}>7 day</div>
          {this.getChangeDiv({ days: 7 })}
        </div>
        {/*
        <div style={colStyle}>
          <div style={labelStyle}>30 day</div>
          {this.getChangeDiv({ days: 30 })}
        </div>
        */}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isMobile: state.ephemeral.isMobile,
  balancesBySymbol: getBalancesBySymbol(state),
  securities: getSecurities(state),
  baseCurrency: state.user.baseCurrency,
  chartData: state.portfolio.chartData
})

export default connect(mapStateToProps)(PortfolioHeader)
