/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { make_road, user_level } from './game_tools/game_design';
import { top_ui } from './game_tools/global_ui';
import { play_game_data, user_data } from './server';
class mainMenu extends Phaser.Scene {
	constructor() {
		super({ key: 'mainMenu' });

	}


	init(data) {
		this.user_level = data.level;
	}


	async preload() { }

	async create() {
		this.data = await play_game_data();
		this.user_path_season_id = parseInt(localStorage.getItem('current_season_id'));
		this.user_path_completed = parseInt(localStorage.getItem('current_completed'));
		this.user_path_length = parseInt(localStorage.getItem('current_length'));
		await top_ui(this, 'main');
		if (this.user_level === 1) {
			this.play_ui_enabled(280, 500, 250, '6ab615');
			this.play_ui_disable(680, 500, 150, 'f39c12');
		}
		else if (this.user_level === 2) {
			this.play_ui_enabled(280, 500, 250, 'f39c12');
			this.play_ui_disable(680, 500, 150, 'e74c3c');
		}
		else if(this.user_level === 3){
			this.red_play_ui(450, 500, 250);
		}
		// await this.play_ui();
		await this.down_ui();
	}

	user_level_ui(season_id, completed, length, y) {

		this.season_detail_text = this.add.text(
			320 * this.distance,
			y * this.distance,
			`فـصـل :   ${season_id}`
		)
			.setColor('#fff')
			.setFontFamily('Lalezar')
			.setFontSize(55 * this.distance)
			.setPadding(0, 0, 0, 5);
		// .initRTL()

		this.season_detail_text = this.add.text(
			110 * this.distance,
			y * this.distance,
			`${completed} / ${length}`
		)
			.setColor('#fff')
			.setFontFamily('Lalezar')
			.setFontSize(60 * this.distance)
			.setPadding(0, 0, 0, 5);
		// .initRTL()

	}

	async play_game() {
		this.play_game_check = true;
		await make_road(this.data.word_list, this.data.finished_word, this.data.remembers_word, this.language_id, res => {
			this.play_game_check = false;
			this.scene.start('playGame', {
				word_id: 0,
				language_id: this.language_id,
				word_data: res
			});
		});
	}


	red_play_ui(y, width, height) {
		this.add.text(
			100 * this.distance,
			(y - 110) * this.distance,
			'سـطـح  حـرفـه‌ای'
		)
			.setColor('#e74c3c')
			.setFontFamily('Lalezar')
			.setFontSize(70 * this.distance)
			.setPadding(0, 0, 0, 15);

		const seprator = new Phaser.Geom.Line(
			80 * this.distance,
			(y - 20) * this.distance,
			530 * this.distance,
			(y - 20) * this.distance,
		);
		this.add.graphics()
			.lineStyle(1, 0x222222, 0.5)
			.setDepth(100)
			.strokeLineShape(seprator);

		const play_area_graphic = this.add.graphics();
		play_area_graphic.fillStyle(0xe74c3c, 1);

		play_area_graphic.fillRoundedRect(
			55 * this.distance,
			y * this.distance,
			width * this.distance,
			height * this.distance,
			45 * this.distance
		);

		const play_buttom = this.add.graphics();
		play_buttom.fillStyle(0xffffff, 1);

		play_buttom.fillRoundedRect(
			125 * this.distance,
			(y + 150) * this.distance,
			355 * this.distance,
			80 * this.distance,
			40 * this.distance
		);
		play_buttom.setInteractive(new Phaser.Geom.Rectangle(
			125 * this.distance,
			(y + 150) * this.distance,
			355 * this.distance,
			80 * this.distance,
			40 * this.distance
		), Phaser.Geom.Rectangle.Contains);
		this.play_game_check = false;
		play_buttom.on('pointerdown', () => {
			if (!this.play_game_check) {
				this.play_game();
			}
		});
		const exp_text = this.add.text(
			260 * this.distance,
			(y + 160) * this.distance,
			'شـروع', {
				fontSize: `${50 * this.distance}px`,
				color: '#e74c3c',
				fontFamily: 'Lalezar'
			})
			.setPadding(0, 0, 0, 15);

		this.user_level_ui(this.user_path_season_id, this.user_path_completed, this.user_path_length, (y + 60));

	}


