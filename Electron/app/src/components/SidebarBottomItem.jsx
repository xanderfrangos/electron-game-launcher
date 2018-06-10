import React, {PureComponent}  from 'react'

export default class SidebarBottomItem extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        if(this.props.active) {
            global.UI.Active.ItemRef = this.refs.Item;
        }

        return (
                    <div ref="Item" data-active={this.props.item.active} className="item">
                        <img src={this.props.src} />
                    </div>
                )

    }

    componentDidMount() {
        global.UI.Refs[this.props.item.ID] = this.refs.Item;
        console.log("SidebarBottomItem Ref", this.props.item.ID, this.props.item)
    }
}
