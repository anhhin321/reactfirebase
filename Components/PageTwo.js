import React, { Component } from 'react';
import { Modal, Upload, message, Card, Row, Col } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import firebase from '../firebase';
import _ from 'lodash';
const { Meta } = Card;
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }
class PageTwo extends Component {
    state = { visible: false, noidung:'', loading:false, mess:{} };
    componentDidMount (){
        const database = firebase.database().ref('/baiviet'); 
          database.on('value', (snapshot)=>{
              this.setState({
                  mess: snapshot.val()
              });
          })
      }
//upload
handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };
    showModal = () => {
      this.setState({
        visible: true,
      });
    };
  
    handleOk = e => {
      console.log(e);
      const baiviet ={
          noidung: this.state.noidung,
          anh:'https://scontent.fhph1-2.fna.fbcdn.net/v/t1.0-9/48408176_1948945068747778_3598725283110191104_o.jpg?_nc_cat=101&_nc_sid=ca434c&_nc_ohc=GSFn9ZfysS0AX95U2EH&_nc_ht=scontent.fhph1-2.fna&oh=052a683853e291f2184d5c1b75ecd857&oe=5EB56CB0'
      };
      const database = firebase.database().ref('/baiviet'); 
        database.push(baiviet);
      this.setState({
        visible: false,
        noidung:''
      });
      message.info('Đăng bài viết thành công');
    };
  
    handleCancel = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };
    isChange = (e)=>{
        const noidung  = e.target.value;
        this.setState({
            noidung: noidung
        });
    }
    load_bv = ()=>{
        return _.map(this.state.mess, (value,key)=>{
            return (
                <Row>
                    <hr></hr>
                <Col span={24}>
                    <p>{value.noidung} </p>
                    <img src={value.anh} style={{ width: 500 }} />
                </Col>
            <hr />
              </Row>
            )
        })
    }
    render() {
        const uploadButton = (
            <div>
              {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
              <div className="ant-upload-text">Upload</div>
            </div>
          );
          const { imageUrl } = this.state;
        return (
            <div className="container col-lg-6">
                <textarea className="form-control no-border" rows="5" defaultValue={this.state.noidung} onClick={this.showModal} />
                <Modal
          title="Tạo bài viết"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <textarea className="form-control" rows="5" defaultValue={this.state.noidung} name="ab" onChange={(e)=>this.isChange(e)} />
          <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
        </Modal>
        {this.load_bv()}
            </div>
        );
    }
}

export default PageTwo;