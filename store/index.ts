import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import devToolsEnhancer from 'redux-devtools-expo-dev-plugin';

export const store = configureStore({
	reducer: rootReducer,
	devTools: false,
	enhancers: getDefaultEnhancers => getDefaultEnhancers().concat(devToolsEnhancer()),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
