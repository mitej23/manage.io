import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../redux/actions/auth.actions";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import classNames from "classnames";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };
  }

  componentDidMount() {
    console.log("Register component mounted");
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/user");
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
    return null;
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <Link to="/">
          <h1 className="text-center">home</h1>
        </Link>
        <h1>Register</h1>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
        <form noValidate onSubmit={this.onSubmit}>
          <label>Name</label>
          <input
            onChange={this.onChange}
            value={this.state.name}
            error={errors.name}
            id="name"
            type="text"
            className={classNames("", {
              invalid: errors.name,
            })}
          />
          <label>Email</label>
          <input
            onChange={this.onChange}
            value={this.state.email}
            error={errors.email}
            id="email"
            type="email"
            className={classNames("", {
              invalid: errors.email,
            })}
          />
          <label>Password</label>
          <input
            onChange={this.onChange}
            value={this.state.password}
            error={errors.password}
            id="password"
            type="password"
            autoComplete="true"
            className={classNames("", {
              invalid: errors.password,
            })}
          />
          <label>Confirm Password</label>
          <input
            onChange={this.onChange}
            value={this.state.password2}
            error={errors.password2}
            id="password2"
            type="password"
            autoComplete="true"
            className={classNames("", {
              invalid: errors.password2,
            })}
          />
          <input type="submit" value="Sign up" />
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
