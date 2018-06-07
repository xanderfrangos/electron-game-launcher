import React, {Component}  from 'react'
import styles from '../styles/local.css'
import GameTile from './GameTile.jsx'

export default class GamesGrid extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return true;
        if (this.props.list.ID !== nextProps.list.ID) {
            return true;
          }
          if (this.props.list.Active !== nextProps.list.Active) {
            return true;
          }
          if (this.props.list.ActiveIndex !== nextProps.list.ActiveIndex) {
            return true;
          }
        return false;
      }

    render() {
        
        let rowsData = [];  
        /*
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
                return (<div className="row" data-count={this.props.list.Width} key={index}>{ row.games.map( gameTileRender ) }</div>)
            });
            return mappedData; 
            
        }
        */
        
        const gameTileRender = (game, index) => {
            return <GameTile ts={game.LastUpdate} ID={game.ID} active={game.Active} key={game.ID} game={game.meta} item={game} coverDelay={index * 50}></GameTile>  
        }
        
        return ( <div ref="Item" className="GameGrid" data-width={this.props.list.Width}><div className="GameGridTitle">{this.props.list.Title}</div>{ this.props.list.Items.map( gameTileRender ) }</div> )
        
    }

    componentDidMount() {
        global.UI.Refs[this.props.list.ID] = this.refs.Item;
        global.UI.Components[this.props.list.ID] = this;
    }
}
