/**
 * @file
 * @author jinguangguo
 * @date 2015/11/14
 */

var PaperManager = require('../paperManager/paperManager');

var OperateButtons = React.createClass({

    clear: function() {
        "use strict";
        PaperManager.clear();
    },

    render: function() {
        "use strict";
        return (
            <div className="module-buttons">
                <button className="ui teal basic button">上传</button>
                <button className="ui orange basic button">预览</button>
                <button className="ui yellow basic button">保存至后台</button>
                <button className="ui olive basic button">导出为图片</button>
                <button className="ui green basic button" onClick={this.clear}>清空</button>
                {/*
                <button className="ui teal basic button">Teal</button>
                <button className="ui blue basic button">Blue</button>
                <button className="ui violet basic button">Violet</button>
                <button className="ui purple basic button">Purple</button>
                <button className="ui pink basic button">Pink</button>
                <button className="ui brown basic button">Brown</button>
                <button className="ui grey basic button">Grey</button>
                <button className="ui black basic button">Black</button>
                */}
            </div>
        );
    }
});

// 左侧的题材库组件
var Pic = React.createClass({

    // 初始化
    getInitialState: function() {
        return {

        };
    },

    componentDidMount: function() {
        "use strict";
        var $paperNode = $(React.findDOMNode(this.refs.paper));
        PaperManager.createPaper({
            container: $paperNode[0],
            width: $paperNode.width(),
            height: $paperNode.height(),
            imgPath: '../static/img/image2.jpg',
            imgWidth: 510,
            imgHeight: 682
        });
    },

    render: function() {
        "use strict";
        return (
            <div className="module-pic">
                <div className="pic-paper" ref="paper"></div>
                <OperateButtons />
            </div>
        );
    }
});

module.exports = Pic;
