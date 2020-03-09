import React, { Component } from 'react';
import '../App.css';
// import  dulieu  from '../Database/Database';
import firebase from '../firebase';
import _ from 'lodash';
import { message } from 'antd';

class Messager extends Component {
    constructor(props) {
        super(props);
        this.state={
            nguoigui:'',
            noidung:'',
            mess:{},
            hienthi:''
        }
    }
// create    
    componentDidMount (){
      const database = firebase.database().ref('/mess'); 
        database.on('value', (snapshot)=>{
            this.setState({
                mess: snapshot.val()
            });
        })
    }
    isChange =(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        });
    }
    handdleSubmit =(e)=>{
        e.preventDefault();
        const mess = {
            nguoigui:this.state.nguoigui,
            noidung:this.state.noidung
        }
        const database = firebase.database().ref('/mess'); 
        database.push(mess);
        const {nguoigui,noidung} =this.state;
        this.setState({
          
          noidung: ''
        });
        message.info('Đã gửi tin nhắn');
    }
    loadMess = () =>{
      return _.map(this.state.mess, (value,key)=>{
        return (
          <div>
            <ul className="p-0">
        <li>
          <div className="row comments mb-2">
            <div className="col-md-2 col-sm-2 col-3 text-center user-img">
              <img id="profile-photo" src="http://nicesnippets.com/demo/man03.png" className="rounded-circle" />
            </div>
            <div className="col-md-9 col-sm-9 col-9 comment rounded mb-2">
              <h4 className="m-0"><a href="#">{value.nguoigui}</a></h4>
              <time className="text-white ml-3">7 day ago</time>
              <like />
              <p className="mb-0 text-white">{value.noidung}</p>
            </div>
          </div>
        </li>
       
      </ul>
          </div>
        )
      })
    }
    render() {
        return (
            <div className="container">
  <div className="row mt-5">
    <div className="col-md-6 offset-md-3 col-sm-6 offset-sm-3 col-12 comments-main pt-4 rounded">
     

     {this.loadMess()}
      <form onSubmit={(e)=>this.handdleSubmit(e)}>
      <div className="row comment-box-main p-3 rounded-bottom">
        <div className="col-md-9 col-sm-9 col-9 pr-0 comment-box">
        <input type="text" className="form-control"  name="nguoigui" placeholder="Người gửi" onChange={(e)=>this.isChange(e)}/>
      <hr></hr>
          <input type="text" className="form-control" value={this.state.noidung} placeholder="Soạn tin nhắn...." name="noidung" required onChange={(e)=>this.isChange(e)} />
        </div>
        <div className="col-md-3 col-sm-2 col-2 pl-0 text-center send-btn">
          <button className="btn btn-info">Send</button>
        </div>
      </div>
      </form>
    </div>
  </div>
</div>

        );
    }
}

export default Messager;