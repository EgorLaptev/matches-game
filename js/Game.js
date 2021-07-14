'use strict';

import Match from "./Match.js";

export default class Game {

    static config = {
        bg: { color: '#111' }
    };

    static paused = false;

    static cnv = document.getElementById('gameField');
    static ctx = this.cnv.getContext('2d');

    static init() {

        this.cnv.width = window.innerWidth;
        this.cnv.height = window.innerHeight;

        this.cnv = this.config.bg.color;

        this.listeners();
        this.loop();

    }

    static loop() {

        if ( !Game.paused ) {
            Game.movement();
            Game.render();
        }

        requestAnimationFrame(Game.loop);

    }

    static render() {

        for ( const match of Match.list )
            match.render( this.ctx );
    }

    static movement() {

    }

    static controls() {

        let isMouseDown = false;

        document.addEventListener('mousedown', e => isMouseDown = true);
        document.addEventListener('mouseup', e => isMouseDown = false);

        document.addEventListener('mousemove', ({ clientX, clientY }) => {

            if ( !isMouseDown ) return false;

        });

    }

    static listeners() {

        window.addEventListener('resize', e => {
            this.cnv.width  = window.innerWidth;
            this.cnv.height = window.innerHeight;
        });

        this.controls();

    }

}