const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/taskRoutes');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log(err));

app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Task-Service running on port ${PORT}`);
});
