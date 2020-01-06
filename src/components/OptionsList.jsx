import React, {Component}  from 'react'
import Item from './Item.jsx'

export default class OptionsList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
        if (this.props.layer.ID !== nextProps.layer.ID) {
            return true;
          }
          if (this.props.layer.Active !== nextProps.layer.Active) {
            return true;
          }
        return false;
      }
    

      renderCover() {
        if(this.props.cover) {
            return (
                <div className="cover"><img src={this.props.cover} /></div>
            )
        }
      }

    render() {
        if(this.props.Active) {
            //global.UI.Active.ItemRef = this.refs.Item;
        }     

        

        return(
        <div className="overlayLayer center">
            <div className="optionsList">
               
                <div className="title">{this.props.title}</div>
                {
                    this.renderCover()
                }
                <div className="description">{this.props.children}</div>
                <div className="options">
                    {this.props.options.map((item, idx) => {
                        return(
                            <Item item={item} active={item.Active} key={item.ID}>{item.meta.label}</Item>
                        )
                    })}
                </div>
            </div>
        </div>
        )

    }

    componentDidMount() {
        global.UI.Components[this.props.layer.ID] = this;
    }
}
