/**
 * @file
 * @author jinguangguo
 * @date 2015/11/17
 */

var SaveAsDialog = React.createClass({

    getInitialState: function() {
        return {

        };
    },

    render: function() {
        "use strict";
        return (
            <div className="widget-savead-dialog">
                <p className="name">
                    <babel>请输入存储名称：</babel>
                    <input type="text" name="name" className="j-image-name"/>
                </p>
                <p className="select">
                    <babel>请选择存储格式：</babel>
                    <select className="j-image-type">
                        <option value="png" selected>png</option>
                        <option value="jpeg">jpeg</option>
                        <option value="bmp">bmp</option>
                    </select>
                </p>
                <div className="content">另存为对话框的内容</div>
            </div>
        );
    }
});

module.exports = SaveAsDialog;