import React, {Component, PropTypes} from 'react'
import Menu from './menu.js'
import {Link} from 'react-router'

export default class MenuController extends Component {

  static propTypes = {
    title: PropTypes.string
  }

  constructor (props) {
    super(props)
    this.state = {isOpen: false}
  }

  render () {

    return (
      <Menu isOpen={this.state.isOpen}
        onRequestClose={this.close.bind(this)}
        title={this.props.title}
        onRequestOpen={this.open.bind(this)}>
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
