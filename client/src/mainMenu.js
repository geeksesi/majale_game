import { make_road } from './game_tools/game_design';

import { top_ui } from './game_tools/global_ui';
import { play_game_data } from './server';
class mainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'mainMenu' });

    }

    async preload() {
        this.load.image('english_flag', 'assets/Eng_flag.png')
        this.load.image('exp_icon', 'assets/exp.png')
        this.load.image('coin_icon', 'assets/coin.png')
        this.load.image('best_flag', 'assets/ranking.png')
        this.load.image('shop_flag', 'assets/Shop.png')

        // console.log(localStorage.getItem('language_id'));
    }

    async create() {
        await top_ui(this, "main");
        await this.play_ui();
        await this.down_ui();
    }

    progress_event() {
        this.scene.start('season_finish', { season_id: 1 });
    }

    async play_game() {
        this.play_game_check = true;
        let data = await play_game_data();
        await make_road(data.word_list, data.finished_word, data.remembers_word, this.language_id, res => {
            this.play_game_check = false;
            this.scene.start('playGame', {
                word_id: 0,
                language_id: this.language_id,
                word_data: res
            });
        })
    }



    loading_ui() {
        this.loading = this.add.graphics();
        this.loading.beginPath();
        this.loading.lineStyle(3, 0x6ab615, 1);

        this.loading.strokeRoundedRect(
            50 * this.distance,
            395 * this.distance,
            510 * this.distance,
            310 * this.distance,
            50 * this.distance
        );
    }


    play_ui() {
        this.play_area_graphic = this.add.graphics();
        this.play_area_graphic.fillStyle(0x6ab615, 1);

        this.play_area_graphic.fillRoundedRect(
            55 * this.distance,
            400 * this.distance,
            500 * this.distance,
            300 * this.distance,
            50 * this.distance
        );

        this.play_buttom = this.add.graphics();
        this.play_buttom.fillStyle(0xffffff, 1);

        this.play_buttom.fillRoundedRect(
            125 * this.distance,
            600 * this.distance,
            355 * this.distance,
            80 * this.distance,
            40 * this.distance
        );
        this.play_buttom.setInteractive(new Phaser.Geom.Rectangle(
            125 * this.distance,
            600 * this.distance,
            355 * this.distance,
            80 * this.distance,
            40 * this.distance
        ), Phaser.Geom.Rectangle.Contains);
        this.play_game_check = false;
        this.play_buttom.on('pointerover', function() {
            if (!this.play_game_check) {
                this.play_game();
            }
        }, this);
        this.exp_text = this.add.text(
            235 * this.distance,
            610 * this.distance,
            "Start", {
                fontSize: `${50* this.distance}px`,
                color: "#6ab615",
                fontFamily: "Noto Sans"
            });
    }

    down_ui() {
        this.down_area = this.add.graphics();
        this.down_area.fillStyle(0x6ab615, 1);
        this.down_area.fillRect(
            0,
            940 * this.distance,
            610 * this.distance,
            140 * this.distance,
        )
        this.seprator_down = new Phaser.Geom.Line(
            305 * this.distance,
            970 * this.distance,
            305 * this.distance,
            1050 * this.distance
        )
        this.down_graphics = this.add.graphics({ lineStyle: { color: 0xa0a0a0 } });
        this.down_graphics.setDepth(100)
        this.down_graphics.strokeLineShape(this.seprator_down);

        // Best 
        const best_places = {
            flag: {
                x: 150 * this.distance,
                y: 930 * this.distance
            },
            text: {
                x: 70 * this.distance,
                y: 1010 * this.distance,
                font_size: 35 * this.distance,
                color: '#fff'
            }
        }

        this.best_flag = this.add.image(
                best_places.flag.x,
                best_places.flag.y,
                'best_flag',
            )
            .setScale(this.distance);

        this.best_text = this.add.text(
            best_places.text.x,
            best_places.text.y,
            "برترین‌ها", {
                fontSize: `${best_places.text.font_size}px`,
                color: `${best_places.text.color}`,
                fontFamily: "Lalezar"
            });


        // Best 
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
        }

        this.shop_flag = this.add.image(
                shop_places.flag.x,
                shop_places.flag.y,
                'shop_flag',
            )
            .setScale(this.distance);

        this.shop_text = this.add.text(
            shop_places.text.x,
            shop_places.text.y,
            "فروشگاه", {
                fontSize: `${shop_places.text.font_size}px`,
                color: `${best_places.text.color}`,
                fontFamily: "Lalezar"
            });
    }
}


export default mainMenu;