import React from 'react';
import BpkText from 'bpk-component-text';

import SearchBar from '../SearchBar/SearchBar';

import STYLES from './App.scss';

const c = className => STYLES[className] || 'UNKNOWN';

const App = () => (
  <div className={c('App')}>
    <header className={c('App__header')}>
      <div className={c('App__header-inner')}>
        <BpkText tagName="h1" textStyle="xxl" className={c('App__heading')}>
          Destination Unknown
        </BpkText>
      </div>
    </header>
    <main className={c('App__main')}>
      <SearchBar />
    </main>
  </div>
);

export default App;
