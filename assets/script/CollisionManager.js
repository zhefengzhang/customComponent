// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    editor: {
        requireComponent: cc.BoxCollider,
        disallowMultiple: true,
        menu: "自定义组件/矩形碰撞盒"
    },

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        let gameCM = cc.director.getCollisionManager();
        gameCM.enabled = true;
        gameCM.enabledDebugDraw = true;
        gameCM.enabledDrawBoundingBox = true;

        this.defaultColor = this.node.color;
    },

    //发生碰撞时
    onCollisionEnter () {
        this.node.color = new cc.Color({r:139, g: 7, b: 219, a: 255});
    },

    //发生碰撞后，碰撞结束前
    onCollisionStay () {
        //忽略处理
    },

    //碰撞结束时
    onCollisionExit () {
        this.node.color = this.defaultColor;
    }
    // update (dt) {},
});
