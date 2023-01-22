// Packages
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Store
import store from './store/index';

// Components
import App from './App';

// Styles
import './index.css';


let persistor = persistStore(store);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<GoogleOAuthProvider clientId={ '447079852716-db63djf5vlqoj9234sk8d3qh3pfjl1hh.apps.googleusercontent.com' }>
			<Provider store={ store }>
				<PersistGate loading={ null } persistor={ persistor }>
					<App />
				</PersistGate>
			</Provider>
		</GoogleOAuthProvider>
	</BrowserRouter>
);