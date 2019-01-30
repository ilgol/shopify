import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducersFactory';
import { routerMiddleware } from 'react-router-redux';
import rootSaga from '../rootSaga';
import { appHistory } from '../services/HistoryConfig';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

if(process.env.NODE_ENV !== 'production') {
  const logger = createLogger({
    level: 'info',
    collapsed: true,
  });

  middleware.push(logger);
}

const router = routerMiddleware(appHistory);

middleware.push(router);

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

export function configureStore(initialState) {
  const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
  const store = createStoreWithMiddleware(rootReducer, initialState, reduxDevTools);

  sagaMiddleware.run(rootSaga, store);

  return store;
}

const Store = configureStore();

export default Store;
