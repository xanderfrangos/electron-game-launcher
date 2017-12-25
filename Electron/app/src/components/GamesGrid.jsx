import React, {Component}  from 'react'
import styles from '../styles/local.css'
import GameTile from './GameTile.jsx'

export default class GamesGrid extends Component {
    render() {
        
        let rowsData = [];  
        
        const renderRows = () => {
         
            var rowLength = 3;
            var currentBatch = [];
            
            
            this.props.list.Items.forEach((game, index) => {
                
                if (currentBatch.length < rowLength) {
                    currentBatch.push(game.meta);
                } else {
                    rowsData.push( { "games": currentBatch } )
                    currentBatch = []
                }
                
            });

            if (currentBatch.length > 0) {
                rowsData.push( { "games": currentBatch } )
                currentBatch = [];
            }
            
            
            let mappedData = rowsData.map( (row, index) => {
                return (<div className="row" data-count="3" data-startLetter="A" key={index}>{ row.games.map( gameTileRender ) }</div>)
            });
            return mappedData; 
            
        }
        
        const gameTileRender = (game, index) => {
            return <GameTile key={index} game={game}></GameTile>  
        }
        
        return ( <div className="GameGrid">{ renderRows() }</div> )
        
    }
}
