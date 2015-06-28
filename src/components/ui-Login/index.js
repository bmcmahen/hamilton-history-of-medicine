import React from 'react';
import debug from 'debug';
import {Link} from '../Router';

const log = debug('app:components:ui-Login');

if (__CLIENT__) {
  require('./index.css');
}

/**
 * Login forms
 */

class Login extends React.Component {

  static propTypes = {
    flux: React.PropTypes.object
  }

  static contextTypes = {
    router: React.PropTypes.func
  }

  constructor (props) {
    super(props);
    this.state = {
      error: false,
      email: '',
      password: ''
    };
  }

  async handleSubmit (e) {
    e.preventDefault();
    const { router } = this.context;
    const { flux } = this.props;
    const nextPath = router.getCurrentQuery().nextPath;
    const {email, pass} = this.state;
    log('login %s, password %s', email, pass);

    try {
      // attempt the login
      let res = await flux.getActions('users').login(email, pass);
      if (res.status === 200) {
        log('successful login, redirect to %s', nextPath || '/admin');
        router.replaceWith(nextPath || '/admin');
      } else {
        log('error logging in');
        this.setState({ error: res.text });
      }
    } catch(err) {
      console.error(err.stack);
      this.setState({ error: 'An unexpected error occurred' });
    }
  }

  render () {
    return (
      <div className='Login'>
        <h2>Login</h2>
        <form className='Login' onSubmit={this.handleSubmit.bind(this)}>
          <label>
            <input type='email' onChange={this.set('email').bind(this)} placeholder='email'/>
          </label>
          <label>
            <input type='password' onChange={this.set('pass').bind(this)} placeholder='password'/>
          </label>
          <button type='submit'>Login</button>
          {this.state.error && (
            <p>{this.state.error}</p>
          )}
          <div>
            Not <Link to='register'>registered?</Link>
          </div>
        </form>
      </div>
    );
  }

  set (field) {
    let obj = {};
    return (e) => {
      obj[field] = e.target.value
      this.setState(obj)
    }
  }
}

export default Login;
