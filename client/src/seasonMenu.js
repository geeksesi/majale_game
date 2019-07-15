import { get_season } from './server';
class seasonMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'seasonMenu' });

    }
    init(data) {
        this.language_id = data.language_id;

    }
    preload() {
        this.season_state = [
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
        // this.seasons_data = [];
        // console.log(this.seasons_data);
    }
    async create() {
        this.seasons_data = await get_season(this.language_id);
        this.seasons = [];
        for (let index = 0; index < this.seasons_data.length; index++) {
            this.seasons.push(this.add.text(this.season_state[index].x, this.season_state[index].y, this.seasons_data[index].name, { fontSize: "22px", color: "#2f2f2f", height: 80, width: 80 }));
            this.seasons[index].setInteractive();
            this.seasons[index].on('pointerdown', () => { this.playGame_now(this.seasons_data[index].id) }, this, 1);
        }
    }

    playGame_now(season_id) {
        console.log(season_id);

    }
}

export default seasonMenu;