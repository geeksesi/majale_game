import { init, loaded_finished } from './server';
class seasonMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'loading' });

    }

    async preload() {

        this.show_progress()
        console.log("loading")
        this.load.image('win_bg', 'assets/win.jpg');

        let image_loaded = false;
        this.load.on('complete', function() {
            image_loaded = true;
        });
        init(res => {
            let wait_for_image = setInterval(async() => {
                if (image_loaded) {
                    loaded_finished();
                    this.hide_progress(res.user.play_time);
                    clearInterval(wait_for_image);
                }
                console.log(res);
            }, 500);
        })
    }

    show_progress() {

        this.my_progress = this.add.graphics();
        let i = 0,
            reverse = false;
        this.load_interval = setInterval(() => {
            if (i > 350) { reverse = true }
            if (i < 50) { reverse = false }
            if (reverse) { i-- } else { i++ }
            this.my_progress.clear();
            this.my_progress.lineStyle(4, 0xff00ff, 1);
            this.my_progress.beginPath();
            this.my_progress.arc(this.sys.game.config.width / 2 - 25, this.sys.game.config.height / 2 - 25, 50, Phaser.Math.DegToRad(i), Phaser.Math.DegToRad(0), true).setAngle(0);
            this.my_progress.strokePath();

        }, 10)
    }

    hide_progress(first_time) {
        clearInterval(this.load_interval);
        this.my_progress.clear();
        if (first_time === 1) {
            this.scene.start('languageMenu');
        } else {
            this.scene.start('mainMenu');
        }

    }

}

export default seasonMenu;