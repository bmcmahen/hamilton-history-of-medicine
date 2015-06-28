import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'
import CloseButton from '../ui-Close'
import debug from 'debug'

const log = debug('app:ui-container')

if (__CLIENT__) {
  require('./index.css')
}

export default class Container extends Component {

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onRequestOpen: PropTypes.func.isRequired,
    main: PropTypes.node.isRequired,
    detail: PropTypes.node.isRequired,
    onRequestClose: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {}
    this.onWindowClick = this.onWindowClick.bind(this)
  }

  componentWillUnmount () {
    window.removeEventListener('click', this.onWindowClick)
  }

  onWindowClick (e) {
    // request to close menu when clicking outside of
    // the menu when it is already open
    if (this.props.isOpen) {
      e.stopPropagation()
      let el = React.findDOMNode(this.refs.detail)
      if (!el.contains(e.target)) {
        log('close sidebar')
        this.props.onRequestClose()
      } else {
        log('click is within sidebar, leave open')
      }
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.isOpen && !this.props.isOpen) {

      // bind window click when openining
      setTimeout(() => {
        window.addEventListener('click', this.onWindowClick)
      }, 0)

      log('scroll view to the top')
      let el = React.findDOMNode(this.refs.scroll)
      el.scrollTop = 0
    }

    if (!nextProps.isOpen) {
      window.removeEventListener('click', this.onWindowClick)
    }

  }

  render () {

    const classes = classNames({
      'Container': true
    })

    const main = classNames({
      'Container__main': true,
      'open': this.props.isOpen
    })

    const detail = classNames({
      'Container__detail': true,
      'open': this.props.isOpen
    })

    return (
      <div className={classes}>
        <section className={main}>
          {this.props.main}
        </section>
        <section ref='detail' className={detail}>
          <CloseButton onRequestClose={this.hideDetail.bind(this)} />
          <div className='Container__detail-content' ref='scroll'>
            {this.props.detail}
          </div>
        </section>
      </div>
    )
  }

  showDetail (e) {
    e.stopPropagation()
    this.props.onRequestOpen()
  }

  hideDetail () {
    this.props.onRequestClose()
  }
}
