import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";

import Header from "./Header";
import StreamList from "./streams/StreamList";
import StreamCreate from "./streams/StreamCreate";
import StreamEdit from "./streams/StreamEdit";
import StreamDelete from "./streams/StreamDelete";
import StreamShow from "./streams/StreamShow";

const App = () => {
  return (
    <div className="ui container">
      {/* Components that are not route specific */}
      <Router history={history}>
        <Header />
        <Switch>
          {/** Might need to add exact to the Routes */}
          <Route exact path="/" component={StreamList} />
          <Route exact path="/streams/create" component={StreamCreate} />
          <Route exact path="/streams/edit/:id" component={StreamEdit} />
          <Route exact path="/streams/delete/:id" component={StreamDelete} />
          <Route exact path="/streams/:id" component={StreamShow} />
          <Route component={() => <div>Oops! Route not found</div>} />
          {/* <Route component={function() { return <div>Page not found</div> }} /> */}
        </Switch>
      </Router>
    </div>
  );
};

export default App;
