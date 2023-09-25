const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: 'https://www.kalypsohospitality.com',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/submit-form', async (req, res) => {
    try {
        // Extract the phone number from the request
        const phoneNumber = req.body.phoneNumber;

        // Create an object with the form data to send to Formspree
        const formData = {
            phoneNumber: phoneNumber,
        };

        // Send the form data to Formspree
        const response = await axios.post('https://formspree.io/f/mbjvzplk', formData);

        if (response.status === 200) {
            res.status(200).send('Form submitted successfully.');
        } else {
            res.status(500).send('Failed to submit the form.');
        }
    } catch (error) {
        console.error('Error submitting form:', error.message);
        res.status(500).send('Error submitting form: ' + error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
