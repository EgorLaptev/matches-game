'use strict';

export default class Match {

    static list = []; // List of all matches

    static size;

    constructor(col, row, vertical) {

        this.oldCol = col;
        this.oldRow = row;

        this.vertical = vertical;

        this.row = row;
        this.col = col;

        this.width  = vertical ? Match.size / 10 : Match.size;
        this.height = vertical ? Match.size : Match.size / 10;

        this.texture     = new Image();
        this.texture.src = `../media/images/match/match-${ vertical ? 'v' : 'h' }.png`;

        Match.list.push(this);

    }

}