import React, {Component, PropTypes} from 'react';
import NewDoc from '../ui-NewDoc';

export default class Admin extends Component {

  static propTypes = {
    flux: PropTypes.object
  }

  static contextTypes = {
    router: PropTypes.func
  }

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className='Admin'>
        Admin section
        <a href='/auth/logout' onClick={this.logout.bind(this)}>Logout</a>
        <NewDoc {...this.props} />
      </div>
    );
  }

  async logout (e) {
    e.preventDefault();
    const { flux } = this.props;
    const { router } = this.context;
    try {
      await flux.getActions('users').logout();
      router.replaceWith('/');
    } catch(err) {
      this.setState({ error: 'Error logging out' });
    }
  }
}
