import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import { withFirebase } from '../Firebase'
import { SignUpLink } from '../SignUp'

import * as ROUTES from '../../constants/routes'


const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignInFrom />
    <SignUpLink />
  </div>
)

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
}

class SignInFromBase extends Component {
  constructor(props) {
    super(props)
    this.state = INITIAL_STATE
  }

  onSubmit = (event) => {
    event.preventDefault()

    const { email, password } = this.state
    const { firebase, history } = this.props

    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE })
        history.push(ROUTES.HOME)
      })
      .catch((error) => {
        this.setState({ error })
      })
  }

  onChange = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  render() {
    const { email, password, error } = this.state
    const isValid = email === '' || password === ''

    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          name="email"
          value={email}
          onChange={this.onChange}
          placeholder="Email Address"
          autoComplete="off"
        />

        <input
          type="password"
          name="password"
          value={password}
          onChange={this.onChange}
          placeholder="Password"
        />

        <button disabled={isValid} type="submit">Sign In</button>

        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

const SignInFrom = compose(
  withRouter,
  withFirebase,
)(SignInFromBase)

export default SignInPage
export { SignInFrom }
