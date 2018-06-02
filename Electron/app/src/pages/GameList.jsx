import React, {PureComponent} from 'react'
import GamesGrid from '../components/GamesGrid.jsx'
import UILayer from '../ui/Layer.jsx'
import UIList from '../ui/List.jsx'
import UIItem from '../ui/Item.jsx'



export default class GameListPage extends PureComponent {

    constructor(props) {
    super(props);
  }
    
    
    render() {

        console.log("GameListPage render()", this.props.UILayer.Lists)

        const gamesGridRender = (gameList, index) => {
            return <GamesGrid list={gameList} />  
        }
        
        return (
                <div className="view">   
                    { this.props.UILayer.Lists.map( gamesGridRender ) }
                </div>
        )
    }
}
