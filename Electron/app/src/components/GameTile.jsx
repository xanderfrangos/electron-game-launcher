import React, {PureComponent}  from 'react'

export default class GameTile extends PureComponent {
    
    constructor(props) {
        super(props);
        this.state = {
            coverPath: "./images/header-blank.png"
        };
    }
    

    render() {
        if(this.props.active) {
            global.UI.Active.ItemRef = this.refs.Item;
        }     

        return ( 
        <div ref="Item" data-active={this.props.active} className="GameTile">
            <div className="GameTileInner">
                <img className="TileBase" src="./images/header-blank.png" />
                <img className="cover" src={this.state.coverPath || "./images/header-blank.png"} />
                <div className="title">{this.props.game.name}</div>
            </div>
            
        </div> )

    }

    componentDidMount() {
        global.UI.Refs[this.props.item.ID] = this.refs.Item;
        
        // Lazy load cover image
        let cover = new Image();
        cover.onload = () => {
            this.setState({coverPath: cover.src})
        } 
        
        setTimeout(() => {
            cover.src = window.appDataPath + 'cache/SteamGraphics/' + this.props.game.id + '/header.jpg?t=1508951965';
        }, this.props.coverDelay || 0)
    }
}
