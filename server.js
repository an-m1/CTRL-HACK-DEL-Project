const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/patientPortal', { useNewUrlParser: true, useUnifiedTopology: true });

// Define Patient schema and model
const patientSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    records: [String],
    messages: [{ from: String, to: String, content: String }]
});
const Patient = mongoose.model('Patient', patientSchema);

// Register route
app.post('/api/register', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const patient = new Patient({ ...req.body, password: hashedPassword });
    await patient.save();
    res.send('Patient registered');
});

// Login route
app.post('/api/login', async (req, res) => {
    const patient = await Patient.findOne({ email: req.body.email });
    if (!patient || !(await bcrypt.compare(req.body.password, patient.password))) {
        return res.status(401).send('Invalid credentials');
    }
    const token = jwt.sign({ id: patient._id }, 'secretkey');
    res.json({ token });
});

// Middleware to authenticate using JWT
const authenticate = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, 'secretkey');
        req.patientId = decoded.id;
        next();
    } catch (error) {
        res.status(401).send('Unauthorized');
    }
};

// Get health records route
app.get('/api/records/:patientId', authenticate, async (req, res) => {
    const patient = await Patient.findById(req.params.patientId);
    res.send(patient.records);
});

// Send a message route
app.post('/api/messages', authenticate, async (req, res) => {
    const { from, to, content } = req.body;
    const recipient = await Patient.findOne({ name: to });
    if (!recipient) return res.status(404).send('Recipient not found');
    recipient.messages.push({ from, to, content });
    await recipient.save();
    res.send('Message sent');
});

app.listen(3000, () => console.log('Server running on port 3000'));
