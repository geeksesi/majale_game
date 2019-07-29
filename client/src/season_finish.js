class seasonMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'season_finish' });

    }

    preload() {


    }

    create() {
        this.playGame_botton = this.add.text(80, 80, "Play Game", { fontSize: "25px", color: "#2f2f2f" });
        this.playGame_botton.setInteractive();
        this.playGame_botton.on('pointerdown', () => { this.play_game() }, this);

    }
    
    play_game(){

    }
   
}

export default seasonMenu;