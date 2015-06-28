import React, {Component} from 'react';

export default class NewDoc extends Component {

  static displayName = 'NewDoc'

  constructor (props) {
    super(props);
    this.state = {
      value: {
        name: 'ben',
        surname: 'superman'
      },
      error: null
    };
  }

  onSubmit (e) {

  }

  onChange (value) {
    this.setState({value});
  }

  render () {

    return (
      <div/>
    );
  }
}
