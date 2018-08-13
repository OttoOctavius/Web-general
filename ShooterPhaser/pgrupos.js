var sprites;
var rip = 0;

/* Recordar que los stages se crean en forma objetosa, y se ponen los 4 
metodos conocidos */
var pgrupos = {

    preload: function() {

        game.load.spritesheet('mummy', 'ShooterPhaser/assets/sprites/metalslug_mummy37x45.png', 37, 45, 18);
        game.load.image('bullet', 'ShooterPhaser/assets/misc/bullet0.png');
    },

    create: function() {
        nave = game.add.sprite(400, 550, 'baddie1');
        game.physics.arcade.enable(nave);
        weapon = game.add.weapon(30, 'bullet');
        //  The bullet will be automatically killed when it leaves the world bounds
        weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        //  The speed at which the bullet is fired
        weapon.bulletSpeed = 600;
        //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
        weapon.fireRate = 100;
        weapon.trackSprite(nave, 0, 0, true);
        //  Tell the Weapon to track the 'player' Sprite
        //  With no offsets from the position
        //  But the 'true' argument tells the weapon to track sprite rotation  
        cursors = this.input.keyboard.createCursorKeys();
        fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

        sprites = game.add.group();

        game.time.events.loop(100, this.createSprite, this);
    },


    update: function() {

        sprites.setAll('x', 10, true, true, 1);

        sprites.forEach(this.checkSprite, this, true);
        moverse(nave);
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

function moverse(nave) {

    if (cursors.up.isDown) {
        game.physics.arcade.accelerationFromRotation(nave.rotation, 300, nave.body.acceleration);
    } else {
        nave.body.acceleration.set(0);
    }

    if (cursors.left.isDown) {
        nave.body.angularVelocity = -300;
    } else if (cursors.right.isDown) {
        nave.body.angularVelocity = 300;
    } else {
        nave.body.angularVelocity = 0;
    }

    if (fireButton.isDown) {
        weapon.fire();
    }

    game.world.wrap(nave, 16);

}