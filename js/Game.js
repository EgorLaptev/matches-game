'use strict';

import Match from "./Match.js";
import MatchParser from "./MatchParser.js";

export default class Game {

    static level;

    static config = {
        bg: {
            color: '#222',
            src: '../media/images/grid-cell.png',
            sound: {
                audio: new Audio('../media/sounds/bg.mp3'),
                volume: .1
            }
        },
        cellSize: 100
    };

    static paused = false;

    static cnv = document.getElementById('gameField');
    static ctx = this.cnv.getContext('2d');

    static async init() {

        /* Canvas options */
        this.cnv.width = window.innerWidth;
        this.cnv.height = window.innerHeight;
        this.cnv.style.background = `${ this.config.bg?.color } url(${ this.config.bg?.src }) 0px 0px`;
        this.cnv.style.backgroundSize = `${this.config.cellSize}px ${this.config.cellSize}px`;

        /* Background sound */
        this.config.bg.sound.audio.volume = this.config.bg.sound.volume;
        this.config.bg.sound.audio.loop   = true;
        this.config.bg.sound.audio.play();

        /* Match options */
        Match.size = this.config.cellSize;

        await this.updateLevel(1);

        this.listeners();
        this.loop();

    }

    static loop() {
       if (!Game.paused) Game.render();
       requestAnimationFrame(Game.loop);
    }

    static render() {

        this.ctx.clearRect( 0, 0, this.cnv.width, this.cnv.height );

        /* Matches */
        for ( const match of Match.list )
            this.ctx.drawImage( match.texture,  match.col * this.config.cellSize, match.row * this.config.cellSize, match.width, match.height );

    }

    static controls() {

        let controlled;

        this.cnv.addEventListener('mousedown', e => {

            for ( const match of Match.list )
                if (
                    ( e.clientX >= match.col * this.config.cellSize && e.clientX <= match.col * this.config.cellSize + match.width ) &&
                    ( e.clientY >= match.row * this.config.cellSize && e.clientY <= match.row * this.config.cellSize + match.height )
                ) controlled = match;

        });

        this.cnv.addEventListener('mouseup', e => {

            controlled = null;

            if (
                ( this.level.id == 1 && Match.list[7].col - 1 == Match.list[7].oldCol && Match.list[7].row  == Match.list[7].oldRow) || // 1 Level
                ( this.level.id == 2 && Match.list[18].col + 9 == Match.list[18].oldCol && Match.list[18].row - 1  == Match.list[18].oldRow ) || // 2 Level
                ( this.level.id == 3 && Match.list[16].col - 1 == Match.list[16].oldCol && Match.list[16].row == Match.list[16].oldRow ) // 3 Level
            ) {
                const continueLevel = document.getElementById('continue');
                continueLevel.disabled = false;
            }
            else this.updateLevel( this.level.id );

        });

        this.cnv.addEventListener('mousemove', e => {

            if ( !controlled ) return false;

            controlled.col = Math.floor(e.clientX / this.config.cellSize);
            controlled.row = Math.floor(e.clientY / this.config.cellSize);

        });

    }

    static restart() {
        window.location.reload();
    }

    static async updateLevel(level) { // ! Return promise

        Match.list = []; // Drop all matches

        const levelTitle    = document.getElementById('levelTitle'),
              levelDesc     = document.getElementById('levelDesc');

        this.level = await fetch('../media/levels.json')
            .then(resp => resp.json() )
            .then(data => data.levels[level-1] );

        if ( !this.level ) window.location.reload();

        levelTitle.textContent = this.level.title;
        levelDesc.textContent = this.level.description;

        if ( !this.level ) this.restart();

        for ( const match of MatchParser.parse( this.level.equation ) )
            new Match( match.col-1 + Math.floor( this.cnv.width/2/this.config.cellSize ) - Math.floor( this.level.equation.length / 2 ) , match.row -1 + Math.floor( this.cnv.height/2/this.config.cellSize ), match.vertical);

    }

    static listeners() {

        window.addEventListener('resize', e => {
            this.cnv.width  = window.innerWidth;
            this.cnv.height = window.innerHeight;
        });

        this.controls();

        const continueLvl   = document.getElementById('continue');

        continueLvl.addEventListener('click', async e => {
            await this.updateLevel(++this.level.id);
            if ( !this.level.last ) continueLvl.disabled = true;
        });

    }

}