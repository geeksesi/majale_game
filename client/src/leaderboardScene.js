import { top_ui } from './game_tools/global_ui';
import { leader_board } from './server';

class leaderboard extends Phaser.Scene {
    constructor() {
        super({ key: 'leaderboard' });

    }

    preload() {

    }

    async create() {

        await top_ui(this, 'leaderboard');
        this.places = {
            offset_navbar: 160 * this.distance,
            top_offset: 100 * this.distance,
            row_size: 80 * this.distance,
            width_offset: 30 * this.distance,
        }



        // Best Text
        this.best_text = this.add.text(
            215 * this.distance,
            this.places.offset_navbar,
            "بـرتـریـن‌ هـا",
        )
            // .initRTL()
            .setColor('#222')
            .setFontSize(45 * this.distance)
            .setFontFamily('Lalezar')

        this.best_seprator = this.add.graphics()
            .lineStyle(3 * this.distance, 0xa0a0a0, 1)
            .lineBetween(
                230 * this.distance,
                this.places.offset_navbar + 60 * this.distance,
                370 * this.distance,
                this.places.offset_navbar + 60 * this.distance,
            )
        leader_board(res => {
            for (let i = 0; i < 9; i++) {
                if (typeof res.data[i] !== 'undefined') {
                    this.row_ui(i, i + 1, res.data[i].name, res.data[i].xp, res.data[i].avatar)
                }
            }
            this.row_ui(9, res.user.rank, res.user.data.name, res.user.data.xp, res.user.data.avatar, "user");
        })
    }

    // UI
    row_ui(i, rank, name, xp, avatar, user = null) {
        if (user !== null) {
            const row_bg = this.add.graphics()
                .fillStyle(0x6ab615, 0.5)
                .fillRect(
                    0,
                    this.places.offset_navbar + this.places.top_offset + (this.places.row_size * i) - 30 * this.distance,
                    610 * this.distance,
                    this.places.row_size + 10 * this.distance,
                )
                .setInteractive(
                    new Phaser.Geom.Rectangle(
                        0,
                        this.places.offset_navbar + this.places.top_offset + (this.places.row_size * i) - 30 * this.distance,
                        610 * this.distance,
                        this.places.row_size + 10 * this.distance,
                    ),
                    Phaser.Geom.Rectangle.Contains
                )
                .on('pointerdown', () => {
                    this.scene.start('userDetail')
                })
        }
        const row_number = this.add.text(
            (rank.toString().length < 3) ? this.places.width_offset : this.places.width_offset - 15 * this.distance,
            this.places.offset_navbar + this.places.top_offset + (this.places.row_size * i),
            rank
        )
            .setColor((i < 5) ? '#1dd1a1' : '#576574')
            .setFontFamily('Roboto')
            .setFontSize(25 * this.distance)

        const av_bg = this.add.graphics()
            .fillStyle(0xf9ca24, 1.0)
            .fillCircle(
                this.places.width_offset + 100 * this.distance,
                this.places.offset_navbar + this.places.top_offset + (this.places.row_size * i) + 15 * this.distance,
                35 * this.distance
            )

        const av_image = this.add.image(
            this.places.width_offset + 100 * this.distance,
            this.places.offset_navbar + this.places.top_offset + (this.places.row_size * i) + 15 * this.distance,
            avatar
        )
            .setScale(this.distance / 3.5)

        const name_text = this.add.text(
            this.places.width_offset + 150 * this.distance,
            this.places.offset_navbar + this.places.top_offset + (this.places.row_size * i),
            name
        )
            .setColor('#222')
            .setFontSize((name.length < 26) ? 25 * this.distance : 20 * this.distance)
            .setFontFamily('Lalezar')


        const xp_text = this.add.text(
            (xp.toString().length < 7) ? 480 * this.distance : 470 * this.distance,
            this.places.offset_navbar + this.places.top_offset + (this.places.row_size * i),
            xp
        )
            .setColor('#222')
            .setFontSize((xp.toString().length < 6) ? 20 * this.distance : 17 * this.distance)
            .setFontFamily('Roboto')

        const xp_icon = this.add.image(

            575 * this.distance,
            this.places.offset_navbar + this.places.top_offset + (this.places.row_size * i) + 13 * this.distance,
            'exp_icon'
        )
            .setScale(this.distance / 3 * this.distance)
    }

}

export default leaderboard;