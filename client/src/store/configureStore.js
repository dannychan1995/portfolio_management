import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise";
import logger from "redux-logger";
import rootReducer from "../reducers";
import { save, load } from "redux-localstorage-simple"

export default function configureStore(initialState) {
  const createStoreWithMiddleware
    = applyMiddleware(
        thunk, promise, logger,save() // Saving done here
    )(createStore);

  const store = createStoreWithMiddleware(
    rootReducer,
    load() // Loading done here
  )
  // const store = createStore(
  //   rootReducer,
  //   initialState,
  //   load(),
  //   applyMiddleware(thunk, promise, logger, save())
  // );

  if (module.hot) {
    // Enable hot module replacement for reducers
    module.hot.accept("../reducers", () => {
      const nextRootReducer = require("../reducers");
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
