import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      loginErrors: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    console.log("handle change", event);
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event){
   console.log("form submitted");
   const {
     username
   } = this.state;
   axios.post("http://localhost:8000/sessions", {
     user: {
       username: username
     }
   }
   ).then(response => {
     console.log("response from login", response);
     if (response.status === 200 ) {
       this.props.handleSuccessfulAuth(response.data);
     }
   }).catch(error => {
     console.log("login error", error);
   });
   event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="username"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}
