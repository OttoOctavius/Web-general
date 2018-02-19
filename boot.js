var boot = {

    preload: function() {
        game.load.image('nave', 'boss1.png');

        //enemigos horizontales
        game.load.image('baddie1', 'assets/sprites/shmup-baddie.png');
        game.load.image('baddie2', 'assets/sprites/shmup-baddie2.png');
        game.load.image('baddie3', 'assets/sprites/shmup-baddie3.png');
        //enemigos verticales
        game.load.image('baddie4', 'assets/sprites/shmup-ship.png');
        game.load.image('baddie5', 'assets/sprites/shmup-ship2.png');
        //Nave
        game.load.spritesheet('nave', 'assets/sprites/nave32x32.png', 416 / 5, 106, 15);
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