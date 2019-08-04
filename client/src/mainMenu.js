import { make_road } from './game_tools/game_design';
import { play_game_data } from './server';
class mainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'mainMenu' });

    }

    preload() {
        this.load.image('english_flag', 'assets/Eng_flag.png')
        this.load.image('exp_icon', 'assets/exp.png')
        this.load.image('coin_icon', 'assets/coin.png')
        this.load.image('best_flag', 'assets/ranking.png')
        this.load.image('shop_flag', 'assets/Shop.png')
        this.coin_value = 5000;
        this.exp_value = 5000;
        // console.log(localStorage.getItem('language_id'));
        this.language_id = parseInt(localStorage.getItem('language_id')) || 2;
    }

    async create() {
        await this.top_ui();
        await this.play_ui();
        await this.down_ui();
        await this.loading_ui();
        // console.log(this.language_id)
        // this.logo = this.add.text(200, 150 , "HEllow",{fontSize : "100px",color:"#22222"});
        // this.language_select = this.add.text(this.sys.game.config.width - 100, 30, "", { fontSize: "15px", color: "#2f2f2f" });
        // this.set_language(this.language_id)
        // this.language_select.setInteractive();
        // this.language_select.on('pointerdown', () => {
        //     if (!this.change_lang) {
        //         this.change_lang = true;
        //         this.language_id = (this.language_id === 2) ? 3 : 2;
        //         this.set_language(this.language_id)
        //         setTimeout(() => { this.change_lang = false }, 500)
        //     }
        // }, this);


        // this.playGame_botton = this.add.text(80, 80, "Play Game", { fontSize: "25px", color: "#2f2f2f" });
        // this.playGame_botton.setInteractive();
        // this.playGame_botton.on('pointerdown', () => { this.play_game() }, this);

        // this.progress = this.add.text(80, 150, "progress", { fontSize: "25px", color: "#2f2f2f" });
        // this.progress.setInteractive();
        // this.progress.on('pointerdown', () => { this.progress_event() }, this);
    }


    set_language(language_id) {
        localStorage.setItem('language_id', language_id);
        this.language_select.setText((language_id === 2) ? "English" : "عربی")
        this.language_select.setFontFamily((language_id === 2) ? "Robot" : "Lalezar")
        this.language_select.setFontSize((language_id === 2) ? 32 * this.distance : "Lalezar")
        this.language_flag = this.add.image(
                this.offset.x + 60 * this.distance,
                this.offset.y + 75 * this.distance,
                (language_id === 2) ? "english_flag" : "english_flag"
            )
            .setScale(
                this.distance,
                this.distance,
            );;

    }

    // level_selected() {
    //     this.scene.start('seasonMenu', { language_id: this.language_id });
    // }

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


    // UI
    async top_ui() {
        this.gw = this.sys.game.config.width;
        this.gh = this.sys.game.config.height
        this.distance = this.gw / 610;
        // this.distance = this.gh / 1080;
        this.offset = {
            x: 20 * this.distance,
            y: 20 * this.distance,
        };

        // Language
        this.language_select = this.add.text(
            this.offset.x,
            this.offset.y,
            "", {
                fontSize: "15px",
                color: "#2f2f2f",
                fontFamily: "Roboto"
            });

        await this.set_language(this.language_id)

        // coin 

        const coin_places = {
            flag: {
                x: 250 * this.distance,
                y: (this.offset.y) + 35 * this.distance,
            },
            text: {
                x: 300 * this.distance,
                y: this.offset.y + 22 * this.distance,
                font_size: 35 * this.distance
            }
        }
        this.coin_flag = this.add.image(
                coin_places.flag.x,
                coin_places.flag.y,
                "coin_icon"
            )
            .setScale(
                this.distance,
                this.distance,
            );
        this.coin_text = this.add.text(
            coin_places.text.x,
            coin_places.text.y,
            this.coin_value, {
                fontSize: `${coin_places.text.font_size}px`,
                color: "#2f2f2f",
                fontFamily: "Noto Sans"
            });



        // exp 

        const exp_places = {
            flag: {
                x: 460 * this.distance,
                y: (this.offset.y) + 35 * this.distance,
            },
            text: {
                x: 505 * this.distance,
                y: this.offset.y + 22 * this.distance,
                font_size: 35 * this.distance
            }
        }
        this.exp_flag = this.add.image(
                exp_places.flag.x,
                exp_places.flag.y,
                "exp_icon"
            )
            .setScale(
                this.distance,
                this.distance,
            );
        this.exp_text = this.add.text(
            exp_places.text.x,
            exp_places.text.y,
            this.exp_value, {
                fontSize: `${exp_places.text.font_size}px`,
                color: "#2f2f2f",
                fontFamily: "Noto Sans"
            });

        // seprator 
        this.graphics = this.add.graphics({ lineStyle: { color: 0xa0a0a0 } });
        this.seprator1 = new Phaser.Geom.Line(
            170 * this.distance,
            0,
            170 * this.distance,
            100 * this.distance
        )

        this.seprator2 = new Phaser.Geom.Line(
            405 * this.distance,
            0,
            405 * this.distance,
            100 * this.distance
        )

        this.seprator3 = new Phaser.Geom.Line(
            this.gw,
            110 * this.distance,
            110 * this.distance,
            110 * this.distance
        )


        this.graphics.strokeLineShape(this.seprator1);
        this.graphics.strokeLineShape(this.seprator2);
        this.graphics.strokeLineShape(this.seprator3);

    }


    loading_ui() {
        this.loading = this.add.graphics();
        this.loading.beginPath();
        this.loading.lineStyle(3, 0xf4a02e, 1);

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
        this.play_area_graphic.fillStyle(0xf4a02e, 1);

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
            if(!this.play_game_check){
                this.play_game();
            }
        }, this);
        this.exp_text = this.add.text(
            235 * this.distance,
            610 * this.distance,
            "Start", {
                fontSize: `${50* this.distance}px`,
                color: "#f4a02e",
                fontFamily: "Noto Sans"
            });
    }

    down_ui() {
        this.down_area = this.add.graphics();
        this.down_area.fillStyle(0xf4a02e, 1);
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
        this.graphics.setDepth(100)
        this.graphics.strokeLineShape(this.seprator_down);

        // Best 
        const best_places = {
            flag: {
                x: 150 * this.distance,
                y: 930 * this.distance
            },
            text: {
                x: 70 * this.distance,
                y: 1010 * this.distance,
                font_size: 45 * this.distance
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
                color: "#fff",
                fontFamily: "Lalezar"
            });


        // Best 
        const shop_places = {
            flag: {
                x: 460 * this.distance,
                y: 950 * this.distance
            },
            text: {
                x: 380 * this.distance,
                y: 1010 * this.distance,
                font_size: 45 * this.distance
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
                color: "#fff",
                fontFamily: "Lalezar"
            });
    }
}


export default mainMenu;