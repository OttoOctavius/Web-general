var boot = {

	preload: function(){
		game.load.image('nave', 'boss1.png');	
	},

	create: function(){
    	button = game.add.button(game.world.centerX, game.world.centerY, 'nave', onClick);
		button.anchor.setTo(0.5);
	},

	update: function(){
	}

};

function onClick() {
	game.state.start('load');
}


