//'use strict';
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
        game.physics.arcade.enable(enemigo);
        enemigo.events.onKilled.addOnce(muere, this);
        bullets = game.add.group();
        init_bullets(bullets);
        enemigobj.init();

        cursors = game.input.keyboard.createCursorKeys();
        game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.W, Phaser.Keyboard.E, Phaser.Keyboard.S]);
        game.physics.startSystem(Phaser.Physics.ARCADE);
    },
    update: function() {
        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            fireBullet(nave);
        }

        enemigobj.update();

        if (game.input.keyboard.justPressed(Phaser.Keyboard.E) && enemigo.time + 10000 > game.time.now) {
            enemigo.visible = true;
            enemigo.health = 3;
            //enemigo.heal(1); .damage(1)
        }
        if (game.input.keyboard.justPressed(Phaser.Keyboard.S)) {
            enemigo.damage(1);
        }
        this.render();
    },
    render: function() {
        if (enemigo.visible) {
            game.debug.geom(new Phaser.Rectangle(enemigo.x, enemigo.y - 10, enemigobj.anchovida(), 5), 'rgba(0,0,255,0.5)');
        }
        game.debug.text("Tiempo del estallido:" + tiempo_estallido.toString(), 100, 50);
    }

};

var enemigobj = {
    init: function() {
        enemigo.enableBody = true;
        enemigo.events.onKilled = muere;

        estallido = game.add.sprite(600, 550, 'estallido');
        estallido.animations.add('ciclo');
        estallido.animations.add('corto', [0, 1, 2, 1, 0], 10, true);
        estallido.play('ciclo', tiempo_estallido, true);
        estallido.events.onAnimationComplete.add(function(sprite, anim) { sprite.visible = false; }, this);
    },
    update: function() {
        if (enemigo.alive) {
            bullets.forEach(function(bala) {
                game.physics.arcade.overlap(enemigo, bala, (balaa) => {
                    bala.kill();
                    enemigo.damage(1);
                    estallido.x = enemigo.x;
                    estallido.y = enemigo.y;
                    estallido.play('corto', 10, true);
                }, null, this);

            }, this);
        }
    },
    anchovida: function() {
        return enemigo.health / 3.0 * enemigo.width;
    }
};

function muere() {
    enemigo.loadTexture('estallido', 0);
    enemigo.animations.add('ciclo');
    enemigo.animations.play('ciclo', 30, false);
    //enemigo.animations.stop(null, true);
}