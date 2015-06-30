import React, {PropTypes} from 'react'
import Waypoint from 'react-waypoint'

export default React.createClass({

  propTypes: {
    name: PropTypes.string.isRequired,
    header: PropTypes.string,
    title: PropTypes.string.isRequired,
    onEnter: PropTypes.func.isRequired
  },

  displayName: 'ScrollView',

  render () {
    return (
      <div className='ScrollView' id={this.props.name}>
        <Waypoint onEnter={::this.onEnter} />
        {this.props.header &&
          <img className='ScrollView__header' src={this.props.header} />
        }
        <h2>{this.props.title}</h2>
        <div className='ScrollView__section'>
          {this.props.children}
        </div>
      </div>
    )
  },

  onEnter () {
    this.props.onEnter(this.props.name)
  }

})
