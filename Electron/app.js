let apps = [];
var fs = require('fs');


/*
fetch('./apps.json', { mode: 'no-cors' })
    .then(resp => resp.json())
    .then((packageJson) => {
    apps = packageJson;
    generateAppsPage();
});
*/

apps = JSON.parse(fs.readFileSync('./apps.json', 'utf8'));


generateAppsPage = () => {
    for(var game of apps) {
        jQuery("#main .view").append('<a href="steam://rungameid/' + game.id + '"><img src="./cache/' + game.id + '/header.jpg?t=1508951965" /></a>');
        console.log(game);
    }
    
}

generateAppsPage();


//  http://cdn.akamai.steamstatic.com/steam/apps/612880/header.jpg?t=1508951965
//  http://cdn.edgecast.steamstatic.com/steam/apps/612880/capsule_616x353.jpg?t=1508951965

