/**
 * @file
 * @author jinguangguo
 * @date 2015/11/14
 */

var FontFamily = require('../../widget/fontFamily/fontFamily');

var ShowText = require('../../widget/showText/showText');

var Pic = require('../../widget/pic/pic');

// 左侧的题材库组件
var NavTabs = React.createClass({

    TAB_FONT_FAMILY: 1,

    TAB_SHOW_TEXT: 2,

    switchTab: function(event) {
        "use strict";
        var $target = $(event.target);
        var tab = $target.data('tab');
        if (tab === this.TAB_FONT_FAMILY) {
            this.setState({
                currentTab: this.TAB_FONT_FAMILY
            });
        } else if (tab === this.TAB_SHOW_TEXT) {
            this.setState({
                currentTab: this.TAB_SHOW_TEXT
            });
        }
    },

    // 初始化
    getInitialState: function() {
        "use strict";
        return {
            currentTab: this.TAB_FONT_FAMILY
        };
    },

    render: function() {
        "use strict";
        return (
            <section className="module-nav">
                {
                    this.state.currentTab === this.TAB_FONT_FAMILY ?
                    <div className="nav-wrapper">
                        <div className="ui top attached tabular menu">
                            <a className="item active">文字</a>
                            <a className="item" data-tab={this.TAB_SHOW_TEXT} onClick={this.switchTab}>宣传语</a>
                        </div>
                        <div className="ui bottom attached segment">
                            <FontFamily />
                        </div>
                    </div>
                    :
                    <div className="nav-wrapper">
                        <div className="ui top attached tabular menu">
                            <a className="item" data-tab={this.TAB_FONT_FAMILY} onClick={this.switchTab}>文字</a>
                            <a className="item active">宣传语</a>
                        </div>
                        <div className="ui bottom attached segment">
                            <ShowText />
                        </div>
                    </div>
                }
            </section>
        );
    }
});


// 画图组件
var PicPage = React.createClass({

    // 初始化
    getInitialState: function() {
        "use strict";
        return {

        };
    },

    render: function() {
        "use strict";
        return (
            <article className="ui-layout">
                <NavTabs />
                <div className="layout-main">
                    <Pic />
                </div>
            </article>
        );
    }
});

// render
React.render(
    <PicPage />,
    document.getElementById('main')
);