import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="contanir-footer">
      <div>
        <p
          className="task-footer"
          onClick={() => {
            navigate("/Tasks");
          }}
        >
          Tasks{" "}
        </p>
      </div>

      <div>
        <p
          className="complete-footer"
          onClick={() => {
            navigate("/favorite");
          }}
        >
          favorite
        </p>
      </div>
    </div>
  );
};

export default Footer;
