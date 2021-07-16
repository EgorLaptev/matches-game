'use strict';

import Game from "./Game.js";



const playButton = document.getElementById('continue');

playButton.addEventListener('click', init);

function init() {
    playButton.textContent = "Next level"
    playButton.disabled = true;
    playButton.removeEventListener('click', init);
    Game.init();
}