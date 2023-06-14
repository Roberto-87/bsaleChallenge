const app = require("./src/app");

app.listen(3001, () => {
  console.log("server raised at port 3001");
});

module.exports = app;
