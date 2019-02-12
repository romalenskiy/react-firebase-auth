import React, { Component } from 'react'

import { withFirebase } from '../Firebase'

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
}

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }

  onSubmit = (event) => {
    event.preventDefault()

    const { passwordOne } = this.state
    const { firebase } = this.props

    firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE })
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
    const { passwordOne, passwordTwo, error } = this.state
    const isInvalid = passwordOne !== passwordTwo || passwordOne === ''

    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="password"
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          placeholder="New Password"
        />

        <input
          type="password"
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          placeholder="Confirm Password"
        />

        <button disabled={isInvalid} type="submit">Change My Password</button>

        {error && <p>{error.message}</p>}

      </form>
    )
  }
}

export default withFirebase(PasswordChangeForm)
