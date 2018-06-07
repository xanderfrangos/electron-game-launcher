import UILayer from './Layer.jsx'
import UIList from './List.jsx'
import UIItem from './Item.jsx'
import ReactDOM from 'react-dom'

export default class UINavigation {
    constructor() {
        this.Layers = [0];
        this.CurrentLayerID = 0;
        this.AllowInput = true;
        this.FollowInput = true;
        this.Lists = {};
        this.Items = {};
        this.Refs = {};
        this.Components = {};
        this.Counters = {
            LayerCache: 0,
            Refs: 0,
        };

        this.Active = {
            Layer: {},
            List: {},
            Item: {}
        }
        this.Active.List = new UIList([this.Active.Item]);
        this.Active.Layer = new UILayer([this.Active.List]);
        this.LayerCache = [];
        this.LayerCache[0] = this.Active.Layer;
    }


    NewRef(ref) {
        this.Refs[this.Counters.Refs] = ref;
        this.Counters.Refs++;
        return this.Counters.Refs - 1;
    }

    NewCacheLayer(lists, title = "") {
        var NewLayer = new UILayer(lists, title);
        var LayerID = this.CacheLayer(NewLayer);
        return LayerID;
    }

    CacheLayer(layer) {
        this.LayerCache[this.Counters.LayerCache] = layer;
        var LayerID = this.Counters.LayerCache;
        layer.ID = LayerID;
        this.Counters.LayerCache++;
        return LayerID;
    }

    DestroyLayer(layerID) {
        // TODO: Write function Remove layer from cache;
    }

    PreviousLayer() {

        this.Layers.splice(-1,1);
        this.UpdateActiveObject();
        /*
        var CurrentLayerID = this.Layers[this.Layers.length - 1];
        this.LayerCache[this.Layers[this.Layers.length - 1]].Active = false;
        this
            .Layers
            .splice(this.Layers.length - 1, 1);
        this.LayerCache[this.Layers[this.Layers.length - 1]].Active = true;
        this.DestroyLayer(CurrentLayerID);
        */
    }

    NewLayer(layerID) {
        if (this.Layers.length > 0) {
            this.LayerCache[this.Layers[this.Layers.length - 1]].Active = false;
        }
        this
            .Layers
            .push(layerID);
        this.LayerCache[this.Layers[this.Layers.length - 1]].Active = true;
        this.UpdateActiveObject();
    }

    ChangeLayer(layerID) {
        this.LayerCache[this.Layers[this.Layers.length - 1]].Active = false;
        this.Layers[this.Layers.length - 1] = layerID;
        this.LayerCache[this.Layers[this.Layers.length - 1]].Active = true;
        this.UpdateActiveObject();
    }

    SetCurrentListItemIndex(ItemIndex) {
        this.Active.List.ActiveIndex = ItemIndex;

        this.UpdateActiveObject();

        this.ActivateFocusEvent();
    }

    SetCurrentListIndex(ListIndex, ItemIndex = 0) {
        this.Active.Layer.ActiveIndex = ListIndex;
        this.Active.Layer.Lists[ListIndex].ActiveIndex = ItemIndex;

        this.UpdateActiveObject();

        this.ActivateFocusEvent();
    }

    UpdateActiveObject() {
        const Last = {
            Layer: this.Active.Layer.ID,
            List: this.Active.List.ID,
            Item: this.Active.Item.ID
        }

        console.log("UpdateActiveObject", Last)

        this.Active.Layer.Active = false;
        this.Active.List.Active = false;
        this.Active.Item.Active = false;

        try {
            //global.UI.Components[global.UI.Active.Layer.ID].forceUpdate();
        } catch (e) {
            console.log("Unable to update active Layer Ref", e);
        }

        try {
            //global.UI.Components[global.UI.Active.List.ID].forceUpdate();
        } catch (e) {
            console.log("Unable to update active List Ref", e);
        }

        try {
            //global.UI.Components[global.UI.Active.Item.ID].forceUpdate();
        } catch (e) {
            console.log("Unable to update active Item Ref", e);
        }

        this.Active.Layer = this.LayerCache[this.Layers[this.Layers.length - 1]];
        this.Active.List = this.Active.Layer.Lists[this.Active.Layer.ActiveIndex];
        this.Active.Item = this.Active.List.Items[this.Active.List.ActiveIndex];

        this.Active.Layer.Active = true;
        this.Active.List.Active = true;
        this.Active.Item.Active = true;

        try {
            const oldItem = ReactDOM.findDOMNode(global.UI.Refs[Last.Item])
            oldItem.dataset.active = "false"
        } catch(e) {
            console.log("Couldn't deactivate old Item", e)
        }

        try {
            const newItem = ReactDOM.findDOMNode(global.UI.Refs[global.UI.Active.Item.ID])
            newItem.dataset.active = "true"
        } catch(e) {
            console.log("Couldn't activate new Item", e)
        }

        
        

        try {
            //global.UI.Components[global.UI.Active.Layer.ID].forceUpdate();
        } catch (e) {
            console.log("Unable to update active Layer Ref", e);
        }

        try {
            //global.UI.Components[global.UI.Active.List.ID].forceUpdate();
        } catch (e) {
            console.log("Unable to update active List Ref", e);
        }

        try {
            //global.UI.Components[global.UI.Active.Item.ID].forceUpdate();
        } catch (e) {
            console.log("Unable to update active Item Ref", e);
        }
        
    }

