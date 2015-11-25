/**
 * @file
 * @author jinguangguo
 * @date 2015/11/25
 */

// 列表
var PicList = React.createClass({

    // 初始化
    getInitialState: function() {
        "use strict";
        return {

        };
    },

    render: function() {
        "use strict";
        return (
            <div className="h5pic-list">
                <div className="doubling stackable three column ui grid container">
                    {
                        React.Children.map(this.props.children, function(child) {
                            return (
                                <div className="column">
                                    <div className="ui segment">
                                        {child}
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
});

// 详情
var PicDetail = React.createClass({

    // 初始化
    getInitialState: function() {
        "use strict";
        return {

        };
    },

    render: function() {
        "use strict";
        return (
            <div className="h5pic-detail">
                <div className="ui container">
                    <img className="ui fluid image" src={this.props.imagePath} />
                </div>
                <div className="ui horizontal divider">编辑</div>
                <div className="ui container">
                    <div className="ui segments">
                        <div className="ui segment">
                            <div className="ui input fluid">
                                <input type="text" placeholder="value..." />
                            </div>
                        </div>
                        <div className="ui segment">
                            <div className="ui input fluid">
                                <input type="text" placeholder="value..." />
                            </div>
                        </div>
                    </div>
                    <button className="ui orange basic button fluid ok">完成</button>
                </div>
            </div>
        );
    }

});

// 画图组件
var PicPage = React.createClass({

    PAGE_LIST: 0,

    PAGE_DETAIL: 1,

    toDetailPage: function(event) {
        "use strict";
        var $node = $(event.target);
        var src = $node.attr('src');
        this.setState({
            page: this.PAGE_DETAIL,
            imagePath: src
        });
    },

    switchPage: function(type) {
        "use strict";
        if (type === this.PAGE_LIST) {
            this.setState({
                page: this.PAGE_LIST
            });
        } else {
            this.setState({
                page: this.PAGE_DETAIL
            });
        }
    },

    returnToList: function() {
        "use strict";
        this.switchPage(this.PAGE_LIST);
    },

    // 初始化
    getInitialState: function() {
        "use strict";
        return {
            page: this.PAGE_LIST,
            imagePath: ''
        };
    },

    getTitle: function() {
        "use strict";
        if (this.state.page === this.PAGE_LIST) {
            return (
                <h1 className="ui header title">
                    List
                </h1>
            );
        } else {
            return (
                <h1 className="ui header title">
                    <a href="javascript:;" className="title-link"
                       onClick={this.returnToList}>返回</a>
                    Detail
                </h1>
            );
        }
    },

    render: function() {
        "use strict";
        return (
            <div className="module-h5pic">
                {this.getTitle()}
                {
                    this.state.page === this.PAGE_LIST ?
                    <PicList>
                        <a href="javascript:;" className="link" onClick={this.toDetailPage}>
                            <img src="../static/img/demo11.jpg" width="100%" alt=""/>
                        </a>
                        <a href="javascript:;" className="link" onClick={this.toDetailPage}>
                            <img src="../static/img/demo22.png" width="100%" alt=""/>
                        </a>
                        <a href="javascript:;" className="link" onClick={this.toDetailPage}>
                            <img src="../static/img/demo33.jpg" width="100%" alt=""/>
                        </a>
                        <a href="javascript:;" className="link" onClick={this.toDetailPage}>
                            <img src="../static/img/image1.jpg" width="100%" alt=""/>
                        </a>
                        <a href="javascript:;" className="link" onClick={this.toDetailPage}>
                            <img src="../static/img/image2.jpg" width="100%" alt=""/>
                        </a>
                    </PicList>
                    :
                    <PicDetail imagePath={this.state.imagePath} />
                }
            </div>
        );
    }
});

// render
React.render(
    <PicPage />,
    document.getElementById('main')
);