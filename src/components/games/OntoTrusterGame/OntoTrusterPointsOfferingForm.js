import React from "react";
import { Field, reduxForm } from "redux-form";
var formid = "OntoTrusterGameClassFormPayment";


class TrusterPointsOfferingForm extends React.Component {
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
    this.props.onSubmit({formid,...formValues});
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="paymentamount" component={this.renderInput} label="امتیاز مورد نظر خود را وارد کنید:" />
        <button className="ui button primary">ارسال</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.paymentamount) {
    errors.title = "باید یک مقدار عددی کمتر از ۱۰۰ وارد نمایید";
  }
  return errors;
};

export default reduxForm({
  form: "OntoTrusterPointsOfferingFormInRedux",
  validate,
})(TrusterPointsOfferingForm);
