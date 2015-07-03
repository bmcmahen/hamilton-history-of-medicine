import React, {PropTypes} from 'react'
import debug from 'debug'
import Waypoint from 'react-waypoint'
import Container from '../ui-Container'
import Detail from '../ui-Detail'
import ListView from './ListView'
import ImageSwap from './ImageSwap'
import MapSection from './MapSection'
import Mapbox from './Mapbox'
import {
  updatePage,
  updateTOC,
  removeTOC,
  showTOC,
  lockTOC,
  showTOCBackdrop
} from '../../state/actions/layout'

const log = debug('app:ui-Map')

if (__CLIENT__) {
  require('./index.css')
}

function updatePageName (redux) {
  let { dispatch } = redux
  return new Promise(resolve => {
    dispatch(updatePage('Public Health'))
    dispatch(updateTOC([
      'Hospitals, Doctors and Nurses',
      'Death and Graveyards',
      'Crime and Punishment',
      'Fire and Disasters',
      'Water and the Environment',
      'Industry and Work'
    ]))
    dispatch(showTOC(true))
    dispatch(lockTOC(true))
    dispatch(showTOCBackdrop(false))
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
  },

  componentWillUnmount () {
    this.context.redux.dispatch(removeTOC())
  },

  renderMap () {
    return (
      <div className='Map'>
        <div className='Map__text-content'>
          <div className='Map__main-heading'>
            <div className='Map__section Map__section--dark'>
              <Waypoint onLeave={this.onLeaveHeader} onEnter={this.showTableOfContents} />
              <h2>Public Health in Hamilton</h2>
              <p>Consequat pariatur proident cillum nisi sunt nulla irure proident nulla commodo anim cupidatat.</p>
              <p>Anim non sit ex labore officia enim proident occaecat sunt. Esse nisi do eu magna qui commodo exercitation labore esse culpa occaecat deserunt reprehenderit. Dolore aliqua id elit deserunt consequat. Ad excepteur adipisicing ullamco laboris esse occaecat anim tempor deserunt pariatur eiusmod exercitation. Mollit officia veniam laboris tempor aliqua aliqua velit ipsum quis ea ipsum. Nulla amet occaecat incididunt et labore sit laboris.
              Id laborum incididunt veniam do pariatur duis magna nulla reprehenderit nisi exercitation cupidatat culpa ipsum. Proident sit occaecat fugiat anim do ex ad. Ipsum anim eu ullamco consectetur occaecat labore est in qui enim. Ut anim sint est occaecat anim irure quis voluptate aute minim consequat duis id. Magna deserunt qui quis esse dolore.
              Veniam magna do ullamco voluptate in.</p>
            </div>
          </div>

          <MapSection
            key='stage1'
            title='Hospitals'
            onEnter={this.onSectionEnter}
            type='light'>
              <p>Mollit excepteur consectetur exercitation qui sint elit sint est amet ullamco.</p>
              <ListView
                activeKey='stage1'
                onItemSelect={this.onItemSelect}
                listItems={
                  [{
                    src: 'https://static.pexels.com/photos/4403/black-and-white-building-roof-architecture-large.jpg',
                    label: 'University Hospital',
                    key: 'stage1-0'
                  }, {
                    src: 'https://static.pexels.com/photos/378/black-and-white-city-building-house.jpg',
                    label: 'Downtown Hospital',
                    key: 'stage1-1'
                  }, {
                    src: 'https://static.pexels.com/photos/814/building-house-high-rise-hdr-large.jpg',
                    label: 'St. Mary Hospital',
                    key: 'stage1-2'
                  }, {
                    src: 'https://static.pexels.com/photos/4403/black-and-white-building-roof-architecture-large.jpg',
                    label: 'University Hospital',
                    key: 'stage1-3'
                  }, {
                    src: 'https://static.pexels.com/photos/378/black-and-white-city-building-house.jpg',
                    label: 'Downtown Hospital',
                    key: 'stage1-4'
                  }, {
                    src: 'https://static.pexels.com/photos/814/building-house-high-rise-hdr-large.jpg',
                    label: 'St. Mary Hospital',
                    key: 'stage1-5'
                  }]
                }
              />
          </MapSection>

          <MapSection title='Sewers and Garbage' onEnter={this.onSectionEnter}>
            <p>Consequat pariatur proident cillum nisi sunt nulla irure proident nulla commodo anim cupidatat.</p>
            <p>Anim non sit ex labore officia enim proident occaecat sunt. Esse nisi do eu magna qui commodo exercitation labore esse culpa occaecat deserunt reprehenderit. Dolore aliqua id elit deserunt consequat. Ad excepteur adipisicing ullamco laboris esse occaecat anim tempor deserunt pariatur eiusmod exercitation. Mollit officia veniam laboris tempor aliqua aliqua velit ipsum quis ea ipsum. Nulla amet occaecat incididunt et labore sit laboris.
            Id laborum incididunt veniam do pariatur duis magna nulla reprehenderit nisi exercitation cupidatat culpa ipsum. Proident sit occaecat fugiat anim do ex ad. Ipsum anim eu ullamco consectetur occaecat labore est in qui enim. Ut anim sint est occaecat anim irure quis voluptate aute minim consequat duis id. Magna deserunt qui quis esse dolore.
            Veniam magna do ullamco voluptate in.</p>
          </MapSection>

          <ImageSwap
            style={{marginTop: '40px'}}
            beforeImage='https://static.pexels.com/photos/378/black-and-white-city-building-house.jpg'
            afterImage='https://static.pexels.com/photos/814/building-house-high-rise-hdr-large.jpg'
            caption='Consequat pariatur proident cillum nisi sunt nulla irure proident nulla commodo anim cupidatat.'
          />

          <ImageSwap
            beforeImage='https://static.pexels.com/photos/2255/black-and-white-city-houses-skyline-large.jpg'
            afterImage='https://static.pexels.com/photos/1188/city-landmark-lights-night-large.jpg'
            caption='Id laborum incididunt veniam do pariatur duis magna nulla reprehenderit nisi exercitation cupidatat culpa ipsum. Proident sit occaecat fugiat anim do ex ad. Ipsum anim eu ullamco consectetur occaecat labore est in qui enim. Ut anim sint est occaecat anim irure quis voluptate aute minim consequat duis id. Magna deserunt qui quis esse dolore.'
          />
        </div>
        <Mapbox />
      </div>
    )
  },

  showTableOfContents () {
    this.context.redux.dispatch(lockTOC(true))
    this.context.redux.dispatch(showTOC(true))
  },

  onLeaveHeader () {
    this.context.redux.dispatch(lockTOC(false))
    this.context.redux.dispatch(showTOC(false))
  },

  onItemSelect (item) {
    log('selected item %o', item)
    this.setState({ isOpen: true })
  },

  onSectionEnter (name) {
    log('entered section %s', name)
  },

  showDetail () {
    this.setState({ isOpen: true })
  },

  renderDetail () {
    return (
      <Detail />
    )
  },

  onRequestClose () {
    this.setState({ isOpen: false })
  }

})
