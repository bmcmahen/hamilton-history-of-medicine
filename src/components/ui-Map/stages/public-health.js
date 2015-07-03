let symbolLayout = {
  'icon-image': '{marker-symbol}-12',
  'text-field': '{title}',
  'text-font': 'Open Sans Semibold, Arial Unicode MS Bold',
  'text-offset': [0, 0.6],
  'text-anchor': 'top'
}

export default {

  stage0: {
    key: 'stage0',
    target: [43.2543, -79.8472],
    zoom: 16
  },

  stage1: {
    key: 'stage1',
    target: [43.2543, -79.7072],
    transition: {
      speed: 0.7
    },
    zoom: 11,
    children: {
      'stage1-0': {
        key: 'stage1-0',
        target: [43.2543, -79.84],
        transition: {
          speed: 0.7
        },
        zoom: 16
      },
      'stage1-1': {
        key: 'stage1-1',
        target: [43.28, -79.8],
        transition: {
          speed: 0.7
        },
        zoom: 16
      },
      'stage1-2': {
        key: 'stage1-2',
        target: [43.24, -79.83],
        transition: {
          speed: 0.7
        },
        zoom: 16
      }
    },
    source: {
      type: 'geojson',
      data: {
        'type': 'FeatureCollection',
        'features': [{
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [-79.84, 43.2543]
          },
          'properties': {
            'title': 'University Hospital',
            'marker-symbol': 'harbor'
          }
        }, {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [-79.8, 43.28]
          },
          'properties': {
            'title': 'Downtown Hospital',
            'marker-symbol': 'monument'
          }
        },
        {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [-79.83, 43.24]
          },
          'properties': {
            'title': 'St. Mary Hospital',
            'marker-symbol': 'monument'
          }
        }, {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [-79.84, 43.3543]
          },
          'properties': {
            'title': 'University Hospital',
            'marker-symbol': 'monument'
          }
        }, {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [-79.8, 43.58]
          },
          'properties': {
            'title': 'Downtown Hospital',
            'marker-symbol': 'monument'
          }
        },
        {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [-79.83, 43.54]
          },
          'properties': {
            'title': 'St. Mary Hospital',
            'marker-symbol': 'monument'
          }
        }]
      }
    },
    layer: {
      id: 'stage1',
      type: 'symbol',
      source: 'stage1',
      layout: symbolLayout,
      paint: {
        'text-size': 14,
        'text-opacity': 0,
        'text-color': '#3887be',
        'icon-color': '#08c',
        'icon-size': 1,
        'icon-translate': [0, 0],
        'icon-opacity': 0
      },
      'paint.stage1': {
        'text-size': 14,
        'text-opacity': 1,
        'icon-opacity': 1
      }
    }
  },

  stage2: {
    key: 'stage2',
    target: [43.1543, -79.8272],
    zoom: 13,
    transition: {
      type: 'fly',
      options: {
        speed: 0.9
      }
    }
  },

  stage3: {
    key: 'stage3',
    target: [44, -79],
    zoom: 13,
    transition: {
      type: 'fly',
      options: {
        speed: 0.6
      }
    }
  }

}
