import "./App.css";
import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { render } from "react-dom";
import Nav from "./components/Nav";
import App from "./components/App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import Signup from "./components/auth/Signup";
import Signin from "./components/auth/Signin";
import WatchListButton from "./components/WatchListButton";

const store = createStore(
  rootReducer,
  {},
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

render(
  <Provider store={store}>
    <Router>
      <Fragment>
        <Nav />
        <App>
          <Switch>
            <Route exact path="/">
              <MovieList type="discover" />
            </Route>

            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />

            <Route exact path="/watch-list">
              <MovieList type="watch-list" />
            </Route>

            <Route exact path="/watch-list/:id" component={MovieDetail} />

            <Route exact path="/:id">
              <MovieDetail>
                <WatchListButton />
              </MovieDetail>
            </Route>
          </Switch>
        </App>
      </Fragment>
    </Router>
  </Provider>,
  document.getElementById("root")
);
