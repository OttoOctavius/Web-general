var nave;
var enemigo;
const tiempo_estallido = 10;


var pdisparo = {
    preload: function() {
        game.load.image('bullet', 'ShooterPhaser/assets/misc/bullet0.png');
        game.load.image('backdrop', 'ShooterPhaser/backscroll.png');
        game.load.image('starfield', 'ShooterPhaser/assets/misc/starfield.png');
        game.load.audio('disparo', 'ShooterPhaser/assets/digisounds/074.wav');

        game.load.spritesheet('estallido', 'ShooterPhaser/assets/sprites/boom32wh12.png', 32, 32, 12);
    },
    create: function() {
        nave = game.add.sprite(400, 550, 'baddie1');
        enemigo = game.add.sprite(900, 550, 'baddie1');
        enemigo.visible = false;
        enemigo.time = game.time.now;

        bullets = game.add.group();
        init_bullets(bullets);
        enemigo.enableBody = true;
        enemigo.physicsBodyType = Phaser.Physics.ARCADE;

        estallido = game.add.sprite(600, 550, 'estallido');
        estallido.animations.add('ciclo');
        //estallido.animations.addKeyCapture
        estallido.play('ciclo', tiempo_estallido, true);

        cursors = game.input.keyboard.createCursorKeys();
        game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.W, Phaser.Keyboard.E, Phaser.Keyboard.S]);
        game.physics.startSystem(Phaser.Physics.ARCADE);
    },
    update: function() {
        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            fireBullet(nave);
        }
        if (game.input.keyboard.justPressed(Phaser.Keyboard.E) && enemigo.time + 10000 > game.time.now) {
            enemigo.visible = true;
            enemigo.health = 10;
            //enemigo.heal(1); .damage(1) .alive
        }
        if (game.input.keyboard.justPressed(Phaser.Keyboard.S)) {
            estallido.play('ciclo', tiempo_estallido, true);
        }
    },
    render: function() {
        game.debug.text("Tiempo del estallido:" + tiempo_estallido.toString(), 100, 50);
    }
}