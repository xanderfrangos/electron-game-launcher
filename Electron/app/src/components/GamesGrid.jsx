import React, {Component}  from 'react'
import styles from '../styles/local.css'
import GameTile from './GameTile.jsx'

export default class GamesGrid extends Component {
    render() {
        
        let rowsData = [];  
        
        const renderRows = () => {
         
            var rowLength = this.props.list.Width;
            var currentBatch = [];
            
            
            this.props.list.Items.forEach((game, index) => {
                
                if (currentBatch.length < rowLength) {
                    currentBatch.push(game);
                } else {
                    rowsData.push( { "games": currentBatch } )
                    currentBatch = []
                    currentBatch.push(game);
                }
                
            });

            if (currentBatch.length > 0) {
                rowsData.push( { "games": currentBatch } )
                currentBatch = [];
            }
            
            
            let mappedData = rowsData.map( (row, index) => {
                return (<div className="row" data-count={this.props.list.Width} data-startLetter="A" key={index}>{ row.games.map( gameTileRender ) }</div>)
            });
            return mappedData; 
            
        }
        
        const gameTileRender = (game, index) => {
            return <GameTile active={game.Active} key={index} game={game.meta}></GameTile>  
        }
        
        return ( <div className="GameGrid"><div className="GameGridTitle">{this.props.list.Title}</div>{ renderRows() }</div> )
        
    }
}
