import React, {Component} from 'react'
import GamesGrid from '../components/GamesGrid.jsx'
import UILayer from '../ui/Layer.jsx'
import UIList from '../ui/List.jsx'
import UIItem from '../ui/Item.jsx'



export default class GameListPage extends Component {

    constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.UILayer.ID !== nextProps.UILayer.ID) {
        return true;
      }
      if (this.props.UILayer.Active !== nextProps.UILayer.Active) {
        return true;
      }
      if (this.props.UILayer.ActiveIndex !== nextProps.UILayer.ActiveIndex) {
        return true;
      }
      if (this.props.UILayer.LastUpdate !== nextProps.UILayer.LastUpdate) {
        return true;
      }
    return false;
  }
    
    
    render() {

        console.log("GameListPage render()", this.props.UILayer.Lists)

        const gamesGridRender = (gameList, index) => {
          console.log("gamesGridRender", gameList);
            return <GamesGrid key={gameList.ID} ID={gameList.ID} activeIndex={gameList.ActiveIndex} active={this.props.UILayer.ActiveIndex == index} list={gameList} />  
        }
        
        return (
                <div ref="Item" data-active={this.props.Active} className="view">   
                    { this.props.UILayer.Lists.map( gamesGridRender ) }
                </div>
        )
    }

    componentDidMount() {
        global.UI.Refs[this.props.UILayer.ID] = this.refs.Item;
        global.UI.Components[this.props.UILayer.ID] = this;
    }
}
