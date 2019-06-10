import _ from 'lodash';
import React from "react";
import { connect } from "react-redux";

import StreamForm from './StreamForm';
import { editStream, fetchStream } from "../../actions";

class StreamEdit extends React.Component {

  componentDidMount() {
    if (_.isEmpty(this.props.stream)) {
      this.props.fetchStream(this.props.match.params.id);
    }
  }

  onSubmit = data => this.props.editStream(this.props.stream.id, data);
  
  render() {
    if (_.isEmpty(this.props.stream)){
      return <div>Loading...</div>;
    } else {
      let valuesToEdit = _.pick(this.props.stream, 'title', 'description');
      return (
        <div>
          <h3>Edit Stream</h3>
          <StreamForm onSubmit={this.onSubmit} initialValues={valuesToEdit} />
        </div>
      )
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
