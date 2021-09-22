import '@fontsource/roboto';
import React, { Suspense } from 'react';
import { render } from 'react-dom';
import { RecoilRoot } from 'recoil';
import App from './App';

render(
  <RecoilRoot>
    <Suspense fallback={null}>
      <App />
    </Suspense>
  </RecoilRoot>,
  document.getElementById('root')
);
