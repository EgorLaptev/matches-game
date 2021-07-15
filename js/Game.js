'use strict';

import Match from "./Match.js";
import MatchParser from "./MatchParser.js";

export default class Game {

    static level;

    static config = {
        bg: {
            color: '#222',
            src: ''
        },
        cell: {
            size: 100,
            color: '#191919',
            lineWidth: 1
        },
        fps: 15
    };

    static paused = false;

    static cnv = document.getElementById('gameField');
    static ctx = this.cnv.getContext('2d');

    static async init() {

        this.cnv.width = window.innerWidth;
        this.cnv.height = window.innerHeight;

        this.cnv.style.background = `${ this.config.bg?.color } url(${ this.config.bg?.src }) 50% 50%`;

        Match.size = this.config.cell.size;

        await this.updateLevel(1);

        this.listeners();
        this.loop();

    }

    static loop() {

       setInterval( () => {
           if (!Game.paused) Game.render();
       }, 1000/this.config.fps);

    }

    static render() {

        this.ctx.clearRect( 0, 0, this.cnv.width, this.cnv.height );

        /* Grid */
        this.ctx.strokeStyle = this.config.cell.color;
        this.ctx.lineWidth   = this.config.cell.lineWidth;
        for ( let i=0; i < Math.ceil(this.cnv.width / this.config.cell.size) ; i++ ) {
            this.ctx.moveTo( i * this.config.cell.size, 0 );
            this.ctx.lineTo( i * this.config.cell.size, this.cnv.height );
            this.ctx.stroke();
        }

        for ( let i=0 ; i < Math.ceil(this.cnv.height / this.config.cell.size) ; i++ ) {
            this.ctx.moveTo( 0, i * this.config.cell.size );
            this.ctx.lineTo( this.cnv.width, i * this.config.cell.size );
            this.ctx.stroke();
        }

        /* Matches */
        for ( const match of Match.list ) {

            const matchImage = new Image();
            matchImage.src = match.texture;

            this.ctx.drawImage( matchImage,  match.col * this.config.cell.size, match.row * this.config.cell.size, match.width, match.height );

        }

    }

    static controls() {

        let controlled;

        this.cnv.addEventListener('mousedown', e => {

            for ( const match of Match.list )
                if (
                    ( e.clientX >= match.col * this.config.cell.size && e.clientX <= match.col * this.config.cell.size + match.width ) &&
                    ( e.clientY >= match.row * this.config.cell.size && e.clientY <= match.row * this.config.cell.size + match.height )
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

            controlled.col = Math.floor(e.clientX / this.config.cell.size);
            controlled.row = Math.floor(e.clientY / this.config.cell.size);

        });

    }

    static async updateLevel(level) { // ! Return promise

        Match.list = []; // Drop all matches

        this.level = await fetch('../media/levels.json')
            .then(resp => resp.json() )
            .then(data => data.levels[level-1] );

        if ( !this.level ) window.location.reload();

        for ( const match of MatchParser.parse( this.level.equation ) )
            new Match( match.col-1 + Math.floor( this.cnv.width/2/this.config.cell.size ) - Math.floor( this.level.equation.length / 2 ) , match.row -1 + Math.floor( this.cnv.height/2/this.config.cell.size ), match.vertical);

    }

    static listeners() {

        window.addEventListener('resize', e => {
            this.cnv.width  = window.innerWidth;
            this.cnv.height = window.innerHeight;
        });

        this.controls();

        const continueLvl   = document.getElementById('continue'),
              levelTitle    = document.getElementById('levelTitle'),
              levelDesc     = document.getElementById('levelDesc');

        continueLvl.addEventListener('click', async e => {

            await this.updateLevel(++this.level.id);

            if ( !this.level.last ) continueLvl.disabled = true;

            levelTitle.textContent = this.level.title;
            levelDesc.textContent = this.level.description;

        });

    }

}