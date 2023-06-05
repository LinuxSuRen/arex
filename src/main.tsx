import './i18n';
import 'antd/dist/reset.css';
import 'allotment/dist/style.css';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.tsx';

const client = new ApolloClient({
  uri: 'http://localhost:3170/graphql',
  cache: new InMemoryCache(),
  credentials: 'include',
});
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
