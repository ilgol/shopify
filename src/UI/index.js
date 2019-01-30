import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router';
import './styles/index.css';
import Store from './store/Store';
import { appHistory } from './services/HistoryConfig';
import { ConnectedRouter } from 'react-router-redux';
import PageNotFound from './components/pageNotFound/PageNotFound';
import SignIn from './signIn/SignIn';
import Checkout from './checkout/Checkout';
import MainContainer from './components/mainContainer/MainContainer';
import AvaliableLocations from './avaliableLocations/AvaliableLocations';

class Main extends Component {
  checkToken = () => (
    localStorage.access_token && localStorage.username && localStorage.userID
  );

  renderAvaliableLocations = (props) => (
    this.checkToken(props)
      ? (
        <AvaliableLocations { ...props } route={ { name: 'AvaliableLocations', value: 'AvaliableLocations' } } />
      )
      : (
        <Redirect to='/sign-in' />
      )
  );

  renderCheckout = (props) => (
    this.checkToken(props)
      ? (
        <Checkout { ...props } route={ { name: 'Checkout', value: 'Checkout' } } />
      )
      : (
        <Redirect to='/sign-in' />
      )
  );

  renderSignIn = (props) => (
    !this.checkToken(props)
      ? (
        <SignIn { ...props } route={ { name: 'Login', value: 'Login' } } />
      )
      : (
        <Redirect to='/' />
      )
  );

  render() {
    return (
      <Provider store={ Store }>
        <ConnectedRouter history={ appHistory }>
          <MainContainer>
            <Switch>
              <Route
                exact
                path='/'
                render={ this.renderAvaliableLocations }
              />
              <Route
                exact
                name='SignIn'
                path='/sign-in'
                render={ this.renderSignIn }
              />
              <Route
                exact
                name='Checkout'
                path='/checkout'
                render={ this.renderCheckout }
              />
              <Route name="NotFound" component={ PageNotFound } />
            </Switch>
          </MainContainer>
        </ConnectedRouter>
      </Provider>
    );
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById('e-box-container')
);