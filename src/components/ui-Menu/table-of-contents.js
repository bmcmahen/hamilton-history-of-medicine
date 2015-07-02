import React, {PropTypes} from 'react'
import ImmutableTypes from 'react-immutable-proptypes'
import classNames from 'classnames'
import {showTOC} from '../../state/actions/layout'

if (__CLIENT__) {
  require('./table-of-contents.css')
}

export default React.createClass({

  displayName: 'TableOfContents',

  contextTypes: {
    redux: PropTypes.object
  },

  propTypes: {
    activeOption: PropTypes.number,
    options: ImmutableTypes.list.isRequired,
    isOpen: PropTypes.bool.isRequired,
    isLocked: PropTypes.bool.isRequired,
    hasBackdrop: PropTypes.bool
  },

  componentDidMount () {
    window.addEventListener('click', this.onWindowClick)
  },

  componentWillUnmount () {
    window.removeEventListener('click', this.onWindowClick)
  },

  onWindowClick (e) {
    if (!this.props.isOpen || this.props.isLocked) {
      return
    }
    let el = React.findDOMNode(this)
    if (el.contains(e.target)) {
      return
    }

    setTimeout(() => {
      this.context.redux.dispatch(showTOC(!this.props.isOpen))
    }, 0)
  },

  render () {

    const classes = classNames({
      'TableOfContents': true,
      'TableOfContents--is-active': this.props.isOpen
    })

    return (
      <div className={classes}>
        <h2 onClick={this.toggleModal}>
          <span className='TableOfContents__arrow'> / </span>
          Contents
        </h2>
        <ul className='TableOfContents__dropdown'>
          {this.props.options.map(this.renderOption)}
        </ul>
      </div>
    )
  },

  renderOption (option, i) {
    if (i === this.props.activeOption) {
      return null
    }

    const classes = classNames({
      'TableOfContents__item': true,
      'TableOfContents__item--is-active': i === this.props.activeOption
    })

    return (
      <li className={classes} key={option}>
        <span>{option}</span>
      </li>
    )
  },

  toggleModal (e) {
    if (this.props.isLocked) {
      return
    }
    e.preventDefault()
    let {redux} = this.context
    redux.dispatch(showTOC(!this.props.isOpen))
  }

})
