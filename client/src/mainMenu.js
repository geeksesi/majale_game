class mainMenu extends Phaser.Scene
{
    constructor()
    {
        super({key: 'mainMenu'});
        
    }

    preload()
    {

    }
    create()
    {
        console.log("i'm here")
        // this.logo = this.add.text(200, 150 , "HEllow",{fontSize : "100px",color:"#22222"});
        this.playGame_botton = this.add.text(80, 550 , "Play Game :) ",{fontSize : "50px", color:"#2f2f2f", height: 500, width: 500});
        this.playGame_botton.setInteractive();
        this.playGame_botton.on('pointerdown', this.playGame_now, this);
    }
    update()
    {
    }

    playGame_now() 
    {
        console.log("helloooo");
        this.scene.start('languageMenu');
    }
}

export default mainMenu;
