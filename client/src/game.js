const { init } = require('./server');

init();

const config = {
    type: Phaser.CANVAS,
    canvas: document.getElementById('myCanvas'),
    width: 600,
    height: 1080,
    backgroundColor: 0xefefef,
    // scale: {
    //     mode: Phaser.Scale.NONE,
    //     width: 600,
    //     height: 1080
    // },
    // scene: [mainMenu, languageMenu, seasonMenu, wordMenu, playGame]
    // scene: [mainMenu,  playGame]
    // scene: [playGame],
    scene: [languageMenu, seasonMenu],
    // scene: [seasonMenu],
    // scene: [wordMenu],
    // scene: [mainMenu],
};


// game.stage.scale.startFullScreen();
// game.scale.scaleMode             = Phaser.ScaleManager.SHOW_ALL;
// game.scale.pageAlignHorizontally = true;
// game.scale.pageAlignVertically   = true;

import mainMenu from './mainMenu.js';
import languageMenu from './languageMenu.js';
import seasonMenu from './seasonMenu.js';
import wordMenu from './wordMenu.js';
import playGame from './playGame.js';


function resize() {
    let canvas = document.querySelector("canvas");
    let width = window.innerWidth;
    let height = window.innerHeight;
    let wratio = width / height;
    let ratio = config.width / config.height;
    if (wratio < ratio) {
        canvas.style.width = width + "px";
        canvas.style.height = (width / ratio) + "px";
        config.width = width;
        config.height = (width / ratio);
        let game = new Phaser.Game(config);

        // game.scale.resize(width, (width / ratio));
    } else {
        canvas.style.width = (height * ratio) + "px";
        canvas.style.height = height + "px";
        config.width = (height * ratio);
        config.height = height;
        let game = new Phaser.Game(config);

        // game.scale.resize((height * ratio), height);
    }
    // game.scale.resize(window.innerWidth, window.innerHeight);
}


window.onload = () => {
    resize();
    window.addEventListener("resize", resize, false);

};