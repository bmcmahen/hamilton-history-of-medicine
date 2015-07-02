import React, {Component, PropTypes} from 'react'
import Menu from './menu.js'
import {Link} from 'react-router'
import {connect} from 'redux/react'

@connect(state => ({
  layout: state.layout
}))
export default class MenuController extends Component {

  static contextTypes = {
    redux: PropTypes.object
  }

  static propTypes = {
    title: PropTypes.string
  }

  constructor (props) {
    super(props)
    this.state = {isOpen: false}
  }

  render () {

    let {layout} = this.props

    return (
      <Menu
        isOpen={this.state.isOpen}
        onRequestClose={::this.close}
        title={layout.get('title')}
        toc={layout.get('toc')}
        tocIsLocked={layout.get('tocIsLocked')}
        tocIsOpen={layout.get('tocIsOpen')}
        tocHasBackdrop={layout.get('tocHasBackdrop')}
        onRequestOpen={::this.open}>
        <div>
          <h1 className='Menu__brand'>
            History of Medicine
          </h1>
          <ul className='Menu__links'>
            <li>
              <Link to='/timeline' onClick={this.close.bind(this)}>
                Timeline
              </Link>
            </li>
            <li>
              <Link to='/map' onClick={this.close.bind(this)}>
                Map
              </Link>
            </li>
          </ul>
        </div>
      </Menu>
    )
  }

  close () {
    this.setState({ isOpen: false })
  }

  open () {
    this.setState({ isOpen: true })
  }
}
