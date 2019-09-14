import { loading_finished, get_user_level } from './server';
import { loading_start, loading_stop } from './game_tools/loading_ui';
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { user_level } from './game_tools/game_design';

class seasonMenu extends Phaser.Scene {
	constructor() {
		super({ key: 'loading' });

	}

	async preload() {
		this.load.setPath('assets');
		this.load.image('english_flag', 'Eng_flag.png');
		this.load.image('exp_icon', 'xp.png');
		this.load.image('coin_icon', 'coin.png');
		this.load.image('back', 'back.png');
		this.load.image('avatar1', 'av1.png');
		this.load.image('avatar2', 'av2.png');
		this.load.image('avatar3', 'av3.png');
		this.load.image('avatar4', 'av4.png');
		this.load.image('avatar5', 'av5.png');
		this.load.image('avatar6', 'av6.png');
		this.load.image('avatar7', 'av7.png');
		this.load.image('avatar8', 'av8.png');
		this.load.image('avatar9', 'av9.png');
		this.load.image('avatar10', 'av10.png');
		this.load.image('best_flag', 'ranking.png');
		this.load.image('shop_flag', 'shop.png');

		this.load.audio('a_bg', 'bg_music.mp3');
		for (let index = 1; index < 11; index++) {
			this.load.audio(`a_${index}`, `musics/one/${index}.wav`);
		}
		for (let index = 1; index < 13; index++) {
			this.load.audio(`b_${index}`, `musics/two/${index}.wav`);
		}
		for (let index = 1; index < 27; index++) {
			this.load.audio(`c_${index}`, `musics/three/${index}.wav`);
		}


		this.show_progress();
		console.log('loading');

		let image_loaded = false;
		this.load.on('complete', function () {
			image_loaded = true;
		});
		loading_finished(res2 => {
			user_level(res => {
				localStorage.setItem('current_season_id', res.season_id);
				localStorage.setItem('current_completed', res.completed);
				localStorage.setItem('current_length', res.length);
			});
			let wait_for_image = setInterval(async () => {
				if (image_loaded) {
					this.hide_progress();
					clearInterval(wait_for_image);
				}
			}, 700);
		});
	}

	show_progress() {
		this.scale2_value = 1;
		this.distance = this.sys.game.config.width / 610;
		const make_green = this.add.graphics()
			.fillStyle(0x6ab615)
			.fillRect(
				0,
				0,
				610 * this.distance,
				1080 * this.distance
			);
		this.logo = this.add.image(
			310 * this.distance,
			350 * this.distance,
			'logo'
		).setScale(this.distance);

		this.Majle_text_en = this.add.text(
			220 * this.distance,
			750 * this.distance,
			'Majale'
		)
			.setFontSize(55 * this.distance)
			.setFontFamily('Lalezar')
			.setColor('#fff')
			.setScale(this.scale2_value);

		this.Majle_text_fa = this.add.text(
			220 * this.distance,
			850 * this.distance,
			'مـــجـــلـــه'
		)
			.setFontSize(45 * this.distance)
			.setFontFamily('Lalezar')
			.setColor('#fff')
			.setScale(this.scale2_value);


		loading_start(this);
	}

	async hide_progress() {
		loading_stop(this);
		const user_level = await get_user_level();
		if (user_level === null)
			this.scene.start('mainMenu', { level: 1 });
		else
			this.scene.start('mainMenu', { level: user_level });
	}

}

export default seasonMenu;