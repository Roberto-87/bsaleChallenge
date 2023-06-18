const app = require("./src/app");
const PORT = process.env.PORT || 3977;

app.listen(PORT, () => {
  console.log(`Server raised at port 3001 ${PORT}`);
});
