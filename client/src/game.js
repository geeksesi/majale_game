/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const { connection_check } = require('./server');
const config = {
	type: Phaser.CANVAS,
	canvas: document.getElementById('myCanvas'),
	parent: 'myGame',
	backgroundColor: 0xefefef,
	width: 610,
	height: 1080,
	scene: [detail, loading, userDetail, mainMenu, playGame, shop, leaderboard]
};

connection_check();

import test from './testui';
import detail from './detailScene';
import loading from './loading';
import mainMenu from './mainMenu';
import userDetail from './userDetailScene';
import leaderboard from './leaderboardScene';
import shop from './shopScene';
import playGame from './playGame';


function resize() {
	const canvas = document.getElementById('myCanvas');
	const width = window.innerWidth;
	const height = window.innerHeight;
	const wratio = width / height;
	const ratio = config.width / config.height;
	if (wratio < ratio) {
		canvas.style.width = width + 'px';
		canvas.style.height = (width / ratio) + 'px';
		config.width = width;
		config.height = (width / ratio);
		const game = new Phaser.Game(config);
		// game.scale.resize(width, (width / ratio));
	} else {
		canvas.style.width = (height * ratio) + 'px';
		canvas.style.height = height + 'px';
		config.width = (height * ratio);
		config.height = height;
		const game = new Phaser.Game(config);
		// game.scale.resize((height * ratio), height);
	}
	// game.scale.resize(window.innerWidth, window.innerHeight);
}


window.onload = () => {
	// await init();
	resize();
	// window.addEventListener("resize", resize, false);

};