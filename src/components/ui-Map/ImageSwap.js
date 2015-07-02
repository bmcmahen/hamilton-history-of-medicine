import React, {PropTypes} from 'react'
import classNames from 'classnames'
import Toggle from 'react-toggle'

if (__CLIENT__) {
  require('./ImageSwap.css')
  require('react-toggle/style.css')
}

export default class ImageSwap extends React.Component {

  static propTypes = {
    beforeImage: PropTypes.string.isRequired,
    afterImage: PropTypes.string,
    caption: PropTypes.string,
    onToggleChange: PropTypes.func,
    style: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.state = {
      showAfter: false
    }
  }

  render () {
    let { style, beforeImage, afterImage, caption } = this.props
    let classes = classNames({
      ImageSwap: true,
      'ImageSwap--showing-after': this.state.showAfter
    })

    return (
      <div className={classes} style={style}>
        <div
          className='ImageSwap__before-image'
          style={{backgroundImage: `url(${beforeImage})`}}
        />
        {afterImage &&
          <div
            className='ImageSwap__after-image'
            style={{backgroundImage: `url(${afterImage})`}}
          />
        }
        <p className='ImageSwap__caption'>
          {caption}
        </p>
        {afterImage &&
          <div className='ImageSwap__toggle'>
            <Toggle
              aria-label='Show modern day photograph'
              onChange={::this.toggleImage}
            />
          </div>
        }
      </div>
    )
  }

  toggleImage () {
    this.setState({ showAfter: !this.state.showAfter })
  }

}
