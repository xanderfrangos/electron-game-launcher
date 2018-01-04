import React, {PureComponent}  from 'react'

export default class GameTile extends PureComponent {

    AshouldComponentUpdate(nextProps, nextState) {
        // NEEDS MORE IF STATEMENTS, DON'T LEAVE AS IS
        if(this.props.active != nextProps.active) {
            return true;
        } else {
            return false;
        }
      }

    render() {
        if(this.props.active) {
            global.UI.Active.ItemRef = this.refs.Item;
        }

        

        return ( <div ref="Item" data-active={this.props.active} className="GameTile"><div className="GameTileInner"><img className="TileBase" src="./images/header-blank.png" /><img className="cover" src={'./cache/' + this.props.game.id + '/header.jpg?t=1508951965'} /></div></div> )

    }

    componentDidMount() {
        global.UI.Refs[this.props.item.ID] = this.refs.Item;
        //this.props.Ref = global.UI.NewRef(this.refs.Item);
        console.log(this.props.item.ID);
    }
}
