import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './authSlice';

const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['token'],
};
const cartPersistConfig = {
    key: 'cart',
    storage,
};
const checkoutPersistConfig = {
    key: 'checkout',
    storage,
};

export const store = configureStore({
    reducer: {
        auth: persistReducer(authPersistConfig, authReducer),
        cart: persistReducer(cartPersistConfig, cartReducer),
        checkout: persistReducer(checkoutPersistConfig, checkoutReducer),
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);