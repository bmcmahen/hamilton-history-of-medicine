import React, {PropTypes, Component} from 'react'
import {connect} from 'redux/react'
import debug from 'debug'
import {loadDoc} from '../../state/actions/docs'

const log = debug('app:ui-Detail')

if (__CLIENT__) {
  require('./index.css')
}

function fetchData (redux, params) {
  let { dispatch } = redux
  return dispatch(loadDoc(params.id))
}

@connect(state => ({
  docs: state.docs
}))

export default class Detail extends Component {

  static propTypes = {
    onRequestClose: PropTypes.func
  }

  static contextTypes = {
    redux: PropTypes.object
  }

  static fetchData (redux, params) {
    if (params.id) {
      return fetchData(redux, params)
    }
  }

  componentWillReceiveProps (nextProps) {
    log('reci9eving props %o', nextProps)
    let {params} = nextProps
    if (params && params.id) {
      if (this.props.params && this.props.params.id) {
        if (this.props.params.id !== params.id) {
          fetchData(this.context.redux, nextProps.params)
        }
      } else {
        fetchData(this.context.redux, nextProps.params)
      }
    }

    if (params.id) {
      this.setState({ activeId: params.id })
    }
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    let activeDoc = this.props.docs.get(this.state.activeId)
    var content; //eslint-disable-line

    if (!activeDoc || activeDoc.get('loading')) {
      content = (
        <div className='Loading'>
          Loading...
        </div>
      )
    } else {
      let cover = {
        backgroundImage: 'url(https://static.pexels.com/photos/6547/sky-night-space-galaxy-large.jpeg)'
      }

      content = (
        <div>
          <div className='Detail__cover-image' style={cover} />
          <div className='Detail__content'>
            <h2>{activeDoc.get('title')}</h2>
            <p>{activeDoc.get('content')}</p>
            <ul className='Detail__reference'>
              <h3>Resources</h3>
              <li>
                <p>Ball, N. & Wolbring, G. (2013). Portrayals of and Arguments around different Eugenic Practices: Past and Present. International Journal of Disability, Community & Rehabilitation, 12 (2), Article 2.</p>
              </li>
              <li>
                <p>Barham, J. C. (1989). Education the Deaf Culture. Journal of the British Association of Teachers of the Deaf, 13(4), 110-113.</p>
              </li>
            </ul>
          </div>
        </div>
      )
    }

    return (
      <article className='Detail'>
        {content}
      </article>
    )


  }
}
