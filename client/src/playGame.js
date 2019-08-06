import { use_hint, finish_level, play_game_data, check_season_finished } from './server';
import { make_road } from './game_tools/game_design';
import { make_table } from './game_tools/mechanism';
import { top_ui, credit_change, exp_change } from './game_tools/global_ui';

class playGame extends Phaser.Scene {

    constructor() {
        super({ key: 'playGame' });
    }

    init(data) {
        console.log(data);
        if (typeof data.word_data[data.word_id] === 'undefined') {
            console.log('i have no lvl for you')
            this.scene.start('mainMenu');
            return false
        }
        // this.season_id = data.season_id;
        this.word_id = data.word_id;
        this.language_id = data.language_id;
        // console.log(data.language_id);
        this.make_table = make_table;
        // console.log(data)
        this.word_data = data.word_data;
        this.season_id = data.word_data[data.word_id].season_id;
    }


    async preload() {
        // this.load.image('english_flag', 'assets/Eng_flag.png')
        // this.load.image('exp_icon', 'assets/exp.png')
        // this.load.image('coin_icon', 'assets/coin.png')
            // this.coin_value = 200;
            // this.exp_value = 50;
    }

    async variables() {
        // console.log("here")
        await top_ui(this, "play_game");

        this.till = {
            offset_x: this.sys.game.config.width / 25,
            width: this.sys.game.config.width - (this.sys.game.config.width / 12),
            offset_y: this.sys.game.config.height - (this.sys.game.config.width - (this.sys.game.config.width / 6) + this.sys.game.config.height / 20) - (this.sys.game.config.height / 8),
        }

        this.hint_arr = [];
        this.hint_key_arr = [];
        this.hit_count = 0;

        this.answer_arr = [];
        this.answer_key_arr = [];

        // this.word_data = await get_word(this.season_id);

        this.question = this.word_data[this.word_id].word
        this.status = this.word_data[this.word_id].status
        this.answer = this.word_data[this.word_id].answer.word
        this.table_data = await this.make_table(this.answer);


        this.start_time = Math.floor(Date.now() / 1000);

    }



    async create() {

        // this.words =this.add.group()
        // this.add.grid(0, 0, 50 * 6, 50 * 5, 50, 50, 0x999999, 1, 0x666666).setOrigin(0);
        await this.variables();
        this.till_graphic = this.add.graphics({ fillStyle: { color: 0x9e9e9e } });
        await this.table_ui();
        await this.hint_ui();
        await this.answer_ui();

        this.hint_click = false;

        this.make_event();

        this.input.on('pointerup', this.pointer_up, this);
        this.input.on('pointermove', this.pointer_move, this);

        // console.log("hello");
    }


    make_event() {
        this.hint_area.setInteractive(new Phaser.Geom.Rectangle(
            this.till.offset_x,
            this.till.offset_y + this.till.width,
            this.till.width,
            (this.sys.game.config.height / 10)
        ), Phaser.Geom.Rectangle.Contains);
        this.hint_area.on('pointerover', function() {
            if (!this.hint_click && !this.is_win) {
                this.hint();
            }
        }, this);
    }


    async hint() {
        this.hint_click = true;
        if (this.coin_value >= 10 && await use_hint(this.word_data[(this.word_id)].id)) {
            this.coin_value -= 10;
            credit_change(this, -10);
            // await this.credit_text.setText("")
            // await this.credit_ui();
            await this.hint_key_arr.push(this.table_data.keys[this.hint_arr.length]);
            await this.hint_arr.push(this.table_data.array[this.table_data.keys[this.hint_arr.length]]);
        } else {
            console.log("warning on hint")
        }
        // console.log(this.hint_key_arr)
        setTimeout(() => { this.hint_click = false; }, 500)

    }

    clear_all() {
        this.answer_arr = [];
        this.answer_key_arr = [];
        this.answer_text.setText('')
        for (let i = 0; i < this.till_bg_intract.length; i++) {
            if (this.hint_key_arr.includes(i)) {
                continue;
            }
            this.make_clear(i)
        }
        this.answer_arr = this.hint_arr.slice();
        this.answer_key_arr = this.hint_key_arr.slice();
        this.answer_text.setText(this.hint_arr.join(''))
    }

