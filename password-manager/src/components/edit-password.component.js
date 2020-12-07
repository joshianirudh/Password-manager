import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditPassword extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      email: '',
      password: '',
      date: new Date(),
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3000/passwords/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          email: response.data.email,
          password: response.data.password,
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:3000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  generatePassword(e)
  {
    let Length = 10+Math.floor((8*Math.random()));
    const lowercase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    const uppercase = lowercase.join("").toUpperCase().split("");
    const specialChars = ['~','!','@','#','$','%','^','&','*','(',')','_','+','-','=','[',']','{','}', '|' ,';',':','.',',','?','>','<'];
    const numbers = ["0","1","2","3","4","5","6","7","8","9"]
    const allchar = lowercase.concat(uppercase.concat(specialChars.concat(numbers)));
    console.log(uppercase)
    let genpassword = "";
    for(let i = 0;i<Length;i++)
    {
      let j = Math.floor(Math.random() * allchar.length)
      console.log(j);
      genpassword+=allchar[j]
    }
    this.setState({
      password: genpassword 
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const password = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      date: this.state.date
    }

    console.log(password);

    axios.post('http://localhost:3000/passwords/update/' + this.props.match.params.id, password)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Edit Password</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Service: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Email: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
              />
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
              />
        </div>
        
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Password" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}