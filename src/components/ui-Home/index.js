import React, {Component, PropTypes} from 'react'
import Helmet from 'react-helmet'
import {testMethod} from '../../state/actions/user'

let image = require('./login.png')

export default class Home extends Component {

  static contextTypes = {
    redux: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className='Home'>
        <Helmet
          title='History of Medicine - Home'
        />
        <h1>I am Home.</h1>
        <img src={image} />
      </div>
    )
  }

  componentDidMount () {
    this.context.redux.dispatch(testMethod())
  }
}
