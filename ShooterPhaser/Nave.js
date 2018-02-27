class Nave extends Phaser.Sprite {

    constructor(game, x, y, sprite, vida) {
        super(game, x, y, sprite);
        game.physics.arcade.enable(this);
        game.add.existing(this);
        this.vida = vida;
        this.barravida = new Phaser.Rectangle(x - 25, y - 10, 50, 5);
        this.init();
    }

    init() {
        this.frame = 0;

        this.scale.setTo(0.7);
        this.angle = 90;

        //this.body.setSize(32, 32, 5);

        this.body.gravity.x = 0;
        this.body.gravity.y = 0;
        this.body.allowGravity = false; //Salvo que sea un doodle jumpler

        this.body.maxVelocity.x = 300;
        this.body.maxVelocity.y = 300;
        this.body.collideWorldBounds = true;
        this.body.allowRotation = true;

        this.animations.add('genial', [0], 10, true);
        //this.animations.play('normal', 60, true);
        //this.animations.add('danio', [4], 10, true);
        //this.animations.add('muerte', [4, 6, 4], 25, true);
        /*
        var anim = this.animations.add('normal');
        anim.onStart.add(this.animationStarted, this);
        anim.onLoop.add(this.animationLooped, this);
        anim.onComplete.add(this.animationStopped, this);

        anim.play(10, true);
*/
        //this.createWeapon();

    }

    animationStarted(sprite, animation) {
        game.add.text(32, 32, 'Animation started', { fill: 'white' });
    }

    animationLooped(sprite, animation) {
        if (animation.loopCount === 1) {
            game.add.text(32, 64, 'Animation looped', { fill: 'white' });
        } else {
            //game.add.text(32, 64, 'Animation looped2', { fill: 'white' });
            animation.loop = false;
        }
    }

    animationStopped(sprite, animation) {
        game.add.text(32, 64 + 32, 'Animation stopped', { fill: 'white' });
    }


    createWeapon() {
        this.weapon = game.add.weapon(2, 'fire-attack');
        this.weapon.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
        this.weapon.bulletKillDistance = 150;
        //this.weapon.bulletAngleOffset = 0;
        this.weapon.bulletSpeed = 800;
        this.weapon.fireRate = 100;
        this.weapon.trackSprite(this, 0, 0);
        this.weapon.fireAngle = Phaser.ANGLE_RIGHT;
    }

    //-------------------------------------------------------

    processInputfaf(cursors, spacebar, ctrl) {
        cursors.left.onDown.add(this.changeStateToWalkLeft, this);
        cursors.right.onDown.add(this.changeStateToWalkRigth, this);

        spacebar.onDown.add(this.changeStateToJump, this);

        ctrl.onDown.add(this.changeStateToAttack, this);

        if (this.cursorsOrCtrlIsUp(cursors, ctrl) && !this.cursorsOrCtrlIsDown(cursors, ctrl)) {
            this.changeStateToIdle();
        }
    }

    cursorsOrCtrlIsUp(cursors, ctrl) {
        return cursors.left.isUp || cursors.right.isUp || ctrl.isUp;
    }
    cursorsOrCtrlIsDown(cursors, ctrl) {
        return cursors.left.isDown || cursors.right.isDown || ctrl.isDown;
    }

    changeStateToWalkLeft() {
        this.stateMachine.changeState('normal', this, { "x": -250, "scale": -0.7 });
        //this.weapon.fireAngle = Phaser.ANGLE_LEFT;
    }
    changeStateToWalkRigth() {
        this.stateMachine.changeState('normal', this, { "x": 250, "scale": 0.7 });
        //this.weapon.fireAngle = Phaser.ANGLE_RIGHT;
    }
    changeStateToJump() {
        this.stateMachine.changeState('jump', this, { "y": -600 });
    }
    changeStateToIdle() {
        this.stateMachine.changeState('idle', this, {});
    }
    changeStateToAttack() {
        this.stateMachine.changeState('attack', this, {});
    }

    playAnimation(animation) {
        this.animations.play(animation);
    }

    bounceBack() {
        var newx = this.x;
        var newy = this.y - 25;

        if (this.body.touching.right || this.body.blocked.right) {
            newx -= 25;
        } else if (this.body.touching.left || this.body.blocked.left) {
            newx += 25;
        }

        game.add.tween(this).to({ x: newx, y: newy }, 50, Phaser.Easing.Linear.None, true);
    }


    isAttacking() {
        return this.stateMachine.currentState.name == 'attack';
    }

    processHit(e) {
        var emitter = this.createEmitter(e.x, e.y);
        e.kill();
        emitter.start(true, 2000, null, 10);
    }

    processJumpKill(e, txt) {
        //txt.setText('Life: ' + this.life);

        var emitter = this.createEmitter(e.x, e.y);

        if (this.body.touching.down && e.body.touching.up) {
            this.bounce();
            e.kill();
            emitter.start(true, 2000, null, 10);
        } else {
            this.life -= 1;
            shake.shake(5);
            this.bounceBack();
            hearts.removeChildAt(hearts.length - 1);
        }
    }

    createEmitter(enemyX, enemyY) {
        var emitter = game.add.emitter(0, 0, 100);
        emitter.makeParticles('pixel');
        emitter.gravity = 200;
        emitter.x = enemyX;
        emitter.y = enemyY;

        return emitter;
    }
}