import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { persistor, store } from './app/store.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import App from './App.jsx';
import './utils/string';
import './index.css';

// if (process.env.NODE_ENV === 'production') {
//   disableReactDevTools();
// }

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store} persistor>
            <PersistGate loading={null} persistor={persistor}>
                <Router>
                    <Routes>
                        <Route path="/*" element={<App />} />
                    </Routes>
                </Router>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
