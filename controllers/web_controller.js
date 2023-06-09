const path = require('path');

async function main(req, res) {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
}
async function createShow(req, res) {
  res.sendFile(path.join(__dirname, '../public', 'createShow.html'));
}
async function createSerie(req, res) {
  res.sendFile(path.join(__dirname, '../public', 'createSerie.html'));
}
async function deleteShow(req, res) {
  res.sendFile(path.join(__dirname, '../public', 'deleteShow.html'));
}
async function deleteSerie(req, res) {
  res.sendFile(path.join(__dirname, '../public', 'deleteSerie.html'));
}
async function editShow(req, res) {
  res.sendFile(path.join(__dirname, '../public', 'editShow.html'));
}
async function editSerie(req, res) {
  res.sendFile(path.join(__dirname, '../public', 'editSerie.html'));
}

module.exports = {
  main,
  createShow,
  createSerie,
  deleteShow,
  deleteSerie,
  editShow,
  editSerie,
};
