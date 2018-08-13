var sprites;
var rip = 0;

/* Recordar que los stages se crean en forma objetosa, y se ponen los 4 
metodos conocidos */
var pgrupos = {

    preload: function() {

        game.load.spritesheet('mummy', 'ShooterPhaser/assets/sprites/metalslug_mummy37x45.png', 37, 45, 18);

    },

    create: function() {

        sprites = game.add.group();

        game.time.events.loop(50, this.createSprite, this);

    },


    update: function() {

        sprites.setAll('x', 10, true, true, 1);

        sprites.forEach(this.checkSprite, this, true);

    },

    render: function() {

        game.debug.text("Group size: " + sprites.total, 32, 32);
        game.debug.text("Destroyed: " + rip, 32, 64);

    },

    createSprite: function() {

        var mummy = sprites.create(0, game.world.randomY, 'mummy');

        mummy.animations.add('walk');

        mummy.play('walk', 10, true);

    },

    checkSprite: function(sprite) {

        try {
            if (sprite.x > game.width) {
                rip++;
                sprites.remove(sprite, true);
            }
        } catch (e) {
            console.log(sprite);
        }

    }
};