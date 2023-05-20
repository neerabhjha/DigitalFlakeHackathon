const express = require("express");
const dbConnect = require("./dbConnect");
const app = express();
const port = 4000;
const UserRouter = require("./routers/UserRouter");

app.use(express.json({ limit: "100mb" }));

app.use("/api/user", UserRouter);

dbConnect();
app.listen(port, (req, res) => {
  console.log(`Listning on port: ${port}`);
});
