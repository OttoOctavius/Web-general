var cursors;
var nave;

var bullets;
var cmd;

var shooter = {
    preload: function() {
        game.load.image('bullet', 'ShooterPhaser/assets/misc/bullet0.png');
        game.load.image('backdrop', 'ShooterPhaser/backscroll.png');
        game.load.image('starfield', 'ShooterPhaser/assets/misc/starfield.png');
        game.load.audio('disparo', 'ShooterPhaser/assets/digisounds/074.wav');

    },

    create: function() {
        game.world.setBounds(0, 0, 1920, 1200);
        fondo = game.add.sprite(0, 0, 'starfield');
        game.add.sprite(fondo.width, 0, 'starfield');
        game.add.sprite(0, fondo.height, 'starfield');
        game.add.sprite(fondo.width, fondo.height, 'starfield');

        balas = game.add.audio('disparo');
        bullets = game.add.group();
        init_bullets(bullets);

        var weapon = this.add.weapon(10, 'bullet');
        ///weapon.fireFrom = new Phaser.Rectangle(0, 0, 10, 10);
        weapon.autoFire = true;
        weapon.fireRate = 600

        nave = new Nave(game, 100, 180, 'nave', 100);
        nave.animations.play('normal', 15, true);
        nave.body.allowRotation = true;
        nave.inputEnabled = nave.enableDrag = true;

        game.camera.follow(nave);
        cursors = game.input.keyboard.createCursorKeys();
        game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.W]);

        game.physics.startSystem(Phaser.Physics.ARCADE);
    },

    naveacciones: function(sprite) {
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
    },

    update: function() {

        seleccionar = game.input.keyboard.isDown(Phaser.Keyboard.S);
        if (game.camera.target == null)
            camaraMove();
        else
            naveacciones(nave);
    },

    render: function() {
        //game.debug.cameraInfo(game.camera, 32, 32);
        //game.debug.pointer(game.input.activePointer);
        /*
        enemigo.forEach(function(element) {
            game.debug.geom(element.barravida, 'rgba(255,0,0,1)');
        }, this);

        //Solo para testeo
        jugador.forEach(function(element) {
            temp = posUnit(element);
            element.barravida.x = temp.x; //element.x;
            element.barravida.y = temp.y - 10; //element.y - 10;
            game.debug.geom(element.barravida, 'rgba(0,0,255,0.5)');
        }, this);


        //if (elegidos != null) {
        //    game.debug.geom(elegidos.barravida, 'rgba(0,0,255,0.5)');
        //}
        game.debug.geom(puntomouse, 'rgba(0,255,0,0.25)');*/
    }
}