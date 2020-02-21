let PeopleEn = cc.Enum({
    None: 0,
    Code: 1,
    Art: 2,
    Design: 3,
    Programmer: 4,
});

let PeopleCn = cc.Enum({
    无: 0,
    程序: 1,
    美术: 2,
    策划: 3,
    项目经理: 4,
});

cc.Class({
    extends: cc.Component,

    properties: {

        peopleTypeEn: {
            default: PeopleEn.None, displayName: "职位-en", type: PeopleEn, notify() {
                // this.peopleTypeCn = this.peopleTypeEn;
                // 死循环
                this._updateName1();
            }
        },
        peopleTypeCn: {
            default: PeopleCn.无, displayName: "职位-cn", type: PeopleCn, notify() {
                this.peopleTypeEn = this.peopleTypeCn;
                this._updateName2();
            }
        },

        nameLabel: {default: null, displayName: "名字", type: cc.Label, visible: true},

    },
    _updateName1() {
        if (this.peopleTypeEn === PeopleEn.None) {
            this.nameLabel.string = "";
        } else if (this.peopleTypeEn === PeopleEn.Code) {
            this.nameLabel.string = "我是一个程序员";
        } else if (this.peopleTypeEn === PeopleEn.Art) {
            this.nameLabel.string = "我是一个美术";
        } else if (this.peopleTypeEn === PeopleEn.Design) {
            this.nameLabel.string = "我是一个策划";
        } else if (this.peopleTypeEn === PeopleEn.Programmer) {
            this.nameLabel.string = "我是一个项目经理";
        }
    },
    _updateName2() {
        if (this.peopleTypeCn === PeopleCn.无) {
            this.nameLabel.string = "";
        } else if (this.peopleTypeCn === PeopleCn.程序) {
            this.nameLabel.string = "我是一个程序员";
        } else if (this.peopleTypeCn === PeopleCn.美术) {
            this.nameLabel.string = "我是一个美术";
        } else if (this.peopleTypeCn === PeopleCn.策划) {
            this.nameLabel.string = "我是一个策划";
        } else if (this.peopleTypeCn === PeopleCn.项目经理) {
            this.nameLabel.string = "我是一个项目经理";
        }
    },
});



