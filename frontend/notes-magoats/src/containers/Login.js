import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../actions';

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

  return errors;
};

class Login extends Component {
  handleFormSubmit = (values) => {
    // console.log(values);
    this.props.signInUser(values);
  }

  renderField = ({ input, label, type, meta: { touched, error } }) => (
    <fieldset className={`form-group ${touched && error ? 'has-error' : ''}`}>
      <label className="control-label">{label}</label>
      <div>
        <input {...input} placeholder={label} className="form-control" type={type} />
        {touched && error && <div className="help-block">{error}</div>}
      </div>
    </fieldset>
  );

  // handleSubmit() is a redux-form method, made available via this.props by reduxForm()(), that we can attach to the form's onSubmit event handler. This lets redux-form know that the user is trying to submit the form so it can intercept it and run validation first (if defined, which we haven't done yet in this file). Within redux-form's handleSubmit method, we're also calling our own handleFormSubmit method
  // When this.props.handleSubmit() is called, it passes the value of the form as an argument to whatever callback is supplied -- in this case, our class's handleFormSubmit() method. When handleFormSubmit() is fired, we're simply logging the value of the form to the console for now until we have the opportunity to set up actions and reducers to handle actual authentication.
  // redux-form provides us with a `Field` component that makes it easy to connect individual inputs to the Redux store. The values of these inputs are then made available via redux-form's this.props.handleSubmit. If we submit the form, we should see our email and password input logged in the console:
  render() {
    return (
      <div className="container">
        <div className="col-md-6 col-md-offset-3">
          <h2 className="text-center">Log In</h2>
          <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
            <Field name="email" component={this.renderField} className="form-control" type="text" label="Email"/>
            <Field name="password" component={this.renderField} className="form-control" type="password" label="Password"/>
            <button action="submit" className="btn btn-primary">Log In</button>
          </form>
        </div>
      </div>
    );
  }
}

// because our component doesn't currently care about any state outside of the form itself (such as whether a user is actually logged in), we are going to hold off for a bit on adding our react-redux connect()() decorator.
// for now, we have a new decorator, reduxForm()(), that connects our form to Redux. In its first set of parentheses, it takes a config object that has only one required argument: a unique name for the form. This will be set as a key on the store object returned from the formReducer.
export default connect(null, actions)(reduxForm({
  form: 'login',
  validate
})(Login));
