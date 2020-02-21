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
        data_int: {
          default: 1,
          type: cc.Integer,
          step: 5,
          displayName: "整数"
        },
        data_float: {
          default: 0,
          type: cc.Float,
          range: [0, 10, 0.1],
          slide: true
        },
        data_boolean: {
          default: [],
          type: cc.Boolean
        },
        data_string: {
          default: [],
          type: cc.String,
          multiline: true
        },
        data_enum: {
          default: num.aborted,
          type: num
        },
        data_node: {
          default: [],
          type: cc.Node
        },
        footBall: {
          default: null,
          type: require("./FootBall")
        },
        golf: {
          default: null,
          type: require("./Golf")
        },
        data_vec2: {
          default: new cc.Vec2(0, 0)
        },
        data_color: {
          default: new cc.Color(),
          tooltip: "颜色数值"
        }
    }),
  
    // LIFE-CYCLE CALLBACKS:
  
    // onLoad () {},
  
    start() { }
  
    // update (dt) {},
});
  