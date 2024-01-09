import React from 'react';
import './App.css';
import Layout from './components/Layout';
import Pages from './routers/routers';

function App() {
  return (
    <Layout>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Pages />
      </React.Suspense>
    </Layout>
  );
}

export default App;
