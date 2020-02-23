let ActionEnum = cc.Enum({
    None: "None",
    Scale: "Scale",
    Blink: "Blink",
    Shake: "Shake",
    FadeIn: "FadeIn",
    FadeOut: "FadeOut",
    Move: "Move",
});

cc.Class({
    extends: cc.Component,

    editor: {
        menu: "自定义组件/动作效果",
        inspector: "packages://my-inspectors/inspector/dialog/dialog.js",
        playOnFocus: true,
        executeInEditMode: true,
        disallowMultiple: true,
        help: "https://forum.cocos.org/"
    },

    properties: {
        actionType: {
            default: ActionEnum.None, 
            displayName: "动画类型", 
            type: ActionEnum
        },
        actionNode: {
            default: null,
            displayName: "动画节点", 
            type: cc.Node
        },
        preview: {
            default: 0, 
            visible: true, 
            notify() {
                this._runAction();
            }
        },
        delayTime: {
            default: 0, 
            displayName: "延迟时间", 
            tooltip: "单位:秒"
        },
        actionTime: {
            default: 0, 
            displayName: "动画时间", 
            tooltip: "单位:秒"
        },
        shakeStrength: {
            default: 0, 
            displayName: "震动强度", 
            tooltip: "强度越高,振幅越大"
        },
        blinkCount: {
            default: 1, 
            displayName: "闪烁次数", 
            tooltip: ""
        },
        scaleSize: {
            default: 1, 
            displayName: "缩放比例", 
            tooltip: ""
        },
        moveBeganPosX: {
            default: 0, 
            displayName: "X", 
            tooltip: ""
        },
        moveBeganPosY: {
            default: 0, 
            displayName: "Y", 
            tooltip: ""
        },
        moveEndPosX: {
            default: 0, 
            displayName: "X", 
            tooltip: ""
        },
        moveEndPosY: {
            default: 0, 
            displayName: "Y", 
            tooltip: ""
        },
        _recordData: null,
    },

    onFocusInEditor: function () {
        cc.log("onFocusInEditor");
        this._runAction();
    },

    onLostFocusInEditor: function () {
        cc.log("onLostFocusInEditor");
        this._recover();
    },

    _record: function () {
        this._recordData = {
            x: this.node.x,
            y: this.node.y,
            opacity: this.node.opacity,
            active: this.node.active,
            scaleX: this.node.scaleX,
            scaleY: this.node.scaleY,
            angle: this.node.angle,
            width: this.node.width,
            height: this.node.height,
        };
    },

    // 恢复
    _recover: function () {
        this.node.stopAllActions();
        cc.log(this._recordData);
        if (this._recordData) {
            this.node.x = this._recordData.x;
            this.node.y = this._recordData.y;
            cc.log(this._recordData.opacity);
            this.node.opacity = this._recordData.opacity;
            this.node.active = this._recordData.active;
            this.node.scaleX = this._recordData.scaleX;
            this.node.scaleY = this._recordData.scaleY;
            this.node.angle = this._recordData.angle;
            this.node.width = this._recordData.width;
            this.node.height = this._recordData.height;
        }
    },

    onLoad () {
        this._record();
    },

    start() {
        if (!CC_EDITOR) this._runAction();
    },
    
    _runAction() {
        this._recover();
        if (this.actionType === ActionEnum.None) {
            if (CC_EDITOR) {
                Editor.log("未设置动画,预览无效!");
            }
            this._actionOver();
        } 
        else {
            if (this.actionTime > 0) {
                let act = this._genAction(this.actionType);
                if (act) {
                    let actionArr = [];
                    // 延迟动作
                    if (this.delayTime > 0) {
                        actionArr.push(cc.delayTime(this.delayTime));
                    }
                    // 当前设置的动作
                    actionArr.push(act);
                    actionArr.push(cc.callFunc(this._actionOver.bind(this)));
                    let runAct = cc.sequence(actionArr);
                    this.node.stopAllActions();
                    this.node.runAction(runAct);
                }
            } 
            else {
                cc.log("指定的动画时间为0,跳过该动画!");
            }
        }

    },

    _actionOver() {
        cc.log("action over");
    },

    _genAction(type) {
        let ret = null;
        if (type === ActionEnum.FadeOut) {
            this.node.opacity = 255;
            ret = cc.fadeOut(this.actionTime);
        }
        else if (type === ActionEnum.FadeIn) {
            this.node.opacity = 0;
            ret = cc.fadeIn(this.actionTime);
        } 
        else if (type === ActionEnum.Shake) {// 震动
            let acts = [];
            let cfg = [
                {strength: 1, max: 10},
                {strength: 2, max: 12},
                {strength: 3, max: 15},
                {strength: 4, max: 20},
                {strength: 5, max: 25},
            ];

            let shakeMaxMoveDistance = 0;// 震动幅度距离
            for (let i = 0; i < cfg.length; i++) {
                let item = cfg[i];
                if (item.strength.toString() === this.shakeStrength.toString()) {
                    shakeMaxMoveDistance = item.max;
                    break;
                }
            }
            let shakeCount = 0;// 震动次数
            let moveUnitTime = 0.05;// 单元震动时间
            shakeCount = Math.floor(this.actionTime / moveUnitTime);
            let node = this.node.getPosition();
            if (shakeCount > 0 && shakeMaxMoveDistance > 0) {
                for (let i = 0; i < shakeCount; i++) {
                    let x = node.x + this._randomPos(shakeMaxMoveDistance);
                    let y = node.y + this._randomPos(shakeMaxMoveDistance);
                    let move = cc.moveTo(moveUnitTime, cc.v2(x, y));
                    acts.push(move);
                }
                ret = cc.sequence(acts);
            }
            else {
                console.log("未查找到晃动的配置!");
            }
        }
        else if (type === ActionEnum.Blink) {
            ret = cc.blink(this.actionTime, this.blinkCount);
        } 
        else if (type === ActionEnum.Scale) {
            ret = cc.scaleTo(this.actionTime, this.scaleSize);
        } 
        else if (type === ActionEnum.Move) {
            this.node.setPosition(this.moveBeganPosX || 0, this.moveBeganPosY || 0);
            ret = cc.moveTo(this.actionTime, this.moveEndPosX || 0, this.moveEndPosY || 0);
        }
        return ret;
    },

    _randomByMaxValue(maxNum) {
        return Math.floor(Math.random() * maxNum);
    },

    _randomPos(max) {
        let num = this._randomByMaxValue(2);
        if (num % 2 === 0) {
            return this._randomByMaxValue(max)
        }
        else {
            return -this._randomByMaxValue(max);
        }
    }
});
