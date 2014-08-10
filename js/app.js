/**
 * Created by William on 09/08/2014.
 */
(function () {

    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'content');

    var phaserPractice = {};

    // Boot
    phaserPractice.boot = function() { };
    phaserPractice.boot.prototype = {

        preload : function() {
            game.load.image('preloadBar', './assets/diamond.png')
        },
        create : function() {
            game.input.maxPointers = 1;

            this.stage.disableVisibilityChange = true;

            if (game.device.desktop){
                game.scale.pageAlignHorizontally = true;
            }
            else
            {
                // mobile setup
            }

            game.state.start('preloader');
        },
        update : function() {

        }
    };

    // Preloader
    phaserPractice.preloader = function() { };
    phaserPractice.preloader.prototype = {

        preloadBar: null,

        preload : function() {
            this.preloadBar = game.add.sprite(400, 300, 'preloadBar');
            game.load.setPreloadSprite(this.preloadBar);

            // Load game assets
            game.load.image('sky', 'assets/sky.png');
            game.load.image('ground', 'assets/platform.png');
            game.load.image('star', 'assets/star.png');
            game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        },
        create : function() {
            var tween = this.add.tween(this.preloadBar).to({ alpha : 0}, 1000, Phaser.Easing.Linear.None, true );
            tween.onComplete.add(this.startLevel, this);

        },
        update : function() {

        },
        startLevel: function() {
            game.state.start('level1', true, false);
        }
    };

    // Main Menu
    phaserPractice.mainmenu = function() { };
    phaserPractice.mainmenu.prototype = {

        preload : function() {

        },
        create : function() {

        },
        update : function() {

        }
    };

    // Level1
    phaserPractice.level1 = function(){};
    phaserPractice.level1.prototype = {

    platforms: null,
    player: null,
    cursors: null,
    walkingdirection: null,

    preload: function() {

    },

    create: function() {

        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.add.sprite(0, 0, 'sky');

        this.platforms = game.add.group();

        this.platforms.enableBody = true;

        var ground = this.platforms.create(0, game.world.height - 64, 'ground');

        ground.scale.setTo(2, 2);

        ground.body.immovable = true;

        var ledge = this.platforms.create(400, 400, 'ground');

        ledge.body.immovable = true;

        ledge = this.platforms.create(-150, 250, 'ground');

        ledge.body.immovable = true;

        this.player = game.add.sprite(32, game.world.height - 150, 'dude');

        game.physics.arcade.enable(this.player);

        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 300;
        this.player.body.collideWorldBounds = true;

        // animations
        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);

        this.cursors = game.input.keyboard.createCursorKeys();
    },


    update: function() {

        game.physics.arcade.collide(this.player, this.platforms);

        this.player.body.velocity.x = 0;

        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -150;

            this.player.animations.play('left');

            this.walkingdirection = 'l';
        }
        else if (this.cursors.right.isDown) {
            this.player.body.velocity.x = 150;

            this.player.animations.play('right');

            this.walkingdirection = 'r';
        }
        else {
            this.player.animations.stop();

            this.player.frame = this.walkingdirection === 'r' ? 7 : 2;
            //player.frame = 4;
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -350;
        }
    }
};

    game.state.add('boot', phaserPractice.boot);
    game.state.add('preloader', phaserPractice.preloader);
    game.state.add('level1', phaserPractice.level1);
    game.state.start('boot');

}());