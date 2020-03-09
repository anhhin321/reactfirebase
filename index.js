import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-react';
import firebase from './firebase';
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import Register from './Components/Register';
import Messager from './Components/Messager';
import Login from './Components/Login';

import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './reducers';
import Spinner from './Spinner';
import PageOne from './Components/PageOne';
import App from './App';
import { setUser, clearUser } from "./actions";
import PageTwo from './Components/PageTwo';

const store = createStore(rootReducer, composeWithDevTools());
class Root extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            isUser:''
        }
    }
    
    componentDidMount(){
        console.log(this.props.isLoading);
        
        firebase.auth().onAuthStateChanged(user =>{
            if(user){
                this.setState({
                    isUser:false
                });
                // this.props.setUser(user);
                // if(this.state.isUser === true)
                // this.props.history.push("/");
            }
            else{
                
                this.props.history.push("/dang-nhap");
            
        }
        });
    }
    render (){
    //    return this.props.isLoading ? <Spinner />:(
        return( 
        <Switch>
            <Route exact path="/">
                <Messager/>
            </Route>
            <Route path="/index">
                <PageOne/>
            </Route>
            <Route path="/index1">
                <PageTwo/>
            </Route>
            <Route path="/trang-chu">
                <App/>
            </Route>
            <Route path="/dang-ky" component={Register}>
            
            </Route>
            <Route path="/dang-nhap" component={Login}>
            
            </Route>
            {/* <Route path="/mess" component={Message} >
                
            </Route> */}
        </Switch>
       );
    }
}
const mapStateFromProps = state => ({
    isLoading: state.user.isLoading
  });
  
  const RootWithAuth = withRouter(
    connect(
      mapStateFromProps,
      { setUser, clearUser }
    )(Root)
  );
  
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <RootWithAuth />
      </Router>
    </Provider>,
    document.getElementById("root")
  );
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
