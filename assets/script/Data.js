var num = cc.Enum({
    aborted: 10,
    pass: 60,
    excellent: 80
});
cc.Class({
    editor: {
        menu: "自定义组件/球类比赛",
        disallowMultiple: true
    },
    extends: cc.Component,
  
    properties: () => ({
        dataInt: {
          default: 1,
          type: cc.Integer,
          step: 5,
          displayName: "整数"
        },
        dataFloat: {
          default: 0,
          type: cc.Float,
          range: [0, 10, 0.1],
          slide: true
        },
        dataBoolean: {
          default: [],
          type: cc.Boolean
        },
        dataString: {
          default: [],
          type: cc.String,
          multiline: true
        },
        dataEnum: {
          default: num.aborted,
          type: num
        },
        xiaoMing: {
          default: null,
          type: require("./Xiaoming")
        },
        xiaoWang: {
          default: null,
          type: require("./Xiaowang")
        },
        dataPosition: {
          default: new cc.Vec2(0, 0)
        },
        dataColor: {
          default: new cc.Color(),
          tooltip: "颜色数值"
        }
    }),

    // LIFE-CYCLE CALLBACKS:
  
    onLoad () {
        this.integerLab = cc.find("Canvas/info/integer").getComponent(cc.Label);
        this.floatLab = cc.find("Canvas/info/float").getComponent(cc.Label);
        this.booleanLab = cc.find("Canvas/info/boolean").getComponent(cc.Label);
        this.stringLab = cc.find("Canvas/info/string").getComponent(cc.Label);
        this.enumLab = cc.find("Canvas/info/enum").getComponent(cc.Label);
        this.xiaoMingLab = cc.find("Canvas/info/xiaoMing").getComponent(cc.Label);
        this.xiaoWangLab = cc.find("Canvas/info/xiaoWang").getComponent(cc.Label);
        this.positionLab = cc.find("Canvas/info/position").getComponent(cc.Label);
        this.colorLab = cc.find("Canvas/info/color").getComponent(cc.Label);
    },
  
    start () {
        this.integerLab.string = `整数是： ${this.dataInt}`;
        this.floatLab.string = `浮点数是： ${this.dataFloat}`;
        this.booleanLab.string = `布尔值是： ${this.dataBoolean[0]}`;
        this.stringLab.string = `字符串值是： ${this.dataString[0]}`
        this.enumLab.string = `枚举值是： ${this.dataEnum}`;
        this.xiaoMingLab.string = `小明的年龄是： ${this.xiaoMing.age}，身高是： ${this.xiaoMing.height}`;
        this.xiaoWangLab.string = `小王的年龄是： ${this.xiaoWang.age}，身高是： ${this.xiaoWang.height}`;
        this.positionLab.string = `坐标 x ： ${this.dataPosition.x}，坐标 y ： ${this.dataPosition.y}`;
        this.colorLab.string = `颜色值信息是： r: ${this.dataColor.r}、g: ${this.dataColor.g}、`
            + `b: ${this.dataColor.b}、a: ${this.dataColor.a}`;
    }

    // update (dt) {},
});
  