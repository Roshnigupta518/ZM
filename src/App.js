import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import {store} from './redux/store';
import Route from './route/Route';
import ErrorBoundary from './components/ErrorBoundary';
let persistor = persistStore(store);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ErrorBoundary>
          <Route />
        </ErrorBoundary>
      </PersistGate>
    </Provider>
  );
};

export default App;
