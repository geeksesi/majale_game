import { make_road, user_level } from './game_tools/game_design';

import { top_ui } from './game_tools/global_ui';
import { play_game_data, user_data } from './server';
class mainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'mainMenu' });

    }

    async preload() { }

    async create() {
        await top_ui(this, "main");
        await this.play_ui();
        await this.down_ui();
        this.data = await play_game_data();

        user_level(res => {
            this.user_level_ui(res);
        })
    }

    user_level_ui(data) {

        this.season_detail_text = this.add.text(
            320 * this.distance,
            480 * this.distance,
            `فـصـل :   ${data.season_id}`
        )
            .setColor('#fff')
            .setFontFamily("Lalezar")
            .setFontSize(55 * this.distance)
            .setPadding(0, 0, 0, 5)
            // .initRTL()

        this.season_detail_text = this.add.text(
            110 * this.distance,
            480 * this.distance,
            `${data.completed} / ${data.length}`
        )
            .setColor('#fff')
            .setFontFamily("Lalezar")
            .setFontSize(60 * this.distance)
            .setPadding(0, 0, 0, 5)
            // .initRTL()

    }

    progress_event() {
        this.scene.start('season_finish', { season_id: 1 });
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
        })
    }



    // loading_ui() {
    //     this.loading = this.add.graphics();
    //     this.loading.beginPath();
    //     this.loading.lineStyle(3, 0x6ab615, 1);

    //     this.loading.strokeRoundedRect(
    //         50 * this.distance,
    //         395 * this.distance,
    //         510 * this.distance,
    //         310 * this.distance,
    //         50 * this.distance
    //     );
    // }


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
        this.play_buttom.on('pointerdown', function () {
            if (!this.play_game_check) {
                this.play_game();
            }
        }, this);
        this.exp_text = this.add.text(
            240 * this.distance,
            610 * this.distance,
            "Start", {
                fontSize: `${50 * this.distance}px`,
                color: "#6ab615",
                fontFamily: "Noto Sans"
            })
            .setPadding(0, 0, 0, 5);
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
                    this.scene.start('userDetail')
                else
                    this.scene.start('leaderboard')
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
                this.scene.start('shop')
            });;

        this.seprator_down = new Phaser.Geom.Line(
            305 * this.distance,
            960 * this.distance,
            305 * this.distance,
            1060 * this.distance
        )
        this.down_graphics = this.add.graphics();
        this.down_graphics.lineStyle(3, 0xffffff, 1.0);
        this.down_graphics.setDepth(100)
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
        }

        this.best_flag = this.add.image(
            best_places.flag.x,
            best_places.flag.y,
            'best_flag',
        )
            .setScale(2 / 3 * this.distance);

        this.best_text = this.add.text(
            best_places.text.x,
            best_places.text.y,
            "برترین‌ها")
            .setFontSize(best_places.text.font_size)
            .setColor(best_places.text.color)
            .setFontFamily("Lalezar")
            .setPadding(0, 0, 0, 5)


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
        }

        this.shop_flag = this.add.image(
            shop_places.flag.x,
            shop_places.flag.y,
            'shop_flag',
        )
            .setScale(2 / 3.5 * this.distance);

        this.shop_text = this.add.text(
            shop_places.text.x,
            shop_places.text.y,
            "فروشگاه")
            .setFontSize(`${shop_places.text.font_size}px`)
            .setColor(`${best_places.text.color}`)
            .setFontFamily("Lalezar")
            .setPadding(0, 0, 0, 5)
    }
}


export default mainMenu;