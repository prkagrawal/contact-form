const express = require("express");
const app = express();
const cors = require('cors');
const connectDB = require("./db");

connectDB();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req,res) => {
  res.status(200).json({"message":"working"})
});

app.use('/api/formdata', require("./routes/api/formData"));

app.listen(port, () => console.log(`App listening on port ${port}`));