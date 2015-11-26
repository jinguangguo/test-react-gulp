/**
 * @file
 * @author jinguangguo
 * @date 2015/11/14
 */

var PaperManager = require('../paperManager/paperManager');

var FONTS = [
    {
        name: 'Arial',
        style: 'Arial, Helvetica, sans-serif'
    },
    {
        name: 'Arial Black',
        style: 'Arial Black, Gadget, sans-serif'
    },
    {
        name: 'Arial Narrow',
        style: 'Arial Narrow’, sans-serif'
    },
    {
        name: 'Verdana',
        style: 'Verdana, Geneva, sans-serif'
    },
    {
        name: 'Georgia',
        style: 'Georgia, serif'
    },
    {
        name: 'Times New Roman',
        style: 'Times New Roman, Times, serif'
    },
    {
        name: 'Trebuchet MS',
        style: 'Trebuchet MS, Helvetica, sans-serif'
    },
    {
        name: 'Courier',
        style: 'Courier, monospace'
    },
    {
        name: 'Courier New',
        style: 'Courier New, Courier, monospace'
    },
    {
        name: 'Impact',
        style: 'Impact, Charcoal, sans-serif'
    },
    {
        name: 'Comic Sans MS',
        style: 'Comic Sans MS, cursive'
    },
    {
        name: 'Tahoma',
        style: 'Tahoma, Geneva, sans-serif'
    },
    {
        name: 'Lucida Sans Unicode',
        style: 'Lucida Sans Unicode, Lucida Grande, sans-serif'
    },
    {
        name: 'Lucida Console',
        style: 'Lucida Console, Monaco, monospace'
    },
    {
        name: 'Garamond',
        style: 'Garamond, serif'
    },
    {
        name: 'MS Sans Serif',
        style: 'MS Sans Serif, Geneva, sans-serif'
    },
    {
        name: 'MS Serif',
        style: 'MS Serif, New York, sans-serif'
    },
    {
        name: 'Palatino Linotype',
        style: 'Palatino Linotype, Book Antiqua, Palatino, serif'
    },
    {
        name: 'Symbol',
        style: 'Symbol, sans-serif'
    },
    {
        name: 'Bookman Old Style',
        style: 'Bookman Old Style, serif'
    }
];

var FontFamily = React.createClass({
    /**
     *
     * @param event
     */
    addTextToPaper: function(event) {
        "use strict";
        var $font = $(React.findDOMNode(event.target));
        var text = $font.data('text');
        var style = $font.data('style');
        PaperManager.addText({
            text: text,
            fontFamily: style
        });
    },

    render: function() {
        "use strict";
        var that = this;
        var items = [];
        _.forEach(FONTS, function(font, index) {
            items.push(
                <li className="item">
                    <a href="javascript:;" title={font.name}
                       onClick={that.addTextToPaper}
                       data-text={font.name}
                       data-style={font.style}
                       className="item-link" style={{fontFamily: font.style}}>
                        {font.name}
                    </a>
                </li>
            );
        });
        return (
            <ul className="widget-font-family">
                {items}
            </ul>
        );
    }
});

module.exports = FontFamily;