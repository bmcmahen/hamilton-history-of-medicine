import React, {PropTypes} from 'react'
import debug from 'debug'
import Waypoint from 'react-waypoint'
import Container from '../ui-Container'
import Detail from '../ui-Detail'
import ListView from './ListView'
import ImageSwap from './ImageSwap'
import MapSection from './MapSection'
import {Navigation} from 'react-router'
import Mapbox from './Mapbox'
import {
  updatePage,
  updateTOC,
  removeTOC,
  showTOC,
  lockTOC,
  showTOCBackdrop
} from '../../state/actions/layout'
import stages from './stages/public-health'

// define our logger
const log = debug('app:ui-Map')

if (__CLIENT__) {
  require('./index.css')
}

// require media
let image1 = require('./image1.jpg')
let image2 = require('./image2.jpg')
let image3 = require('./image3.jpg')
let image4 = require('./image4.jpg')
let image5 = require('./image5.jpg')

// our server-side rendered require statements
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

function isDetailStage (name) {
  return ~name.indexOf('-')
}

// get a particular stage
function getStage (name) {
  if (isDetailStage(name)) {
    let parts = name.split('-')
    return stages[parts[0]].children[name]
  }
  return stages[name]
}

export default React.createClass({

  displayName: 'Map',

  mixins: [Navigation],

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
      isOpen: false,
      activeItem: getStage('stage0')
    }
  },

  componentWillReceiveProps (nextProps) {
    if (nextProps.params && nextProps.params.id) {
      this.setState({ isOpen: true })
    } else {
      this.setState({ isOpen: false })
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
    this.componentWillReceiveProps(this.props)
  },

  componentWillUnmount () {
    this.context.redux.dispatch(removeTOC())
  },

  renderMap () {
    return (
      <div className='Map'>
        <div className='Map__text-content'>
          <div className='Map__main-heading' style={{backgroundImage: `url(${image1})`}}>
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
            keyname='stage1'
            title='Hospitals'
            style={{ opacity: this.state.isOpen ? 0 : 1 }}
            onEnter={this.onSectionEnter}
            type='light'>
              <p>Mollit excepteur consectetur exercitation qui sint elit sint est amet ullamco.</p>
              <ListView
                activeKey={this.state.activeItem.key}
                onItemSelect={this.onItemSelect}
                listItems={
                  [{
                    src: image1,
                    label: 'University Hospital',
                    href: '/map/a',
                    key: 'stage1-0'
                  }, {
                    src: image2,
                    label: 'Downtown Hospital',
                    href: '/map/b',
                    key: 'stage1-1'
                  }, {
                    src: image3,
                    href: '/map/c',
                    label: 'St. Mary Hospital',
                    key: 'stage1-2'
                  }, {
                    src: image1,
                    label: 'University Hospital',
                    href: '/map/d',
                    key: 'stage1-3'
                  }, {
                    src: image2,
                    label: 'Downtown Hospital',
                    href: '/map/e',
                    key: 'stage1-4'
                  }, {
                    src: image3,
                    label: 'St. Mary Hospital',
                    href: '/map/f',
                    key: 'stage1-5'
                  }]
                }
              />
          </MapSection>

          <MapSection
            title='Water and the Environment'
            keyname='stage2'
            onEnter={this.onSectionEnter}>
              <p>Consequat pariatur proident cillum nisi sunt nulla irure proident nulla commodo anim cupidatat.</p>
              <p>Anim non sit ex labore officia enim proident occaecat sunt. Esse nisi do eu magna qui commodo exercitation labore esse culpa occaecat deserunt reprehenderit. Dolore aliqua id elit deserunt consequat. Ad excepteur adipisicing ullamco laboris esse occaecat anim tempor deserunt pariatur eiusmod exercitation. Mollit officia veniam laboris tempor aliqua aliqua velit ipsum quis ea ipsum. Nulla amet occaecat incididunt et labore sit laboris.
              Id laborum incididunt veniam do pariatur duis magna nulla reprehenderit nisi exercitation cupidatat culpa ipsum. Proident sit occaecat fugiat anim do ex ad. Ipsum anim eu ullamco consectetur occaecat labore est in qui enim. Ut anim sint est occaecat anim irure quis voluptate aute minim consequat duis id. Magna deserunt qui quis esse dolore.
              Veniam magna do ullamco voluptate in.</p>
          </MapSection>

          <ImageSwap
            style={{marginTop: '40px'}}
            beforeImage={image4}
            afterImage={image5}
            caption='Consequat pariatur proident cillum nisi sunt nulla irure proident nulla commodo anim cupidatat.'
          />

          <ImageSwap
            beforeImage={image3}
            afterImage={image2}
            caption='Id laborum incididunt veniam do pariatur duis magna nulla reprehenderit nisi exercitation cupidatat culpa ipsum. Proident sit occaecat fugiat anim do ex ad. Ipsum anim eu ullamco consectetur occaecat labore est in qui enim. Ut anim sint est occaecat anim irure quis voluptate aute minim consequat duis id. Magna deserunt qui quis esse dolore.'
          />
        </div>
        <Mapbox activeItem={this.state.activeItem} />
      </div>
    )
  },

  showTableOfContents () {
    this.context.redux.dispatch(lockTOC(true))
    this.context.redux.dispatch(showTOC(true))
    this.context.redux.dispatch(showTOCBackdrop(false))
  },

  onLeaveHeader () {
    this.context.redux.dispatch(lockTOC(false))
    this.context.redux.dispatch(showTOC(false))
    this.context.redux.dispatch(showTOCBackdrop(true))
  },

  onItemSelect (item) {
    log('selected item %o', item)
    this.setState({
      activeItem: getStage(item.key)
    })
  },

  onSectionEnter (name) {
    log('entered section %s', name)
    this.setState({ activeItem: getStage(name) })
  },

  showDetail () {
    this.setState({ isOpen: true })
  },

  renderDetail () {
    return (
      <Detail params={this.props.params} />
    )
  },

  onRequestClose () {
    let current = this.state.activeItem
    let state = { isOpen: false }
    // potentially zoom our stage to the  main stage
    if (current && isDetailStage(current.key)) {
      state.activeItem = getStage(current.key.split('-')[0])
    }
    this.replaceWith('/map')
    this.setState(state)
  }

})
