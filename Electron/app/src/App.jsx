import React, {Component} from 'react'
import {render} from 'react-dom'
import {} from './styles/global.css'
import Logo from './components/Logo.jsx'
import Link from './components/Link.jsx'

let fs = require('fs');

//require('./js/app.js')

const logos = [
    require('./assets/electron.png'),
    require('./assets/react.png'),
    require('./assets/webpack.png')
]

let db = JSON.parse(fs.readFileSync('./apps.json', 'utf8'));


export default class App extends Component {
    render() {
        const logosRender = logos.map( (logo, index) => {
            return <Logo key = {index} src = { logo } />
        })
        
        const tilesRender = db.map( (game, index) => {
            return <div class="game-tile"><a data-action="steam://rungameid/{game.id}" href="steam://rungameid/{game.id}"><img class="cover" src="./cache/{game.id}/header.jpg?t=1508951965" /></a></div>  
        })
        
        const gameTileRender = (game) => {
            return <div class="game-tile"><a data-action="steam://rungameid/{game.id}" href="steam://rungameid/{game.id}"><img class="cover" src="./cache/{game.id}/header.jpg?t=1508951965" /></a></div>  
        }
        
        const gameRowRender = (games) => {
         
            
        }
        
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

        return (
            <main>
                <div id="sidebar">
                    <div className="view">
                    </div>
                </div>
                <div id="main">
                    <div className="view">
                        <div className="logo-top"><img src="./images/logo-white.png" /></div>    
                        <div className="game-list">{tilesRender}</div>
                    </div>
                </div>
            </main>
        )
    }
}
