import React, {Component}  from 'react'

export default class GameTile extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            coverPath: "./images/header-blank.png"
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
        if (this.props.item.ID !== nextProps.item.ID) {
            return true;
          }
          if (this.props.item.Active !== nextProps.item.Active) {
            return true;
          }
          if (this.state.coverPath !== nextState.coverPath) {
            return true;
          }
        return false;
      }
    

    render() {
        if(this.props.Active) {
            global.UI.Active.ItemRef = this.refs.Item;
        }     

        return ( 
        <div ref="Item" data-active={this.props.item.Active} className="GameTile cursorable">
        <cursor></cursor>
            <div className="GameTileInner">
                <img className="TileBase" src="./images/header-blank.png" />
                <img className="cover" src={this.state.coverPath || "./images/header-blank.png"} />
                <div className="title">{this.props.game.name}</div>
            </div>
            
        </div> )

    }

    componentDidMount() {
        global.UI.Refs[this.props.item.ID] = this.refs.Item;
        global.UI.Components[this.props.item.ID] = this;
        
        // Lazy load cover image
        let cover = new Image();
        cover.onload = () => {
            this.setState({coverPath: cover.src})
        } 
        
        setTimeout(() => {
            cover.src = window.appDataPath + 'cache/SteamGraphics/' + this.props.game.id + '/header.jpg?t=' + Date.now();
        }, this.props.coverDelay || 0)
    }
}
