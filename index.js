const app = require('./app');

// Start the server
const PORT = process.env.PORT;
try {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
} catch (err) {
  console.log(err);
  console.log('NOT A VALID PORT');
}
