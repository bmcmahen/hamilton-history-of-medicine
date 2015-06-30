import React, {PropTypes} from 'react'
import debug from 'debug'
import Waypoint from 'react-waypoint'
import Container from '../ui-Container'
import Detail from '../ui-Detail'
import {updatePage, updateTOC, removeTOC} from '../../state/actions/layout'

const log = debug('app:ui-Map')

if (__CLIENT__) {
  require('./index.css')
}

function updatePageName (redux) {
  return new Promise(resolve => {
    redux.dispatch(updatePage('Map'))
    redux.dispatch(updateTOC(0, [
      'Introduction', 'Hospitals', 'Graveyards'
    ]))
    resolve()
  })
}


export default React.createClass({

  displayName: 'Map',

  contextTypes: {
    redux: PropTypes.object
  },

  statics: {

    fetchData (redux) {
      return updatePageName(redux)
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
        main={this.renderMap()}
        detail={this.renderDetail()}
        onRequestOpen={this.onRequestOpen}
        onRequestClose={this.onRequestClose}
        isOpen={this.state.isOpen}
      />
    )
  },

  componentDidMount () {

    // ensure that we have set the name correctly
    updatePageName(this.context.redux)

    let el = React.findDOMNode(this.refs.map)

    mapboxgl.accessToken = 'pk.eyJ1IjoiYm1jbWFoZW4iLCJhIjoiMmI0ZDVmZDI3YjFlM2ZiYTVmZDQ2MjBhMGQxNTMyNzgifQ.l_MuF4H2l44qpbN8NP9WEw'

    this.map = new mapboxgl.Map({
      container: el,
      interactive: false,
      style: 'https://www.mapbox.com/mapbox-gl-styles/styles/light-v7.json',
      center: [40, -74.50], // starting position
      zoom: 9
    })

    // resize our map when the window is resized
    window.addEventListener('resize', this.onResize)

  },

  componentWillUnmount () {
    this.map.remove()
    window.removeEventListener('resize', this.onResize)
    this.context.redux.dispatch(removeTOC())
  },

  onResize () {
    this.map.resize()
  },

  renderMap () {
    return (
      <div className='Map'>
      <div className='Map__text-content'>
        <div className='Map__main-heading'>
          <div className='Map__section Map__section--dark'>
            <h2>Hamilton, Ontario</h2>
            <p>Consequat pariatur proident cillum nisi sunt nulla irure proident nulla commodo anim cupidatat.</p>
            <p>Anim non sit ex labore officia enim proident occaecat sunt. Esse nisi do eu magna qui commodo exercitation labore esse culpa occaecat deserunt reprehenderit. Dolore aliqua id elit deserunt consequat. Ad excepteur adipisicing ullamco laboris esse occaecat anim tempor deserunt pariatur eiusmod exercitation. Mollit officia veniam laboris tempor aliqua aliqua velit ipsum quis ea ipsum. Nulla amet occaecat incididunt et labore sit laboris.
            Id laborum incididunt veniam do pariatur duis magna nulla reprehenderit nisi exercitation cupidatat culpa ipsum. Proident sit occaecat fugiat anim do ex ad. Ipsum anim eu ullamco consectetur occaecat labore est in qui enim. Ut anim sint est occaecat anim irure quis voluptate aute minim consequat duis id. Magna deserunt qui quis esse dolore.
            Veniam magna do ullamco voluptate in.</p>
          </div>
        </div>

        <div className='Map__section-container'>
          <div className='Map__section Map__section--white'>
            <h2>Hospitals</h2>
            <Waypoint
              onEnter={this.onEnter.bind(this, 'hospital')}
            />
            <p>Mollit excepteur consectetur exercitation qui sint elit sint est amet ullamco.</p>
            <ul className='Map__poi-list'>
              <li className={this.isChildActive('stage1-0')} onClick={this.showDetail}>
                <div>
                  <img src='https://static.pexels.com/photos/4403/black-and-white-building-roof-architecture-large.jpg' />
                </div>
                <div className='Map__poi-meta'>
                  <h4>University Hospital</h4>
                </div>
              </li>
              <li className={this.isChildActive('stage1-1')} onClick={this.showDetail.bind(this, 'stage1-1')}>
                <div>
                  <img src='https://static.pexels.com/photos/378/black-and-white-city-building-house.jpg'/>
                </div>
                <div className='Map__poi-meta'>
                  <h4>Downtown Hospital</h4>
                </div>
              </li>
              <li className={this.isChildActive('stage1-2')} onClick={this.showDetail.bind(this, 'stage1-2')}>
                <div>
                  <img src='https://static.pexels.com/photos/814/building-house-high-rise-hdr-large.jpg' />
                </div>
                <div className='Map__poi-meta'>
                  <h4>St. Mary Hospital</h4>
                </div>
              </li>
              <li className={this.isChildActive('stage1-0')} onClick={this.showDetail}>
                <div>
                  <img src='https://static.pexels.com/photos/4403/black-and-white-building-roof-architecture-large.jpg' />
                </div>
                <div className='Map__poi-meta'>
                  <h4>University Hospital</h4>
                </div>
              </li>
              <li className={this.isChildActive('stage1-1')} onClick={this.showDetail.bind(this, 'stage1-1')}>
                <div>
                  <img src='https://static.pexels.com/photos/378/black-and-white-city-building-house.jpg'/>
                </div>
                <div className='Map__poi-meta'>
                  <h4>Downtown Hospital</h4>
                </div>
              </li>
              <li className={this.isChildActive('stage1-2')} onClick={this.showDetail.bind(this, 'stage1-2')}>
                <div>
                  <img src='https://static.pexels.com/photos/814/building-house-high-rise-hdr-large.jpg' />
                </div>
                <div className='Map__poi-meta'>
                  <h4>St. Mary Hospital</h4>
                </div>
              </li>
              <li className={this.isChildActive('stage1-0')} onClick={this.showDetail}>
                <div>
                  <img src='https://static.pexels.com/photos/4403/black-and-white-building-roof-architecture-large.jpg' />
                </div>
                <div className='Map__poi-meta'>
                  <h4>University Hospital</h4>
                </div>
              </li>
              <li className={this.isChildActive('stage1-1')} onClick={this.showDetail.bind(this, 'stage1-1')}>
                <div>
                  <img src='https://static.pexels.com/photos/378/black-and-white-city-building-house.jpg'/>
                </div>
                <div className='Map__poi-meta'>
                  <h4>Downtown Hospital</h4>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='Map__container' ref='map' />
      </div>
    )
  },

  isChildActive () {

  },

  showDetail () {
    this.setState({ isOpen: true })
  },

  // when entering a waypoint, update our state with the appropriate
  // stage name and remove our detailed stage
  onEnter (index) {
    log('on enter waypoint %s', index)
  },

  renderDetail () {
    return (
      <Detail />
    )
  },

  getStage () {

  },

  toggleDetailClasses () {

  },

  toggleMapClasses () {

  },


  // only use this to transition the stage -- not for detailed
  // transitions. This should also check if we have a detailed
  // transition, or not. If we do, we should remove it.
  transitionTo () {

  },

  onRequestClose () {
    this.setState({ isOpen: false })
  }

})
