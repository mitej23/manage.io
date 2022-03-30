import { Component } from "react";
import { Link } from "react-router-dom";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error: error };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            position: "absolute",
            top: "46%",
            left: "35%",
          }}
        >
          <h3>
            Something went wrong.{" "}
            <Link
              to="/login"
              style={{ color: "blue", textDecoration: "underline" }}
              onClick={() => {
                this.setState({ error: null });
              }}
            >
              login again
            </Link>
          </h3>
        </div>
      );
    }
    return this.props.children;
  }
}
