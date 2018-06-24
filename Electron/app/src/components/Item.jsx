import React, {Component}  from 'react'

export default class Item extends Component {

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
        if (this.props.item.ID !== nextProps.item.ID) {
            return true;
          }
          if (this.props.item.Active !== nextProps.item.Active) {
            return true;
          }
        return false;
      }

    render() {
        if(this.props.active) {
            global.UI.Active.ItemRef = this.refs.Item;
        }

        const className = "item " + (this.props.className || "");
        console.log("Item is Active? " + this.props.active + this.props.item.ID)
        return(
            <div ref="Item" class={className} data-active={this.props.active}>{this.props.children}</div>
        )

    }

    componentDidMount() {
        global.UI.Refs[this.props.item.ID] = this.refs.Item;
    }
}
