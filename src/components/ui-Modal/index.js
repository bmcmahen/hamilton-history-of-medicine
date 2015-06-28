import React, {Component, PropTypes} from 'react'
import Modal from 'react-modal'

if (__CLIENT__) {
  require('./index.css')
}

if (__CLIENT__) {
  Modal.setAppElement(document.getElementById('component-playground'))
}

export default Modal
