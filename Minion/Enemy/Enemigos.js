var enemigo;

function CrearBasesEnemigas(cantidad) {
    for (var i = 0; i < cantidad; i++) {
        satelite = crearEdificio(game.rnd.between(0, game.width), game.rnd.between(0, game.heigth), 'satelite', 180);
        satelite.respawn = game.time.now;
        enemigo.add(satelite);
    }
}


function CrearNavesAntiguas(enemigos, x, y) {
    var s = CrearNave(x, y, 'baddie' + game.rnd.between(1, 5));

    //s.rotation = game.physics.arcade.moveToPointer(s, 10, jugador[0], 500);

    enemigos.add(s);
}

function CrearBomberAntiguas(enemigos) {
    var s = game.add.sprite(game.rnd.between(800, 1100), 10, 'baddiev');
    game.physics.arcade.enable(s);
    s.bomba = game.add.sprite(0, 0, 'orber');
    s.bomba.visible = false;
    s.bomba.usada = false;
    s.body.velocity.x = game.rnd.between(-100, -200);

    enemigos.add(s);
}

function EdificioGeneraEnemigos(satelite) {
    if (game.time.now > satelite.respawn + 1500) {
        satelite.respawn = game.time.now;
        CrearNavesAntiguas(enemigo, satelite.body.x, satelite.body.y);
    }
}

function processEnemyMovement() {
    enemigo.forEach(function(e) {
        game.physics.arcade.collide(e, bullets, collisionHandler);

        if (e.nombre == 'edificio')
            EdificioGeneraEnemigos(e);
        else {
            if (e.objetivo != null)
                e.objetivo = unidadcercana(e, jugador);
            else
                reagrupar();

            //e.rotation = game.physics.arcade.moveToPointer(e, 10, e.objetivo, 500);
        }
    });
}

function reagrupar(params) {

}

function lanzarbomba(e) {
    if (false && e.velocity.x > nave.x && e.bomba.usada) {
        e.bomba.usada = true;
        e.bomba.x = e.x;
        e.bomba.y = e.y;
        e.bomba.body.gravity.y = 100;
        e.bomba.body.allowGravity = true; //Salvo que sea un doodle jumpler

        e.bomba.visible = true;
    }
}

function unidadcercana(unidad, grupo) {
    distancia = 20000;
    unit = null;
    v = posUnit(unidad);
    grupo.forEach(function(element) {
        u = posUnit(element);
        udist = game.math(v.x, v.y, u.x, u.y);
        if (distancia > udist) {
            distancia = udist;
            unit = element;
        }
    }, this);
    return unit;
}

function posUnit(element) {
    return { "x": element.body.x, "y": element.body.y };
}