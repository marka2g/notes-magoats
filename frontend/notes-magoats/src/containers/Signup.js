import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = "Please enter an email.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = "Please enter a password.";
  }

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = "Please enter a password confirmation.";
  }

  if (values.password !== values.passwordConfirmation ) {
    errors.password = 'Passwords do not match';
  }

  return errors;
};

class Signup extends Component {
  handleFormSubmit = (values) => {
    console.log(values);
  };

  // renderField -> stateless function
  // We've seen a simplified version of this ES2015 syntax a few times before. Here, we are pulling off field.input, field.label, field.type, field.meta.touched, and field.meta.error and automatically assigning them their own variables input, label, touched, etc. Some of these are things we will need if validation fails, but we also get the added benefit of only needing to write our fieldset and label markup once.
  // Spread Operator to destructure (...) - what's going on with that {...} syntax? When you wrap a component or stateless function, Field automatically passes it a number of props. Some of these input props include name and value, along with event handlers such as onBlur, onFocus, etc. By adding these to our HTML input element with {...input}, we are destructuring the value of the input prop and merging in the values provided by the Field component.
  // adding code to display errors: `{touched && error && <span>{error}</span>}`
  // This simple conditional checks if the user has "touched" — or clicked into — the field, since we don't want to jump the gun and display errors before the user has had a chance to interact with the field. Then, if the field has an error attached to it, it displays the error.
  // also fieldset is utilizing bootstrap `has-error` style with ternary check
  renderField = ({ input, label, type, meta: { touched, error } }) => (
    <fieldset className={`form-group ${touched && error ? 'has-error' : ''}`}>
      <label className="control-label">{label}</label>
      <div>
        <input {...input} placeholder={label} className="form-control" type={type} />
        {touched && error && <div className="help-block">{error}</div>}
      </div>
    </fieldset>
  );

  //  instead of passing input to the component property, we are passing this.renderField.
  // Why is this? redux-form accepts three default DOM inputs: input, which we used in our Login form, along with textarea, and select. However, if we need more custom and/or reusable logic, Field will also accept a custom component or stateless function. If we start breaking down our renderField() method, it might become a bit more clear why we didn't want to use one of the default DOM inputs:
  render() {
    return (
      <div className="container">
        <div className="col-md-6 col-md-offset-3">
          <h2 className="text-center">Sign Up</h2>
          <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
            <Field name="email" type="text" component={this.renderField} label="Email" />
            <Field name="password" type="password" component={this.renderField} label="Password" />
            <Field name="passwordConfirmation" type="password" component={this.renderField} label="Password Confirmation" />

            <button action="submit" className="btn btn-primary">Sign up!</button>
          </form>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'signup',
  validate
})(Signup);
