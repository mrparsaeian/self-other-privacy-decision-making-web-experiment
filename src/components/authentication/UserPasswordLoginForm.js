import React from "react";
import { Field, reduxForm } from "redux-form";
var password = "p@ssword";
var email = "test@test.com";
class StartForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }
  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };
  onSubmit = (formValues) => {
    this.props.onSubmit({ password, email, ...formValues });
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <div className="ui form">
          <div className="field">
            <div className="ui left icon input">
              <Field
                name="username"
                component={this.renderInput}
                label="Username"
              />
            </div>
          </div>
          <div className="field">
            <div className="ui left icon input">
              <Field
                name="password"
                component={this.renderInput}
                label="Password"
              ></Field>
            </div>
          </div>
          <button className="ui button primary">Login</button>
        </div>
      </form>
    );
  }
}
const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "You must enter a title";
  }
  if (!formValues.description) {
    errors.description = "You must enter a description";
  }
  return errors;
};
export default reduxForm({
  form: "StartForm",
  validate,
})(StartForm);
