import 'phaser';
import logoImg from "../assets/logo.png";

export default class PreloaderScene extends Phaser.Scene {
    constructor() {
        super('Preloader')
    }

    init() {
        this.readyCount = 0;
    }

    preload() {
        let height = this.cameras.main.height;
        let width = this.cameras.main.width;

        this.add.image(width / 2, height / 2 - 100, 'logo');

        // progress bar
        let progressBar = this.add.graphics();
        let progressBox = this.add.graphics();

        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 2 - 160, height / 2 - 30, 320, 50);

        let loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        let percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        let assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);

        // Update progress bar
        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(width / 2 - 150, height / 2 - 20, 300 * value, 30);
        })

        // Update asset text
        this.load.on('fileprogress', function (file) {
            assetText.setText('Loading asset: ' + file.key);
        });

        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            assetText.destroy();
            loadingText.destroy();
            percentText.destroy();
            this.ready();
        }.bind(this));

        // Time event for logo
        this.timedEvent = this.time.delayedCall(1, this.ready, [], this);

        this.loadAssests();
    }

    loadAssests() {
        // Load assets
        this.load.image("bullet", "src/assets/level/bulletDark2_outline.png");
        this.load.image("tower", "src/assets/level/tank_bigRed.png");
        this.load.image("enemy", "src/assets/level/tank_sand.png");
        this.load.image("base", "src/assets/level/tankBody_darkLarge_outline.png");
        this.load.image("title", "src/assets/ui/title.png");
        this.load.image("cursor", "src/assets/ui/cursor.png");
        this.load.image("blueButton1", "src/assets/ui/blue_button02.png");
        this.load.image("blueButton2", "src/assets/ui/blue_button03.png");

        // placeholder
        this.load.image("logo2", "src/assets/logo.png");

        // Load tile map
        this.load.tilemapTiledJSON("level1", "src/assets/level/level1.json");
        this.load.spritesheet("terrainTiles_default", "src/assets/level/terrainTiles_default.png", { frameWidth: 64, frameHeight: 64 });
    }

    ready() {
        this.readyCount++;
        if (this.readyCount === 2) {
            this.scene.start('Title');
        }
    }
}
