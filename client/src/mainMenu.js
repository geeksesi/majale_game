import { make_road } from './game_tools/game_design';
import { play_game_data } from './server';
class mainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'mainMenu' });

    }

    preload() {
        // console.log(localStorage.getItem('language_id'));
        this.language_id = parseInt(localStorage.getItem('language_id')) || 2;
    }

    create() {
        // console.log(this.language_id)
        // this.logo = this.add.text(200, 150 , "HEllow",{fontSize : "100px",color:"#22222"});
        this.language_select = this.add.text(this.sys.game.config.width - 100, 30, "", { fontSize: "15px", color: "#2f2f2f" });
        this.set_language(this.language_id)
        this.language_select.setInteractive();
        this.language_select.on('pointerdown', () => {
            if (!this.change_lang) {
                this.change_lang = true;
                this.language_id = (this.language_id === 2) ? 3 : 2;
                this.set_language(this.language_id)
                setTimeout(() => { this.change_lang = false }, 500)
            }
        }, this);


        this.playGame_botton = this.add.text(80, 80, "Play Game", { fontSize: "25px", color: "#2f2f2f" });
        this.playGame_botton.setInteractive();
        this.playGame_botton.on('pointerdown', () => { this.play_game() }, this);

        this.progress = this.add.text(80, 150, "progress", { fontSize: "25px", color: "#2f2f2f" });
        this.progress.setInteractive();
        this.progress.on('pointerdown', () => { this.progress_event() }, this);
    }


    set_language(language_id) {
        localStorage.setItem('language_id', language_id);
        this.language_select.setText((language_id === 2) ? "English" : "عربی")
    }

    // level_selected() {
    //     this.scene.start('seasonMenu', { language_id: this.language_id });
    // }

    progress_event() {
        this.scene.start('season_finish', { season_id: 1 });
    }

    async play_game() {
        let data = await play_game_data();
        await make_road(data.word_list, data.finished_word, data.remembers_word, this.language_id, res => {
            // this.scene.start('wordMenu', {
            //     language_id: this.language_id,
            //     word_data: res
            // });
            this.scene.start('playGame', {
                word_id : 0,
                language_id : this.language_id,
                word_data: res
            });
        })
    }
}

export default mainMenu;