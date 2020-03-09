import React, { Component } from 'react';
import { Layout, Menu, Tabs,  } from 'antd';
import '../App.css';
import { Button, Header, Image, Modal, Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
const { Content, Footer } = Layout;

const { TabPane } = Tabs;
class PageOne extends Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
          <Layout className="layout">
    <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1"><Link to="/">Nav 1</Link></Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3"><Input icon='search' placeholder='Search...' className="can" /></Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      
      <div className="site-layout-content">
      <Tabs defaultActiveKey="1" >
    <TabPane tab="Tab 1" key="1">
    {/* <button onClick={this.showModal}></button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div className="col-3">
          <img src="http://htkw.temit.vn/wp-content/uploads/2019/05/logo-1-2.png" />
          </div>
          <div className="col-9">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam voluptas perferendis eaque labore hic, quas pariatur, dicta facilis quam officiis magnam repudiandae, omnis officia saepe expedita cumque adipisci accusantium aspernatur?</p>
          </div>
        </Modal> */}
    </TabPane>
    <TabPane tab="Tab 2" key="2">
      
    <Modal trigger={<Button>Show Modal</Button>}>
    <Modal.Header>Select a Photo</Modal.Header>
    <Modal.Content image>
      <Image wrapped size='medium' src='http://htkw.temit.vn/wp-content/uploads/2019/05/logo-1-2.png' />
      <Modal.Description>
        <Header>Default Profile Image</Header>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam voluptas perferendis eaque labore hic, quas pariatur, dicta facilis quam officiis magnam repudiandae, omnis officia saepe expedita cumque adipisci accusantium aspernatur?</p>
      </Modal.Description>
    </Modal.Content>
  </Modal>
    </TabPane>
    <TabPane tab="Tab 3" key="3">
      Content of Tab Pane 3
    </TabPane>
  </Tabs>
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
      </div>
    );
  }
}

export default PageOne;