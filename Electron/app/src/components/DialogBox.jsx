import React, {Component}  from 'react'
import Item from './Item.jsx'

export default class DialogBox extends Component {
    
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
    

    render() {
        if(this.props.Active) {
            //global.UI.Active.ItemRef = this.refs.Item;
        }     

        

        return(
        <div class="overlayLayer center">
            <div class="messageBox">
                <div class="title">{this.props.title}</div>
                <div class="description">{this.props.children}</div>
                <div class="options">
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
