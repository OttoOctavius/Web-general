var game = new Phaser.Game(800, 600, Phaser.AUTO, 'Otto', { preload: preload, create: create, update: update, render: render });
var cursors;
var nave;

var jugador;
var bullets;
var cmd;

function preload() {
    game.load.image('backdrop', 'assets/pics/remember-me.jpg');
    game.load.image('explosion', 'assets/sprites/explosion.png', 320 / 5, 320 / 5);
    //buildings
    game.load.image('bunker', 'assets/sprites/bunker.jpg');
    game.load.image('cmdcenter', 'assets/sprites/Command_Center.jpg');
    game.load.image('satelite', 'assets/sprites/satelite.jpg');
    //enemigos horizontales
    game.load.image('baddie1', 'assets/sprites/shmup-baddie.png');
    game.load.image('baddie2', 'assets/sprites/shmup-baddie2.png');
    game.load.image('baddie3', 'assets/sprites/shmup-baddie3.png');
    //enemigos verticales
    game.load.image('baddie4', 'assets/sprites/shmup-ship.png');
    game.load.image('baddie5', 'assets/sprites/shmup-ship2.png');
    //Nave
    game.load.spritesheet('nave', 'assets/sprites/nave32x32.png', 416 / 5, 106, 15);
    //Proyectiles
    game.load.image('bullet', 'assets/misc/bullet0.png');
    game.load.image('orber', 'assets/sprites/orb-red.png');
    game.load.json('estructuras', 'assets/estructuras.json');

    game.load.audio('disparo', 'assets/digisounds/074.wav')
}


function create() {
    game.world.setBounds(0, 0, 1920, 1200);
    game.add.sprite(0, 0, 'backdrop');

    jugador = game.add.group();
    enemigo = game.add.group();

    cmd = crearEdificio(20, 1000, 'cmdcenter', 300);
    //cmd.events.onInputOver.add(function() { menu_visible(true); }, this);
    //cmd.events.onInputOut.add(function() { menu_visible(false); }, this);
    //cmd.events.onInputDown.add(listener, this);

    jugador.add(cmd);
    createMenu(cmd.x, cmd.y);
    //puntomouse.physicsBodyType = Phaser.Physics.ARCADE;
    game.physics.arcade.enable(puntomouse);

    CrearBasesEnemigas(game.rnd.between(1, 1));

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
    jugador.add(nave);

    //game.input.onDragStart.add(ComenzarSeleccion, this);
    //game.input.onDragStop.add(TerminarSeleccion, this);
    game.camera.follow(nave);
    cursors = game.input.keyboard.createCursorKeys();
    game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.W]);
    //this.input.onDown.add(weapon.fire, this);

    iniciarMouse(jugador, enemigo);
    game.physics.startSystem(Phaser.Physics.ARCADE);
}

//Reconsiderar moverlos fuera de vista!!!
function collisionHandler(victima, bullet) {
    bullet.kill();
    victima.vida -= 10;
    victima.barravida.width = victima.vida * victima.largovida;
    if (victima.vida <= 0) {
        console.log("Murio")
            //victima.parent.remove(victima);
            //victima.kill();
    }

}

function update() {
    if (puntomouse.width > 0)
        game.physics.arcade.overlap(nave, puntomouse,
            function() { console.log("Señalo algo"); });
    processAllysMovement();
    processEnemyMovement();

    seleccionar = game.input.keyboard.isDown(Phaser.Keyboard.S);
    if (game.camera.target == null)
        camaraMove();
    else
        naveacciones(nave);
}

//edif.nombre = 'edificio';
function processAllysMovement() {
    jugador.forEach(function(element) {
        game.physics.arcade.collide(element, bullets, collisionHandler);

        //element.rotation = game.physics.arcade.moveToPointer(element, 60, game.input.activePointer, 500);

    }, this);

    elegidos.forEach(function(nave) {
        ang = game.physics.arcade.angleBetween(nave, game.camera);
        nave.rotation = ang;
        //if (grupo.contains(element))
        //  game.camera.follow(element);
    }, this);

}

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

function render() {
    //game.debug.cameraInfo(game.camera, 32, 32);
    //game.debug.pointer(game.input.activePointer);
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
    game.debug.geom(puntomouse, 'rgba(0,255,0,0.25)');
}

function camaraMove() {
    if (cursors.up.isDown) {
        game.camera.y -= 20;
    } else if (cursors.down.isDown) {
        game.camera.y += 20;
    }

    if (cursors.left.isDown) {
        game.camera.x -= 20;
    } else if (cursors.right.isDown) {
        game.camera.x += 20;
    }
}