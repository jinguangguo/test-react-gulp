/**
 * @file
 * @author jinguangguo
 * @date 2015/11/14
 */

var TEXTS = [
    {
        txt: '开学季新装备'
    },
    {
        txt: '精品课程大促销'
    }
];

var ShowText = React.createClass({
    render: function() {
        "use strict";
        var items = [];
        _.forEach(TEXTS, function(text, index) {
            items.push(
                <li className="item">
                    <a href="javascript:;" title={text.txt} className="item-link">
                        {text.txt}
                    </a>
                </li>
            );
        });
        return (
            <ul className="widget-show-text">
                {items}
            </ul>
        );
    }
});

module.exports = ShowText;