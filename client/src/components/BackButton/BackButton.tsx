import React from "react";
import "./BackButton.styles.css";
import { useLocation, Link } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";

type Props = {
  text: string;
};

const BackButton: React.FC<Props> = ({ text }: Props) => {
  const { pathname } = useLocation();
  const path = pathname.substr(0, pathname.lastIndexOf("/"));

  return (
    <>
      <Link
        className="back"
        to={path}
        style={{ textDecoration: "none", color: "black" }}
      >
        <FiChevronLeft style={{ marginTop: "2px" }} />
        <p>{text}</p>
      </Link>
    </>
  );
};

export default BackButton;
