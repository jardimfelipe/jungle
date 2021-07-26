import { Middleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import createStore from './createStore';
import rootSaga from './modules/rootSaga';
import rootReducer from './modules/rootReducer';

const sagaMiddleware = createSagaMiddleware();

const middlewares: Middleware[] = [sagaMiddleware];

const store = createStore(rootReducer, middlewares);

sagaMiddleware.run(rootSaga);

export * from './modules/exportTypes';

export default store;
