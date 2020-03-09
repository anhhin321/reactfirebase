import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import firebase from '../firebase';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state={
            hoten:'',
            email:'',
            password:'',
            password1:''
        }
        // bind
    }
    isChange = (e)=>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleSubmit = (e)=>{
        e.preventDefault();
        if(this.state.password != this.state.password1){
            alert("Mật khẩu không trùng nhau");
            
        }
        firebase.auth().
        createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(createdUser => {
        console.log(createdUser);
        alert("Đăng ký thành công");
      })
      .catch(err => {
        console.error(err);
        alert(err);
      });

    }
    render() {
        return (
            <div className="container col-lg-6">
                <h4>Đăng ký thành viên</h4>
                <form onSubmit={(e)=>this.handleSubmit(e)}>
                <div className="form-group">
    <label >Họ và tên:</label>
    <input type="text" className="form-control" id="usr" name="hoten" required onChange={(e)=>this.isChange(e)} />
  </div>
                <div className="form-group">
    <label>Email:</label>
    <input type="email" className="form-control" id="usr" name="email" required onChange={(e)=>this.isChange(e)} />
  </div>
  <div className="form-group">
    <label >Mật khẩu:</label>
    <input type="password" className="form-control" id="pwd" name="password" required onChange={(e)=>this.isChange(e)} />
  </div>
            <div className="form-group">
            <label >Nhập lại mật khẩu:</label>
            <input type="text" className="form-control" id="usr" name="password1" required onChange={(e)=>this.isChange(e)} />
          </div>
          <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block">Đăng ký</button>
          </div>
          </form>
          </div>
        );
    }
}

export default Register;