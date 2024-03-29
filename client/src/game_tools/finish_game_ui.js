/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { number_animation, finish_number_animation } from './mechanism';
import { finish_change } from './global_ui';


function season_finish(my_this, percent) {
	my_this.make_bg_darked = my_this.add.graphics()
		.fillStyle(0x222222, 0.3)
		.fillRect(
			-10,
			-10,
			630 * my_this.distance,
			1100 * my_this.distance
		);


	my_this.season_finish_bg = my_this.add.graphics()
		.fillStyle(0xffffff)
		.fillRoundedRect(
			80 * my_this.distance,
			350 * my_this.distance,
			460 * my_this.distance,
			340 * my_this.distance,
			40 * my_this.distance,
		)
		.lineStyle(
			2 * my_this.distance,
			0x6ab615
		)
		.strokeRoundedRect(
			80 * my_this.distance,
			350 * my_this.distance,
			460 * my_this.distance,
			340 * my_this.distance,
			40 * my_this.distance,
		);

	my_this.season_finish_precent_text = my_this.add.text(
		175 * my_this.distance,
		370 * my_this.distance,
		'شـمـا   ' + 0 + '%  از  زبـان '
	)
		.setFontFamily('Lalezar')
		.setFontSize(40 * my_this.distance)
		.setColor('#FFC312')
		.setPadding(0, 5, 0, 5);
	setTimeout(() => {
		let value = 0;
		const animat_interval = setInterval(() => {
			value += (percent < 30) ? 1 : 2;
			if (value <= percent) {
				my_this.season_finish_precent_text.setText('شـمـا   ' + value + '%  از  زبـان ');
			} else {
				clearInterval(animat_interval);
			}
		}, ((percent < 30)) ? 1000 / 30 : 1000 / 60);
	}, 500);

	my_this.season_finish_flag_text = my_this.add.text(
		255 * my_this.distance,
		445 * my_this.distance,
		'English'
	)
		.setFontFamily('Lalezar')
		.setFontSize(35 * my_this.distance)
		.setColor('#222')
		.setPadding(0, 5, 0, 5);


	my_this.season_finish_flag_flag = my_this.add.image(
		310 * my_this.distance,
		520 * my_this.distance,
		'english_flag'
	).setScale(my_this.distance);

	my_this.season_finish_bot_text = my_this.add.text(
		190 * my_this.distance,
		570 * my_this.distance,
		'را فـرا گـرفـتـه ایـد'
	)
		.setFontFamily('Lalezar')
		.setFontSize(45 * my_this.distance)
		.setColor('#FFC312')
		.setPadding(0, 5, 0, 5);


	my_this.season_finish_nex_btn = my_this.add.graphics()
		.fillStyle(0x6ab615)
		.fillRoundedRect(
			160 * my_this.distance,
			650 * my_this.distance,
			290 * my_this.distance,
			70 * my_this.distance,
			30 * my_this.distance
		).setInteractive(
			new Phaser.Geom.Rectangle(
				160 * my_this.distance,
				650 * my_this.distance,
				290 * my_this.distance,
				70 * my_this.distance,
			),
			Phaser.Geom.Rectangle.Contains
		).on('pointerdown', () => {
			finish_change(my_this.cr_timeout, my_this.cr_interval, my_this.coin_text, my_this.finish_coin);
			finish_change(my_this.xp_timeout, my_this.xp_interval, my_this.exp_text, my_this.finish_xp);
			setTimeout(() => {
				my_this.next_level();
			}, 1000);
		});

	my_this.season_finish_nex_btn = my_this.add.text(
		205 * my_this.distance,
		655 * my_this.distance,
		'فــصــل بــعــد'
	)
		.setFontFamily('Lalezar')
		.setFontSize(45 * my_this.distance)
		.setColor('#fff')
		.setPadding(0, 5, 0, 5);

}


