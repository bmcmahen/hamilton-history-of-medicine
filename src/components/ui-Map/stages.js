let symbolLayout = {
  'icon-image': '{marker-symbol}-12',
  'text-field': '{title}',
  'text-font': 'Open Sans Semibold, Arial Unicode MS Bold',
  'text-offset': [0, 0.6],
  'text-anchor': 'top'
}

export default {

  stage0: {
    name: 'stage0',
    target: [43.2543, -79.8472],
    zoom: 16,
    source: {
      type: 'geojson',
      data: {
        'type': 'FeatureCollection',
        'features': [{
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [-79.8472, 43.2543]
          },
          'properties': {
            'title': 'Hamilton, Ontario',
            'marker-symbol': 'monument'
          }
        }, {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [-78.8472, 42.2543]
          },
          'properties': {
            'title': 'Mapbox SF',
            'marker-symbol': 'harbor'
          }
        }]
      }
    },
    layer: {
      id: 'stage0',
      type: 'symbol',
      source: 'stage0',
      layout: symbolLayout,
      paint: {
        'text-size': 14,
        'text-opacity': 0
      },
      'paint.stage0': {
        'text-size': 14,
        'text-opacity': 1
      }
    }
  },

  stage1: {
    name: 'stage1',
    target: [43.2543, -79.8472],
    zoom: 11,
    children: {
      'stage1-0': {
        name: 'stage1-0',
        target: [43.2543, -79.84],
        zoom: 16
      },
      'stage1-1': {
        name: 'stage1-1',
        target: [43.28, -79.8],
        zoom: 16
      },
      'stage1-2': {
        name: 'stage1-2',
        target: [43.24, -79.83],
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
            'title': 'Something Building',
            'marker-symbol': 'monument'
          }
        }, {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [-79.8, 43.28]
          },
          'properties': {
            'title': 'Something Building 2',
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
            'title': 'Something Building 3',
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
        'text-opacity': 0
      },
      'paint.stage1': {
        'text-size': 14,
        'text-opacity': 1
      }
    }
  },

  stage2: {
    name: 'stage2',
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
    name: 'stage3',
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
