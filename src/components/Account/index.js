import React from 'react'

import PasswordChangeForm from '../PasswordChange'
import { PasswordForgetForm } from '../PasswordForget'

const Account = () => (
  <div>
    <h1>Account</h1>
    <PasswordChangeForm />
    <PasswordForgetForm />
  </div>
)

export default Account
