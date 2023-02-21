import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setfavorite ,deleteItemFavorite } from "../../redux/reducers/favorite";
import "./style.css";

const Favorite = () => {
  const dispatch = useDispatch();



  
  const { favorite, userId,token } = useSelector((state) => {
    return {
      favorite: state.favorite.favorite,
      userId: state.auth.userId,
      token: state.auth.token,
    };
  });
  console.log(favorite);
  const navigate = useNavigate();
  
  const getfavorited = () => {
    axios
      .get(`http://localhost:5000/favorite/${userId}`)
      .then((result) => {
       
        dispatch(setfavorite(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getfavorited();
  }, []);


const deleteFavorite =(id)=>{
 
  axios.delete(`http://localhost:5000/favorite/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((result)=>{
    dispatch(deleteItemFavorite(id))
  })
  .catch((err)=>{
    console.log(err);
  })
  
}






  return (
    <div className="contanir-favorite">
      <h3 className="favorite">Favorite</h3>
      <div className="favorite-grid">
        {favorite.length &&
          favorite.map((item) => {
          
            return (
              <div>
                <div className="card">
                  <div className="title-When">
                    <div>
                      <p className="tilte">{item.title}</p>
                    </div>

                    <div className="time-history">
                      <div>
                        <p className="history">{item.history}</p>
                      </div>
                      <div>
                        <p>{item.whentime}</p>
                      </div>
                    </div>
                  </div>

                  <p className="desc">{item.descript}</p>
                 <button className="butt-delete" onClick={()=>deleteFavorite(item.id)}> Delete</button>
                </div>
             
              </div>
              
            );
          })}
          
      </div>

      <button 
        className="button-back"
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </button>
    </div>
  );
};

export default Favorite;
