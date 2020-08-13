import 'phaser';

export default class TitleScene extends Phaser.Scene {
    constructor() {
        super('Title')
    }

    create() {
        this.titleImage = this.add.image(0, 0, 'title');
        this.centerObject(this.titleImage, 1);

        this.gameButton = this.add.sprite(0, 0, 'blueButton1').setInteractive();
        this.centerObject(this.gameButton, -1);

        this.gameText = this.add.text(0, 0, 'Play', { fontSize: '32px', fill: '#fff' })
        Phaser.Display.Align.In.Center(this.gameText, this.gameButton);

        this.gameButton.on('pointerdown', (pointer) => {
            this.scene.start('Game');
        });

        this.gameButton.on('pointerover', (pointer) => {
            this.gameButton.setTexture('blueButton2');
        });

        this.gameButton.on('pointerout', (pointer) => {
            this.gameButton.setTexture('blueButton1');
        });
    }

    centerObject(gameObject, offset = 0) {
        let height = this.cameras.main.height;
        let width = this.cameras.main.width;

        gameObject.x = width / 2;
        gameObject.y = height / 2 - offset * 100;
    }
}
