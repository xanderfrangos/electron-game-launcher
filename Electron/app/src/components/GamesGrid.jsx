import React, {Component}  from 'react'
import styles from '../styles/local.css'

export default class GamesGrid extends Component {
    render() {
        
        let rowsData = [];  
        
        const renderRows = () => {
         
            var rowLength = 3;
            var currentBatch = [];
            
            
            this.props.games.forEach((game, index) => {
                
                if (currentBatch.length < rowLength) {
                    currentBatch.push(game);
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
                return (<div className="game-row" data-count="3" data-startLetter="A" key={index}>{ row.games.map( gameTileRender ) }</div>)
            });
            return mappedData; 
            
        }
        
        const gameTileRender = (game, index) => {
            return <div className="game-tile" key={index}><a data-action={"steam://rungameid/" + game.id} href={"steam://rungameid/" + game.id}><img className="cover" src={'./cache/' + game.id + '/header.jpg?t=1508951965'} /></a></div>  
        }
        
        return ( <div className="game-list">{ renderRows() }</div> )
        
        //return (<img src={this.props.src} className={styles.logo}/>)
    }
}
