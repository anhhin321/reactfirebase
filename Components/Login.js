import React, { Component } from 'react';
import firebase from '../firebase';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state ={
            email:'',
            password: ''
        }
    }
    isChange = (e)=>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleSubmit =(e)=>{
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).
        then(signInUser =>{
            console.log(signInUser);
            alert("Dang nhap thafnh coong");
        })
        .catch(err =>{
            console.error(err);
            alert("dang nhap that  baji");
            
        })
    }
    
    render() {
        return (
            <div className="container col-lg-6">
                <h4>Đăng ký thành viên</h4>
                <form onSubmit={(e)=>this.handleSubmit(e)}>
                
                <div className="form-group">
    <label>Email:</label>
    <input type="email" className="form-control" id="usr" name="email" required onChange={(e)=>this.isChange(e)} />
  </div>
  <div className="form-group">
    <label >Mật khẩu:</label>
    <input type="password" className="form-control" id="pwd" name="password" required onChange={(e)=>this.isChange(e)} />
  </div>
           
          <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block">Đăng ký</button>
          </div>
          </form>
          </div>
        );
    }
}

export default Login;