    pointer_up() {
        if (!this.is_win) {
            this.again = true;
            this.hint_key_arr.forEach(each => {
                this.till_graphic.fillRectShape(this.till_bg_intract[each]);
                this.make_blue(each)
            })
            this.till_graphic.fillStyle(0x9e9e9e);
            for (let i = 0; i < this.till_bg_intract.length; i++) {
                if (this.hint_key_arr.includes(i)) {
                    continue;
                }
                if (this.answer_key_arr.includes(i)) {
                    this.make_red(i)
                } else {

                    this.make_clear(i)
                }
            }
            setTimeout(() => {
                this.clear_all();
            }, 1500)


            if (this.answer_arr.join("") === this.answer) {
                this.win();
            }
        }
    }

    check_pointer_way(i) {
        if (this.answer_key_arr[this.answer_key_arr.length - 1] === i) {
            // console.log(this.answer_key_arr[this.answer_key_arr.length - 1])
            return true;
        }
        this.till_graphic.fillStyle(0x9e9e9e);
        let index_in_answer = this.answer_key_arr.indexOf(i);
        for (let b = index_in_answer + 1; b < this.answer_key_arr.length; b++) {
            if (this.hint_key_arr.indexOf(this.answer_key_arr[b])) {
                // return true;
                // break;
                // continue;
            }
            // console.log(i);
            this.make_blue(this.answer_key_arr[b])
                // this.till_graphic.fillRectShape(this.till_bg_intract[this.answer_key_arr[b]]);
        }
        this.answer_arr.splice(index_in_answer + 1);
        this.answer_key_arr.splice(index_in_answer + 1);
        this.answer_text.setText(this.answer_arr.join(""));
        this.answer_text.setPosition(
            350 * this.distance + this.answer_arr.length * 2.3 / this.distance,
            300 * this.distance);
    }

    pointer_move(pointer) {
        if (pointer.isDown && !this.is_win) {
            if (this.again) {
                this.again = false;
                this.clear_all();
            }
            for (let i = 0; i < this.till_bg_intract.length; i++) {
                if (this.till_bg_intract[i].contains(pointer.x, pointer.y)) {
                    if (this.answer_key_arr.includes(i)) {
                        this.check_pointer_way(i)
                        break;
                    }
                    if (this.answer_key_arr.length !== 0) {
                        if (
                            (this.answer_key_arr[this.answer_key_arr.length - 1] + 1) !== i &&
                            (this.answer_key_arr[this.answer_key_arr.length - 1] - 1) !== i &&
                            (this.answer_key_arr[this.answer_key_arr.length - 1] + this.max_y) !== i &&
                            (this.answer_key_arr[this.answer_key_arr.length - 1] - this.max_y) !== i
                        ) {
                            break;
                        }
                    }
                    // this.till_graphic.fillRectShape(this.till_bg_intract[i]);
                    this.make_blue(i)
                    this.answer_arr.push(this.words[i]);
                    this.answer_key_arr.push(i);
                    this.answer_text.setText(this.answer_arr.join(""));
                    if (this.answer_arr.join("") === this.answer) {
                        this.win();
                    }
                    this.answer_text.setPosition(
                        350 * this.distance + this.answer_arr.length * 2.3 / this.distance,
                        300 * this.distance);
                    break;
                }
            }

        }

    }

    win() {
        if (this.is_win) {
            return true;
        }
        // this.scene.pause();
        this.is_win = true;
        this.finish_time = Math.floor(Date.now() / 1000);
        let is_hint = false;
        setTimeout(async() => {
            if (this.hint_arr.length > 0) {
                is_hint = true;
            }
            // console.log(this.word_data[this.word_id].status)
            let finish_detail = await finish_level(this.word_data[this.word_id].id, (this.finish_time - this.start_time), is_hint, this.word_data[this.word_id].status);
            credit_change(this, finish_detail.prize);
            exp_change(this, finish_detail.xp);
            console.log(finish_detail);

            this.win_ui();
        }, 500);
    }

    show_loading() {
        console.log("loading")
    }

    stop_loading() {
        console.log("stop loading")
    }

