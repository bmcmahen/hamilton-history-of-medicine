import React from 'react'
import debug from 'debug'
import {Link} from 'react-router'
const log = debug('App:components:ui-Login');

if (__CLIENT__) {
  require('./index.css');
}

/**
 * Login forms
 */

class Register extends React.Component {

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
      pass: ''
    };
  }

  async handleSubmit (e) {
    e.preventDefault();
    const { router } = this.context;
    const nextPath = router.getCurrentQuery().nextPath;
    const {email, pass} = this.state;
    log('register username %s, password %s', email, pass);

    try {
      // attempt registration
      let res = await this.props.flux.getActions('users').register(email, pass);
      if (res.status === 200) {
        router.replaceWith(nextPath || '/admin');
      } else {
        this.setState({
          error: 'Password or username did not match records.'
        });
      }
    } catch(err) {
      log('Unexpected error logging in %j', err);
      this.setState({
        error: 'An unexpected error occurred.'
      });
    }
  }

  render () {
    return (
      <div className='Register'>
        <h2>Register</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>
            <input type='email' onChange={this.set('email')} placeholder='email'/>
          </label>
          <label>
            <input type='password' onChange={this.set('pass')} placeholder='password'/>
          </label>
          <button type='submit'>Login</button>
          <div>
            Already registered? <Link to='login'>Login</Link>
          </div>
          {this.state.error && (
            <p>Bad register information</p>
          )}
        </form>
      </div>
    );
  }

  set (field) {
    let obj = {};
    return (e) => {
      obj[field] = e.target.textContent;
      this.setState(obj);
    }
  }
}

export default Register;
