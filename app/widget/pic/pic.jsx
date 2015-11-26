/**
 * @file
 * @author jinguangguo
 * @date 2015/11/14
 */

var PaperManager = require('../paperManager/paperManager');
var Canvas2Image = require('../paperManager/Canvas2Image');

var artDialog = require('../dialog/dialog');

var SaveAsDialog = require('../saveAsDialog/saveAsDialog');

// 左侧的题材库组件
var Pic = React.createClass({

    // 缓存变量
    cache: {
        $module: null,
        nodeCanvas: $('<canvas id="canvas"></canvas>')[0]
    },

    // 初始化
    getInitialState: function() {
        return {

        };
    },

    clear: function() {
        "use strict";
        PaperManager.clear();
    },

    preview: function() {
        "use strict";
        var that = this;
        var dialog = artDialog({
            title: '预览',
            width: PaperManager.getPaper().width,
            height: PaperManager.getPaper().height,
            content: this.cache.nodeCanvas,
            onshow: function() {
                PaperManager.toCanvas(that.cache.nodeCanvas);
            },
            okValue: '另存为',
            ok: function() {
                this.remove();
                that.saveAs();
            },
            cancelValue: '取消',
            cancel: function() {

            }
        });
        dialog.showModal();
    },

    saveAs: function() {
        "use strict";
        var that = this;
        // var saveAsDialog = new SaveAsDialog().render();
        var dialog = artDialog({
            title: '另存为',
            align: 'left',
            content: React.findDOMNode(this.refs.SaveAsDialogContainer).innerHTML,
            onshow: function() {
                PaperManager.toCanvas(that.cache.nodeCanvas);
            },
            okValue: '确定',
            ok: function() {
                //var name = this.$content.find('.j-image-name').val();
                var type = this.$content.find('.j-image-type').val();
                Canvas2Image.saveAsImage(that.cache.nodeCanvas, PaperManager.getPaper().width, PaperManager.getPaper().height, type);
            },
            cancelValue: '取消',
            cancel: function() {

            }
        });
        dialog.show();
    },

    componentDidMount: function() {
        "use strict";
        var $module = $(React.findDOMNode(this.refs.module));
        this.cache.$module = $module;
        var $paper = $module.find('.pic-paper');

        PaperManager.createPaper({
            container: $paper,
            width: $paper.width(),
            height: $paper.height()
        });

        PaperManager.loadImage({
            imgPath: '../static/img/demo11.jpg',
            imgWidth: 510,
            imgHeight: 682
        });
    },

    upload: function() {
        "use strict";
        artDialog({
            title: '提示',
            content: '待调试...',
            okValue: '确定'
        }).show();
    },

    saveToServer: function() {
        "use strict";
        artDialog({
            title: '提示',
            content: '待调试...',
            okValue: '确定'
        }).show();
    },

    render: function() {
        "use strict";
        return (
            <div className="module-pic" ref="module">
                <div className="pic-paper"></div>
                <div className="module-buttons">
                    <button className="ui teal basic button" onClick={this.upload}>上传</button>
                    <button className="ui orange basic button" onClick={this.preview}>预览</button>
                    <button className="ui olive basic button" onClick={this.saveAs}>另存为图片</button>
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
                <div ref="SaveAsDialogContainer" style={{display: 'none'}}>
                    <SaveAsDialog />
                </div>
            </div>
        );
    }
});

module.exports = Pic;
