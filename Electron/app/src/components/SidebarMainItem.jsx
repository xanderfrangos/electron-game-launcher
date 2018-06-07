import React, {PureComponent}  from 'react'

export default class SidebarMainItem extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        if(this.props.active) {
            global.UI.Active.ItemRef = this.refs.Item;
        }

        return (
            <div ref="Item" data-active={this.props.active} className="row" data-idx={this.props.index}>
                    <div className="item">
                        <div className="title"><span>{this.props.title}</span></div>
                        <div className="count"><span>{this.props.count}</span></div>
                    </div>
                    </div>
                )

    }

    componentDidMount() {
        global.UI.Refs[this.props.item.ID] = this.refs.Item;
        console.log("SidebarMainItem Ref", this.props.item.ID, this.props.item)
    }
}
