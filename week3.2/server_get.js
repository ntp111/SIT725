const express = require("express");
const app = express();
const fs = require('fs');
const { evaluate } = require('mathjs');

app.use(express.json());
app.use(express.static("public"));


app.get("/", (req, res) => {
    const { name } = req.query;
    res.render("home", { title: "Home", name: name });
});



// Route to handle calculation
app.post('/calculate', (req, res) => {
    const { expression } = req.body;

    try {
        // Evaluate the expression using mathjs
        const result = evaluate(expression);

        // Save the expression and result to history.txt
        const historyEntry = `${expression} = ${result}\n`;
        fs.appendFile('history.txt', historyEntry, (err) => {
            if (err) {
                console.error('Failed to save history:', err);
            }
        });

        // Send the result back
        res.json({ result });
    } catch (error) {
        res.status(400).json({ error: 'Invalid expression' });
    }
});



app.get('/history', (req, res) => {
    fs.readFile('history.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Failed to read history:', err);
            res.status(500).json({ error: 'Failed to retrieve history' });
            return;
        }

        const history = data.trim().split('\n').map(entry => {
            const [expression, result] = entry.split(' = ');
            return { expression, result };
        });

        res.json({ history });
    });
});



const port = 3040;
app.listen(port, () => {
    console.log("hello i'm listening to port " + port);
});
