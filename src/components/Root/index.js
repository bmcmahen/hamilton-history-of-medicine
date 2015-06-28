import React, { PropTypes } from 'react'
import { Router } from 'react-router'
import { Provider } from 'redux/react'
import routes from '../Routes'

/**
 * Create Root Component that wraps react-router,
 * rendered on both client & server
 */

export default class Root extends React.Component {

  constructor (props) {
    super(props)
    this.createElement = this.createElement.bind(this)
  }

  static propTypes = {
    routerProps: PropTypes.object.isRequired,
    redux: PropTypes.object.isRequired
  }

  render () {
    const { routerProps, redux } = this.props

    return (
      <Provider redux={redux}>
        {() =>
          <Router
            {...routerProps}
            onUpdate={this.onRouteUpdate}
            routes={routes(redux)}
            createElement={this.createElement}
          />
        }
      </Provider>
    )
  }

  createElement (Component, props) {
    return <Component {...props} />
  }

}
