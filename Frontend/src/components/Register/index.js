import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";
import { useDispatch } from "react-redux";
import { setUserId } from "../../redux/reducers/auth";

const Register = ({ setShowLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [cofirmPass, setCofirmPass] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()




  const handelRegisterbutton = () => {
    if (pass !== cofirmPass) {
      return setMessage("The password does not match");
    }
    axios
      .post("http://localhost:5000/users/register", {
        Full_name: name,
        email,
        pass,
      })
      .then((result) => {
        dispatch(setUserId(result.data.result.rows[0].id))
        navigate("/Tasks");
      })
      .catch((err) => {
        console.log(err.response.data.massage);
        setMessage(err.response.data.massage);
      });
  };

  return (
    <div className="contanir">
      <div className="header">
        <h3>Hello</h3>
        <p>Create your Accont</p>
      </div>

      <div className="input-Register">
        <div class="form-outline mb-4">
          <input
            type="text"
            placeholder="Full Name"
            id="registerName"
            class="form-control inp"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div class="form-outline mb-4">
          <input
            type="email"
            placeholder="Email Address"
            id="registerEmail"
            class="form-control inp"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div class="form-outline mb-4">
          <input
            type="password"
            placeholder="Password"
            id="registerEmail"
            class="form-control inp"
            onChange={(e) => setPass(e.target.value)}
          />
        </div>

        <div class="form-outline mb-4">
          <input
            type="password"
            placeholder="Confirm Password"
            id="registerEmail"
            class="form-control inp"
            onChange={(e) => setCofirmPass(e.target.value)}
          />
        </div>
      </div>

      <div className="footer">
        <button
          className="button-Register"
          onClick={() => {
            handelRegisterbutton();
          }}
        >
          {" "}
          SIGN UP{" "}
        </button>
        <p
          className="go-login"
          onClick={() => {
            navigate("/login");
          }}
        >
          Do You Already have an account ?
        </p>
      </div>
      {message}
    </div>
  );
};

export default Register;
