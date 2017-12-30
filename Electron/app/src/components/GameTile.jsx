import React, {Component}  from 'react'
import ReactDOM from 'react-dom'
import styles from '../styles/local.css'

export default class GameTile extends Component {

    render() {
        
        if(this.props.active) {
            global.UI.Active.ItemRef = this.refs.Item;
        }

        return ( <div ref="Item" data-active={this.props.active} className="GameTile"><a data-action={"steam://rungameid/" + this.props.game.id}><img className="cover" src={'./cache/' + this.props.game.id + '/header.jpg?t=1508951965'} /></a></div> )

    }
}
