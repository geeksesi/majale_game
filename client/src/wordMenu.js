import { get_word } from './server';

class wordMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'wordMenu' });

    }

    init(data) {
        // this.season_id = data.season_id;
        this.language_id = data.language_id;
        this.word_data = data.word_data;
    }

    preload() {
        this.words_state = [
            { x: 10, y: 40 },
            { x: 100, y: 40 },
            { x: 190, y: 40 },
            { x: 10, y: 100 },
            { x: 100, y: 100 },
            { x: 190, y: 100 },
            { x: 10, y: 160 },
            { x: 100, y: 160 },
            { x: 190, y: 160 },
            { x: 10, y: 220 },
            { x: 100, y: 220 },
            { x: 190, y: 220 },
            { x: 10, y: 280 },
            { x: 100, y: 280 },
            { x: 190, y: 280 },
            { x: 10, y: 340 },
            { x: 100, y: 340 },
            { x: 190, y: 340 },
            { x: 10, y: 400 },
            { x: 100, y: 400 },
            { x: 190, y: 400 },
            { x: 10, y: 460 },
            { x: 100, y: 460 },
            { x: 190, y: 460 },
            { x: 10, y: 520 },
            { x: 100, y: 520 },
            { x: 190, y: 520 },
            { x: 10, y: 580 },
            { x: 100, y: 580 },
            { x: 190, y: 580 },

        ];
    }
    async create() {
        // this.word_data = await get_word(this.season_id);
        // console.log(this.word_data + " " + this.season_id)
        this.words = [];
        for (let index = 0; index < this.word_data.length; index++) {
            this.words.push(this.add.text(this.words_state[index].x, this.words_state[index].y, index, { fontSize: "22px", color: "#2f2f2f", height: 80, width: 80 }));
            this.words[index].setInteractive();
            this.words[index].on('pointerdown', () => { this.playGame_now(index) }, this, 1);
        }
    }


    playGame_now(word_id) {
        // console.log(quest, answer, status);
        this.scene.start('playGame', {
            // quest: quest,
            // answer: answer,
            // satus: status,
            // season_id: this.season_id,
            word_id : word_id,
            language_id : this.language_id,
            word_data: this.word_data
        });

    }
}

export default wordMenu;