var game = new Phaser.Game(1250, 750, Phaser.CANVAS, 'Nave');

var button;

game.state.add('boot', boot);
game.state.add('shooter', shooter);
game.state.add('pdisparo', pdisparo);

game.state.start('boot');