	play_ui_disable(y, width, height, color) {
		this.add.text(
			100 * this.distance,
			(y - 110) * this.distance,
			(this.user_level === 1) ? 'سـطـح  مـتـوسـط' : 'سـطـح  حـرفـه‌ای'
		)
			.setColor(`#${color}`)
			.setFontFamily('Lalezar')
			.setFontSize(70 * this.distance)
			.setPadding(0, 0, 0, 15);

		const seprator = new Phaser.Geom.Line(
			80 * this.distance,
			(y - 20) * this.distance,
			530 * this.distance,
			(y - 20) * this.distance,
		);
		this.add.graphics()
			.lineStyle(1, 0x222222, 0.5)
			.setDepth(100)
			.strokeLineShape(seprator);
		const play_area_graphic = this.add.graphics();
		play_area_graphic.fillStyle(`0x${color}`, 1);
		play_area_graphic.fillRoundedRect(
			55 * this.distance,
			y * this.distance,
			width * this.distance,
			height * this.distance,
			35 * this.distance
		);

		const play_buttom = this.add.graphics();
		play_buttom.fillStyle(0xffffff, 1);

		play_buttom.fillRoundedRect(
			125 * this.distance,
			(y + 40) * this.distance,
			355 * this.distance,
			80 * this.distance,
			40 * this.distance
		);
		play_buttom.setInteractive(new Phaser.Geom.Rectangle(
			125 * this.distance,
			(y + 45) * this.distance,
			355 * this.distance,
			80 * this.distance,
			40 * this.distance
		), Phaser.Geom.Rectangle.Contains);
		this.play_game_check = false;
		play_buttom.on('pointerdown', () => {
			if (!this.play_game_check) {
				if (this.user_level === 1) {
					console.log('Test1');
				} else {
					console.log('Test1');
				}
			}
		});
		const exp_text = this.add.text(
			230 * this.distance,
			(y + 53) * this.distance,
			'امـتـحـان', {
				fontSize: `${50 * this.distance}px`,
				color: `#${color}`,
				fontFamily: 'Lalezar'
			})
			.setPadding(0, 0, 0, 15);

	}


	play_ui_enabled(y, width, height, color) {
		this.add.text(
			100 * this.distance,
			(y - 110) * this.distance,
			(this.user_level === 1) ? 'سـطـح 1 مـبـتـدی' : (this.user_level === 2) ?'سـطـح  مـتـوسـط' : 'سـطـح  حـرفـه‌ای'
		)
			.setColor(`#${color}`)
			.setFontFamily('Lalezar')
			.setFontSize(70 * this.distance)
			.setPadding(0, 0, 0, 15);

		const seprator = new Phaser.Geom.Line(
			80 * this.distance,
			(y - 20) * this.distance,
			530 * this.distance,
			(y - 20) * this.distance,
		);
		this.add.graphics()
			.lineStyle(1, 0x222222, 0.5)
			.setDepth(100)
			.strokeLineShape(seprator);

		const play_area_graphic = this.add.graphics();
		play_area_graphic.fillStyle(`0x${color}`, 1);

		play_area_graphic.fillRoundedRect(
			55 * this.distance,
			y * this.distance,
			width * this.distance,
			height * this.distance,
			45 * this.distance
		);

		const play_buttom = this.add.graphics();
		play_buttom.fillStyle(0xffffff, 1);

		play_buttom.fillRoundedRect(
			125 * this.distance,
			(y + 150) * this.distance,
			355 * this.distance,
			80 * this.distance,
			40 * this.distance
		);
		play_buttom.setInteractive(new Phaser.Geom.Rectangle(
			125 * this.distance,
			(y + 150) * this.distance,
			355 * this.distance,
			80 * this.distance,
			40 * this.distance
		), Phaser.Geom.Rectangle.Contains);
		this.play_game_check = false;
		play_buttom.on('pointerdown', () => {
			if (!this.play_game_check) {
				this.play_game();
			}
		});
		const exp_text = this.add.text(
			260 * this.distance,
			(y + 160) * this.distance,
			'شـروع', {
				fontSize: `${50 * this.distance}px`,
				color: `#${color}`,
				fontFamily: 'Lalezar'
			})
			.setPadding(0, 0, 0, 15);

		this.user_level_ui(this.user_path_season_id, this.user_path_completed, this.user_path_length, (y + 60));

	}


