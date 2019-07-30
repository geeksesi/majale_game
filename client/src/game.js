// const { init } = require('./server');
const gameanalytics = require('gameanalytics');
gameanalytics.GameAnalytics.setEnabledInfoLog(true);
gameanalytics.GameAnalytics.configureBuild("majale 0.4.0");
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
    scene: [loading, mainMenu, season_finish, playGame]
        // scene: [mainMenu,  playGame]
        // scene: [season_finish],
        // scene: [loading],
        // scene: [languageMenu, seasonMenu, wordMenu, playGame],
        // scene: [seasonMenu],
        // scene: [wordMenu],
        // scene: [mainMenu],
};


// game.stage.scale.startFullScreen();
// game.scale.scaleMode             = Phaser.ScaleManager.SHOW_ALL;
// game.scale.pageAlignHorizontally = true;
// game.scale.pageAlignVertically   = true;

import loading from './loading';
import mainMenu from './mainMenu';
import languageMenu from './languageMenu';
import seasonMenu from './seasonMenu';
import wordMenu from './wordMenu';
import playGame from './playGame';
import season_finish from './season_finish';


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
        // game.scene.start('playGame', {
        //     season_id: 1,
        //     word_id: 0,
        // });

        // game.scale.resize(width, (width / ratio));
    } else {
        canvas.style.width = (height * ratio) + "px";
        canvas.style.height = height + "px";
        config.width = (height * ratio);
        config.height = height;
        let game = new Phaser.Game(config);

        // game.scene.start('playGame', {
        //     season_id: 1,
        //     word_id: 0,
        // });
        // game.scale.resize((height * ratio), height);
    }
    // game.scale.resize(window.innerWidth, window.innerHeight);
}


window.onload = async() => {
    // await init();
    resize();
    window.addEventListener("resize", resize, false);

};