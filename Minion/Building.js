function agregarPropVida(ente, x, y, vida, largovida) {
    ente.vida = vida;
    ente.largoVida = largovida;
    ente.barravida = new Phaser.Rectangle(x, y - 10, ente.largoVida, 10);
}

function crearEdificio(x, y, nombre, vida) {
    var edif = game.add.sprite(x, y, nombre);
    edif.nombre = 'edificio';
    game.physics.arcade.enable(edif);
    edif.body.allowRotation = false;
    edif.allowRotation = false;
    largovida = escalar(edif, nombre);
    agregarPropVida(edif, x, y, vida, largovida);
    return edif;
}

function escalar(edif, tipo) {
    if (tipo == 'cmdcenter') {
        edif.scale.setTo(0.25);
        return edif.width;
    }
    if (tipo == 'satelite') {
        edif.scale.setTo(0.40);
        return edif.width;
    }
}

//---------------------Creacion  de unidades-----------------------
function CrearNave(x, y, tipo, vida) {
    x += game.rnd.between(-50, 50);
    y += game.rnd.between(-50, 50);
    var s = game.add.sprite(x, y, tipo);
    s.nombre = tipo;
    game.physics.arcade.enable(s);
    agregarPropVida(s, x, y, vida, s.width);

    s.autoCull = false;
    s.checkWorldBounds = true;
    s.allowRotation = false;
    s.body.allowRotation = true;
    s.events.onOutOfBounds.add(resetSprite, this);
    s.events.onKilled.add(resaltarHandler, this);
    return s;
}

function rotationDefault(tipo) {
    if (tipo == "nave")
        return 3.14 / 2;
}

//Reinicia a los enemigos al llegar al borde
function resetSprite(sprite) {
    sprite.x = game.world.bounds.right;
}

//Funciona!!
function resaltarHandler(e, b) {
    game.add.text(e.x, e.y, "***", { font: "32px Courier", fill: "#ffffff" });
}