    async win_ui_event(type) {
        console.log(this.season_id + " " + this.word_data[this.word_id + 1].season_id)
        this.is_win = false;

        if (type === "next") {

            if (typeof this.word_data[(this.word_id + 1)] === 'undefined') {
                this.show_loading();
                let data = await play_game_data();
                await make_road(data.word_list, data.finished_word, data.remembers_word, this.language_id, res => {
                    if (res.length < 1) {
                        console.log("i have no lvl")
                        this.scene.start('mainMenu');
                    }
                    this.stop_loading();
                    this.scene.start('playGame', {
                        word_id: 0,
                        language_id: this.language_id,
                        word_data: res
                    });
                })

            } else {
                this.scene.start('playGame', {
                    word_id: this.word_id + 1,
                    language_id: this.language_id,
                    word_data: this.word_data
                });
            }
        } else {
            this.scene.start('mainMenu');
        }
    }

    async animation_finished() {
        const check_season = await check_season_finished(this.season_id);
        console.log(check_season);
        if (check_season) {
            this.scene.start('season_finish', { season_id: this.season_id });
        }
    }

    // UI

    win_ui() {
        this.win_bg = this.add.image(
                (this.sys.game.config.width / 2),
                (this.sys.game.config.height / 2),
                // 0,`
                // 0,`
                'win_bg')
            .setDisplaySize(
                (this.sys.game.config.width - 100),
                (this.sys.game.config.height - 300)

            )

        this.next_level_text = this.add.text(
                (this.sys.game.config.width / 2) - 20,
                (this.sys.game.config.height / 2) + 50,
                "Next", { rtl: false })
            .setFontFamily('Tahoma')
            .setColor('#222')
            .setAlign("right")
            .setFontSize(this.question_area.width / (this.question.length + 2))
            .setSize(this.question_area.width, this.question_area.height)

        this.menu_text = this.add.text(
                (this.sys.game.config.width / 2) - 20,
                (this.sys.game.config.height / 2) - 50,
                "MainMenu", { rtl: false })
            .setFontFamily('Tahoma')
            .setColor('#222')
            .setAlign("right")
            .setFontSize(this.question_area.width / (this.question.length + 2))
            .setSize(this.question_area.width, this.question_area.height)

        this.next_level_text.setInteractive();
        this.next_level_text.on('pointerdown', () => { this.win_ui_event("next") }, this);
        this.menu_text.setInteractive();
        this.menu_text.on('pointerdown', () => { this.win_ui_event("menu") }, this);

        setTimeout(() => {
            this.animation_finished();
        }, 1000)
    }

    answer_ui() {
        this.answer_area = this.add.graphics();
        this.answer_area.fillStyle(0xffffff);
        this.answer_area.fillRect(
            this.till.offset_x,
            280 * this.distance,
            this.till.width,
            100 * this.distance
        );

        this.question_area = this.add.graphics();
        this.question_area.fillStyle(0x6ab615);
        this.question_area.fillRoundedRect(
            this.till.offset_x,
            180 * this.distance,
            this.till.width,
            100 * this.distance, {
                tl: 30,
                tr: 30,
                bl: 0,
                br: 0
            });

        this.question_text = this.add.text(
                270 * this.distance - ((this.question.length < 8) ? this.question.length * 2 : this.question.length * 4),
                210 * this.distance,
                this.question)
            .setAlign("center")
            .setColor("#fff")


        this.question_text.text.length;
        if (this.language_id == 2) {
            this.question_text.setFontFamily("Roboto")
            this.question_text.setFontSize(35 * this.distance)

        } else {
            this.question_text.initRTL()
            this.question_text.setFontFamily("Lalezar")
            this.question_text.setFontSize(45 * this.distance)
        }

        this.answer_text = this.add.text(
                350 * this.distance,
                300 * this.distance,
                "", { rtl: true })
            .setFontFamily('Lalezar')
            .setFontSize(35 * this.distance)
            .setColor('#222')
            .setAlign("right")

    }

