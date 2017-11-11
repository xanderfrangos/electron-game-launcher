import React, {Component}  from 'react'
import styles from '../styles/local.css'

export default class GameTile extends Component {
    render() {

        return ( <div className="GameTile"><a data-action={"steam://rungameid/" + this.props.game.id} href={"steam://rungameid/" + this.props.game.id}><img className="cover" src={'./cache/' + this.props.game.id + '/header.jpg?t=1508951965'} /></a></div> )

        //return (<img src={this.props.src} className={styles.logo}/>)
    }
}
