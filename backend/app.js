const express = require('express');
const app = express();
const cors = require('cors');
const database = require('./models');
const productsRouter = require("./routes/Products");
const usersRouter = require("./routes/Users");

app.use(express.json());
app.use(cors());
app.use("/products", productsRouter);
app.use("/validation", usersRouter);

database.sequelize.sync().then(() => {
    app.listen(8080, () => {
        console.log("Server works on port 8080");
    });
});
