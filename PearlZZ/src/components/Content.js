import React, { Component } from 'react'
import { connect } from 'react-redux'
import { tokenSelector, exchangeSelector } from '../store/selectors'
// import { onboardLI } from '../store/interactions'
// import { subscribeToEvents } from '../store/interactions'

class Content extends Component {
  UNSAFE_componentWillMount() {
    this.loadBlockchainData(this.props)
  }

  async loadBlockchainData(props) {
    const { dispatch, token, exchange, account, networkId } = props
	// await loadAllPointsXfers(token, exchange, dispatch)
	console.log("Content.js:loadBlockchainData:NetworkId:[", networkId, "].");
//////////////////	await onboardLI(token, dispatch, networkId)
  }

  render() {
    return (
      <div className="content">
        <div className="vertical-split">
        </div>
        <div className="vertical-split">
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    exchange: exchangeSelector(state),
    token: tokenSelector(state)
  }
}

export default connect(mapStateToProps)(Content)
