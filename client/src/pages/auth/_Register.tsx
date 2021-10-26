import React, { Component, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../redux/actions/auth.actions";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import classNames from "classnames";

type Errors = {
  name?: string;
  email?: string;
  password?: string;
  password2?: string;
};

type Auth = {
  isAuthenticated: boolean;
  loading: boolean;
  errors: Errors;
};

type History = {
  push: Function;
};

type Props = {
  registerUser: Function;
  history: History;
  auth: Auth;
  errors: Errors;
};

type State = {
  name: string;
  email: string;
  password: string;
  password2: string;
  errors: Errors;
};

class Register extends Component<Props, State> {
  state: State = {
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {},
  };

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(Props: Props) {
    if (Props.errors) {
      this.setState({
        errors: Props.errors,
      });
    }
  }

  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.id]: e.target.value } as any);
  };

  onSubmit = (e: React.FormEvent<HTMLInputElement>) => {
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
            id="password"
            type="password"
            className={classNames("", {
              invalid: errors.password,
            })}
          />
          <label>Confirm Password</label>
          <input
            onChange={this.onChange}
            value={this.state.password2}
            id="password2"
            type="password"
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

const mapStateToProps = (state: any) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
