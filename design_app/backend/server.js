const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


app.post('/api/results', (req, res) => {
  const { mode, score, time } = req.body;
  const newEntry = `${mode}, ${score}, ${time}\n`;
  const filePath = path.join(__dirname, 'results.csv');
  console.log("ABSOLUTE PATH:", filePath);
  fs.appendFile(filePath, newEntry, (err) => {
    if (err) {
      console.error('Error writing to CSV file:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.status(200).send('Data saved successfully');
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}
);