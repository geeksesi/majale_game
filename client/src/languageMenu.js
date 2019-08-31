/* eslint-disable no-undef */
class languageMenu extends Phaser.Scene {
	constructor() {
		super({ key: 'languageMenu' });

	}
	preload() {
		console.log('lanf');
	}
	create() {

		this.en_text = this.add.text(80, 300, 'english', { fontSize: '50px', color: '#2f2f2f', height: 80, width: 150 });
		this.ar_text = this.add.text(80, 500, 'العربی', { fontSize: '50px', color: '#2f2f2f', height: 80, width: 150 });

		this.en_text.setInteractive();
		this.ar_text.setInteractive();

		this.en_text.on('pointerdown', () => { this.playGame_now(2); }, this, 2);
		this.ar_text.on('pointerdown', () => { this.playGame_now(3); }, this, 3);
	}


	playGame_now(language_id) {
		localStorage.setItem('language_id', language_id);
		this.scene.start('mainMenu');
	}
}

export default languageMenu;