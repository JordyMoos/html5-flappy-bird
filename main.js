
var game = new Phaser.Game(400, 490, Phaser.AUTO, 'game_div');

var main_state = {

    preload: function ()
    {
        this.game.stage.backgroundColor = '#71c5cf';

        this.game.load.image('bird', 'assets/bird.png');
        this.game.load.image('pipe', 'assets/pipe.png');
    },

    create: function ()
    {
        this.bird = this.game.add.sprite(100, 245, 'bird');
        this.bird.body.gravity.y = 1000;

        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);

        this.pipes = game.add.group();
        this.pipes.createMultiple(20, 'pipe');

        this.timer = this.game.time.events.loop(1500, this.addRowOfPipes, this);

        this.score = 0;
        var style = {
            font: '30px Arial',
            fill: '#ffffff',
        };
        this.labelScore = this.game.add.text(20, 20, '0', style);
    },
    
    update: function()
    {
        if (this.bird.inWorld === false)
        {
            this.restartGame();
        }

        this.game.physics.overlap(this.bird, this.pipes, this.restartGame, null, this);
    },

    jump: function ()
    {
        this.bird.body.velocity.y = -350;
    },

    restartGame: function ()
    {
        this.game.time.events.remove(this.timer);
        this.game.state.start('main');
    },

    addPipe: function (x, y)
    {
        var pipe = this.pipes.getFirstDead();

        pipe.reset(x, y);

        // Add velocity to the pipe to make it move left
        pipe.body.velocity.x = -200;

        pipe.outOfBoundsKill = true;
    },

    addRowOfPipes: function ()
    {
        var hole = Math.floor(Math.random() * 5) + 1;

        for (var i = 0; i < 8; ++i)
        {
            if (i != hole && i != (hole + 1))
            {
                this.addPipe(400, i * 60 + 10);
            }
        }

        this.score += 1;
        this.labelScore.content = this.score;
    },
};

game.state.add('main', main_state);
game.state.start('main');
