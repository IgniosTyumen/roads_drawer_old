import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from '~/components/carRequest/reducers';

export default function configureStore() {
  return createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(thunk),
    ),
  );
}
