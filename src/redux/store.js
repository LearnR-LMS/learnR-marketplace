import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import IndexSagas from "./index-saga";
import indexReducer from "./index-reducer";

const sagaMiddleware = createSagaMiddleware();

const persistedClientReducer = persistReducer(
  {
    key: "client",
    storage,
  },
  indexReducer.clientReducer
);

const reducer = combineReducers({
  form: indexReducer.IndexReducer,
  client: persistedClientReducer
})

export const store = configureStore({
  reducer: reducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [logger, sagaMiddleware],
});
sagaMiddleware.run(IndexSagas);

export const persistor =  persistStore(store);