    table_ui() {

        this.till_bg = [];
        this.till_bg_intract = [];
        this.words = this.table_data.array;
        this.till_words = []
            // const max_x = 3;
            // const max_y = 3;
        this.max_x = this.table_data.size;
        this.max_y = this.table_data.size;

        for (let x = 0; x < this.max_x; x++) {
            for (let y = 0; y < this.max_y; y++) {
                this.till_bg.push(this.add.graphics().fillStyle(0xffffff).fillRoundedRect(
                    this.till.offset_x + (x * (this.till.width / this.max_x)),
                    this.till.offset_y + (y * (this.till.width / this.max_y)),
                    (this.till.width / this.max_x),
                    (this.till.width / this.max_x),
                    15
                ))

                this.till_bg_intract.push(new Phaser.Geom.Rectangle(
                    this.till.offset_x + (x * (this.till.width / this.max_x)),
                    this.till.offset_y + (y * (this.till.width / this.max_y)),
                    (this.till.width / this.max_x),
                    (this.till.width / this.max_x) + 2));
            }
        }
        // console.log(this.till_bg[0]);
        // this.till_graphic.fillStyle(0x9e9e9e);
        for (let i = 0; i < this.till_bg_intract.length; i++) {
            this.add.text(
                    this.till_bg_intract[i].x + ((this.till_bg_intract[i].width / 2.5)),
                    this.till_bg_intract[i].y + (this.till_bg_intract[i].width / 5),
                    this.words[i])
                .setFontFamily('Lalezar')
                .setFontSize(this.till_bg_intract[i].width / 2.5)
                .setColor('#222')
                .setAlign("center");
            // .setStyle({ rtl: true });

            this.till_graphic.fillStyle(0xb2bec3);
            this.till_graphic.fillRectShape(this.till_bg_intract[i]);
        }
    }

    make_blue(key) {
        this.till_bg[key].clear();
        this.till_bg[key].fillStyle(0xffffff).fillRoundedRect(
            this.till_bg_intract[key].x,
            this.till_bg_intract[key].y,
            this.till_bg_intract[key].width,
            this.till_bg_intract[key].height - 2,
            15).lineStyle(3, 0x0984e3, 3).strokeRoundedRect(
            this.till_bg_intract[key].x + 1,
            this.till_bg_intract[key].y + 1,
            this.till_bg_intract[key].width - 2,
            this.till_bg_intract[key].height - 4,
            15);
    }

    make_clear(key) {
        this.till_bg[key].clear();
        this.till_bg[key].fillStyle(0xffffff).fillRoundedRect(
            this.till_bg_intract[key].x,
            this.till_bg_intract[key].y,
            this.till_bg_intract[key].width,
            this.till_bg_intract[key].height - 2,
            15);
    }

    make_red(key) {
        this.till_bg[key].clear();
        this.till_bg[key].fillStyle(0xffffff).fillRoundedRect(
            this.till_bg_intract[key].x,
            this.till_bg_intract[key].y,
            this.till_bg_intract[key].width,
            this.till_bg_intract[key].height - 2,
            15).lineStyle(3, 0xd63031, 3).strokeRoundedRect(
            this.till_bg_intract[key].x + 1,
            this.till_bg_intract[key].y + 1,
            this.till_bg_intract[key].width - 2,
            this.till_bg_intract[key].height - 4,
            15);
    }

    hint_ui() {
        this.hint_area = this.add.graphics();
        this.hint_area.fillStyle(0x6ab615);
        this.hint_area.fillRoundedRect(
            this.till.offset_x,
            this.till.offset_y + this.till.width + 3 * this.distance,
            this.till.width,
            (this.sys.game.config.height / 10), {
                tl: 0,
                tr: 0,
                bl: 30,
                br: 30
            });

        this.hint_text = this.add.text(
                this.till.offset_x + (this.till.width / 2) - 65 * this.distance,
                this.till.offset_y + this.till.width + this.sys.game.config.height / 20 - 25 * this.distance,
                "راهنمایی")
            .setFontFamily("Lalezar")
            .setColor("#fff")
            .setFontSize(35 * this.distance)

        this.hint_sprite = this.add.image(
                120 * this.distance,
                this.till.offset_y + this.till.width + this.sys.game.config.height / 20,
                "coin_icon"
            )
            .setScale(0.5 * this.distance)

        this.hint_sprite_text = this.add.text(
                50 * this.distance,
                this.till.offset_y + this.till.width + this.sys.game.config.height / 20 - 15 * this.distance,
                "10"
            )
            .setFontFamily("Noto Sans")
            .setColor("#fff")
            .setFontSize(35 * this.distance)

    }

}


export default playGame;