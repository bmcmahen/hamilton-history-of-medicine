import React, {PropTypes} from 'react'
import Container from '../ui-Container'
import {Link, Navigation} from 'react-router'
import Detail from '../ui-Detail'
import {updatePage} from '../../state/actions/layout'

function updatePageName (redux) {
  return new Promise(resolve => {
    redux.dispatch(updatePage('Timeline')) // synchronous
    resolve()
  })
}

// timeline grid: https://strml.github.io/react-grid-layout/examples/1-basic.html

export default React.createClass({

  mixins: [Navigation],

  propTypes: {
    activeDocument: PropTypes.object,
    docs: PropTypes.array
  },

  contextTypes: {
    redux: PropTypes.object
  },

  statics: {

    fetchData (redux) {
      return updatePage(redux)
    }

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

  componentWillMount () {
    updatePageName(this.context.redux)
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
