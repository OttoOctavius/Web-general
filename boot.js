var boot = {

    preload: function() {
        game.load.image('nave', 'boss1.png');

        //enemigos horizontales
        game.load.image('baddie1', 'ShooterPhaser/assets/sprites/shmup-baddie.png');
        game.load.image('baddie2', 'ShooterPhaser/assets/sprites/shmup-baddie2.png');
        game.load.image('baddie3', 'ShooterPhaser/assets/sprites/shmup-baddie3.png');
        //enemigos verticales
        game.load.image('baddie4', 'ShooterPhaser/assets/sprites/shmup-ship.png');
        game.load.image('baddie5', 'ShooterPhaser/assets/sprites/shmup-ship2.png');
        //Nave
        game.load.spritesheet('navej', 'ShooterPhaser/assets/sprites/nave32x32.png', 416 / 5, 106, 15);
    },

    create: function() {
        button = game.add.button(game.world.centerX, game.world.centerY, 'nave', onClick);
        button.anchor.setTo(0.5);
    },

    update: function() {}

};

function onClick() {
    game.state.start('shooter');
};

function naveacciones(sprite) {
    //game.physics.arcade.angleBetween(arrow, target);
    if (cursors.left.isDown) {
        sprite.body.velocity.x += -5;
    }
    if (cursors.right.isDown) {
        sprite.body.velocity.x += 5;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.Q))
        sprite.body.rotation += 1.0 / 180;
    if (game.input.keyboard.isDown(Phaser.Keyboard.E))
        sprite.body.rotation -= 1.0 / 180;

    if (cursors.up.isDown) {
        sprite.body.velocity.y += -10;
    }
    if (cursors.down.isDown) {
        sprite.body.velocity.y += 10;
    }

    //sprite.body.velocity.x *= Math.cos(sprite.rotation);
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        balas.play();
        fireBullet(nave);
    }
}