import React from 'react';
import { SWRConfig } from 'swr';
import './App.css';
import './css/index.css';
import Layout from './components/layout';
import Pages from './routers/Routers'
import { SkeletonTheme } from 'react-loading-skeleton';
function App() {
  return (
    <SWRConfig value={{}}>
       <SkeletonTheme baseColor='#313131' highlightColor='#525252'>
          <Layout>
            <React.Suspense>
            <Pages />
            </React.Suspense>
          </Layout>
       </SkeletonTheme>
    </SWRConfig>
  );
}

export default App;
