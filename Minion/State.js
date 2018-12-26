
class StateMachine {
    constructor() {
        this.currentState;
        this.states = [];

        this.states.push(new Idle('idle'));
        this.states.push(new Walk('walk'));
        this.states.push(new Jump('jump'));
        this.states.push(new Attack('attack'));

        this.currentState = this.states.find(this.idle);
    }

    idle(s) { return s.name == 'idle'; }
    walk(s) { return s.name == 'walk'; }
    jump(s) { return s.name == 'jump'; }
    attack(s) { return s.name == 'attack'; }

    changeState(event, knight, data) {
        switch (event) {
            case 'idle':
                this.handleIdle(knight);
                break;
            case 'walk':
                this.handleWalk(knight, data);
                break;
            case 'jump':
                this.handleJump(knight, data);
                break;
            case 'attack':
                this.handleAttack(knight);
        }
    }

    handleIdle(knight) {
        this.currentState = this.states.find(this.idle);
        this.currentState.handle(knight);
    }

    handleWalk(knight, data) {
        this.currentState = this.states.find(this.walk);
        this.currentState.handle(knight, data);
    }

    handleJump(knight, data) {
        if (this.currentState.name != 'jump') {
            this.currentState = this.states.find(this.jump);
        }

        if (!knight.isJumping()) {
            this.currentState.handle(knight, data);
        } else {
            this.handleSecondJump(knight, data);
        }

        knight.resetDoubleJump();
    }

    handleSecondJump(knight, data) {
        if (knight.canDoubleJump) {
            knight.canDoubleJump = false;
            this.currentState.handle(knight, data);
        }
    }

    handleAttack(knight) {
        if (this.currentState.name != 'atack') {
            this.currentState = this.states.find(this.attack);
        }
        this.currentState.handle(knight);
    }
}

class State {
    constructor(name) { this.name = name; }
    handle() {}
}

class Idle extends State {
    constructor(name) { super(name); }

    handle(knight) {
        knight.body.velocity.x = 0;
        //knight.body.velocity.y = 0;
        knight.animations.stop();
        knight.frame = 0;
    }
}

class Walk extends State {
    constructor(name) { super(name); }

    handle(knight, data) {
        knight.body.velocity.x = data.x;
        knight.scale.x = data.scale;
        knight.animations.play('walk');
    }
}

class Jump extends State {
    constructor(name) { super(name); }

    handle(knight, data) {
        knight.animations.play('jump');
        knight.body.velocity.y = data.y;
    }
}

class Attack extends State {
    constructor(name) { super(name); }

    handle(knight, data) {
        knight.animations.play('attack');
        knight.weapon.fire();
    }
}