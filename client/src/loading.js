import { loading_finished } from './server';
import { loading_start, loading_stop } from './game_tools/loading_ui';
class seasonMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'loading' });

    }

    async preload() {
        let font_load = false;
        WebFont.load({
            // loading: () => { },
            active: () => {
                console.log("FontREADY")
                font_load = true;
            },
            google: {
                families: ['Roboto:900', 'Noto Sans:700', 'Lalezar', 'Katibeh'],
                // text: 'abcdefghijسلام!'
            }
        });
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
        loading_finished(res => {
            let wait_for_image = setInterval(async () => {
                if (image_loaded) {
                    this.hide_progress();
                    clearInterval(wait_for_image);
                }
            }, 500);
        })
    }

    show_progress() {
        this.scale2_value = 1;
        this.distance = this.sys.game.config.width / 610;
        const make_green = this.add.graphics()
            .fillStyle(0x6ab615)
            .fillRect(
                0,
                0,
                610 * this.distance,
                1080 * this.distance
            )
        this.logo = this.add.image(
            310 * this.distance,
            350 * this.distance,
            'logo'
        ).setScale(this.distance)

        this.Majle_text_en = this.add.text(
            220 * this.distance,
            750 * this.distance,
            'Majale'
        )
            .setFontSize(55 * this.distance)
            .setFontFamily('Lalezar')
            .setColor('#fff')
            .setScale(this.scale2_value)

        this.Majle_text_fa = this.add.text(
            220 * this.distance,
            850 * this.distance,
            'مـــجـــلـــه'
        )
            .setFontSize(45 * this.distance)
            .setFontFamily('Lalezar')
            .setColor('#fff')
            .setScale(this.scale2_value)


        loading_start(this);
    }

    hide_progress() {
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