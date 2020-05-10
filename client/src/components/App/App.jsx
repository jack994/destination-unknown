import React from 'react';
import BpkText from 'bpk-component-text';

import SearchControls from '../SearchControls/SearchControls';

import STYLES from './App.scss';

const App = () => (
  <>
    <header className={STYLES.App__header}>
      <div className={STYLES.App__headerInner}>
        <BpkText tagName="h1" textStyle="xxl" className={STYLES.App__heading}>
          Destination Unknown
        </BpkText>
      </div>
    </header>
    <main className={STYLES.App__main}>
      <SearchControls />
    </main>
  </>
);

export default App;
