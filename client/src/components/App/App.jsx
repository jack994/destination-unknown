import React from 'react';
import BpkText from 'bpk-component-text';
import { Provider } from 'react-redux';

import SearchControls from '../SearchControls/SearchControls';
import TicketsSection from '../TicketsSection/TicketsSection';
import store from '../../redux/store';

import STYLES from './App.scss';

const App = () => (
  <Provider store={store}>
    <header className={STYLES.App__header}>
      <div className={STYLES.App__headerInner}>
        <BpkText tagName="h1" textStyle="xxl" className={STYLES.App__heading}>
          Destination Unknown
        </BpkText>
      </div>
    </header>
    <main className={STYLES.App__main}>
      <SearchControls />
      <TicketsSection />
    </main>
  </Provider>
);

export default App;
