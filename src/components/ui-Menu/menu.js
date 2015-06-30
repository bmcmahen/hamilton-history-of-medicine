import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'
import TableOfContents from './table-of-contents'

if (__CLIENT__) {
  require('./menu.css')
}

class Menu extends Component {

  displayName = 'Menu'

  static propTypes = {
    onRequestClose: PropTypes.func.isRequired,
    onRequestOpen: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.string
  }

  constructor (props) {
    super(props)
    this.state = {}
    this.onWindowClick = this.onWindowClick.bind(this)
  }

  componentDidMount () {
    window.addEventListener('click', this.onWindowClick)
  }

  componentWillUnmount () {
    window.removeEventListener('click', this.onWindowClick)
  }

  onWindowClick (e) {
    // request to close menu when clicking outside of
    // the menu when it is already open
    if (this.props.isOpen) {
      let el = React.findDOMNode(this)
      if (!el.contains(e.target)) {
        this.props.onRequestClose()
      }
    }
  }

  render () {

    const classes = classNames({
      'Menu': true,
      'open': this.props.isOpen
    })

    // todo: accessibility! the button should have descriptive text.
    return (
      <div className={classes}>
        <div className='Menu__controls'>
          <i role='button' onClick={this.toggleState.bind(this)}>
            <span>
              <p/>
              <p/>
              <p/>
            </span>
          </i>
          {this.props.title &&
            <h2>{this.props.title}</h2>
          }
          {this.props.toc &&
            <TableOfContents
              options={this.props.toc.get('options')}
              activeOption={this.props.toc.get('activeOption')}
            />
          }
        </div>
        {this.props.children}
      </div>
    )
  }

  toggleState () {
    if (this.props.isOpen) {
      this.props.onRequestClose()
    } else {
      this.props.onRequestOpen()
    }
  }
}

export default Menu
