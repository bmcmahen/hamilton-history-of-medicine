import Application from '../ui-Application'
import Home from '../ui-Home'
import Timeline from '../ui-Timeline'
import Map from '../ui-Map'

/**
 * Generate App UI Routes
 * @param  {Redux} redux
 * @return {Object}
 */

export default function generateRoutes () {

  return {
    path: '/',
    component: Application,
    indexRoute: {
      component: Home
    },
    childRoutes: [
      {
        path: '/timeline',
        component: Timeline
      },
      {
        path: '/timeline/:id',
        component: Timeline
      },
      {
        path: '/map',
        component: Map
      }
    ]
  }

}
