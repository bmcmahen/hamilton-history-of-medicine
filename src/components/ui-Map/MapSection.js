import React, {PropTypes} from 'react'
import Waypoint from 'react-waypoint'
import setClasses from 'classnames'

if (__CLIENT__) {
  require('./MapSection.css')
}

export default class MapSection extends React.Component {

  static propTypes = {
    keyname: PropTypes.string.isRequired,
    onEnter: PropTypes.func,
    title: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.oneOf(['light', 'dark'])
  }

  constructor (props) {
    super(props)
  }

  render () {
    let { title, style, className, type } = this.props
    let classes = setClasses({
      'MapSection': true,
      ['MapSection--light']: type === 'light',
      ['MapSection--dark']: type === 'dark'
    })

    return (
      <div className={classes} style={style}>
        <div className='MapSection__content'>
          {title && <h2 className='MapSection__title'>{title}</h2>}
          <Waypoint onEnter={::this.onEnter} />
          {this.props.children}
        </div>
      </div>
    )
  }

  onEnter () {
    let {onEnter} = this.props
    if (onEnter) {
      onEnter(this.props.keyname)
    }
  }
}
