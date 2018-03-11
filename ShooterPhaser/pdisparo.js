var nave;

var pdisparo = {
    preload: function() {
        game.load.image('bullet', 'ShooterPhaser/assets/misc/bullet0.png');
        game.load.image('backdrop', 'ShooterPhaser/backscroll.png');
        game.load.image('starfield', 'ShooterPhaser/assets/misc/starfield.png');
        game.load.audio('disparo', 'ShooterPhaser/assets/digisounds/074.wav');
    },
    create: function() {
        nave = game.add.sprite(400, 550, 'baddie1');
        bullets = game.add.group();
        init_bullets(bullets);

        cursors = game.input.keyboard.createCursorKeys();
        game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.W]);

        game.physics.startSystem(Phaser.Physics.ARCADE);
    },
    update: function() {
        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            fireBullet(nave);
        }
    }
}