import { init,get_season } from './server';
class seasonMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'loading' });

    }

    async preload() {


        this.show_progress()
        console.log("loading")
        var progress = this.add.graphics();


        // this.load.on('progress', function (value) {
        //     console.log(value)
        //     progress.clear();
        //     progress.fillStyle(0x000, 1);
        //     progress.fillRect(0, 50, 800 * value, 60);

        // });

        // this.load.on('complete', function () {

        //     progress.destroy();

        // });

        init(res=>{
            setTimeout(async () => {
                console.log(res);
                this.hide_progress();
            }, 1000);
        })
        this.load.atlas('loader', 'assets/loader_sprite.jpg', 'assets/loader_sprite.json');
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
            // console.log(i)
            this.my_progress.lineStyle(4, 0xff00ff, 1);

            //  Without this the arc will appear closed when stroked
            this.my_progress.beginPath();

            // arc (x, y, radius, startAngle, endAngle, anticlockwise)
            this.my_progress.arc(this.sys.game.config.width / 2 - 25, this.sys.game.config.height / 2 - 25, 50, Phaser.Math.DegToRad(i), Phaser.Math.DegToRad(0), true).setAngle(0);

            //  Uncomment this to close the path before stroking
            // this.my_progress.closePath();

            this.my_progress.strokePath();

        }, 10)
    }

    hide_progress() {
        clearInterval(this.load_interval);
        this.my_progress.clear();
        this.scene.start('mainMenu');
        
    }
    
    create() {

    }

    playGame_now() {
        // console.log(season_id);

    }
}

export default seasonMenu;