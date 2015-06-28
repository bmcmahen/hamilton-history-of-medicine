import React, {PropTypes} from 'react'
import Container from '../ui-Container'
import {Link, Navigation} from 'react-router'
import Detail from '../ui-Detail'

// timeline grid: https://strml.github.io/react-grid-layout/examples/1-basic.html

export default React.createClass({

  mixins: [Navigation],

  propTypes: {
    activeDocument: PropTypes.object,
    docs: PropTypes.array
  },

  getInitialState () {
    return {
      isOpen: false
    }
  },

  render () {
    return (
      <Container
        main={this.renderTimeline()}
        detail={this.renderDetail()}
        onRequestOpen={this.onRequestOpen}
        onRequestClose={this.onRequestClose}
        isOpen={this.state.isOpen}
      />
    )
  },

  componentWillReceiveProps (nextProps) {
    if (nextProps.params && nextProps.params.id) {
      this.setState({ isOpen: true })
    } else {
      this.setState({ isOpen: false })
    }
  },

  componentDidMount () {
    this.componentWillReceiveProps(this.props)
  },

  renderTimeline () {
    return (
      <div>
        Timeline main content
        <Link to='/timeline/hello'>
          Show Some Detail
        </Link>
      </div>
    )
  },

  renderDetail () {
    return (
      <Detail
        user={this.props.user}
        activeDocument={this.props.activeDocument}
      />
    )
  },

  onRequestOpen () {

  },

  onRequestClose () {
    this.replaceWith('/timeline')
  }

})
