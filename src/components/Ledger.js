import React from 'react'
import { connect } from 'react-redux'
import H1 from './H1'
import { mobilePadding, desktopPadding } from '../lib/styles'

class Ledger extends React.Component {
  render() {
    return (
      <div>
        <H1 text="Ledger Connect" />
        <div
          style={{
            padding: this.props.isMobile ? mobilePadding : desktopPadding
          }}
        >
          Coming soon.
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isMobile: state.app.isMobile
})

export default connect(mapStateToProps)(Ledger)