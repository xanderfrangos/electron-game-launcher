import React, {PureComponent}  from 'react'

export default class SidebarMainItem extends PureComponent {

    render() {
        if(this.props.active) {
            global.UI.Active.ItemRef = this.refs.Item;
        }

        return (
                    <div ref="Item" data-active={this.props.active} className="item">
                        <div className="title">{this.props.title}</div>
                        <div className="count">{this.props.count}</div>
                    </div>
                )

    }

    componentDidMount() {
        global.UI.Refs[this.props.item.ID] = this.refs.Item;
    }
}
