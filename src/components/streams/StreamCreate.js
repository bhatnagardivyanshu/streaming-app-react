import React from "react";
import { Field, reduxForm } from "redux-form";
import { createStream } from "../../actions";
import { connect } from 'react-redux';

class StreamCreate extends React.Component {
  renderError({ touched, error }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = formProps => {
    // console.log(formProps);
    const className = `field ${
      formProps.meta.touched && formProps.meta.error ? "error" : ""
    }`;
    return (
      <div className={className}>
        {/*
          formProps.label is passed by the Field component
          to the component automatically since it does it
          whenever any unknown property is passed to it
        */}
        <label>{formProps.label}</label>
        <input {...formProps.input} autoComplete="off" />
        {this.renderError(formProps.meta)}
      </div>
    );
  };

  onSubmit = data => this.props.createStream(data);

  render() {
    return (
      // error class is required for ui.error.message to show
      <form
        className="ui form error"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        {/* Whenever we pass anything that's not associated with Field Component is passed to our component */}
        <Field
          name="title"
          component={this.renderInput}
          label="Enter Title"
          test="this will be passed to the component"
        />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary" type="submit">
          Submit
        </button>
      </form>
    );
  }
}

const validateForm = formValues => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "Title is required";
  }

  if (!formValues.description) {
    errors.description = "Description is required";
  }
  return errors;
};

const formWrapper = reduxForm(
  { form: "streamCreate", validate: validateForm }
)(StreamCreate);

export default connect(null, { createStream })(formWrapper);