function level_finish(my_this, value) {
	my_this.make_bg_darked = my_this.add.graphics()
		.fillStyle(0x222222, 0.3)
		.fillRect(
			-10,
			-10,
			630 * my_this.distance,
			1100 * my_this.distance
		);

	my_this.level_finish_bg = my_this.add.graphics()
		.fillStyle(0xffffff)
		.fillRoundedRect(
			80 * my_this.distance,
			330 * my_this.distance,
			460 * my_this.distance,
			350 * my_this.distance,
			50 * my_this.distance,
		)
		.lineStyle(
			2 * my_this.distance,
			0x6ab615
		)
		.strokeRoundedRect(
			80 * my_this.distance,
			330 * my_this.distance,
			460 * my_this.distance,
			350 * my_this.distance,
			50 * my_this.distance,
		);

	my_this.level_finish_good_text = my_this.add.text(
		230 * my_this.distance,
		370 * my_this.distance,
		'آفــریــن'
	)
		.setFontFamily('Lalezar')
		.setFontSize(55 * my_this.distance)
		.setColor('#FFC312')
		.setPadding(0, 5, 0, 5);


	my_this.level_finish_flag_xp = my_this.add.image(
		140 * my_this.distance,
		520 * my_this.distance,
		'exp_icon'
	).setScale(my_this.distance);

	my_this.level_finish_xp_text = my_this.add.text(
		220 * my_this.distance,
		485 * my_this.distance,
		0
	)
		.setFontFamily('Lalezar')
		.setFontSize(75 * my_this.distance)
		.setColor('#FFC312')
		.setPadding(0, 5, 0, 5);
	setTimeout(() => {
		number_animation(my_this.finish_xp_interval, my_this.level_finish_xp_text, 0, value, 1000 / 6);
	}, 500);

	my_this.level_finish_flag_coin = my_this.add.image(
		360 * my_this.distance,
		520 * my_this.distance,
		'coin_icon'
	).setScale(my_this.distance);

	my_this.level_finish_coin_text = my_this.add.text(
		445 * my_this.distance,
		485 * my_this.distance,
		0
	)
		.setFontFamily('Lalezar')
		.setFontSize(75 * my_this.distance)
		.setColor('#0984e3')
		.setPadding(0, 5, 0, 5);

	setTimeout(() => {
		number_animation(my_this.finish_coin_interval, my_this.level_finish_coin_text, 0, value * 5, 1000 / 30);
	}, 600);

	my_this.level_finish_nex_btn = my_this.add.graphics()
		.fillStyle(0x6ab615)
		.fillRoundedRect(
			160 * my_this.distance,
			645 * my_this.distance,
			290 * my_this.distance,
			70 * my_this.distance,
			30 * my_this.distance
		).setInteractive(
			new Phaser.Geom.Rectangle(
				160 * my_this.distance,
				645 * my_this.distance,
				290 * my_this.distance,
				70 * my_this.distance,
			),
			Phaser.Geom.Rectangle.Contains
		).on('pointerdown', () => {
			finish_number_animation(my_this.finish_coin_interval, my_this.level_finish_coin_text, value * 5);
			finish_number_animation(my_this.finish_xp_interval, my_this.level_finish_xp_text, value);
			finish_change(my_this.cr_timeout, my_this.cr_interval, my_this.coin_text, my_this.finish_coin);
			finish_change(my_this.xp_timeout, my_this.xp_interval, my_this.exp_text, my_this.finish_xp);
			setTimeout(() => {
				my_this.next_level();
			}, 1000);
		});

	my_this.level_finish_nex_btn = my_this.add.text(
		225 * my_this.distance,
		650 * my_this.distance,
		'بـــعـــدی'
	)
		.setFontFamily('Lalezar')
		.setFontSize(55 * my_this.distance)
		.setColor('#fff');
}


function test_level_finish(my_this, count) {
	const make_bg_darked = my_this.add.graphics()
		.fillStyle(0x222222, 0.3)
		.fillRect(
			-10,
			-10,
			630 * my_this.distance,
			1100 * my_this.distance
		);

	const level_finish_bg = my_this.add.graphics()
		.fillStyle(0xffffff)
		.fillRoundedRect(
			80 * my_this.distance,
			330 * my_this.distance,
			460 * my_this.distance,
			350 * my_this.distance,
			50 * my_this.distance,
		)
		.lineStyle(
			2 * my_this.distance,
			0x6ab615
		)
		.strokeRoundedRect(
			80 * my_this.distance,
			330 * my_this.distance,
			460 * my_this.distance,
			350 * my_this.distance,
			50 * my_this.distance,
		);

	const level_finish_good_text = my_this.add.text(
		230 * my_this.distance,
		370 * my_this.distance,
		'آفــریــن'
	)
		.setFontFamily('Lalezar')
		.setFontSize(55 * my_this.distance)
		.setColor('#FFC312')
		.setPadding(0, 5, 0, 5);


	const count_ui = my_this.add.text(
		220 * my_this.distance,
		500 * my_this.distance,
		`${count} / 10`
	)
		.setFontFamily('Lalezar')
		.setFontSize(75 * my_this.distance)
		.setColor('#FFC312')
		.setPadding(0, 5, 0, 5);


	const level_finish_nex_btn = my_this.add.graphics()
		.fillStyle(0x6ab615)
		.fillRoundedRect(
			160 * my_this.distance,
			645 * my_this.distance,
			290 * my_this.distance,
			70 * my_this.distance,
			30 * my_this.distance
		).setInteractive(
			new Phaser.Geom.Rectangle(
				160 * my_this.distance,
				645 * my_this.distance,
				290 * my_this.distance,
				70 * my_this.distance,
			),
			Phaser.Geom.Rectangle.Contains
		).on('pointerdown', () => {
			setTimeout(() => {
				my_this.next_level();
			}, 1000);
		});

	my_this.level_finish_nex_btn = my_this.add.text(
		225 * my_this.distance,
		640 * my_this.distance,
		(count < 10) ? 'بـــعـــدی' : 'خــــانــــه'
	)
		.setFontFamily('Lalezar')
		.setFontSize(55 * my_this.distance)
		.setColor('#fff')
		.setPadding(0, 5, 0, 5);
}

export {
	season_finish,
	level_finish,
	test_level_finish
};