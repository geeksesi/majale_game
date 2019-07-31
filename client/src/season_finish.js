import { season_finish, season_finish_data } from './server';
class seasonMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'season_finish' });

    }

    init(data) {
        this.season_id = data.season_id;
        // this.season_id = 1;
    }

    preload() {

    }

    async variables() {

        this.graphics = this.add.graphics();


        let offset = {
            x: this.sys.game.config.width / 24,
            y: this.sys.game.config.height / 20,
        };
        this.places = await {
            coin: {
                x: offset.x,
                y: offset.y,
                width: this.sys.game.config.width / 12 * 2,
                height: this.sys.game.config.width / 12,
            },
            exp: {
                x: this.sys.game.config.width / 12 * 11 - offset.x,
                y: offset.y,
                width: this.sys.game.config.width / 12 * 2,
                height: this.sys.game.config.width / 12,
            },
            head: {
                x: this.sys.game.config.width / 12 * 2,
                y: this.sys.game.config.height / 12 * 2 + offset.y,
                width: this.sys.game.config.width - offset.x,
                height: this.sys.game.config.height / 12 * 4,
                font_size: this.sys.game.config.width / 12
            },
            chest: {
                x: this.sys.game.config.width / 12 * 3,
                y: this.sys.game.config.height / 12 * 4,
                width: this.sys.game.config.width / 12 * 6,
                height: this.sys.game.config.height / 12 * 3,
                text: {
                    x: this.sys.game.config.width / 12 * 4,
                    y: this.sys.game.config.height / 12 * 5,
                    font_size: this.sys.game.config.width / 12,
                }
            },
            word_progress: [{
                    x: this.sys.game.config.width / 12 * 2,
                    y: this.sys.game.config.height / 12 * 8,
                },
                {
                    x: this.sys.game.config.width / 12 * 2,
                    y: this.sys.game.config.height / 12 * 9,
                },
                {
                    x: this.sys.game.config.width / 12 * 2,
                    y: this.sys.game.config.height / 12 * 10,
                },


                {
                    x: this.sys.game.config.width / 12 * 7,
                    y: this.sys.game.config.height / 12 * 8,
                },
                {
                    x: this.sys.game.config.width / 12 * 7,
                    y: this.sys.game.config.height / 12 * 9,
                },
                {
                    x: this.sys.game.config.width / 12 * 7,
                    y: this.sys.game.config.height / 12 * 10,
                },
                {
                    x: this.sys.game.config.width / 12 * 5,
                    y: this.sys.game.config.height / 12 * 11 + offset.y,
                },
            ]
        }


    }

    async create() {
        await this.variables();
        this.playGame_botton = this.add.text(
            this.places.head.x,
            this.places.head.y,
            "Congratulation", {
                fontSize: `${this.places.head.font_size}px`,
                color: "#2f2f2f"
            });
        await this.chest_ui();
        await this.word_progress_ui();

        this.on_event = false;
        this.input.on('pointerdown', (pointer) => {
            if (this.chest_rect.contains(pointer.x, pointer.y) && !this.on_event) {
                this.chest_event();
            }
        }, this);
        // this.playGame_botton.setInteractive();
        // this.playGame_botton.on('pointerdown', () => { this.play_game() }, this);

    }

    chest_event() {
        this.on_event = true;
        let backward = false;
        let loading = setInterval(() => {
            this.graphics.clear();
            this.graphics.fillStyle(0x9e9e9e);
            this.graphics.lineStyle(3, 0xffffff);
            if (backward) {
                this.chest_rect.setPosition(this.chest_rect.x + 10, this.chest_rect.y);
                backward = false;
            } else {
                backward = true;
                this.chest_rect.setPosition(this.chest_rect.x - 10, this.chest_rect.y);
            }
            // console.log(this.chest_rect.x)
            this.graphics.strokeRectShape(this.chest_rect);
            this.graphics.fillRectShape(this.chest_rect);
        }, 200)
        season_finish(this.season_id, res => {
            setTimeout(() => {
                clearInterval(loading);
                this.chest_rect.setPosition(this.places.chest.x, this.places.chest.y);
                this.chest_text.setText(res + " $");
                this.finish_event();
            }, 1000)
        })

    }

    finish_event() {
        this.input.on('pointerdown', (pointer) => {
            this.scene.start('mainMenu');
        })
    }

    // UI

    async word_progress_ui() {
        this.words = await season_finish_data(this.season_id);
        let counter = -1;
        this.words.forEach(async element => {
            counter++;
            this.word_one = await this.add.text(
                this.places.word_progress[counter].x,
                this.places.word_progress[counter].y,
                `${element.question} ${((element.status == 1) ? '#': (element.status == 2) ? '##' :'###')}`
            ).setColor("#222");
        });
    }

    chest_ui() {
        this.graphics.fillStyle(0x9e9e9e);
        this.graphics.lineStyle(3, 0xffffff);
        this.chest_rect = new Phaser.Geom.Rectangle(
            this.places.chest.x,
            this.places.chest.y,
            this.places.chest.width,
            this.places.chest.height,
        );
        this.graphics.strokeRectShape(this.chest_rect);
        this.graphics.fillRectShape(this.chest_rect);
        this.chest_text = this.add.text(
            this.places.chest.text.x,
            this.places.chest.text.y,
            "..Prize.."
        ).setFontSize(this.places.chest.text.font_size);
    }


}

export default seasonMenu;