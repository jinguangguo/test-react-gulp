/**
 * @file
 * @author jinguangguo
 * @date 2015/11/25
 */

var CONFIG = require('../../widget/paperManager/shapeBox/config');

var paperManager = require('../../widget/paperManager/paperManager');

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

    cache: {
        $module: null,
        textShapeArray: []
    },

    // 初始化
    getInitialState: function() {
        "use strict";
        return {
            bigText: 'big text',
            subText: 'sub text'
        };
    },

    // 已经渲染完成
    componentDidMount: function() {
        "use strict";
        var $module = $(React.findDOMNode(this.refs.module));
        this.cache.$module = $module;

        // 获取图片的宽高
        var $paper = $(React.findDOMNode(this.refs.imageBox));

        // 创建paper
        paperManager.createPaper({
            container: $paper,
            width: $paper.width(),
            height: $paper.height()
        });

        // 加载图片
        paperManager.loadImage({
            imgPath: $paper.find('img').attr('src'),
            imgWidth: $paper.width(),
            imgHeight: $paper.height()
        });

        // 隐藏图片
        $paper.find('img').remove();

        // 添加文字
        var text1 = paperManager.addText({
            x: 100,
            y: 50,
            text: 'big test',
            fontFamily: 'Arial',
            fontSize: 36
        });

        // 添加文字
        var text2 = paperManager.addText({
            x: 100,
            y: 100,
            text: 'sub test',
            fontFamily: 'Arial',
            fontSize: 22
        });

        this.cache.textShapeArray.push(text1);
        this.cache.textShapeArray.push(text2);
    },

    handleChange1: function(event) {
        "use strict";
        var value = event.target.value;
        if (CONFIG.DEBUG ===  true) {
            console.log('handleChange1 value:' + value);
        }
        this.setState({
            bigText: value
        });
        this.cache.textShapeArray[0].getElement().attr({
            text: value
        });
    },

    handleChange2: function(event) {
        "use strict";
        var value = event.target.value;
        if (CONFIG.DEBUG ===  true) {
            console.log('handleChange2 value:' + value);
        }
        this.setState({
            subText: value
        });
        this.cache.textShapeArray[1].getElement().attr({
            text: value
        });
    },

    render: function() {
        "use strict";
        return (
            <div className="h5pic-detail" ref="module">
                <div className="ui container" ref="imageBox">
                    <img className="ui fluid image" src={this.props.imagePath} />
                </div>
                <div className="ui horizontal divider">编辑</div>
                <div className="ui container">
                    <div className="ui segments">
                        <div className="ui segment">
                            <div className="ui input fluid">
                                <input type="text" placeholder="请输入标题"
                                       value={this.state.bigText}
                                       onChange={this.handleChange1} />
                            </div>
                        </div>
                        <div className="ui segment">
                            <div className="ui input fluid">
                                <input type="text" placeholder="请输入标题"
                                       value={this.state.subText}
                                       onChange={this.handleChange2} />
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
                            <img src="../static/img/demo44.jpeg" width="100%" alt=""/>
                        </a>
                        <a href="javascript:;" className="link" onClick={this.toDetailPage}>
                            <img src="../static/img/demo55.jpeg" width="100%" alt=""/>
                        </a>
                        <a href="javascript:;" className="link" onClick={this.toDetailPage}>
                            <img src="../static/img/demo66.jpeg" width="100%" alt=""/>
                        </a>
                        <a href="javascript:;" className="link" onClick={this.toDetailPage}>
                            <img src="../static/img/demo77.jpg" width="100%" alt=""/>
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