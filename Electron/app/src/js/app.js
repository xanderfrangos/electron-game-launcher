let apps = [];
let fs = require('fs');

//require('./jquery.js')
//require('./gamepads.js')

import {} from './jquery.js'
import {} from './gamepads.js'

apps = JSON.parse(fs.readFileSync('./apps.json', 'utf8'));


let generateAppsPage = () => {
    
    var sortedApps = apps.sort(function(a, b) {
        var textA = a.name.toLowerCase();
        var textB = b.name.toLowerCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });

    var appsPageHTML = '';
    var rowLength = 3;

    var currentBatch = [];

    for (var game of apps) {

        if (currentBatch.length < rowLength) {
            currentBatch.push(game);
        } else {
            jQuery("#main .view .game-list").append(buildGameRowHTML(currentBatch)); 
            currentBatch = [];
        }
    }
    if (currentBatch.length > 0) {
        jQuery("#main .view .game-list").append(buildGameRowHTML(currentBatch));
    }
}

let buildGameRowHTML = (games) => {

    var rowHTML = '';
    
    if(games.length > 0) {
        rowHTML += '<div class="game-row" data-count="' + games.length + '" data-startLetter="'+ games[0].name[0].toUpperCase() +'">';

        for (var game of games) {

            var tileHTML = '<div class="game-tile"><a data-action="steam://rungameid/' + game.id + '" href="steam://rungameid/' + game.id + '"><img class="cover" src="./cache/' + game.id + '/header.jpg?t=1508951965" /></a></div>';

            rowHTML += tileHTML;
        }

        rowHTML += '</div>';
    }
    return rowHTML;

}


generateAppsPage();


//  http://cdn.akamai.steamstatic.com/steam/apps/612880/header.jpg?t=1508951965
//  http://cdn.edgecast.steamstatic.com/steam/apps/612880/capsule_616x353.jpg?t=1508951965