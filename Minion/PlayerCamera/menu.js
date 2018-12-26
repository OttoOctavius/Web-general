var menu;

function createMenu(x, y) {
    menu = game.add.group();
    //    game.stage.backgroundColor = '#182d3b';
    for (var index = 1; index <= 5; index++) {
        button = game.add.button(x + 10, y - 50 * index, 'baddie' + index, actionOnClick, this, 2, 1, 0);
        button.alpha = 0.75;
        button.anchor.x = button.anchor.y = 0.5;
        button.inputEnabled = true;
        button.onInputDown.add(mousedown, this);
        button.onInputUp.add(mouseup, this);
        button.visible = true;
        menu.add(button);
    }
    //menu_visible(false);
}

var rect = new Phaser.Rectangle(100, 100, 100, 100);
var circle = new Phaser.Circle(280, 150, 100);

function menu_visible(bool) {
    menu.forEach(function(element) {
        element.visible = bool;
    }, this);
}

function rendermenu() {
    game.debug.geom(rect, 'rgba(255,0,0,1)');
    /*
    game.debug.geom(circle, 'rgba(255,255,0,1)');
    game.debug.geom(point, 'rgba(255,255,255,1)');
    game.debug.pixel(200, 280, 'rgba(0,255,255,1)');
    game.debug.text("This is debug text", 100, 380);
    */
}