const express = require("express");

const cors = require("cors");
require("./models/database");
const app = express();
const PORT = 5000;
app.use(express.json());
app.use(cors());

// Import Routers
const taskRouter = require("./routes/task");
const userRouter = require("./routes/user");
const favoriteRouter = require("./routes/favorite");

// Routes Middleware
app.use("/users", userRouter);
app.use("/task", taskRouter);
app.use("/favorite", favoriteRouter);

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server is Connecting on Port ${PORT}`);
});
