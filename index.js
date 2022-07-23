const { exec } = require('child_process');
const express = require("express");
const open = require('open');
const path = require('path');

const app = express();
const bodyParser = require('body-parser');
const port = 8000;

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.listen(port, async () => {
    console.log(`Server running on port ${port}`);
    await open('http://localhost:8000');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
});

app.post('/next-branch', (req, res) => {
    const { branch } = req.body;

    exec(`git stash && git checkout ${branch}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`error: ${error.message}`);
            return res.status(500).send(error.message);
        }
        res.send(stdout);
    });
});

