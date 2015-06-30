import React, {PropTypes} from 'react'
import ImmutableTypes from 'react-immutable-proptypes'
import classNames from 'classnames'

if (__CLIENT__) {
  require('./table-of-contents.css')
}

export default React.createClass({

  displayName: 'TableOfContents',

  propTypes: {
    activeOption: PropTypes.number.isRequired,
    options: ImmutableTypes.list.isRequired
  },

  componentDidMount () {
    window.addEventListener('click', this.onWindowClick)
  },

  componentWillUnmount () {
    window.removeEventListener('click', this.onWindowClick)
  },

  getInitialState () {
    return {
      isOpen: false
    }
  },

  onWindowClick (e) {
    if (!this.state.isOpen) {
      return
    }
    let el = React.findDOMNode(this)
    if (el.contains(e.target)) {
      return
    }

    setTimeout(() => {
      this.setState({ isOpen: false })
    }, 0)
  },

  render () {

    const classes = classNames({
      'TableOfContents': true,
      'TableOfContents--is-active': this.state.isOpen
    })

    return (
      <div className={classes}>
        <h2 onClick={this.toggleModal}>
          <span className='TableOfContents__arrow'> / </span>
          {this.props.options.get(this.props.activeOption)}
        </h2>
        <ul className='TableOfContents__dropdown'>
          {this.props.options.map(this.renderOption)}
        </ul>
      </div>
    )
  },

  renderOption (option, i) {
    const classes = classNames({
      'TableOfContents__item': true,
      'TableOfContents__item--is-active': i === this.props.activeOption
    })

    return (
      <li className={classes}>
        <span>{option}</span>
      </li>
    )
  },

  toggleModal (e) {
    e.preventDefault()
    this.setState({ isOpen: !this.state.isOpen })
  }

})
