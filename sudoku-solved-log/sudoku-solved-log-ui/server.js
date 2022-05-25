const express = require('express');
const app = express();
const http = require('http');
const path = require('path');

const server = http.createServer(app);


app.use(express.static(path.join(__dirname, 'dist', 'sudoku-solved-log-ui')));

app.get('/*', async (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'sudoku-solved-log-ui', 'index.html'));
});

const port = process.env.PORT || 3000
server.listen(port, () => {
    console.log(`App running on *: ${port}...`);
})