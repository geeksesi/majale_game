class detail extends Phaser.Scene {
    constructor() {
        super({ key: 'detail' });

    }

    async preload() {
        this.load.image('loading', 'assets/Loading.png')
        this.load.image('logo', 'assets/MG.png')
    }

    create() {
        const tmp_katibeh_text = this.add.text(
            0,
            0,
            'مجله'
        )
            .setFontSize(5)
            .setFontFamily('YekanBoom')
            .setColor('#fff')



        console.log(parseInt(localStorage.getItem('rubicka_id')))
        if (!parseInt(localStorage.getItem('rubicka_id')))
            localStorage.setItem('rubicka_id', Math.floor((Math.random() * 100) + 1));
        this.scale_value = 0;
        this.scale2_value = 0;
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
        ).setScale(this.scale_value)

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


        this.test_katibeh = this.add.text(
            0 * this.distance,
            0 * this.distance,
            'مـــجـــلـــه'
        )
            .setFontSize(5)
            .setFontFamily('Katibeh')
            .setColor('#fff')
            .setScale(this.scale2_value)
        
            this.logo_finish = false;
    }

    update() {
        if (this.scale_value <= this.distance) {
            this.scale_value += .015;
            this.logo.setScale(this.scale_value)
        }else{
            this.logo_finish = true;
        }
        if (this.scale2_value <= 1) {
            this.scale2_value += .03;
            this.Majle_text_en.setScale(this.scale2_value)
            this.Majle_text_fa.setScale(this.scale2_value)

        } else if (this.logo_finish) {
            // this.scale_value += .009;
            // this.logo.setScale(this.scale_value)
            setTimeout(() => {
                this.scene.start('loading')
            }, 1000)
            this.scene.pause();
        }
    }

}

export default detail;