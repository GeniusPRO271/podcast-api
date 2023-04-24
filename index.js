const app = require('./app');
const client = require('./redis');

// Wait for Redis client to connect before starting app

client.connect();
client.on('connect', () => {
  const PORT = process.env.PORT;
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (err) {
    console.log(err);
    console.log('NOT A VALID PORT');
  }
});
