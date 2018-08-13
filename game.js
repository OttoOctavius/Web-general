//import ("ShooterPhaser/grupetediabolico.js")
var game = new Phaser.Game(1250, 600, Phaser.CANVAS, 'Nave');

var button;

game.state.add('boot', boot);
game.state.add('shooter', shooter);
game.state.add('pdisparo', pdisparo);
game.state.add('pgrupos', pgrupos);

game.state.start('boot');