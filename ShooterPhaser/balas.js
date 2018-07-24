var bulletTime = 0;

function init_bullets(bullets) {
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    for (var i = 0; i < 20; i++) {
        var b = bullets.create(0, 0, 'bullet');
        b.angle = 90;
        b.name = 'bullet' + i;
        b.exists = false;
        b.visible = false;
        b.checkWorldBounds = true;
        b.events.onOutOfBounds.add(resetBullet, this);
    }
}

function resetBullet(bullet) {
    bullet.kill();
}

//TODO: refactor urgente, variables fuera de scope
function fireBullet(nave) {
    if (game.time.now > bulletTime) {
        bullet = bullets.getFirstExists(false);
        if (bullet) {
            bullet.reset(nave.x + 50, nave.y + 20); //Mal ajustado y
            bullet.body.velocity.x = 300;
            bulletTime = game.time.now + 150;
        }
    }
}