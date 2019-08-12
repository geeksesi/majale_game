import { top_ui } from './game_tools/global_ui';
import { season_finish, level_finish } from './game_tools/finish_game_ui';
import { shop_ui} from './game_tools/shop_ui';

class test extends Phaser.Scene {
    constructor() {
        super({ key: 'test' });

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
    }

    create() {
        this.distance = this.sys.game.config.width / 610;

        top_ui(this, 'test');
        shop_ui(this, 'test');
    }
}

export default test;