CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    Full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    pass VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    is_deleted SMALLINT DEFAULT 0
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    History DATE NOT NULL,
    whenTime TIME (0) NOT NULL,
    descript VARCHAR(255) NOT NULL,
    user_id INT,
    created_at TIMESTAMP DEFAULT NOW(),
    is_deleted SMALLINT DEFAULT 0 ,
    FOREIGN KEY (user_id ) REFERENCES users (id)
    
);
CREATE TABLE favorite(
  id SERIAL PRIMARY KEY,
  task_id INT,
  user_id INT,
   is_deleted SMALLINT DEFAULT 0 ,
  FOREIGN KEY (task_id ) REFERENCES tasks(id),
   FOREIGN KEY (user_id ) REFERENCES users(id)
  
);