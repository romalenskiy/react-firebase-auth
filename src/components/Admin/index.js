import React from 'react'

import { withFirebase } from '../Firebase'

class AdminPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      users: [],
      loading: false,
    }
  }

  componentDidMount() {
    const { firebase } = this.props

    this.setState({ loading: true })

    firebase.users().on('value', (snapshot) => {
      const usersObject = snapshot.val()
      const usersList = Object.keys(usersObject).map(key => ({ uid: key, ...usersObject[key] }))

      this.setState({
        users: usersList,
        loading: false,
      })
    })
  }

  componentWillUnmount() {
    const { firebase } = this.props

    firebase.users().off()
  }

  render() {
    const { users, loading } = this.state

    return (
      <div>
        <h1>Admin</h1>

        {loading && <div>Loading ...</div> }

        <UserList users={users} />
      </div>
    )
  }
}

const UserList = ({ users }) => (
  <ul>
    {
      users.map(user => (
        <li key={user.uid}>
          <p>
            <strong>ID:</strong>
            {' '}
            {user.uid}
          </p>

          <p>
            <strong>Email:</strong>
            {' '}
            {user.email}
          </p>

          <p>
            <strong>Username:</strong>
            {' '}
            {user.username}
          </p>
        </li>
      ))
    }
  </ul>
)

export default withFirebase(AdminPage)
