import { top_ui } from './game_tools/global_ui';
import { change_user_detail } from './server';

class userDetail extends Phaser.Scene {
    constructor() {
        super({ key: 'userDetail' });

    }

    preload() {

    }

    async create() {
        await top_ui(this, "userDetail")
        this.avatar_ui();
        this.input_ui();
        this.input_btn_ui();
    }


    avatar_ui() {
        this.avatar_area = this.add.graphics()
            .fillStyle(0xf9ca24)
            .fillCircle(
                300 * this.distance,
                350 * this.distance,
                48 * this.distance,

            )

        this.av = {}
        this.av1('avatar10');
        this.more_av('avatar2', 2)
        this.more_av('avatar3', 3)
        this.more_av('avatar1', 4)
        this.more_av('avatar5', 5)
        this.more_av('avatar9', 6)
        this.more_av('avatar7', 7)
    }

    av1(name) {
        if (typeof this.av[1] !== 'undefined') {
            this.av[1].destroy();
        }
        this.av[1] = this.add.sprite(
            300 * this.distance,
            350 * this.distance,
            name
        )
            .setScale(this.distance / 2.5 )
        this.av[1].avName = name;
    }

    more_av(name, number) {
        if (typeof this.av[number] !== 'undefined') {
            this.av[number].destroy();
        }
        let cord = {
            2: {
                x: 50 * this.distance,
                y: 350 * this.distance,
                scale: 2.7
            },
            3: {
                x: 130 * this.distance,
                y: 350 * this.distance,
                scale: 2.5

            },
            4: {
                x: 210 * this.distance,
                y: 350 * this.distance,
                scale: 2.3
            },
            5: {
                x: 400 * this.distance,
                y: 350 * this.distance,
                scale: 2.3
            },
            6: {
                x: 480 * this.distance,
                y: 350 * this.distance,
                scale: 2.5

            },
            7: {
                x: 550 * this.distance,
                y: 350 * this.distance,
                scale: 2.7
            },
        };
        this.av[number] = this.add.sprite(
            cord[number].x,
            cord[number].y,
            name
        )
            .setScale(this.distance / (cord[number].scale))
            .setInteractive()
            .on('pointerdown', () => {
                if (!this.av_selected) {
                    this.av_selected = true;
                    const tmp_name = this.av[number].avName;
                    // this.av[number].destroy();
                    this.more_av(this.av[1].avName, number);
                    this.av1(tmp_name);
                    setTimeout(() => {
                        this.av_selected = false
                    }, 400);
                }
            })
        this.av[number].avName = name;

    }


    input_ui() {
        document.getElementById('inputName').style = `\
        width : ${500 * this.distance}px;\
        display : inline;
        z-index : 100;\
        position : absolute;\
        margin-left : -${(520 / 2) * this.distance}px;\
        margin-top : ${600 * this.distance}px;\
        padding : ${15 * this.distance}px;\
        border : 0;\
        font-size : ${35 * this.distance}px;\
        background : transparent;\
        border-bottom : 2px solid #a0a0a0;\
        text-align : center;\
        font-family : Lalezar;\
        
        `;
        document.getElementById('inputName').placeholder = "نــام نــمــایــشــی"
    }

    input_btn_ui() {
        this.input_btn = this.add.graphics()
            .fillStyle(0x6ab615)
            .fillRoundedRect(
                160 * this.distance,
                750 * this.distance,
                300 * this.distance,
                90 * this.distance,
                45 * this.distance
            )
            .setInteractive(
                new Phaser.Geom.Rectangle(
                    160 * this.distance,
                    750 * this.distance,
                    300 * this.distance,
                    90 * this.distance,
                ),
                Phaser.Geom.Rectangle.Contains
            )
            .on('pointerdown', () => {
                if (document.getElementById('inputName').value === '') {
                    console.log('please fill name');
                } else {
                    const ok_obj = {
                        name: document.getElementById('inputName').value,
                        av_name: this.av[1].avName,
                    }
                    change_user_detail(ok_obj, res => {
                        if (res) {
                            document.getElementById('inputName').style = "display : none;"
                            this.scene.start('leaderboard')
                        } else {
                            document.getElementById('inputName').style = "display : none;"
                            this.scene.start('mainMenu')
                        }
                    })
                    // console.log(ok_obj);
                }

            })

        this.input_btn_text = this.add.text(
            230 * this.distance,
            775 * this.distance,
            "انــتــخــاب"
        )
            .setFontFamily('Lalezar')
            .setFontSize(45 * this.distance)
            .setColor("#fff")
    }


}

export default userDetail;