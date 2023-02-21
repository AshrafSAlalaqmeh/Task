const {pool} = require("../models/database")

const addfavorite=(req ,res)=>{
    const {task_id,user_id}= req.body
    const value =[task_id,user_id]
    const query = `INSERT INTO favorite(task_id ,user_id) VALUES($1 ,$2) RETURNING *`
    pool.query(query , value)
    .then((result)=>{
       res.status(200).json({
        success:true,
        Result:result.rows
       })
    })
    .catch((err)=>{
        console.log(err);
        res.status(404).json({
            success:false,
            Error:err
           })
    })
    
}

const getfavorite=(req , res)=>{
     const userId=req.params.id
    const query=`SELECT favorite.id,title,history,whentime,descript FROM favorite 
    inner join tasks on favorite.task_id=tasks.id 
    inner join users on favorite.user_id=users.id
    WHERE  favorite.is_deleted=0 AND favorite.user_id=${userId}`
    pool.query(query)
    .then((result)=>{
    console.log(result.rows);
    res.status(200).json({
        sucess:true,
        result :result.rows
    })
    })
    .catch((err)=>{
        res.status(404).json({
            sucess:false,
           Error:err
        })
    })
}

const deleteFavorite = (req , res)=>{
    const favoriteId = req.params.id
    const query = `UPDATE favorite SET is_deleted = 1 WHERE id=${favoriteId};`;
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
}

module.exports={addfavorite , getfavorite ,deleteFavorite}