	down_ui() {
		this.down_area_left = this.add.graphics()
			.fillStyle(0x6ab615, 1)
			.fillRect(
				0,
				940 * this.distance,
				306 * this.distance,
				140 * this.distance,
			)
			.setInteractive(
				new Phaser.Geom.Rectangle(
					0,
					940 * this.distance,
					306 * this.distance,
					140 * this.distance,
				),
				Phaser.Geom.Rectangle.Contains
			)
			.on('pointerdown', async () => {
				this.user = await user_data();
				if (this.user.name === null || this.user.avatar === null)
					this.scene.start('userDetail');
				else
					this.scene.start('leaderboard');
			});

		this.down_area_right = this.add.graphics()
			.fillStyle(0x6ab615, 1)
			.fillRect(
				305 * this.distance,
				940 * this.distance,
				306 * this.distance,
				140 * this.distance,
			)
			.setInteractive(
				new Phaser.Geom.Rectangle(
					305 * this.distance,
					940 * this.distance,
					306 * this.distance,
					140 * this.distance,
				),
				Phaser.Geom.Rectangle.Contains
			)
			.on('pointerdown', () => {
				this.scene.start('shop');
			});

		this.seprator_down = new Phaser.Geom.Line(
			305 * this.distance,
			960 * this.distance,
			305 * this.distance,
			1060 * this.distance
		);
		this.down_graphics = this.add.graphics();
		this.down_graphics.lineStyle(3, 0xffffff, 1.0);
		this.down_graphics.setDepth(100);
		this.down_graphics.strokeLineShape(this.seprator_down);

		// Best 
		const best_places = {
			flag: {
				x: 150 * this.distance,
				y: 930 * this.distance
			},
			text: {
				x: 100 * this.distance,
				y: 1010 * this.distance,
				font_size: 35 * this.distance,
				color: '#fff'
			}
		};

		this.best_flag = this.add.image(
			best_places.flag.x,
			best_places.flag.y,
			'best_flag',
		)
			.setScale(2 / 3 * this.distance);

		this.best_text = this.add.text(
			best_places.text.x,
			best_places.text.y,
			'برترین‌ها')
			.setFontSize(best_places.text.font_size)
			.setColor(best_places.text.color)
			.setFontFamily('Lalezar')
			.setPadding(0, 0, 0, 15);


		// Shop 
		const shop_places = {
			flag: {
				x: 460 * this.distance,
				y: 950 * this.distance
			},
			text: {
				x: 410 * this.distance,
				y: 1010 * this.distance,
				font_size: 35 * this.distance,
				color: '#fff'
			}
		};

		this.shop_flag = this.add.image(
			shop_places.flag.x,
			shop_places.flag.y,
			'shop_flag',
		)
			.setScale(2 / 3.5 * this.distance);

		this.shop_text = this.add.text(
			shop_places.text.x,
			shop_places.text.y,
			'فروشگاه')
			.setFontSize(`${shop_places.text.font_size}px`)
			.setColor(`${best_places.text.color}`)
			.setFontFamily('Lalezar')
			.setPadding(0, 0, 0, 5);
	}
}


export default mainMenu;