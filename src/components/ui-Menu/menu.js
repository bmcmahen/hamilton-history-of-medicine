import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'
import TableOfContents from './table-of-contents'

if (__CLIENT__) {
  require('./menu.css')
}

export default class Menu extends Component {

  static contextTypes = {
    redux: PropTypes.object
  }

  static propTypes = {
    onRequestClose: PropTypes.func.isRequired,
    onRequestOpen: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.string,
    tocIsOpen: PropTypes.bool,
    tocHasBackdrop: PropTypes.bool
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

    const {
      toc,
      tocIsOpen,
      tocHasBackdrop,
      tocIsLocked
    } = this.props

    // todo: accessibility! the button should have descriptive text.
    return (
      <div className={classes}>
        <div className='Menu__controls'>
          <i role='button' onClick={::this.toggleState}>
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
              options={toc.get('options')}
              isOpen={tocIsOpen}
              isLocked={tocIsLocked}
              hasBackdrop={tocHasBackdrop}
              activeOption={toc.get('activeOption')}
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
