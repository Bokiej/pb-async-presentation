const { exec } = require('child_process');
const express = require("express");
const open = require('open');
const path = require('path');

const app = express();
const port = 8000;

app.use(express.static(__dirname));
app.listen(port, async () => {
    console.log(`Server running on port ${port}`);
    await open('http://localhost:8000');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
});

app.get('/next-branch', (req, res) => {
    exec('git checkout -', (error, stdout, stderr) => {
        if (error) {
            console.error(`error: ${error.message}`);
            return res.status(500).send(error.message);
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return res.status(500).send(stderr);
        }
        res.send(stdout);
    });
});

