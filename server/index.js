const express = require("express");
const dbConnect = require("./dbConnect");
const app = express();
const port = 4000;
const UserRouter = require("./routers/UserRouter");
const CategoryRouter = require("./routers/CategoryRouter");
const ProductRouter = require("./routers/ProductRouter");

app.use(express.json({ limit: "100mb" }));

app.use("/api/user", UserRouter);
app.use("/api/category", CategoryRouter);
app.use("/api/product", ProductRouter);

dbConnect();
app.listen(port, (req, res) => {
  console.log(`Listning on port: ${port}`);
});
