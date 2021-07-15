'use strict';

export default class MatchParse {

    static parse(str) {

        let matches = []; // Generated matches

        const chars =  str.split('');

        for ( let i = 0 ; i < chars.length ; i++ ) {

            // Create matches from chars
            switch (chars[i]) {
                case "1": {

                    if ( chars[i-1] != ' ' )
                        matches.push(
                            { "col": 1 * (i+1) , "row": 1, "vertical": true },
                            { "col": 1 * (i+1) , "row": 2, "vertical": true },
                        );
                    else
                        matches.push(
                            { "col": 1 * (i) , "row": 1, "vertical": true },
                            { "col": 1 * (i) , "row": 2, "vertical": true },
                        );

                    break;
                }
                case "2": {
                    matches.push(
                        { "col": 1 * (i) , "row": 1, "vertical": false },
                        { "col": 1 * (i+1) , "row": 1, "vertical": true },
                        { "col": 1 * (i) , "row": 2, "vertical": false },
                        { "col": 1 * (i) , "row": 2, "vertical": true },
                        { "col": 1 * (i) , "row": 3, "vertical": false },
                    );
                    break;
                }
                case "3": {
                    matches.push(
                        { "col": 1 * (i) , "row": 1, "vertical": false },
                        { "col": 1 * (i) , "row": 2, "vertical": false },
                        { "col": 1 * (i) , "row": 3, "vertical": false },
                        { "col": 1 * (i+1) , "row": 1, "vertical": true },
                        { "col": 1 * (i+1) , "row": 2, "vertical": true },
                    );
                    break;
                }
                case "4": {
                    matches.push(
                        { "col": 1 * (i) , "row": 1, "vertical": true },
                        { "col": 1 * (i+1) , "row": 1, "vertical": true },
                        { "col": 1 * (i+1) , "row": 2, "vertical": true },
                        { "col": 1 * (i) , "row": 2, "vertical": false },
                    );
                    break;
                }
                case "5": {
                    matches.push(
                        { "col": 1 * (i) , "row": 1, "vertical": false },
                        { "col": 1 * (i) , "row": 2, "vertical": false },
                        { "col": 1 * (i) , "row": 3, "vertical": false },
                        { "col": 1 * (i) , "row": 1, "vertical": true },
                        { "col": 1 * (i+1) , "row": 2, "vertical": true },
                    );
                    break;
                }
                case "6": {
                    matches.push(
                        { "col": 1 * (i) , "row": 1, "vertical": true },
                        { "col": 1 * (i) , "row": 2, "vertical": true },
                        { "col": 1 * (i+1) , "row": 2, "vertical": true },
                        { "col": 1 * (i) , "row": 1, "vertical": false },
                        { "col": 1 * (i) , "row": 2, "vertical": false },
                        { "col": 1 * (i) , "row": 3, "vertical": false },
                    );
                    break;
                }
                case "7": {
                    matches.push(
                        { "col": 1 * (i) , "row": 1, "vertical": false },
                        { "col": 1 * (i+1) , "row": 1, "vertical": true },
                        { "col": 1 * (i+1) , "row": 2, "vertical": true },
                    );
                    break;
                }
                case "8": {
                    matches.push(
                        { "col": 1 * (i) , "row": 1, "vertical": false },
                        { "col": 1 * (i) , "row": 2, "vertical": false },
                        { "col": 1 * (i) , "row": 3, "vertical": false },
                        { "col": 1 * (i) , "row": 1, "vertical": true },
                        { "col": 1 * (i) , "row": 2, "vertical": true },
                        { "col": 1 * (i+1) , "row": 1, "vertical": true },
                        { "col": 1 * (i+1) , "row": 2, "vertical": true },
                    );
                    break;
                }
                case "9": {
                    matches.push(
                        { "col": 1 * (i) , "row": 1, "vertical": false },
                        { "col": 1 * (i) , "row": 2, "vertical": false },
                        { "col": 1 * (i) , "row": 3, "vertical": false },
                        { "col": 1 * (i) , "row": 1, "vertical": true },
                        { "col": 1 * (i+1) , "row": 1, "vertical": true },
                        { "col": 1 * (i+1) , "row": 2, "vertical": true },
                    );
                    break;
                }
                case "0": {
                    matches.push(
                        { "col": 1 * (i) , "row": 1, "vertical": false },
                        { "col": 1 * (i) , "row": 3, "vertical": false },
                        { "col": 1 * (i) , "row": 1, "vertical": true },
                        { "col": 1 * (i) , "row": 2, "vertical": true },
                        { "col": 1 * (i+1) , "row": 1, "vertical": true },
                        { "col": 1 * (i+1) , "row": 2, "vertical": true },
                    );
                    break;
                }
                case "-": {
                    matches.push(
                        { "col": 1 * (i) , "row": 2, "vertical": false },
                    );
                    break;
                }
                case "+": {
                    matches.push(
                        { "col": 1 * (i) + .5 , "row": 1.5, "vertical": true },
                        { "col": 1 * (i) , "row": 2, "vertical": false },
                    );
                    break;
                }
                case "=": {
                    matches.push(
                        { "col": 1 * (i) , "row": 1.80, "vertical": false },
                        { "col": 1 * (i) , "row": 2.20, "vertical": false },
                    );
                    break;
                }

            }

        }

        return matches;

    }



}

