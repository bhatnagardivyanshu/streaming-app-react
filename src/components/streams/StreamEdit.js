import React from "react";
import { connect } from "react-redux";
import _ from 'lodash';

import { editStream, fetchStream } from "../../actions";

class StreamEdit extends React.Component {

  componentDidMount() {
    // console.log('123', Object.keys(this.props.stream));
    if (_.isEmpty(this.props.stream)) {
      this.props.fetchStream(this.props.match.params.id);
    }
  }
  
  render() {
    console.log('rendered');
    if (_.isEmpty(this.props.stream)){
      return <div>Loading...</div>;
    } else {
      return <div>{this.props.stream.title}</div>;
    }
  }
}

const mapStateToProps = ({ streams }, componentProps) => ({
  stream: streams[componentProps.match.params.id] || {}
});

export default connect(
  mapStateToProps,
  { editStream, fetchStream }
)(StreamEdit);

// mapStateToProps = (applicationState, componentProps);
// connect(mapStateToProps, { /* pass action creators */})(Component);
