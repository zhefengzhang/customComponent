// panel/index.js, this filename needs to match the one registered in package.json
let Fs = require("fire-fs");
Editor.Panel.extend({
    // css style for panel
    style: Fs.readFileSync(Editor.url("packages://property-enum/panel/index.css"), 'utf-8'),
    // html template for panel
    template: Fs.readFileSync(Editor.url("packages://property-enum/panel/index.html"), 'utf-8'),

    // element and variable binding
    $: {},

    // method executed when template and styles are successfully loaded and initialized
    ready() {
        this.plugin = new window.Vue({
            el: this.shadowRoot,
            created() {

            },
            data: {},
            methods: {}
        })
    },

    // register your ipc messages here
    messages: {
        'property-enum:hello'(event) {
            this.$label.innerText = 'Hello!';
        }
    }
});