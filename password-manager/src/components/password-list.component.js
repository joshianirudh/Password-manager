import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Password = props => (
  <tr>
    <td>{props.password.username}</td>
    <td>{props.password.email}</td>
    <td>{props.password.password}</td>
    <td>{props.password.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.password._id}>edit</Link> | <a href="#" onClick={() => { props.deletePassword(props.password._id) }}>delete</a>
    </td>
  </tr>
)

export default class PasswordList extends Component {
  constructor(props) {
    super(props);

    this.deletePassword = this.deletePassword.bind(this)

    this.state = {passwords: []};
  }

  componentDidMount() {
    axios.get('http://localhost:3000/passwords/')
      .then(response => {
        this.setState({ passwords: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deletePassword(id) {
    axios.delete('http://localhost:3000/passwords/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      passwords: this.state.passwords.filter(el => el._id !== id)
    })
  }

  passwordList() {
    return this.state.passwords.map(currentpassword => {
      return <Password password={currentpassword} deletePassword={this.deletePassword} key={currentpassword._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Passwords</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Service</th>
              <th>Email</th>
              <th>Password</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.passwordList() }
          </tbody>
        </table>
      </div>
    )
  }
}