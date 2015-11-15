/**
 * @file
 * @author jinguangguo
 * @date 2015/11/15
 */


var helper = require('../../widget/util/helper');

var artDialog = require('../../widget/dialog/dialog');

var DialogPage = React.createClass({

    showDialog: function(event) {
        "use strict";
        var d = artDialog({
            title: '欢迎',
            content: '欢迎使用 artDialog 对话框组件！'
        });
        d.show();
    },

    showDialogModal: function(event) {
        "use strict";
        "use strict";
        var d = artDialog({
            title: '欢迎',
            content: '欢迎使用 artDialog 对话框组件！'
        });
        d.showModal();
    },

    render: function() {
        "use strict";
        return (
            <div className="container">
                <button className="ui teal basic button" onClick={this.showDialog}>show dialog</button>
                <button className="ui blue basic button" onClick={this.showDialogModal}>show dialog of modal</button>
                <button className="ui black basic button">others...</button>
            </div>
        );
    }

});

React.render(<DialogPage />, document.getElementById('main'));