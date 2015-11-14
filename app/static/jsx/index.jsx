/**
 * @file
 * @author jinguangguo
 * @date 2015/10/31
 */

/**
 * this.props和this.state的区分：
 *      this.props表示那些一旦定义，就不再改变的特性
 *      this.state会随着用户互动而产生变化的特性
 */

var NotesList = React.createClass({

    handle: function() {
        "use strict";
        this.getDOMNode(this.refs.myInput).focus();
        this.setState({
            isOk: !this.state.isOk
        });
    },

    doData: function(event, dom) {
        "use strict";
    },

    componentWillReceiveProps: function(nextProps) {
        "use strict";
        debugger;
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        "use strict";
        debugger;
    },

    // 0
    getInitialState: function() {
        "use strict";
        debugger;
        return {
            isOk: true
        }
    },

    // 进入状态之前 - 1
    componentWillMount: function() {
        "use strict";
        debugger;
    },

    // 进入状态之后 - 3 - 已经渲染完成
    componentDidMount: function() {
        "use strict";
        debugger;
    },

    // 进入状态之中 - 2
    render: function() {
        debugger;
        var that = this;
        return (
            <div className="my-module">
                <input type="text" ref="myInput" />
                <button onClick={this.handle}>test</button>
                <ul className="list">
                    {
                        this.props.notes.map(function(note) {
                            "use strict";
                            return (
                                <li className="item">
                                    <span className="name" onClick={that.doData}>{note.name} ------ {note.desc}</span>
                                </li>
                            );
                        })
                    }
                </ul>
                <h4>{ this.state.isOk === true ? 'OK' : 'not ok !' }</h4>
            </div>
        );
    }
});

var notes = [
    {
        id: 1,
        name: 'note1',
        desc: 'desc note1'
    },
    {
        id: 2,
        name: 'note2',
        desc: 'desc note2'
    },
    {
        id: 3,
        name: 'note3',
        desc: 'desc note3'
    }
];

React.render(
    <NotesList notes={notes}></NotesList>,
    document.getElementById('main')
);