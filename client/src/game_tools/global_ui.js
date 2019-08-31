/* eslint-disable no-empty */
/* eslint-disable require-atomic-updates */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { user_data, user_data_restart } from './../server';
import { number_animation, finish_number_animation } from './mechanism';


function set_language(my_this, language_id) {
	if (my_this.change_lang) {
		return false;
	}
	my_this.change_lang = true;
	localStorage.setItem('language_id', language_id);
	my_this.language_select.setText((language_id === 2) ? 'English' : 'عربی');
	my_this.language_select.setFontFamily((language_id === 2) ? 'Robot' : 'Lalezar');
	my_this.language_select.setFontSize((language_id === 2) ? 32 * my_this.distance : 32 * my_this.distance);
	my_this.language_flag = my_this.add.image(
		my_this.offset.x + 60 * my_this.distance,
		my_this.offset.y + 75 * my_this.distance,
		(language_id === 2) ? 'english_flag' : 'english_flag'
	)
		.setScale(
			my_this.distance,
			my_this.distance,
		);
	my_this.language_id = language_id;
	setTimeout(() => {
		my_this.change_lang = false;
	}, 500);
}

async function top_ui(my_this, scene_name) {
	my_this.language_id = parseInt(localStorage.getItem('language_id')) || 2;

	my_this.user = await user_data();
	my_this.coin_value = my_this.user.credit;
	my_this.exp_value = my_this.user.xp;

	my_this.gw = my_this.sys.game.config.width;
	my_this.gh = my_this.sys.game.config.height;
	my_this.distance = my_this.gw / 610;
	// my_this.distance = my_this.gh / 1080;
	my_this.offset = {
		x: 20 * my_this.distance,
		y: 20 * my_this.distance,
	};

	if (scene_name === 'main') {
		// Language
		my_this.language_select = my_this.add.text(
			my_this.offset.x,
			my_this.offset.y,
			'', {
				fontSize: '15px',
				color: '#2f2f2f',
				fontFamily: 'Roboto'
			})
			.setPadding(0, 0, 0, 5);

		await set_language(my_this, my_this.language_id);
		my_this.change_lang = false;


		//     my_this.language_select.setInteractive();

		//     my_this.language_select.on('pointerdown', () => { set_language(my_this, ((my_this.language_id === 2) ? 3 : 2)) }, my_this);

		//     my_this.language_flag.setInteractive();

		//     my_this.language_flag.on('pointerdown', () => { set_language(my_this, ((my_this.language_id === 2) ? 3 : 2)) }, my_this);

	} else {
		my_this.back_btn = my_this.add.image(
			my_this.offset.x + 40 * my_this.distance,
			my_this.offset.y + 40 * my_this.distance,
			'back'
		)
			.setScale(my_this.distance)
			.setInteractive()
			.on('pointerdown', () => {
				if (scene_name === 'userDetail') {
					document.getElementById('inputName').style = 'display : none;';
				}
				my_this.scene.start('mainMenu');
			}, my_this);
	}

	// exp 

	const exp_places = {
		flag: {
			x: 250 * my_this.distance,
			y: (my_this.offset.y) + 35 * my_this.distance,
		},
		text: {
			x: 300 * my_this.distance,
			y: my_this.offset.y + 22 * my_this.distance,
			font_size: 30 * my_this.distance,
			color: '#FFC312'
		}
	};
	let xp_touch_count = 0;
	my_this.exp_flag = my_this.add.image(
		exp_places.flag.x,
		exp_places.flag.y,
		'exp_icon'
	)
		.setScale(
			my_this.distance
		)
		.setInteractive()
		.on('pointerdown', () => {
			xp_touch_count++;
			if (xp_touch_count === 10) {
				restart_game_data();
			}
			else if (xp_touch_count > 10) {
                
			}
			else {
				if (xp_touch_count === 1) {
					setTimeout(() => {
						xp_touch_count = 0;
					}, 3000);
				}
			}
		});


	my_this.exp_text = my_this.add.text(
		exp_places.text.x,
		exp_places.text.y,
		my_this.exp_value, {
			fontSize: `${exp_places.text.font_size}px`,
			color: `${exp_places.text.color}`,
			fontFamily: 'Lalezar'
		})
		.setPadding(0, 0, 0, 5);




	const coin_places = {
		flag: {
			x: 460 * my_this.distance,
			y: (my_this.offset.y) + 35 * my_this.distance,
		},
		text: {
			x: 505 * my_this.distance,
			y: my_this.offset.y + 22 * my_this.distance,
			font_size: 30 * my_this.distance,
			color: '#0984e3',
		}
	};
	my_this.coin_flag = my_this.add.image(
		coin_places.flag.x,
		coin_places.flag.y,
		'coin_icon'
	)
		.setScale(
			my_this.distance
		);
	my_this.coin_text = my_this.add.text(
		coin_places.text.x,
		coin_places.text.y,
		my_this.coin_value, {
			fontSize: `${coin_places.text.font_size}px`,
			color: `${coin_places.text.color}`,
			fontFamily: 'Lalezar'
		})
		.setPadding(0, 0, 0, 5);

	// seprator 
	my_this.graphics = my_this.add.graphics({ lineStyle: { color: 0xa0a0a0 } });
	my_this.seprator1 = new Phaser.Geom.Line(
		170 * my_this.distance,
		0,
		170 * my_this.distance,
		100 * my_this.distance
	);

	my_this.seprator2 = new Phaser.Geom.Line(
		405 * my_this.distance,
		0,
		405 * my_this.distance,
		100 * my_this.distance
	);

	my_this.seprator3 = new Phaser.Geom.Line(
		my_this.gw,
		110 * my_this.distance,
		110 * my_this.distance,
		110 * my_this.distance
	);


	my_this.graphics.strokeLineShape(my_this.seprator1);
	my_this.graphics.strokeLineShape(my_this.seprator2);
	my_this.graphics.strokeLineShape(my_this.seprator3);

}

function credit_change(timeout, interval, object, sureplus) {
	const start = parseInt(object.text);
	const finish = start + sureplus;
	setTimeout(() => {
		number_animation(interval, object, start, finish, 1000 / 30, (sureplus < 0));
	}, 1000);
}

function exp_change(timeout, interval, object, sureplus) {
	const start = parseInt(object.text);
	const finish = start + sureplus;
	setTimeout(() => {
		number_animation(interval, object, start, finish, 1000 / 6);
	}, 1000);
	// object.setText(parseInt(my_this.exp_text.text) + value)
}

function finish_change(timeout, interval, object, finish) {
	clearTimeout(timeout);
	finish_number_animation(interval, object, finish);
}



function restart_game_data() {
	if (confirm('می خواهید اطلاعات شما حذف شود ؟')) {
		user_data_restart();
		alert('بازی رو رفرش کنید :) ');
	} else {
	}
}
export { top_ui, credit_change, exp_change, finish_change };