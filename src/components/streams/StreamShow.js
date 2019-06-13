import React from "react";
import flv from 'flv.js';
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

class StreamShow extends React.Component {

  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }
  
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
    this.initVideo(this.props.match.params.id);
  }

  componentDidUpdate() {
    // this runs whenever our component is re-rendered which it will be when we fetch stream
    this.initVideo(this.props.match.params.id);
  }
  
  componentWillUnmount() {
    this.player.destroy();
  }
  
  initVideo(streamId) {
    if (this.player || !this.props.stream) {
      return;
    }

    console.log('starting player', streamId)
    
    this.player = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${streamId}.flv`
    });

    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
   }

  renderStreamDetails = () => {
    if (!this.props.stream) {
      return "Loading...";
    }

    const { title, description } = this.props.stream;

    return (
      <div>
        <h2 className="title">{title}</h2>
        <video ref={this.videoRef} style={{ width: '100%' }} controls />
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
