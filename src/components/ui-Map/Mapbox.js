import React, {PropTypes} from 'react'
import debug from 'debug'
import mapStyles from './map-styles/light.json'
import stages from './stages/public-health'
import _ from 'lodash'

const log = debug('app:ui-Map:Map')

if (__CLIENT__) {
  require('./Mapbox.css')
}

export default class Mapbox extends React.Component {

  static propTypes = {
    interactive: PropTypes.bool,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    activeItem: PropTypes.object.isRequired,
    onKeyChange: PropTypes.func // potentially allow interactive map to emit events
  }

  static defaultProps = {
    interactive: false,
    style: mapStyles
  }

  constructor (props) {
    super(props)
  }

  componentDidMount () {
    let el = React.findDOMNode(this)
    mapboxgl.accessToken = 'pk.eyJ1IjoiYm1jbWFoZW4iLCJhIjoiMmI0ZDVmZDI3YjFlM2ZiYTVmZDQ2MjBhMGQxNTMyNzgifQ.l_MuF4H2l44qpbN8NP9WEw'
    let stage = this.props.activeItem

    this.map = new mapboxgl.Map({
      container: el,
      interactive: this.props.interactive,
      style: this.props.style,
      center: stage.target,
      zoom: stage.zoom
    })

    this.map.addClass('night')

    this.map.on('style.load', () => {
      _.each(stages, (s) => {
        if (s.source) this.map.addSource(s.key, s.source)
        if (s.layer) this.map.addLayer(s.layer)
      })
    })

    window.addEventListener('resize', ::this.onResize)
  }

  componentWillUnmount () {
    this.map.remove()
    window.removeEventListener('resize', ::this.onResize)
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.activeItem) {
      return
    }

    this.props.activeItem = this.props.activeItem || {}

    if (nextProps.activeItem.key !== this.props.activeItem.key) {
      this.transitionToStage(this.props.activeItem, nextProps.activeItem)
    }
  }

  shouldComponentUpdate () {
    return false
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
    if (
        this.isPartOfStage(currentStage.key, nextStage.key)
        && ~currentStage.key.indexOf('-')
      ) {
      if (this.map.hasClass(currentStage.key)) {
        log('remove class %s', currentStage.key)
        this.map.removeClass(currentStage.key)
      }
    } else {
      // If we aren't part of the same stage:
      // 1) Remove any previous detailed stage class
      // 2) Remove the previous main stage class
      // 3) Add our new main stage
      let parts = currentStage.key.split('-')
      log('remove class %s', parts[0])
      this.map.removeClass(parts[0])
      if (parts[1]) {
        log('remove detail class %s', parts[1])
        this.map.removeClass(parts[1])
      }
      log('add main stage class %s', nextStage.key.split('-')[0])
      this.map.addClass(nextStage.key.split('-')[0])
    }

    // If our map doesn't have our detailed stage name:
    // 1) Add that classname
    if (!this.map.hasClass(nextStage.key)) {
      log('add class %s', nextStage.key)
      this.map.addClass(nextStage.key)
    }
  }

  transitionToStage (oldStage, nextStage) {
    log('transition to stage %o', nextStage)
    this.transitionClasses(oldStage, nextStage)
    let { target, zoom, transition } = nextStage

    // TODO: make a default transition option, and handle
    // non-animated transitions
    if (transition) {
      this.map.flyTo({
        center: target,
        zoom: zoom,
        curve: 1,
        speed: transition.speed || 0.2
      })
      return
    }

    log('use default map fly transition')
    this.map.flyTo({
      center: target,
      zoom: zoom,
      curve: 1,
      speed: 0.2
    })
  }

  render () {
    return (
      <div className='Mapbox' />
    )
  }

}
