import React, {PureComponent}  from 'react'

export default class GameTile extends PureComponent {

    render() {
        if(this.props.active) {
            global.UI.Active.ItemRef = this.refs.Item;
        }

        console.log(window.appDataPath)        

        return ( 
        <div ref="Item" data-active={this.props.active} className="GameTile">
            <div className="GameTileInner">
                <img className="TileBase" src="./images/header-blank.png" />
                <img className="cover" src={window.appDataPath + 'cache/SteamGraphics/' + this.props.game.id + '/header.jpg?t=1508951965'} />
                <div className="title">{this.props.game.name}</div>
            </div>
            
        </div> )

    }

    componentDidMount() {
        global.UI.Refs[this.props.item.ID] = this.refs.Item;
    }
}
