const { pool } = require("../models/database");

const addTask = (req, res) => {
  const { title, History, whenTime, descript, user_id } = req.body;
  const values = [title, History, whenTime, descript, user_id];
  const query = `INSERT INTO tasks(title, History ,whenTime ,descript,user_id) VALUES($1,$2,$3,$4,$5) RETURNING *`;
  pool
    .query(query, values)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Create Successfully",
        result: result.rows[0],
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        success: false,
        Error: err,
      });
    });
};

const getTask = (req, res) => {
  const userId = req.params.id;
  // const query = `SELECT tasks.id,title,history,whentime,descript,user_id FROM tasks
  //  inner join users on tasks.user_id=users.id
  //   WHERE tasks.is_deleted = 0 AND tasks.user_id=${userId}`;
  const query = `SELECT tasks.id,title,history,whentime,descript,user_id FROM tasks
   WHERE tasks.is_deleted = 0 `;
  pool
    .query(query)
    .then((result) => {
      res.status(201).json({
        success: true,
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        Error: err,
      });
    });
};

const updateTask = (req, res) => {
  const taskId = req.params.id;
  const { title, History, whenTime, descript } = req.body;
  const values = [
    title || null,
    History || null,
    whenTime || null,
    descript || null,
  ];
  const query = `UPDATE tasks
    SET title = COALESCE($1 , title), 
    History = COALESCE($2 , History), 
    whenTime = COALESCE($3 , whenTime),
    descript = COALESCE($4 , descript)
    WHERE id =${taskId}
    RETURNING *;`;
  pool
    .query(query, values)
    .then((result) => {
      console.log(result);
      res.status(200).json({
        success: true,
        massage: `Updated successfully`,
        result: result.rows[0],
      });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        massage: `Server Error`,
        error: err,
      });
    });
};

const deleteTask = (req, res) => {
  const taskId = req.params.id;
  const query = `UPDATE tasks SET is_deleted = 1 WHERE id=${taskId};`;
  pool
    .query(query)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Delete Successfly",
      });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        Error: err,
      });
    });
};

const searchTasksByTitle = (req, res) => {
  //REGEXP
  const userId = req.params.id;
  const query = `SELECT tasks.id,title,history,whentime,descript,user_id FROM tasks
  inner join users on tasks.user_id=users.id WHERE title LIKE '%${req.query.title}%' AND tasks.is_deleted=0 AND tasks.user_id=${userId} `;

  pool
    .query(query)
    .then((result) => {
      if (result.rowCount === 0) {
        res.status(404).json({
          success: false,
          massage: `The Tasks is not Found`,
        });
      } else {
        res.status(200).json({
          success: true,
          massage: `Tasks find successfully`,
          result: result.rows,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        massage: `Server Error`,
        err: err,
      });
    });
};

module.exports = {
  addTask,
  updateTask,
  deleteTask,
  getTask,
  searchTasksByTitle,
};
