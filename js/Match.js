'use strict';

export default class Match {

    static list = []; // List of all matches

    static texture = '../media/images/match.jpg';

    static width  = 50;
    static height = 150;

    constructor(x, y) {

        this.x = x;
        this.y = y;

        Match.list.push(this);

    }

    render( ctx ) {

        const matchImage = new Image();
        matchImage.src = Match.texture;

        ctx.drawImage( matchImage, this.x, this.y, Match.width, Match.height );

    }

}