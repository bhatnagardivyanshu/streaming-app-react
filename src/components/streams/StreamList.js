import React from "react";
import { connect } from "react-redux";
import { fetchStreams } from "../../actions/index";
import { Link } from "react-router-dom";

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderCreateStreamButton = () => {
    if (this.props.isSignedIn) {
      let styleObj = {
        textAlign: this.props.streams.length ? 'right' : 'center'
      }
      return (
        <div className="right floated content" style={styleObj}>
          <Link to="/streams/create" className="ui button primary">
            Create New Stream
          </Link>
        </div>
      );
    }
  };

  renderActionButtons = ({ ownerId, id }) => {
    const currentUserId = this.props.currentUserId;
    if (currentUserId && ownerId === currentUserId) {
      return (
        <div className="right floated content" >
          <Link to={`/streams/edit/${id}`} className="ui button primary">Edit</Link>
          <Link to={`/streams/delete/${id}`} className="ui button negative">Delete</Link>
        </div>
      );
    }
  };

  renderStreams = () => {
    return this.props.streams.map(stream => (
      <div className="item" key={stream.id}>
        {this.renderActionButtons(stream)}
        <i className="large middle aligned icon camera" />
        <div className="content">
          {stream.title}
          <div className="description">{stream.description}</div>
        </div>
      </div>
    ));
  };

  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">{this.renderStreams()}</div>
        {this.renderCreateStreamButton()}
      </div>
    );
  }
}

const mapStateToProps = ({ streams, auth }) => ({
  streams: Object.values(streams),
  currentUserId: auth.profile.id,
  isSignedIn: auth.isSignedIn
});

export default connect(
  mapStateToProps,
  { fetchStreams }
)(StreamList);