    UpdateState() {
        global.AppJS.setState({"lists": this.Active.Layer.Lists});
    }

    MoveFocus(direction, isRepeat = false) {
        var CurrentLayer = this.Active.Layer;
        var CurrentList = this.Active.List;
        var CurrentItem = this.Active.Item;

        if (direction == "up") {
            // Determine if can go up. If not, try to go to previous one.
            var DesiredIndex = CurrentList.ActiveIndex - CurrentList.Width;

            if (DesiredIndex < 0) {
                // Cannot go up. Find previous list, if available. Start with above list
                var ListIndex = CurrentLayer.ActiveIndex - 1;

                while (ListIndex > 0) {
                    // Make sure this list has at least 1 item in it. Otherwise, skip.
                    if (CurrentLayer.Lists[ListIndex].Items.length > 0) {
                        break;
                    } else {
                        ListIndex--;
                    }

                }

                if (ListIndex < 0) {
                    // Cannot go up any further Abort!


                    return false;

                } else {
                    // Move to new list at new item Determine old column.
                    var OldCol = CurrentList.ActiveIndex - (Math.floor(CurrentList.ActiveIndex / CurrentList.Width) * CurrentList.Width);

                    // Match up with column in last row of above list.
                    var NewList = CurrentLayer.Lists[ListIndex];
                    var NewCol = (OldCol / CurrentList.Width) * NewList.Width;
                    //var NewItemIndex = Math.round(NewList.Items.length - NewList.Width + NewCol);
                    var NewItemIndex = (Math.ceil(NewList.Items.length / NewList.Width) * NewList.Width) - NewList.Width + NewCol;

                    // ( ceil(length / col) * col ) - wid + newcol

                    //console.log("ScrollToRefInView", NewCol, NewItemIndex, NewList.Width, NewCol)

                    // If there there isn't an equal column position because the row isn't full
                    // enough, we get the last item instead
                    if (NewItemIndex > NewList.Items.length - 1) {
                        NewItemIndex = NewList.Items.length - 1;
                    }

                    // Set new List/Item Index
                    this.SetCurrentListIndex(ListIndex, NewItemIndex);
                }

            } else {
                // Can go up. So we go up!
                this.SetCurrentListItemIndex(DesiredIndex);
            }

            // End Direction Up
        } else if (direction == "down") {
            // Determine if can go down. If not, try to go to next one.
            var DesiredIndex = CurrentList.ActiveIndex + CurrentList.Width;

            if (DesiredIndex > CurrentList.Items.length - 1) {
                // Cannot go down. Find next list, if available. Start with next list
                var ListIndex = CurrentLayer.ActiveIndex + 1;

                while (ListIndex < CurrentLayer.Lists.length - 1) {
                    // Make sure this list has at least 1 item in it. Otherwise, skip.
                    if (CurrentLayer.Lists[ListIndex].Items.length > 0) {
                        break;
                    } else {
                        ListIndex++;
                    }

                }

                if (ListIndex > CurrentLayer.Lists.length - 1) {
                    // Cannot go down any further Abort!
                    return false;

                } else {
                    // Move to new list at new item Determine old column.
                    var OldCol = CurrentList.ActiveIndex - (Math.floor(CurrentList.ActiveIndex / CurrentList.Width) * CurrentList.Width);

                    // Match up with column in first row of next list.
                    var NewList = CurrentLayer.Lists[ListIndex];
                    var NewCol = Math.round((OldCol / CurrentList.Width) * NewList.Width);
                    var NewItemIndex = NewCol;

                    // If there there isn't an equal column position because the row isn't full
                    // enough, we get the last item instead
                    if (NewItemIndex > NewList.Items.length - 1) {
                        NewItemIndex = NewList.Items.length - 1;
                    }

                    // Set new List/Item Index
                    this.SetCurrentListIndex(ListIndex, NewItemIndex);

                }

            } else {
                // Can go up. So we go up!
                this.SetCurrentListItemIndex(DesiredIndex);
            }

            // End Direction Up
        } else if (direction == "left") {
            // Determine if can go left. If not, try to go to next.
            var DesiredIndex = CurrentList.ActiveIndex - 1;

            if (DesiredIndex < 0) {
                // Cannot go left. Find next list, if available. Start with next list
                return false
                /*
                var ListIndex = CurrentLayer.ActiveIndex - 1;

                while (ListIndex >= 0) {
                    // Make sure this list has at least 1 item in it. Otherwise, skip.
                    if (CurrentLayer.Lists[ListIndex].Items.length > 0) {
                        break;
                    } else {
                        ListIndex--;
                    }

                }

                if (ListIndex < 0) {
                    // Cannot go right any further Abort!
                    global.Sounds.EndOfList.play();
                    Input.Gamepads.Down.DirectionalTimeBuffer = -2500
                    return false;

                } else {
                    // Move to new list at new item
                    var NewItemIndex = CurrentLayer.Lists[ListIndex].Items.length - 1;

                    // Set new List/Item Index
                    this.SetCurrentListIndex(ListIndex, NewItemIndex);

                }
                */

            } else if ((CurrentList.ActiveIndex + 1) % CurrentList.Width == 1) {
                // left side is blocked Abort!
                return false;
            } else {
                // Can go right. So we go right!
                this.SetCurrentListItemIndex(DesiredIndex);
            }

            // End Direction Right
        } else if (direction == "right") {
            // Determine if can go right. If not, try to go to next.
            var DesiredIndex = CurrentList.ActiveIndex + 1;
            console.log((CurrentList.ActiveIndex + 1) % CurrentList.Width);

            if (DesiredIndex > CurrentList.Items.length - 1) {
                // Cannot go right. Find next list, if available. Start with next list
                return false
                /*
                var ListIndex = CurrentLayer.ActiveIndex + 1;

                while (ListIndex < CurrentLayer.Lists.length - 1) {
                    // Make sure this list has at least 1 item in it. Otherwise, skip.
                    if (CurrentLayer.Lists[ListIndex].Items.length > 0) {
                        break;
                    } else {
                        ListIndex++;
                    }

                }

                if (ListIndex > CurrentLayer.Lists.length - 1) {
                    // Cannot go right any further Abort!
                    return false;

                } else {
                    // Move to new list at new item
                    var NewItemIndex = 0;

                    // Set new List/Item Index
                    this.SetCurrentListIndex(ListIndex, NewItemIndex);

                }
                */

            } else if ((CurrentList.ActiveIndex + 1) % CurrentList.Width == 0) {
                // Right side is blocked Abort!
                return false;
            } else {
                // Can go right. So we go right!
                this.SetCurrentListItemIndex(DesiredIndex);               
            }

            // End Direction Right
        }

        const oldItem = ReactDOM.findDOMNode(global.UI.Refs[CurrentItem.ID])
        const newItem = ReactDOM.findDOMNode(global.UI.Refs[global.UI.Active.Item.ID])

        oldItem.dataset.active = "false"
        newItem.dataset.active = "true"

        // Scroll to new item
        this.ScrollToRefInView(document.getElementById("app"), global.UI.Refs[global.UI.Active.Item.ID], (window.innerWidth * 0.1));

        return true;
    }

