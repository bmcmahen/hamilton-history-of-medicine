import React from 'react'
import Container from '../ui-Container'
import stages from './stages'
import debug from 'debug'
import Waypoint from 'react-waypoint'
import _ from 'lodash'

const log = debug('app:ui-Map')

if (__CLIENT__) {
  require('./index.css')
}

export default React.createClass({

  displayName: 'Map',

  statics: {
    
  },

  componentWillUpdate (nextProps, nextState) {
    if (!this.map) return

    // transition the main stage
    if (nextState.stage !== this.state.stage) {
      this.toggleMapClasses(nextState.stage)
      this.transitionTo(nextState.stage)

      // transition from a detailed stage, to a non-detailed
      // stage; i.e., remove the detailed stage className
      if (nextState.detailedStage != null) {
        this.map.removeClass(nextState.detailedStage)
      }

    }

    // transition detail stage if we have a detailed stage,
    // and if that detailed stage doesn't equal the previous one
    if (nextState.detailedStage
      && (nextState.detailedStage !== this.state.detailedStage)) {
      this.transitionTo(nextState.detailedStage)
      this.toggleDetailClasses(nextState.detailedStage)
    }

  },

  getInitialState () {
    return {
      stage: 'stage0',  // key of the first stage to show
      detailedStage: null
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
    let el = React.findDOMNode(this.refs.map)

    mapboxgl.accessToken = 'pk.eyJ1IjoiYm1jbWFoZW4iLCJhIjoiMmI0ZDVmZDI3YjFlM2ZiYTVmZDQ2MjBhMGQxNTMyNzgifQ.l_MuF4H2l44qpbN8NP9WEw'

    let initialStage = this.getStage(this.state.stage)

    this.map = new mapboxgl.Map({
      container: el,
      interactive: false,
      style: require('./map-style.json'),
      center: initialStage.target,
      zoom: initialStage.zoom
    })

    this.map.addClass('stage0')

    this.map.on('style.load', () => {

      _.each(stages, stage => {
        this.map.addSource(stage.name, stage.source)
        this.map.addLayer(stage.layer)
      })

    })

    // resize our map when the window is resized
    window.addEventListener('resize', this.onResize)

  },

  componentWillUnmount () {
    this.map.remove()
    window.removeEventListener('resize', this.onResize)
  },

  onResize () {
    this.map.resize()
  },

  renderMap () {
    return (
      <div className='Map'>

        <div className='Map__container' ref='map' />
        <div className='Map__detail'>
          <Waypoint
            onEnter={this.onEnter.bind(this, 'stage0')}
          />
          <img className='Map__header' src='https://static.pexels.com/photos/6561/city-cars-people-street-large.jpeg'/>
          <div className='Map__section'>
            <h2>Hamilton, Ontario</h2>
            <p>Consequat pariatur proident cillum nisi sunt nulla irure proident nulla commodo anim cupidatat.</p>
            <p>Anim non sit ex labore officia enim proident occaecat sunt. Esse nisi do eu magna qui commodo exercitation labore esse culpa occaecat deserunt reprehenderit. Dolore aliqua id elit deserunt consequat. Ad excepteur adipisicing ullamco laboris esse occaecat anim tempor deserunt pariatur eiusmod exercitation. Mollit officia veniam laboris tempor aliqua aliqua velit ipsum quis ea ipsum. Nulla amet occaecat incididunt et labore sit laboris.
            Id laborum incididunt veniam do pariatur duis magna nulla reprehenderit nisi exercitation cupidatat culpa ipsum. Proident sit occaecat fugiat anim do ex ad. Ipsum anim eu ullamco consectetur occaecat labore est in qui enim. Ut anim sint est occaecat anim irure quis voluptate aute minim consequat duis id. Magna deserunt qui quis esse dolore.
            Veniam magna do ullamco voluptate in.</p>
            <figure>
              <img className='Map__image-center' src='https://static.pexels.com/photos/6457/city-water-drops-fountain.jpg' />
              <p className='Map__image-caption'>
                Cillum occaecat commodo aliqua ullamco est qui aute aliqua pariatur tempor aliquip do laborum.
              </p>
            </figure>
            <p>Laborum in non incididunt in nulla eiusmod laboris. Consequat ut culpa proident ad enim nostrud qui et adipisicing sunt. Officia eu magna id labore consequat ut exercitation deserunt fugiat pariatur eiusmod exercitation velit. Irure qui minim eiusmod est dolor cillum amet. Nulla pariatur in nisi est fugiat aliquip ad commodo. Ut tempor nostrud pariatur Lorem Lorem mollit tempor cillum duis velit non ullamco. Nostrud pariatur quis est tempor irure excepteur esse veniam ea adipisicing.
            Et mollit ullamco laborum est reprehenderit amet esse cillum amet laboris nostrud veniam proident. Aute aute labore officia nostrud in. Aute nostrud velit qui ex do ad reprehenderit minim. Ullamco dolore officia sunt tempor sit non mollit id ullamco amet adipisicing mollit.
            </p>
            <p>Adipisicing incididunt Lorem est dolor et minim laboris nostrud commodo ullamco mollit aliqua ullamco dolore.</p>
          </div>

          <div className='Map__section' style={{backgroundColor: '#3bb2d0'}}>
            <h2>A List of Buildings</h2>
            <Waypoint
              onEnter={this.onEnter.bind(this, 'stage1')}
            />
            <p>Mollit excepteur consectetur exercitation qui sint elit sint est amet ullamco.</p>
            <p>Duis et officia sit laborum exercitation. Amet dolor ea cillum eu non nostrud aliqua ex. Pariatur irure minim cupidatat duis cillum reprehenderit duis dolore dolor. Id deserunt sit eu enim anim aute. Reprehenderit nostrud proident consectetur veniam tempor. Tempor ea occaecat nulla anim exercitation amet occaecat laboris non enim.</p>
            <ul className='Map__poi-list'>
              <li className={this.isChildActive('stage1-0')} onClick={this.showDetail.bind(this, 'stage1-0')}>
                <div>
                  <img src='https://static.pexels.com/photos/4403/black-and-white-building-roof-architecture-large.jpg' />
                </div>
                <div className='Map__poi-meta'>
                  <h4>Something Building</h4>
                </div>
              </li>
              <li className={this.isChildActive('stage1-1')} onClick={this.showDetail.bind(this, 'stage1-1')}>
                <div>
                  <img src='https://static.pexels.com/photos/378/black-and-white-city-building-house.jpg'/>
                </div>
                <div className='Map__poi-meta'>
                  <h4>Somethinb Building 2</h4>
                </div>
              </li>
              <li className={this.isChildActive('stage1-2')} onClick={this.showDetail.bind(this, 'stage1-2')}>
                <div>
                  <img src='https://static.pexels.com/photos/814/building-house-high-rise-hdr-large.jpg' />
                </div>
                <div className='Map__poi-meta'>
                  <h4>Something Building 3</h4>
                </div>
              </li>
            </ul>
            <p>Irure cillum mollit adipisicing Lorem do amet irure cupidatat dolor ipsum.</p>
          </div>

          <img className='Map__header' src='https://static.pexels.com/photos/6549/food-vacation-boats-lunch.jpg' />
          <div className='Map__section' style={{backgroundColor: '#ed6498'}}>
            <h2>Point of Interest 2</h2>
            <Waypoint
              onEnter={this.onEnter.bind(this, 'stage2')}
            />
            <p>Mollit excepteur consectetur exercitation qui sint elit sint est amet ullamco.</p>
            <p>Duis et officia sit laborum exercitation. Amet dolor ea cillum eu non nostrud aliqua ex. Pariatur irure minim cupidatat duis cillum reprehenderit duis dolore dolor. Id deserunt sit eu enim anim aute. Reprehenderit nostrud proident consectetur veniam tempor. Tempor ea occaecat nulla anim exercitation amet occaecat laboris non enim.</p>
            <p>Eiusmod ea ex et elit labore excepteur non. Laborum exercitation pariatur sunt excepteur ullamco voluptate incididunt laborum. Commodo aute dolor elit incididunt voluptate labore exercitation Lorem incididunt. Lorem Lorem laborum ullamco adipisicing ipsum aliquip mollit adipisicing voluptate dolor do do officia. Non ullamco Lorem velit est nisi sunt exercitation culpa. Dolore aute fugiat voluptate consectetur enim consequat sunt sunt dolor nisi ullamco velit pariatur excepteur. Cupidatat et exercitation sint duis voluptate laborum aliquip enim tempor.</p>
            <p>Nisi laboris tempor excepteur non irure voluptate eiusmod commodo qui reprehenderit est Lorem in nisi.</p>
          </div>

          <img className='Map__header' src='https://static.pexels.com/photos/6546/sky-night-space-trees-large.jpeg' />
          <div className='Map__section'>
            <h2>Another Subheading</h2>
            <Waypoint
              onEnter={this.onEnter.bind(this, 'stage3')}
            />
            <p>Duis et officia sit laborum exercitation. Amet dolor ea cillum eu non nostrud aliqua ex. Pariatur irure minim cupidatat duis cillum reprehenderit duis dolore dolor. Id deserunt sit eu enim anim aute. Reprehenderit nostrud proident consectetur veniam tempor. Tempor ea occaecat nulla anim exercitation amet occaecat laboris non enim.</p>
            <p>Eiusmod ea ex et elit labore excepteur non. Laborum exercitation pariatur sunt excepteur ullamco voluptate incididunt laborum. Commodo aute dolor elit incididunt voluptate labore exercitation Lorem incididunt. Lorem Lorem laborum ullamco adipisicing ipsum aliquip mollit adipisicing voluptate dolor do do officia. Non ullamco Lorem velit est nisi sunt exercitation culpa. Dolore aute fugiat voluptate consectetur enim consequat sunt sunt dolor nisi ullamco velit pariatur excepteur. Cupidatat et exercitation sint duis voluptate laborum aliquip enim tempor.</p>
            <p>Nisi laboris tempor excepteur non irure voluptate eiusmod commodo qui reprehenderit est Lorem in nisi.</p>
            <p>Mollit excepteur consectetur exercitation qui sint elit sint est amet ullamco.</p>
          </div>

        </div>
      </div>
    )
  },

  isChildActive (stage) {
    return stage === this.state.detailedStage
      ? 'Map--active-child'
      : null
  },

  showDetail (name) {
    let mainStage = name.split('-')[0]
    let newState = {}
    if (this.state.stage !== mainStage) {
      newState.stage = mainStage
    }

    newState.detailedStage = name
    this.setState(newState)
  },

  // when entering a waypoint, update our state with the appropriate
  // stage name and remove our detailed stage
  onEnter (index) {
    log('on enter waypoint %s', index)
    this.setState({ stage: index, detailedStage: null })
  },

  renderDetail () {
    return null
  },

  getStage (i) {
    let parts = i.split('-')

    // return main stage if 'stage1'
    if (parts.length === 1) {
      return stages[i]
    }

    // return the child if 'stage1-1'
    return stages[parts[0]].children[i]
  },

  toggleDetailClasses (nextDetailName) {

    if (this.state.detailedStage != null) {
      let oldStage = this.state.detailedStage
      if (this.map.hasClass(oldStage)) {
        this.map.removeClass(oldStage)
      }

      this.map.addClass(nextDetailName)
    }
  },

  toggleMapClasses (nextStageName) {

    // update our map stage class to deal with transitions
    if (this.state.stage != null) {
      let oldStage = this.state.stage
      if (this.map.hasClass(oldStage)) {
        log('remove class %s', oldStage)
        this.map.removeClass(oldStage)
      }

      log('add class %s', nextStageName)
      this.map.addClass(nextStageName)
    }
  },


  // only use this to transition the stage -- not for detailed
  // transitions. This should also check if we have a detailed
  // transition, or not. If we do, we should remove it.
  transitionTo (i) {
    if (!this.map) return
    let stage = this.getStage(i)
    let {target, zoom, transition} = stage

    log('transition to stage %o', stage)

    // actually make the animated transition
    if (transition) {
      if (transition.type === 'fly') {
        this.map.flyTo(target, zoom, 0, transition.options)
        return
      }
    } else {
      this.map.flyTo(target, zoom, 0, {
        speed: 0.6
      })
    }

  }

})
