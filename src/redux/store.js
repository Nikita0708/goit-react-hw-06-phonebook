import { configureStore } from '@reduxjs/toolkit';
import contactFormReducer from './contactFormReducer';
import appReducer from './appReducer';
import { devToolsEnhancer } from '@redux-devtools/extension';

const reducer = {
  contactFormDetails: contactFormReducer,
  appDetails: appReducer,
};

const enhancer = devToolsEnhancer();
export const store = configureStore({ reducer, enhancer });
