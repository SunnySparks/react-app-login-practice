import React, { Component } from 'react';
import axios from 'axios';

export default class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:"",
      username: "",
      registrationErrors: ""
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
     email,
     username
   } = this.state;
   axios.post("http://localhost:8000/registrations", {
     user: {
       email: email,
       username: username
     }
   }
   ).then(response => {
     if (response.data.status === 'created') {
       this.props.handleSuccessfulAuth(response.data);
     }
     console.log("registration res", response);
   }).catch(error => {
     console.log("registration error", error);
   });
   event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <input
            type="username"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
            required
          />
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}
