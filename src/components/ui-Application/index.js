import React, { PropTypes, Component } from 'react'
import Menu from '../ui-Menu'

// stylesheet dependencies
require('./index.css')

/**
 * Application Layout
 */

export default class Application extends Component {

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
        <Menu title='Timeline' />
        {this.props.children}
      </section>
    )
  }
}
