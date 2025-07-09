const Season = require("../models/Season");

// add
function addSeason(season) {
  return Season.create(season);
}

function getSeasons() {
  return Season.find();
}

function getSeason(id) {
  return Season.findById(id);
}

module.exports = {
  addSeason,
  getSeasons,
  getSeason,
};
