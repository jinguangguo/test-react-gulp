

var helper = require('../../widget/util/helper');

var Download = React.createClass({

    render: function() {
        "use strict";
        var names = ['king1', 'king2', 'king3'];
        return (
            <div className="container">
                <h1>我是标题</h1>
                {
                    names.map(function(name) {
                        return <div className="name">hello, {name} !</div>
                    })
                }
            </div>
        );
    }

});

React.render(<Download />, document.getElementById('main'));