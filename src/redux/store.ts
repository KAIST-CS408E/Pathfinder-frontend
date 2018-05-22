import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';

import createHistory from 'history/createBrowserHistory';

import { rootReducer, RootState } from '@src/redux';

export const history = createHistory();

const composeEnhancers = composeWithDevTools || compose;

function configureStore(initialState?: RootState) {
  // configure middlewares
  const middlewares: any[] = [routerMiddleware(history)];
  // compose enhancers
  const enhancer =
    process.env.NODE_ENV === 'development'
      ? composeEnhancers(applyMiddleware(...middlewares))
      : applyMiddleware(...middlewares);
  // create store
  return createStore(rootReducer, initialState!, enhancer);
}

// export const initialState: RootState = {
//   pinnedList: {},
//   router: { location: null },
// };

// pass an optional param to rehydrate state on app start
const store = configureStore();

// export store singleton instance
export default store;
