import React, { PropTypes, Component } from 'react'
import Menu from '../ui-Menu'
import shouldPureComponentUpdate from 'react-pure-render/function'

// stylesheet dependencies
require('./index.css')

/**
 * Application Layout
 */

export default class Application extends Component {

  shouldComponentUpdate = shouldPureComponentUpdate

  constructor (props, context) {
    super(props, context)
    this.state = {}
  }

  static propTypes = {
    children: PropTypes.any
  }

  render () {
    return (
      <section className='Application'>
        <Menu />
        {this.props.children}
      </section>
    )
  }
}
