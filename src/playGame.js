class playGame extends Phaser.Scene {

    constructor() {
        super({ key: 'playGame' });
    }

    preload() {

    }

    create() {
        // this.words =this.add.group()
        // this.add.grid(0, 0, 50 * 6, 50 * 5, 50, 50, 0x999999, 1, 0x666666).setOrigin(0);

        this.graphics = this.add.graphics({ fillStyle: { color: 0x9e9e9e } });

        this.till_bg = [];
        let words = ["س","ل","ا","م","خ","و","ب","ی","چ","خ","ب","ر","ا","خ","و","ش","م","ی","گ","ذ","ر","ه","ب","ب","م","ج"];
        this.till_words = []
        const max_x = 5;
		const max_y = 5;
		const till = {
			offset_x : this.sys.game.config.width / 8, 
			width : this.sys.game.config.width - (this.sys.game.config.width / 4),  
			offset_y : this.sys.game.config.height - (this.sys.game.config.width - (this.sys.game.config.width / 4) + this.sys.game.config.height / 20), 
		}
        for (let x = 0; x < max_x; x++) {
			for (let y = 0; y < max_y; y++) {
                this.till_bg.push(new Phaser.Geom.Rectangle(till.offset_x + (x * (till.width / max_x)), till.offset_y + (y * (till.width / max_y)), (till.width / max_x), (till.width / max_x)));
            }
        }
		console.log(this.till_bg[0]);
        // this.graphics.lineStyle(1, 0x666666);
        this.graphics.fillStyle(0x9e9e9e);
        this.graphics.lineStyle(3, 0xffffff);
        for (let i = 0; i < this.till_bg.length; i++) {
            this.add.text(this.till_bg[i].x + ((this.till_bg[i].width/2.5)), this.till_bg[i].y + (this.till_bg[i].width/5), words[i]).setFontFamily('Noto Sans').setFontSize(this.till_bg[i].width/2.5).setColor('#222').setAlign("center");
            this.graphics.strokeRectShape(this.till_bg[i]);
            this.graphics.fillRectShape(this.till_bg[i]);
        }
        this.p_isdown = false;
        this.input.on('pointerdown', () => {
            this.p_isdown = true;
        }, this);
        this.input.on('pointerup', this.pointer_up, this);
        this.input.on('pointermove', this.pointer_move, this);
        console.log("hello");
    }

    pointer_up() {
        this.p_isdown = false;
        this.graphics.fillStyle(0x9e9e9e);
        this.graphics.lineStyle(3, 0xffffff);
        for (let i = 0; i < this.till_bg.length; i++) {
			this.graphics.strokeRectShape(this.till_bg[i]);
            this.graphics.fillRectShape(this.till_bg[i]);
        }
    }
	
    pointer_move(pointer) {
		// this.graphics.fillRectShape(2, 0xffffff);
		this.graphics.fillStyle(0x2e2e2e);
		this.graphics.lineStyle(3, 0xffffff);
        if (this.p_isdown) {
			for (let i = 0; i < this.till_bg.length; i++) {
				if(this.till_bg[i].contains(pointer.x, pointer.y))
				{
					this.graphics.fillRectShape(this.till_bg[i]);
					this.graphics.strokeRectShape(this.till_bg[i]);
					break;
				}
			}
			// console.log(pointer);
			// console.log(this.till_bg[0]);
        }
		
	}
	
    // update() {

    // }
}


export default playGame;