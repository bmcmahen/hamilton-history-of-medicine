import React, {PropTypes, Component} from 'react'

if (__CLIENT__) {
  require('./index.css')
}

export default class CloseButton extends Component {

  static propTypes = {
    label: PropTypes.string,
    onRequestClose: PropTypes.func.isRequired
  }

  static defaultProps = {
    label: 'Close'
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {

    return (
      <div
        role='button'
        tabIndex='-1'
        aria-label={this.props.label}
        className='CloseButton'
        onKeyUp={this.onKeyUp.bind(this)}
        onClick={this.onClick.bind(this)}
        {...this.props}>
        <i>
          <p/>
          <p/>
        </i>
      </div>
    )

  }

  onKeyUp (e) {
    if (e.keyCode === 32) {
      this.props.onRequestClose()
    }
  }

  onClick (e) {
    e.preventDefault()
    this.props.onRequestClose()
  }
}
