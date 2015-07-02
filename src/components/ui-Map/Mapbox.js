import React, {PropTypes} from 'react'
import debug from 'debug'

const log = debug('app:ui-Map:Map')

if (__CLIENT__) {
  require('./Mapbox.css')
}

export default class Mapbox extends React.Component {

  static propTypes = {
    interactive: PropTypes.bool,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    activeItem: PropTypes.object,
    activeKey: PropTypes.string,
    onKeyChange: PropTypes.func // potentially allow interactive map to emit events
  }

  static defaultProps = {
    interactive: false,
    style: 'https://www.mapbox.com/mapbox-gl-styles/styles/light-v7.json',
    activeItem: {
      key: 'stage1',
      center: [40, -74.50],
      zoom: 9,
      transition: {
        speed: 0.6
      }
    }
  }

  constructor (props) {
    super(props)
  }

  componentDidMount () {
    let el = React.findDOMNode(this)
    mapboxgl.accessToken = 'pk.eyJ1IjoiYm1jbWFoZW4iLCJhIjoiMmI0ZDVmZDI3YjFlM2ZiYTVmZDQ2MjBhMGQxNTMyNzgifQ.l_MuF4H2l44qpbN8NP9WEw'
    this.map = new mapboxgl.Map({
      container: el,
      interactive: this.props.interactive,
      style: this.props.style,
      center: this.props.activeItem.center,
      zoom: this.props.activeItem.zoom
    })

    window.addEventListener('resize', ::this.onResize)
  }

  componentWillUnmount () {
    this.map.remove()
    window.removeEventListener('resize', ::this.onResize)
  }

  componentWillUpdate (nextProps) {
    if (nextProps.activeItem.key !== this.activeItem.key) {
      this.transitionToStage(nextProps.activeItem)
    }
  }

  onResize () {
    this.map.resize()
  }

  isPartOfStage (currentStageName, nextStageName) {
    let mainStage = currentStageName.split('-')[0]
    let newMainStage = nextStageName.split('-')[0]
    log('transition from %s to %s', mainStage, newMainStage)
    return mainStage === newMainStage
  }

  transitionClasses (currentStage, nextStage) {
    // If we are part of the same stage
    // 1) only remove the detailed stage class from our map
    if (this.isPartOfStage(currentStage.key, nextStage.key)) {
      if (this.map.hasClass(currentStage.key)) {
        this.map.removeClass(currentStage.key)
      }
    } else {
      // If we aren't part of the same stage:
      // 1) Remove any previous detailed stage class
      // 2) Remove the previous main stage class
      // 3) Add our new main stage
      let parts = currentStage.split('-')
      this.map.removeClass(parts[0])
      if (parts[1]) {
        this.map.removeClass(parts[1])
      }
      this.map.addClass(nextStage.split('-')[0])
    }

    // If our map doesn't have our detailed stage name:
    // 1) Add that classname
    if (!this.map.hasClass(nextStage.key)) {
      this.map.addClass(nextStage.key)
    }
  }

  transitionToStage (oldStage, nextStage) {
    log('transition to stage %o', nextStage)
    this.transitionClasses(oldStage, nextStage)
    let { center, zoom, transition } = nextStage

    // TODO: make a default transition option, and handle
    // non-animated transitions
    if (transition) {
      this.map.flyTo(center, zoom, 0, transition.options)
      return
    }
  }

  render () {
    return (
      <div className='Mapbox' />
    )
  }

}
