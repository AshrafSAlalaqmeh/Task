import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTofavorite } from "../../redux/reducers/favorite";
import { setComplete } from "../../redux/reducers/favorite";
import { deleteTask, setTask, setTaskId } from "../../redux/reducers/task";
import Footer from "../Footer";
import "./style.css";

const Tasks = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [toDisabled, setToDisabled] = useState(false);

  const { task, token, userId, fullName } = useSelector((state) => {
    return {
      task: state.task.task,
      token: state.auth.token,
      userId: state.auth.userId,
      fullName: state.auth.fullName,
    };
  });

  const getTask = () => {
    axios
      .get(`http://localhost:5000/task`)
      .then((result) => {
        dispatch(setTask(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const goToUpdate = (id) => {
    dispatch(setTaskId(id));
    navigate("/UpdateTask");
  };

  const deleteTheTask = (id) => {
    axios
      .delete(`http://localhost:5000/task/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        dispatch(deleteTask(id));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(userId);
  const favorite = (id) => {
    console.log(id);
    axios
      .post(`http://localhost:5000/favorite`, {
        task_id: id,
        user_id: userId,
      })
      .then((result) => {
        console.log(result.data.Result);
        dispatch(addTofavorite(result.data.Result));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTask();
  }, []);

  const handelSearch = (search) => {
    console.log(search);
    axios
      .get(`http://localhost:5000/task/search/task/${userId}/?title=${search}`)
      .then((result) => {
        dispatch(setTask(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="contanit-task">
      <div className="navbar">
        <div>
          <h3 className="welcomeName">Welcome {fullName}</h3>
        </div>
        <div>
          <input
            class="form-control mr-sm-2 search"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => {
              handelSearch(e.target.value);
            }}
          ></input>
        </div>
      </div>
      <div className="cards">
        {task.length &&
          task.map((item) => {
            console.log(item.user_id);
            return (
              <div className="card">
                <div className="title-When">
                  <div>
                    <p className="tilte">{item.title}</p>
                  </div>

                  <div className="time-history">
                    <div>
                      <p className="history">{item.history.split("T")[0]}</p>
                    </div>
                    <div>
                      <p>{item.whentime}</p>
                    </div>
                  </div>
                </div>

                <p className="desc">{item.descript}</p>
                <hr />
                <div className="button-Task">
                
                {item.user_id === userId && (
                  <>
                  <div className="edit-delete">
                    <button
                      className="button-edit"
                      onClick={() => {
                        goToUpdate(item.id);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-pencil-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                      </svg>
                    </button>
                    <button
                      className="button-delete"
                      onClick={() => {
                        deleteTheTask(item.id);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-trash-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                      </svg>
                    </button>
                  </div>

                  </>
                )}

                  <div>
                    <button
                      className="button-favorite"
                      onClick={() => {
                        favorite(item.id);
                      }}
                    >
                      Add Favorite
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

        <button
          className="button-addTask"
          onClick={() => {
            navigate("/AddTask");
          }}
        >
          +
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default Tasks;
