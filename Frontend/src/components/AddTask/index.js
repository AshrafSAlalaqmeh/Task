import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./style.css";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [History, setHistory] = useState("");
  const [whenTime, setWhenTime] = useState("");
  const [descript, setDescript] = useState("");
  const [showMessage, setshowMessage] = useState("");
  const navigate = useNavigate();

  const { token, userId } = useSelector((state) => {
    return {
      token: state.auth.token,
      userId: state.auth.userId,
    };
  });

  const creatTask = () => {
    axios
      .post(
        "http://localhost:5000/task",
        {
          title,
          History,
          whenTime,
          descript,
          user_id: userId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((result) => {
       
        setshowMessage(result.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="contanir-add-Task">
      <button
        className="back-in-complete"
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </button>

      <input
        type="text"
        placeholder="Type Something"
        id="registerName"
        class="form-control typesomething inp"
        onChange={(e) => setTitle(e.target.value)}
      />
      <div>
        <label>When</label>
        <div className="inputs-When">
          <div>
            <input
              type="date"
              className="input-Date"
              onChange={(e) => setHistory(e.target.value)}
            />
          </div>
          <div>
            <input
              type="time"
              className="input-Date"
              onChange={(e) => setWhenTime(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="Description">
        <label>Description</label>
        <textarea
          id="exampleFormControlTextarea1"
          class="form-control"
          rows="3"
          onChange={(e) => setDescript(e.target.value)}
        />
      </div>
      <button className="button-tasks" onClick={() => creatTask()}>
        CREAT TASK
      </button>

      {<h3 className="show">{showMessage}</h3>}
    </div>
  );
};

export default AddTask;
