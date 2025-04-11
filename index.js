const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();


app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '6_Save-Health')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '6_Save-Health', 'index.html'));
});

app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, '6_Save-Health', 'test', 'index_test.html'));
  });



const token = process.env.TELEGRAM_BOT_TOKEN;
const id = process.env.CHAT_ID;

app.post('/send-feedback', async (req, res) => {
    const message = req.body.message;

    if (!message) {
        return res.status(400).json({ status: 'Порожнє повідомлення' });
    }

    try {
        const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: id,
                text: `Новий відгук:\n${message}`
            })
        });

        const data = await telegramResponse.json();

        if (data.ok) {
            res.json({ status: 'Відгук надіслано!' });
        } else {
            console.error('Помилка Telegram:', data);
            res.status(500).json({ status: 'Помилка при надсиланні в Telegram' });
        }

    } catch (error) {
        console.error('Помилка запиту до Telegram:', error);
        res.status(500).json({ status: 'Помилка сервера' });
    }
});

  

const PORT = process.env.PORT;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Сервер запущено на порту: ${PORT}`);
});