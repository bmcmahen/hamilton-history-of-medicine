import React, {PropTypes} from 'react'
import Menu from '../ui-Menu'

if (__CLIENT__) {
  require('./index.css')
}

class List extends React.Component {

  static contextTypes = {
    router: PropTypes.func
  }

  static propTypes = {
    flux: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired
  }

  displayName = 'List'

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {

    return (
      <div className='List'>
        <Menu title={this.props.title} />
      </div>

    )
  }

}

export default List
