import React from "react";
import { Router, Route } from "react-router-dom";
import history from '../history';

import Header from './Header';
import StreamList from './streams/StreamList';
import StreamCreate from './streams/StreamCreate';
import StreamEdit from './streams/StreamEdit';
import StreamDelete from './streams/StreamDelete';
import StreamShow from './streams/StreamShow';

const App = () => {
  return (
    <div className="ui container">
      {/* Components that are not route specific */}
      <Router history={history}>
        {/* <Switch> */}
          { /** Might need to add exact to the Routes */}
          <Header />
          <Route exact path="/" component={StreamList} />
          <Route path="/streams/create" component={StreamCreate} />
          <Route path="/streams/edit/:id" component={StreamEdit} />
          <Route path="/streams/delete/:id" component={StreamDelete} />
          <Route path="/streams/show/:id" component={StreamShow} />
          {/* <Route component={function() { return <div>Page not found</div> }} /> */}
        {/* </Switch> */}
      </Router>
    </div>
  );
};

export default App;
