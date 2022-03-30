import { Link } from "react-router-dom";

const FallBack = ({ error, resetErrorBoundary }) => {
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
          onClick={resetErrorBoundary}
        >
          login again
        </Link>
      </h3>
    </div>
  );
};

export default FallBack;
