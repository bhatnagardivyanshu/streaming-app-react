import React from "react";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

class StreamShow extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  renderStreamDetails = () => {
    if (!this.props.stream) {
      return "Loading...";
    }

    const { title, description } = this.props.stream;

    return (
      <div>
        <h2 className="title">{title}</h2>
        <div className="description">{description}</div>
      </div>
    );
  };

  render() {
    return <div className="ui content">{this.renderStreamDetails()}</div>;
  }
}

const mapStateToProps = ({ streams }, ownProps) => ({
  stream: streams[ownProps.match.params.id]
});

export default connect(
  mapStateToProps,
  { fetchStream }
)(StreamShow);
