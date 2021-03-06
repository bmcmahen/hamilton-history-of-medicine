import React, {PropTypes} from 'react'
import classNames from 'classnames'
import {Link} from 'react-router'

if (__CLIENT__) {
  require('./ListView.css')
}

export default class MapListView extends React.Component {

  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    listItems: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired
    })).isRequired,
    onItemSelect: PropTypes.func.isRequired,
    activeKey: PropTypes.string
  }

  constructor (props) {
    super(props)
  }

  render () {

    const classes = classNames({
      'MapListView': true,
      [this.props.className]: !!this.props.className
    })

    return (
      <ul className={classes} style={this.props.style}>
        {this.props.listItems.map(::this.renderItem)}
      </ul>
    )
  }

  renderItem (item, i) {
    const classes = classNames({
      'MapListView__active': item.key === this.props.activeKey
    })
    return (
      <li className={classes} key={item.key}>
        <Link to={item.href} onClick={this.selectItem.bind(this, item, i)}>
          <img src={item.src} alt={item.label} />
          <div className='MapListView__item-meta'>
            {item.label}
          </div>
        </Link>
      </li>
    )
  }

  selectItem (item, i, e) {
    this.props.onItemSelect(item, i, e)
  }

}
