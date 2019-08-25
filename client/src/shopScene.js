/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { top_ui } from './game_tools/global_ui';
import { shop_ui } from './game_tools/shop_ui';

class leaderboard extends Phaser.Scene {
	constructor() {
		super({ key: 'shop' });

	}

	preload() {

	}

	async create() {

		await top_ui(this, 'leaderboard');
		this.places = {
			offset_navbar: 160 * this.distance,
			top_offset: 100 * this.distance,
			row_size: 80 * this.distance,
			width_offset: 30 * this.distance,
		};



		// Best Text
		this.best_text = this.add.text(
			220 * this.distance,
			this.places.offset_navbar,
			'فـروشـگـاه',
		)
		// .initRTL()
			.setColor('#222')
			.setFontSize(45 * this.distance)
			.setFontFamily('Lalezar');

		this.best_seprator = this.add.graphics()
			.lineStyle(3 * this.distance, 0xa0a0a0, 1)
			.lineBetween(
				230 * this.distance,
				this.places.offset_navbar + 60 * this.distance,
				370 * this.distance,
				this.places.offset_navbar + 60 * this.distance,
			);



		await shop_ui(this, 'shop');
	}


}

export default leaderboard;