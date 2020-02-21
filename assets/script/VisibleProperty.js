let PropertyEnum = cc.Enum({
    Property1: 0,
    Property2: 1,
    Property3: 2,
    PropertyAll: 3,
});


cc.Class({
    extends: cc.Component,

    properties: {
        propertyType: {
            default: PropertyEnum.Property1, displayName: "是否显示", type: PropertyEnum,
            notify() {
                this._updateProperty();
            }
        },
        property1: {
            default: "10", displayName: "测试属性1", visible: true
        },
        property2: {
            default: "20", displayName: "测试属性2", visible: true
        },
        property3: {
            default: "30", displayName: "测试属性3", visible: true
        },
    },

    _updateProperty() {
        if (this.propertyType === PropertyEnum.Property1) {
            cc.Class.Attr.setClassAttr(this, 'property1', 'visible', true);
            cc.Class.Attr.setClassAttr(this, 'property2', 'visible', false);
            cc.Class.Attr.setClassAttr(this, 'property3', 'visible', false);
        } else if (this.propertyType === PropertyEnum.Property2) {
            cc.Class.Attr.setClassAttr(this, 'property1', 'visible', false);
            cc.Class.Attr.setClassAttr(this, 'property2', 'visible', true);
            cc.Class.Attr.setClassAttr(this, 'property3', 'visible', false);
        } else if (this.propertyType === PropertyEnum.Property3) {
            cc.Class.Attr.setClassAttr(this, 'property1', 'visible', false);
            cc.Class.Attr.setClassAttr(this, 'property2', 'visible', false);
            cc.Class.Attr.setClassAttr(this, 'property3', 'visible', true);
        } else if (this.propertyType === PropertyEnum.PropertyAll) {
            cc.Class.Attr.setClassAttr(this, 'property1', 'visible', true);
            cc.Class.Attr.setClassAttr(this, 'property2', 'visible', true);
            cc.Class.Attr.setClassAttr(this, 'property3', 'visible', true);
        }
    },
});