    ScrollToRef() {
        const MainView = document.getElementById("app")

        const ViewPadding = (window.innerWidth * 0.1);

        const ViewTop = MainView.scrollTop + ViewPadding;
        const ViewBottom = MainView.scrollTop + window.innerHeight - ViewPadding;

        const ActiveRef = global.UI.Refs[global.UI.Active.Item.ID];
        const RefTop = ActiveRef.offsetTop;
        const RefBottom = ActiveRef.offsetTop + ActiveRef.clientHeight;

        let ScrollPos = -1;

        // Check if active ref is above top of view
        if(RefTop < ViewTop) {
            ScrollPos = RefTop - ViewPadding;
        } 

        // Check if active ref is below bottom of view
        if(RefBottom > ViewBottom) {
            ScrollPos = RefBottom + ViewPadding - window.innerHeight;
        }

        if(ScrollPos >= 0) {
            TweenLite.to(MainView, 0.25, {scrollTo: ScrollPos});
        }
    }

    ScrollToRefInView(View, Ref, ViewPadding = 0) {
        const ViewTop = View.scrollTop + ViewPadding;
        const ViewBottom = View.scrollTop + window.innerHeight - ViewPadding;

        const RefTop = Ref.offsetTop;
        const RefBottom = Ref.offsetTop + Ref.clientHeight;

        let ScrollPos = -1;

        // Check if active ref is above top of view
        if(RefTop < ViewTop) {
            ScrollPos = RefTop - ViewPadding;

            if(ScrollPos < 0) {
                ScrollPos = 0;
            }

        } 

        // Check if active ref is below bottom of view
        if(RefBottom > ViewBottom) {
            ScrollPos = RefBottom + ViewPadding - window.innerHeight;

            if(ScrollPos < 0) {
                ScrollPos = 0;
            }

        }

        if(ScrollPos >= 0) {
            TweenLite.to(View, 0.25, {scrollTo: ScrollPos});
        }

        //console.log("ScrollToRefInView", ScrollPos);
    }

    ActivatePrimary() {
        this.RefreshCurrentItem();
        this
            .CurrentItem
            .PrimaryAction();
    }

    ActivateSecondary() {
        this.RefreshCurrentItem();
        this
            .CurrentItem
            .SecondaryAction();
    }
    ActivateFocusEvent() {
        //this.RefreshCurrentItem();
        try {
            global.UI.Active.Item.FocusAction();
        } catch (e) {
            console.log("Error on FocusAction",e)
        }

    }

}