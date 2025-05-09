const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3009;

const token = "mrDCnGqnLfihKSXNbsfh"; 
const target = "6282261325895,6282349273941,6285241419991"; 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('API is running. Use POST /send to send coordinates.');
});

app.post('/send', async (req, res) => {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
        return res.status(400).json({ detail: 'Latitude and longitude are required.' });
    }

    const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

    try {
        const response = await axios.post('https://api.fonnte.com/send', {
            target: target,
            message: `Tolong Saya Kena Bully, Lokasi Saya Di Sini ${mapsLink}`,
        }, {
            headers: {
                "Authorization": token
            }
        });

        const responseDetail = response.data.detail || 'No response available';
        res.json({ detail: responseDetail });
    } catch (error) {
        console.error(error);
        res.status(500).json({ detail: 'Error sending request to the API.' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
