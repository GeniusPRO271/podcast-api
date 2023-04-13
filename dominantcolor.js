const Vibrant = require('node-vibrant');

async function getDominantColor(filePath) {
  const palette = await Vibrant.from(filePath).getPalette();
  const dominantColor =
    palette.Vibrant ||
    palette.Muted ||
    palette.DarkVibrant ||
    palette.DarkMuted ||
    palette.LightVibrant ||
    palette.LightMuted;
  return dominantColor.hex || '#000000';
}
module.exports = getDominantColor;
