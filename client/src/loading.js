import { init, loaded_finished } from './server';
import { loading_start, loading_stop } from './game_tools/loading_ui';
class seasonMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'loading' });

    }

    async preload() {

        this.load.image('english_flag', 'assets/Eng_flag.png')
        this.load.image('exp_icon', 'assets/xp.png')
        this.load.image('coin_icon', 'assets/coin.png')
        this.load.image('back', 'assets/back.png')
        this.load.image('avatar1', 'assets/av1.png')
        this.load.image('avatar2', 'assets/av2.png')
        this.load.image('avatar3', 'assets/av3.png')
        this.load.image('avatar4', 'assets/av4.png')
        this.load.image('avatar5', 'assets/av5.png')
        this.load.image('avatar6', 'assets/av6.png')
        this.load.image('avatar7', 'assets/av7.png')
        this.load.image('avatar8', 'assets/av8.png')
        this.load.image('avatar9', 'assets/av9.png')
        this.load.image('avatar10', 'assets/av10.png')
        this.load.image('best_flag', 'assets/ranking.png')
        this.load.image('shop_flag', 'assets/shop.png')

        this.show_progress()
        console.log("loading")

        let image_loaded = false;
        this.load.on('complete', function () {
            image_loaded = true;
        });
        init(res => {
            let wait_for_image = setInterval(async () => {
                if (image_loaded) {
                    loaded_finished();
                    this.hide_progress(res.user.play_time);
                    clearInterval(wait_for_image);
                }
                console.log("finish");
            }, 500);
        })
    }

    show_progress() {
        loading_start(this);
    }

    hide_progress(first_time) {
        loading_stop(this);
        //No Arabic
        // if (first_time === 1) {
        // this.scene.start('languageMenu');
        // } else {
        this.scene.start('mainMenu');
        // }

    }

}

export default seasonMenu;