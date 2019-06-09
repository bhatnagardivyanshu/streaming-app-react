import React from "react";
import { createStream } from "../../actions";
import { connect } from "react-redux";
import StreamForm from "./StreamForm";

class StreamCreate extends React.Component {
  // renderError({ touched, error }) {
  //   if (touched && error) {
  //     return (
  //       <div className="ui error message">
  //         <div className="header">{error}</div>
  //       </div>
  //     );
  //   }
  // }

  // renderInput = formProps => {
  //   // console.log(formProps);
  //   const className = `field ${
  //     formProps.meta.touched && formProps.meta.error ? "error" : ""
  //   }`;
  //   return (
  //     <div className={className}>
  //       {/*
  //         formProps.label is passed by the Field component
  //         to the component automatically since it does it
  //         whenever any unknown property is passed to it
  //       */}
  //       <label>{formProps.label}</label>
  //       <input {...formProps.input} autoComplete="off" />
  //       {this.renderError(formProps.meta)}
  //     </div>
  //   );
  // };

  onSubmit = data => this.props.createStream(data);

  render() {
    return (
      <div>
        <h3 className="title">Create New Stream</h3>
        <StreamForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, { createStream })(StreamCreate);