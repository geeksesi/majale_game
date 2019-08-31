/* eslint-disable no-empty */
/* eslint-disable require-atomic-updates */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
async function shop_ui(my_this, scene) {
	let places = {};
	places = {
		bg: {
			x: 20 * my_this.distance,
			y: 220 * my_this.distance,
			width: 570 * my_this.distance,
			height: 850 * my_this.distance,
		},
		pack1: {
			x: 55 * my_this.distance,
			y: 240 * my_this.distance,
			width: 500 * my_this.distance,
			height: 250 * my_this.distance,
			flag: {
				x: 300 * my_this.distance,
				y: 290 * my_this.distance
			},
			almas_text: {
				x: 170 * my_this.distance,
				y: 370 * my_this.distance,
			},
			almasValue_text: {
				x: 370 * my_this.distance,
				y: 373 * my_this.distance,
			},
		},

		pack2: {
			x: 55 * my_this.distance,
			y: 510 * my_this.distance,
			width: 500 * my_this.distance,
			height: 250 * my_this.distance,
			flag: {
				x: 300 * my_this.distance,
				y: 560 * my_this.distance
			},
			almas_text: {
				x: 170 * my_this.distance,
				y: 630 * my_this.distance,
			},
			almasValue_text: {
				x: 370 * my_this.distance,
				y: 633 * my_this.distance,
			},
		},

		pack3: {
			x: 55 * my_this.distance,
			y: 780 * my_this.distance,
			width: 500 * my_this.distance,
			height: 250 * my_this.distance,
			flag: {
				x: 300 * my_this.distance,
				y: 830 * my_this.distance
			},
			almas_text: {
				x: 170 * my_this.distance,
				y: 900 * my_this.distance,
			},
			almasValue_text: {
				x: 370 * my_this.distance,
				y: 903 * my_this.distance,
			},
		}
	};

	if (scene !== 'shop') {
		const close = my_this.add.graphics()
			.setDepth(92)
			.fillStyle(0xd63031)
			.fillCircle(
				580 * my_this.distance,
				230 * my_this.distance,
				20 * my_this.distance
			)
			.lineStyle(2 * my_this.distance, 0x222222)
			.lineBetween(
				570 * my_this.distance,
				220 * my_this.distance,
				590 * my_this.distance,
				240 * my_this.distance,
			)
			.lineBetween(
				570 * my_this.distance,
				240 * my_this.distance,
				590 * my_this.distance,
				220 * my_this.distance,
			).setInteractive(
				new Phaser.Geom.Circle(
					580 * my_this.distance,
					230 * my_this.distance,
					20 * my_this.distance
				),
				Phaser.Geom.Circle.Contains
			)
			.on('pointerdown', () => {
				close.destroy();
				my_this.shop_bg.destroy();
				my_this.pack1.destroy();
				my_this.pack1_flag.destroy();
				my_this.pack1_almas_text.destroy();
				my_this.pack1_almasValue_text.destroy();
				my_this.pack1_price_text.destroy();
				my_this.pack1_priceValue_text.destroy();
				my_this.pack2.destroy();
				my_this.pack2_flag.destroy();
				my_this.pack2_almas_text.destroy();
				my_this.pack2_almasValue_text.destroy();
				my_this.pack2_price_text.destroy();
				my_this.pack2_priceValue_text.destroy();
				my_this.pack3.destroy();
				my_this.pack3_flag.destroy();
				my_this.pack3_almas_text.destroy();
				my_this.pack3_almasValue_text.destroy();
				my_this.pack3_price_text.destroy();
				my_this.pack3_priceValue_text.destroy();
			});

	}


	my_this.shop_bg = my_this.add.graphics()
		.setDepth(90)
		.fillStyle(0xefefef)
		.fillRoundedRect(
			places.bg.x,
			places.bg.y,
			places.bg.width,
			places.bg.height,
			25 * my_this.distance
		);




	my_this.pack1 = my_this.add.graphics()
		.setDepth(91)
		.fillStyle(0x7ed6df)
		.fillRoundedRect(
			places.pack1.x,
			places.pack1.y,
			places.pack1.width,
			places.pack1.height

		)
		.setInteractive(
			new Phaser.Geom.Rectangle(
				places.pack1.x,
				places.pack1.y,
				places.pack1.width,
				places.pack1.height
			),
			Phaser.Geom.Rectangle.Contains
		)
		.on('pointerdown', () => {
			console.log(1);
		});



	my_this.pack1_flag = my_this.add.image(
		places.pack1.flag.x,
		places.pack1.flag.y,
		'coin_icon'
	)
		.setDepth(92)
		.setScale(my_this.distance);

	my_this.pack1_almas_text = my_this.add.text(
		places.pack1.almas_text.x,
		places.pack1.almas_text.y,
		'الماس'
	)
		.setDepth(92)
		.setFontFamily('Lalezar')
		.setColor('#0984e3')
		.setFontSize(35 * my_this.distance);

	my_this.pack1_almasValue_text = my_this.add.text(
		places.pack1.almasValue_text.x,
		places.pack1.almasValue_text.y,
		'500'
	)
		.setDepth(92)
		.setFontFamily('Lalezar')
		.setColor('#0984e3')
		.setFontSize(35 * my_this.distance);


	my_this.pack1_price_text = my_this.add.text(
		places.pack1.almas_text.x,
		places.pack1.almas_text.y + 50 * my_this.distance,
		'تومان'
	)
		.setDepth(92)
		.setFontFamily('Lalezar')
		.setColor('#FFC312')
		.setFontSize(35 * my_this.distance);

	my_this.pack1_priceValue_text = my_this.add.text(
		places.pack1.almasValue_text.x,
		places.pack1.almasValue_text.y + 50 * my_this.distance,
		'5000'
	)
		.setDepth(92)
		.setFontFamily('Lalezar')
		.setColor('#FFC312')
		.setFontSize(35 * my_this.distance);

	my_this.pack2 = my_this.add.graphics()
		.setDepth(91)
		.fillStyle(0x7ed6df)
		.fillRoundedRect(
			places.pack2.x,
			places.pack2.y,
			places.pack2.width,
			places.pack2.height

		)
		.setInteractive(
			new Phaser.Geom.Rectangle(
				places.pack2.x,
				places.pack2.y,
				places.pack2.width,
				places.pack2.height
			),
			Phaser.Geom.Rectangle.Contains
		)
		.on('pointerdown', () => {
			console.log(2);
		});



	my_this.pack2_flag = my_this.add.image(
		places.pack2.flag.x,
		places.pack2.flag.y,
		'coin_icon'
	)
		.setDepth(92)
		.setScale(my_this.distance);

	my_this.pack2_almas_text = my_this.add.text(
		places.pack2.almas_text.x,
		places.pack2.almas_text.y,
		'الماس'
	)
		.setDepth(92)
		.setFontFamily('Lalezar')
		.setColor('#0984e3')
		.setFontSize(35 * my_this.distance);

	my_this.pack2_almasValue_text = my_this.add.text(
		places.pack2.almasValue_text.x,
		places.pack2.almasValue_text.y,
		'500'
	)
		.setDepth(92)
		.setFontFamily('Lalezar')
		.setColor('#0984e3')
		.setFontSize(35 * my_this.distance);


	my_this.pack2_price_text = my_this.add.text(
		places.pack2.almas_text.x,
		places.pack2.almas_text.y + 50 * my_this.distance,
		'تومان'
	)
		.setDepth(92)
		.setFontFamily('Lalezar')
		.setColor('#FFC312')
		.setFontSize(35 * my_this.distance);

	my_this.pack2_priceValue_text = my_this.add.text(
		places.pack2.almasValue_text.x,
		places.pack2.almasValue_text.y + 50 * my_this.distance,
		'5000'
	)
		.setDepth(92)
		.setFontFamily('Lalezar')
		.setColor('#FFC312')
		.setFontSize(35 * my_this.distance);


	my_this.pack3 = my_this.add.graphics()
		.setDepth(91)
		.fillStyle(0x7ed6df)
		.fillRoundedRect(
			places.pack3.x,
			places.pack3.y,
			places.pack3.width,
			places.pack3.height

		)
		.setInteractive(
			new Phaser.Geom.Rectangle(
				places.pack3.x,
				places.pack3.y,
				places.pack3.width,
				places.pack3.height
			),
			Phaser.Geom.Rectangle.Contains
		)
		.on('pointerdown', () => {
			console.log(3);
		});



	my_this.pack3_flag = my_this.add.image(
		places.pack3.flag.x,
		places.pack3.flag.y,
		'coin_icon'
	)
		.setDepth(92)
		.setScale(my_this.distance);

	my_this.pack3_almas_text = my_this.add.text(
		places.pack3.almas_text.x,
		places.pack3.almas_text.y,
		'الماس'
	)
		.setDepth(92)
		.setFontFamily('Lalezar')
		.setColor('#0984e3')
		.setFontSize(35 * my_this.distance);

	my_this.pack3_almasValue_text = my_this.add.text(
		places.pack3.almasValue_text.x,
		places.pack3.almasValue_text.y,
		'500'
	)
		.setDepth(92)
		.setFontFamily('Lalezar')
		.setColor('#0984e3')
		.setFontSize(35 * my_this.distance);


	my_this.pack3_price_text = my_this.add.text(
		places.pack3.almas_text.x,
		places.pack3.almas_text.y + 50 * my_this.distance,
		'تومان'
	)
		.setDepth(92)
		.setFontFamily('Lalezar')
		.setColor('#FFC312')
		.setFontSize(35 * my_this.distance);

	my_this.pack3_priceValue_text = my_this.add.text(
		places.pack3.almasValue_text.x,
		places.pack3.almasValue_text.y + 50 * my_this.distance,
		'5000'
	)
		.setDepth(92)
		.setFontFamily('Lalezar')
		.setColor('#FFC312')
		.setFontSize(35 * my_this.distance);
}

export {
	shop_ui
};