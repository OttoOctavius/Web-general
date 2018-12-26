var elegidos = [];
var seleccionar = false;
var puntomouse = new Phaser.Rectangle(0, 0, 0, 0);
var timerSeleccion = null;
//timerSeleccion.autoDestroy = false;

function iniciarMouse(jugador, enemigo) {
    game.input.onDown.add(ComenzarSeleccion, this);
    game.input.onUp.add(TerminarSeleccion, this);

    jugador.forEach(function(element) {
        seleccionable(element);
    }, this);

    enemigo.forEach(function(element) {
        seleccionable(element);
    }, this);

    //puntomouse.inputEnabled = true;
    //puntomouse.input.enableDrag(true);
}

//----------------Seleccionar una sola unidad-----------------
function seleccionable(sprite) {
    sprite.events.onInputOut.add(olvidarObj, this);
    sprite.events.onInputOver.add(recordarObj, this);
}

function olvidarObj(obj, responsable) {
    //console.log('Estas saliendo', arguments);
    //elegidos = null;
    //game.camera.target = null;
}


function recordarObj(obj, responsable) {
    //console.log('Estas entrando', arguments);
    if (seleccionable) {
        elegidos.push(obj);
    }

    //console.log(obj);
    //console.log(responsable);
    //game.camera.target = obj; // Si se pone se pierde la libertad!!
}


//-------------------------Accion de arrastre----------------
function ComenzarSeleccion(pointer) {
    //console.log("algo");
    puntomouse.x = game.camera.x + pointer.x;
    puntomouse.y = game.camera.y + pointer.y;
    puntomouse.width = 0;
    puntomouse.height = 0;
}

function TerminarSeleccion(pointer) {
    puntomouse.width = pointer.x - puntomouse.x;
    puntomouse.height = pointer.y - puntomouse.y;
    timerSeleccion = new Phaser.Timer(game, true);
    //timerSeleccion.
    //timerSeleccion.events.add.onComplete(quitarseleccion, this);
}

function quitarseleccion(params) {
    puntomouse.width = 0;
    puntomouse.height = 0;
}
//----------------------Acciones Menu para jugador-----------------------------------
function up() {
    menu_visible(true);
    console.log('button up', arguments);
}

function over() {
    console.log('button over');
}

function out() {
    menu_visible(false);
    console.log('button out');
}

var apretadoMouse = false;

function mousedown(tipo) {
    //console.log("generando bien") 
    if (!apretadoMouse) {
        apretadoMouse = !apretadoMouse;

        element = CrearNave(cmd.x, cmd.y, tipo.key, 200);
        seleccionable(element);
        jugador.add(element);
        //La vida se deberia seleccionar automaticamente
    }
}

function mouseup(tipo) {
    apretadoMouse = false;
}


function actionOnClick() {

    //background.visible = !background.visible;

}

function click(pointer) {
    //	You can hitTest against an array of Sprites, an array of Phaser.Physics.P2.Body objects, or don't give anything
    //	in which case it will check every Body in the whole world.

    var bodies = null; //pointer.hitTest(pointer.position, [enemigo, nave]);
    game.add.text(pointer.x, pointer.y, "*", { font: "8px Courier", fill: "#ffffff" });
    if (bodies.length === 0 && false) {
        result = "You didn't click a Body";
    } else {
        result = "You clicked: ";

        for (var i = 0; i < bodies.length; i++) {
            //	The bodies that come back are p2.Body objects.
            //	The parent property is a Phaser.Physics.P2.Body which has a property called 'sprite'
            //	This relates to the sprites we created earlier.
            //	The 'key' property is just the texture name, which works well for this demo but you probably need something more robust for an actual game.
            result = result + bodies[i].parent.sprite.key;

            if (i < bodies.length - 1) {
                result = result + ', ';
            }
        }

    }

}