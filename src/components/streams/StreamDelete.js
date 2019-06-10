import React from "react";
import Modal from "../Modal";
import history from "../../history";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import { fetchStream, deleteStream } from "../../actions";

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  renderActions() {
    const streamId = this.props.match.params.id;
    return (
      <div>
        <button onClick={() => this.props.deleteStream(streamId)} className="ui button negative">Delete</button>
        <Link to="/" className="ui button">Cancel</Link>
      </div>
    );
  }

  renderContent() {
    if (!this.props.stream) {
      return "Are you sure you want to delete this stream";
    }
    return `Are you sure you want to delete this stream with title: ${
      this.props.stream.title
    }`;
  }

  render() {
    return (
      <Modal
        header="Delete Stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push("/")}
      />
    );
  }
}

const mapStateToProps = ({ streams }, ownProps) => ({
  stream: streams[ownProps.match.params.id]
});

export default connect(
  mapStateToProps,
  { fetchStream, deleteStream }
)(StreamDelete);
