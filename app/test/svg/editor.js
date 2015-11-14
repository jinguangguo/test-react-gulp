/**
 * @file
 * @author jinguangguo
 * @date 2015/11/11
 */

var mobilesafari = /AppleWebKit.*Mobile/.test(navigator.userAgent);

function VectorEditor(elem, width, height){
    if (typeof(Raphael) != "function") { //check for the renderer
        return alert("Error! Renderer is Missing!"); //if renderer isn't there, return false;
    }

    this.container = elem
    this.draw = Raphael(elem, width, height);

    this.draw.editor = this;

    this.onHitXY = [0,0]
    this.offsetXY = [0,0]
    this.tmpXY = [0,0]

    //cant think of any better way to do it
    this.prop = {
        "src": "http://upload.wikimedia.org/wikipedia/commons/a/a5/ComplexSinInATimeAxe.gif",
        "stroke-width": 1,
        "stroke": "#000000",
        "fill": "#ff0000",
        "stroke-opacity": 1,
        "fill-opacity": 1,
        "text": "Text"
    }

    this.mode = "select";
    this.selectbox = null;
    this.selected = []

    this.action = "";

    this.selectadd = false;

    this.shapes = []
    this.trackers = []

    this.listeners = {};


    var draw = this.draw;


    //THE FOLLOWING LINES ARE MOSTLY POINTLESS!

    function offset(){
        //technically, vX.pos works too and I should probably use whatever I built here, but I have jQuery instead.
        if(window.Ext)return Ext.get(elem).getXY();
        if(window.jQuery){
            var pos = jQuery(elem).offset();
            return [pos.left, pos.top];
        }
        if(window.vx){ //vx support
            var pos = vx.pos(elem);
            return [pos.l, pos.t]
        }
        return [0,0]
    }

    function bind(fn, scope){
        return function () {
            return fn.apply(scope, array(arguments))
        }
    }

    function array(a){
        for(var b = a.length, c=[]; b--; ) {
            c.push(a[b]);
        }
        return c;
    }

    if(window.Ext){
        Ext.get(elem).on("mousedown",function(event){
            event.preventDefault()

            if(event.button == 2){
                //this.lastmode = this.mode;
                this.setMode("select") //tempselect
            }
            if(event.button == 1){
                return;
            }
            this.onMouseDown(event.getPageX() - offset()[0], event.getPageY() - offset()[1], event.getTarget())
            return false;
        }, this);
        Ext.get(elem).on("mousemove",function(event){
            event.preventDefault()
            this.onMouseMove(event.getPageX()  - offset()[0], event.getPageY()- offset()[1], event.getTarget())
            return false;
        }, this)
        Ext.get(elem).on("mouseup",function(event){
            event.preventDefault()
            this.onMouseUp(event.getPageX() - offset()[0], event.getPageY() - offset()[1], event.getTarget())
            return false;
        }, this)
        Ext.get(elem).on("dblclick",function(event){
            event.preventDefault()
            this.onDblClick(event.getPageX() - offset()[0], event.getPageY()- offset()[1], event.getTarget())
            return false;
        }, this)
    }else if(window.jQuery){

        $(elem).mousedown(bind(function(event){
            event.preventDefault();
            console.log('event.button:' + event.button);
            if(event.button == 2){
                //this.lastmode = this.mode;
                this.setMode("select"); //tempselect
            }
            console.log('event.clientX:' + event.clientX);
            console.log('event.clientY:' + event.clientY);
            console.log('offset()[0]' + offset()[0]);
            console.log('offset()[1]' + offset()[1]);
            console.log('event.clientX - offset()[0]:' + (event.clientX - offset()[0]));
            console.log('event.clientY - offset()[1]:' + (event.clientY - offset()[1]));
            this.onMouseDown(event.clientX - offset()[0], event.clientY - offset()[1], event.target);
        }, this));

        $(elem).mousemove(bind(function(event){
            event.preventDefault();
            this.onMouseMove(event.clientX - offset()[0], event.clientY - offset()[1], event.target)
        }, this));

        $(elem).mouseup(bind(function(event){
            event.preventDefault();
            this.onMouseUp(event.clientX - offset()[0], event.clientY - offset()[1], event.target)
        }, this));


        $(elem).dblclick(bind(function(event){
            event.preventDefault()
            this.onDblClick(event.clientX - offset()[0], event.clientY - offset()[1], event.target)
        }, this));
        if(mobilesafari){
            elem.addEventListener("touchstart", bind(function(event){
                event.preventDefault()
                this.onMouseDown(event.touches[0].pageX - offset()[0], event.touches[0].pageY - offset()[1], event.target)
            }, this) ,false)

            elem.addEventListener("touchmove", bind(function(event){
                event.preventDefault()
                this.onMouseMove(event.touches[0].pageX - offset()[0], event.touches[0].pageY - offset()[1], event.target)
            }, this), false);
            elem.addEventListener("touchend", bind(function(event){
                event.preventDefault()
                this.onMouseUp(0, 0, event.target)
            }, this), false);
            elem.addEventListener("selectstart", function(event){
                event.preventDefault()
                return false
            }, false);
        }
    }
}

VectorEditor.prototype.setMode = function(mode){
    this.fire("setmode",mode)
    if(mode == "select+"){
        this.mode = "select";
        this.selectadd = true;
        this.unselect()
    }else if(mode == "select"){
        this.mode = mode;
        this.unselect()
        this.selectadd = false;
    }else if(mode == "delete"){
        this.deleteSelection();
        this.mode = mode;
    }else{
        this.unselect()
        this.mode = mode;
    }
}

VectorEditor.prototype.on = function(event, callback){
    if(!this.listeners[event]){
        this.listeners[event] = []
    }
    if(this.in_array(callback,this.listeners[event])  ==  -1){
        this.listeners[event].push(callback);
    }
}


VectorEditor.prototype.returnRotatedPoint = function(x,y,cx,cy,a){
    // http://mathforum.org/library/drmath/view/63184.html

    // radius using distance formula
    var r = Math.sqrt((x-cx)*(x-cx) + (y-cy)*(y-cy));
    // initial angle in relation to center
    var iA = Math.atan2((y-cy),(x-cx)) * (180/Math.PI);

    var nx = r * Math.cos((a + iA)/(180/Math.PI));
    var ny = r * Math.sin((a + iA)/(180/Math.PI));

    return [cx+nx,cy+ny];
}

VectorEditor.prototype.fire = function(event){
    if(this.listeners[event]){
        for(var i = 0; i < this.listeners[event].length; i++){
            if(this.listeners[event][i].apply(this, arguments)===false){
                return false;
            }
        }
    }
};

VectorEditor.prototype.un = function(event, callback){
    if(!this.listeners[event])return;
    var index = 0;
    while((index = this.in_array(callback,this.listeners[event])) != -1){
        this.listeners[event].splice(index,1);
    }
}

//from the vXJS JS Library
VectorEditor.prototype.in_array = function(v,a){
    for(var i=a.length;i--&&a[i]!=v;);
    return i
}

//from vX JS, is it at all strange that I'm using my own work?
VectorEditor.prototype.array_remove = function(e, o){
    var x=this.in_array(e,o);
    x!=-1?o.splice(x,1):0
}


VectorEditor.prototype.is_selected = function(shape){
    return this.in_array(shape, this.selected) != -1;
}

VectorEditor.prototype.set_attr = function(){
    for(var i = 0; i < this.selected.length; i++){
        this.selected[i].attr.apply(this.selected[i], arguments)
    }
}

VectorEditor.prototype.set = function(name, value){
    this.prop[name] = value;
    this.set_attr(name, value);
}

VectorEditor.prototype.onMouseDown = function(x, y, target){
    this.fire("mousedown");
    this.tmpXY = this.onHitXY = [x,y];

    if(this.mode == "select" && !this.selectbox){

        var shape_object = null;
        if(target.shape_object){
            shape_object = target.shape_object
        }else if(target.parentNode.shape_object){
            shape_object = target.parentNode.shape_object
        }else if(!target.is_tracker){
            if(!this.selectadd) this.unselect();
            this.selectbox = this.draw.rect(x, y, 0, 0)
                .attr({"fill-opacity": 0.15,
                    "stroke-opacity": 0.5,
                    "fill": "#007fff", //mah fav kolur!
                    "stroke": "#007fff"});
            return;
        }else{
            return; //die trackers die!
        }


        if(this.selectadd){
            this.selectAdd(shape_object);
            this.action = "move";
        }else if(!this.is_selected(shape_object)){
            this.select(shape_object);
            this.action = "move";
        }else{
            this.action = "move";
        }
        this.offsetXY = [shape_object.attr("x") - x,shape_object.attr("y") - y]

    }else if(this.mode == "delete" && !this.selectbox){
        var shape_object = null;
        if(target.shape_object){
            shape_object = target.shape_object
        }else if(target.parentNode.shape_object){
            shape_object = target.parentNode.shape_object
        }else if(!target.is_tracker){
            this.selectbox = this.draw.rect(x, y, 0, 0)
                .attr({"fill-opacity": 0.15,
                    "stroke-opacity": 0.5,
                    "fill": "#ff0000", //oh noes! its red and gonna asplodes!
                    "stroke": "#ff0000"});
            return;
        }else{
            return; //likely tracker
        }
        this.deleteShape(shape_object);
        this.offsetXY = [shape_object.attr("x") - x,shape_object.attr("y") - y];
    }else if(this.selected.length == 0){
        var shape = null;
        if(this.mode == "rect"){
            shape = this.draw.rect(x, y, 0, 0);
        }else if(this.mode == "ellipse"){
            shape = this.draw.ellipse(x, y, 0, 0);
        }else if(this.mode == "path"){
            shape = this.draw.path("M{0},{1}",x,y)
        }else if(this.mode == "line"){
            shape = this.draw.path("M{0},{1}",x,y);
            shape.subtype = "line"
        }else if(this.mode == "polygon"){
            shape = this.draw.path("M{0},{1}",x,y);
            shape.polypoints = [[x,y]];
            shape.subtype = "polygon"
        }else if(this.mode == "image"){
            shape = this.draw.image(this.prop.src, x, y, 0, 0);

            //WARNING NEXT IS A HACK!!!!!!
            //shape.attr("src",this.prop.src); //raphael won't return src correctly otherwise
        }else if(this.mode == "text"){
            shape = this.draw.text(x, y, this.prop['text']).attr('font-size',0);
            shape.text = this.prop['text'];
            //WARNING NEXT IS A HACK!!!!!!
            //shape.attr("text",this.prop.text); //raphael won't return src correctly otherwise
        }
        if(shape){
            shape.id = this.generateUUID();
            shape.attr({
                "fill": this.prop.fill,
                "stroke": this.prop.stroke,
                "stroke-width": this.prop["stroke-width"],
                "fill-opacity": this.prop['fill-opacity'],
                "stroke-opacity": this.prop["stroke-opacity"]
            });
            this.addShape(shape)
        }
    }else{

    }
    return false;
};

VectorEditor.prototype.onMouseMove = function(x, y, target){

    this.fire("mousemove");

    if(this.mode == "select" || this.mode == "delete"){
        if(this.selectbox){
            this.resize(this.selectbox, x - this.onHitXY[0], y - this.onHitXY[1], this.onHitXY[0], this.onHitXY[1])
        }else if(this.mode == "select"){
            if(this.action == "move"){
                for(var i = 0; i < this.selected.length; i++){
                    this.move(this.selected[i], x - this.tmpXY[0], y - this.tmpXY[1])
                }
                //this.moveTracker(x - this.tmpXY[0], y - this.tmpXY[1])
                this.updateTracker();
                this.tmpXY = [x, y];

            }else if(this.action == "rotate"){
                //no multi-rotate
                var box = this.selected[0].getBBox()
                var rad = Math.atan2(y - (box.y + box.height/2), x - (box.x + box.width/2))
                var deg = ((((rad * (180/Math.PI))+90) % 360)+360) % 360;
                this.selected[0].rotate(deg, true); //absolute!
                //this.rotateTracker(deg, (box.x + box.width/2), (box.y + box.height/2))
                this.updateTracker();
            }else if(this.action.substr(0,4) == "path"){
                var num = parseInt(this.action.substr(4))
                var pathsplit = Raphael.parsePathString(this.selected[0].attr("path"))
                if(pathsplit[num]){
                    pathsplit[num][1] = x
                    pathsplit[num][2] = y
                    this.selected[0].attr("path", pathsplit)
                    this.updateTracker()
                }
            }else if(this.action == "resize"){
                if(!this.onGrabXY){ //technically a misnomer
                    if(this.selected[0].type == "ellipse"){
                        this.onGrabXY = [
                            this.selected[0].attr("cx"),
                            this.selected[0].attr("cy")
                        ]
                    }else if(this.selected[0].type == "path"){
                        this.onGrabXY = [
                            this.selected[0].getBBox().x,
                            this.selected[0].getBBox().y,
                            this.selected[0].getBBox().width,
                            this.selected[0].getBBox().height
                        ]
                    }else{
                        this.onGrabXY = [
                            this.selected[0].attr("x"),
                            this.selected[0].attr("y")
                        ]
                    }
                    //this.onGrabBox = this.selected[0].getBBox()
                }
                var box = this.selected[0].getBBox()
                var nxy = this.returnRotatedPoint(x, y, box.x + box.width/2, box.y + box.height/2, -this.selected[0].attr("rotation"))
                x = nxy[0] - 5
                y = nxy[1] - 5
                if(this.selected[0].type == "rect"){
                    this.resize(this.selected[0], x - this.onGrabXY[0], y - this.onGrabXY[1], this.onGrabXY[0], this.onGrabXY[1])
                }else if(this.selected[0].type == "image"){
                    this.resize(this.selected[0], x - this.onGrabXY[0], y - this.onGrabXY[1], this.onGrabXY[0], this.onGrabXY[1])
                }else if(this.selected[0].type == "ellipse"){
                    this.resize(this.selected[0], x - this.onGrabXY[0], y - this.onGrabXY[1], this.onGrabXY[0], this.onGrabXY[1])
                }else if(this.selected[0].type == "text"){
                    this.resize(this.selected[0], x - this.onGrabXY[0], y - this.onGrabXY[1], this.onGrabXY[0], this.onGrabXY[1])
                }else if(this.selected[0].type == "path"){
                    this.selected[0].scale((x - this.onGrabXY[0])/this.onGrabXY[2], (y - this.onGrabXY[1])/this.onGrabXY[3], this.onGrabXY[0], this.onGrabXY[1])
                }
                this.newTracker(this.selected[0])
            }
        }
    }else if(this.selected.length == 1){
        if(this.mode == "rect"){
            this.resize(this.selected[0], x - this.onHitXY[0], y - this.onHitXY[1], this.onHitXY[0], this.onHitXY[1])
        }else if(this.mode == "image"){
            this.resize(this.selected[0], x - this.onHitXY[0], y - this.onHitXY[1], this.onHitXY[0], this.onHitXY[1])
        }else if(this.mode == "ellipse"){
            this.resize(this.selected[0], x - this.onHitXY[0], y - this.onHitXY[1], this.onHitXY[0], this.onHitXY[1])
        }else if(this.mode == "text"){
            this.resize(this.selected[0], x - this.onHitXY[0], y - this.onHitXY[1], this.onHitXY[0], this.onHitXY[1])
        }else if(this.mode == "path"){
            //this.selected[0].lineTo(x, y);
            this.selected[0].attr("path", this.selected[0].attrs.path + 'L'+x+' '+y)
        }else if(this.mode == "polygon" || this.mode == "line"){
            //this.selected[0].path[this.selected[0].path.length - 1].arg[0] = x
            //this.selected[0].path[this.selected[0].path.length - 1].arg[1] = y
            //this.selected[0].redraw();
            //var pathsplit = this.selected[0].attr("path").split(" ");

            //theres a few freaky bugs that happen due to this new IE capable way that is probably better

            var pathsplit = Raphael.parsePathString(this.selected[0].attr("path"))
            if(pathsplit.length > 1){
                //var hack = pathsplit.reverse().slice(3).reverse().join(" ")+' ';

                //console.log(pathsplit)
                if(this.mode == "line"){
                    //safety measure, the next should work, but in practice, no
                    pathsplit.splice(1)
                }else{
                    var last = pathsplit[pathsplit.length -1];
                    //console.log(this.selected[0].polypoints.length, pathsplit.length)
                    if(this.selected[0].polypoints.length < pathsplit.length){
                        //if(Math.floor(last[1]) == this.lastpointsX && Math.floor(last[2]) == this.lastpointsY){
                        pathsplit.splice(pathsplit.length - 1, 1);
                    }
                    //}else{
                    //  console.log(last[1], last[2], this.lastpointsX, this.lastpointsY)
                    //}
                }
                //this.lastpointsX = x; //TO FIX A NASTY UGLY BUG
                //this.lastpointsY = y; //SERIOUSLY

                this.selected[0].attr("path", pathsplit.toString() + 'L'+x+' '+y)

            }else{
                //console.debug(pathsplit)
                //normally when this executes there's somethign strange that happened
                this.selected[0].attr("path", this.selected[0].attrs.path + 'L'+x+' '+y)
            }
            //this.selected[0].lineTo(x, y)
        }
    }

    return false;
}


VectorEditor.prototype.getMarkup = function(){
    return this.draw.canvas.parentNode.innerHTML;
}


VectorEditor.prototype.onDblClick = function(x, y, target){
    this.fire("dblclick")
    if(this.selected.length == 1){
        if(this.selected[0].getBBox().height == 0 && this.selected[0].getBBox().width == 0){
            this.deleteShape(this.selected[0])
        }
        if(this.mode == "polygon"){
            //this.selected[0].andClose()
            this.unselect()
        }
    }
    return false;
}



VectorEditor.prototype.onMouseUp = function(x, y, target){
    this.fire("mouseup")
    this.onGrabXY = null;

    if(this.mode == "select" || this.mode == "delete"){
        if(this.selectbox){
            var sbox = this.selectbox.getBBox()
            var new_selected = [];
            for(var i = 0; i < this.shapes.length; i++){
                if(this.rectsIntersect(this.shapes[i].getBBox(), sbox)){
                    new_selected.push(this.shapes[i])
                }
            }

            if(new_selected.length == 0 || this.selectadd == false){
                this.unselect()
            }

            if(new_selected.length == 1 && this.selectadd == false){
                this.select(new_selected[0])
            }else{
                for(var i = 0; i < new_selected.length; i++){
                    this.selectAdd(new_selected[i])
                }
            }
            if(this.selectbox.node.parentNode){
                this.selectbox.remove()
            }
            this.selectbox = null;

            if(this.mode == "delete"){
                this.deleteSelection();
            }

        }else{
            this.action = "";
        }
    }else if(this.selected.length == 1){
        if(this.selected[0].getBBox().height == 0 && this.selected[0].getBBox().width == 0){
            if(this.selected[0].subtype != "polygon"){
                this.deleteShape(this.selected[0])
            }
        }
        if(this.mode == "rect"){
            this.unselect()
        }else if(this.mode == "ellipse"){
            this.unselect()
        }else if(this.mode == "path"){
            this.unselect()
        }else if(this.mode == "line"){
            this.unselect()
        }else if(this.mode == "image"){
            this.unselect()
        }else if(this.mode == "text"){
            this.unselect()
        }else if(this.mode == "polygon"){
            //this.selected[0].lineTo(x, y)
            this.selected[0].attr("path", this.selected[0].attrs.path + 'L'+x+' '+y)
            if(!this.selected[0].polypoints) this.selected[0].polypoints = [];
            this.selected[0].polypoints.push([x,y])

        }
    }
    if(this.lastmode){
        this.setMode(this.lastmode);
        //this.mode = this.lastmode //not selectmode becasue that unselects
        delete this.lastmode;
    }
    return false;
};

// ================================== shape ==================================

VectorEditor.prototype.deleteSelection = function(){
    while(this.selected.length > 0){
        this.deleteShape(this.selected[0])
    }
}

VectorEditor.prototype.deleteShape = function(shape,nofire){
    if(!nofire){if(this.fire("delete",shape)===false)return;}

    if(shape && shape.node && shape.node.parentNode){
        shape.remove()
    }
    for(var i = 0; i < this.trackers.length; i++){
        if(this.trackers[i].shape == shape){
            this.removeTracker(this.trackers[i]);
        }
    }
    for(var i = 0; i < this.shapes.length; i++){
        if(this.shapes[i] == shape){
            this.shapes.splice(i, 1)
        }
    }
    for(var i = 0; i < this.selected.length; i++){
        if(this.selected[i] == shape){
            this.selected.splice(i, 1)
        }
    }
    //should remove references, but whatever
}

VectorEditor.prototype.deleteAll = function(){
    this.fire("clear2")
    this.draw.clear()
    this.shapes = []
    this.trackers = []
}

VectorEditor.prototype.clearShapes = function(){
    this.fire("clear")
    while(this.shapes.length > 0){
        this.deleteShape(this.shapes[0],true) //nofire
    }
}

VectorEditor.prototype.generateUUID = function(){
    var uuid = "", d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < 4/*16*/; i++){
        uuid += d.charAt(Math.floor(Math.random()*(i?d.length:(d.length-10))));
    }
    return uuid;
}

VectorEditor.prototype.getShapeById = function(v){
    for(var i=this.shapes.length;i--&&this.shapes[i].id!=v;);
    return this.shapes[i]
}

VectorEditor.prototype.addShape = function(shape,no_select, no_fire){
    if(!no_fire)this.fire("addshape",shape,no_select);
    shape.node.shape_object = shape
    if(!no_select){
        this.selected = [shape]
    }
    this.shapes.push(shape)
    if(!no_fire)this.fire("addedshape",shape,no_select);
}

VectorEditor.prototype.rectsIntersect = function(r1, r2) {
    return r2.x < (r1.x+r1.width) &&
        (r2.x+r2.width) > r1.x &&
        r2.y < (r1.y+r1.height) &&
        (r2.y+r2.height) > r1.y;
}

VectorEditor.prototype.drawGrid = function(){
    this.draw.drawGrid(0, 0, 480, 272, 10, 10, "blue").toBack()
}

VectorEditor.prototype.move = function(shape, x, y){
    //HACKITY HACK HACK
    //var rot = null;
    //if(shape._ && shape._.rt){
    //  rot = shape._.rt.deg
    //}

    //<here's the part that isn't a hack>
    shape.translate(x,y)
    //</end non-hack>

    //HACKITY HACK HACK
    //if(rot){
    //  shape.rotate(rot,true)//absolutelyness
    //}
    //if(shape._ && shape._.rt){
    //  shape.rotate(shape._.rt.deg, true)
    //}
}


VectorEditor.prototype.scale = function(shape, corner, x, y){
    var xp = 0, yp = 0
    var box = shape.getBBox()
    switch(corner){
        case "tr":
            xp = box.x
            yp = box.y + box.height
            break;
        case "bl":
            xp = box.x + box.width
            yp = box.y
            break;
        case "tl":
            xp = box.x + box.width;
            yp = box.y + box.height;
            break;
        case "br":
            xp = box.x
            yp = box.y
            break;
    }
    shape.scale(x, y, xp, yp)
}

VectorEditor.prototype.fixText = function(str){
    return window.Ax?Ax.textfix(str):str;
}

VectorEditor.prototype.resize = function(object, width, height, x, y){
    if(object.type == "rect" || object.type == "image"){
        if(width > 0){
            object.attr("width", width)
        }else{
            object.attr("x", (x?x:object.attr("x"))+width)
            object.attr("width", Math.abs(width))
        }
        if(height > 0){
            object.attr("height", height)
        }else{
            object.attr("y", (y?y:object.attr("y"))+height)
            object.attr("height", Math.abs(height))
        }
    }else if(object.type == "ellipse"){
        if(width > 0){
            object.attr("rx", width)
        }else{
            object.attr("x", (x?x:object.attr("x"))+width)
            object.attr("rx", Math.abs(width))
        }
        if(height > 0){
            object.attr("ry", height)
        }else{
            object.attr("y", (y?y:object.attr("y"))+height)
            object.attr("ry", Math.abs(height))
        }
    }else if(object.type == "text"){
        object.attr("font-size", Math.abs(width))
        //object.node.style.fontSize = null;
    }
}

// ================================== tracker ==================================

// 取消选中
VectorEditor.prototype.unselect = function(shape){

    if(!shape){
        while(this.selected[0]){
            this.unselect(this.selected[0])
        }
        if(shape !== false){
            this.fire("unselected")
        }
    }else{
        this.fire("unselect", shape);
        this.array_remove(shape, this.selected);
        for(var i = 0; i < this.trackers.length; i++){
            if(this.trackers[i].shape == shape){
                this.removeTracker(this.trackers[i]);
            }
        }
    }
}


VectorEditor.prototype.selectAdd = function(shape){
    if(this.is_selected(shape) == false){
        if(this.fire("selectadd",shape)===false)return;

        this.selected.push(shape)
        this.showGroupTracker(shape);
    }
}

VectorEditor.prototype.selectAll = function(){
    this.unselect()
    for(var i = 0; i < this.shapes.length; i++){
        this.selectAdd(this.shapes[i])

    }
}

VectorEditor.prototype.selectToggle = function(shape){
    if(this.is_selected(shape) == false){
        this.selectAdd(shape)
    }else{
        this.unselect(shape)
    }
}

VectorEditor.prototype.select = function(shape){
    if(this.fire("select",shape)===false)return;
    this.unselect(false)
    this.selected = [shape]
    this.showTracker(shape)
}



VectorEditor.prototype.removeTracker = function(tracker){
    if(!tracker){
        while(this.trackers.length > 0){
            this.removeTracker(this.trackers[0]);
        }
    }else{
        tracker.remove();

        for(var i = 0; i < this.trackers.length; i++){
            if(this.trackers[i] == tracker){
                this.trackers.splice(i, 1)
            }
        }
    }
}


VectorEditor.prototype.updateTracker = function(tracker){
    if(!tracker){
        for(var i = 0; i < this.trackers.length; i++){
            this.updateTracker(this.trackers[i])
        }
    }else{
        var shape = tracker.shape;
        var box = shape.getBBox();
        //this is somewhat hackish, if someone finds a better way to do it...
        if(shape.type == "path" && this.action.substr(0,4) == "path"){
            var pathsplit = Raphael.parsePathString(shape.attr("path"))
            if(pathsplit.length == 2){
                tracker[0].attr({cx: box.x + box.width/2, cy: box.y + box.height/2})
                tracker[1].attr({x: pathsplit[0][1]-2, y: pathsplit[0][2]-2})
                tracker[2].attr({x: pathsplit[1][1]-2, y: pathsplit[1][2]-2})
            }
            return;
        }

        //i wish my code could be as dated as possible by referencing pieces of culture
        //though I *hope* nobody needs to use svg/vml whatever in the near future
        //there coudl be a lot of better things
        //and svg-edit is a better project
        //so if the future even uses raphael, then microsoft really sucks
        //it truly is "more evil than satan himself" which is itself dated even for the time of writing
        //and am I ever gonna read this? If it's someone that's not me that's reading this
        //please tell me (if year > 2010 or otherwise)
        tracker.translate(box.x - tracker.lastx, box.y - tracker.lasty)

        //now here for the magic
        if(shape._ && shape._.rt){
            tracker.rotate(shape._.rt.deg, (box.x + box.width/2), (box.y + box.height/2))
        }

        tracker.lastx = box.x//y = boxxy trollin!
        tracker.lasty = box.y
    }
}
VectorEditor.prototype.trackerBox = function(x, y, action){
    var w = 4
    var shape = this.draw.rect(x - w, y - w, 2*w, 2*w).attr({
        "stroke-width": 1,
        "stroke": "green",
        "fill": "white"
        //THE FOLLOWING LINES HAVE BEEN COMMENTED DUE TO A HORRIBLE BUG IN RAPHAEL
    }).mouseover(function(){
        this.attr("fill", "red")
        try{ //easy way out! try catch!
            if(this.paper.editor.trackers[0][0].attr("rotation").split(" ")[0] == "0" && this.paper.editor.action != "resize"){ //ugh
                this.paper.editor.tooltip("Click and drag to resize shape",
                    {x: this.attr("x")+10, y: this.attr("y")+5});
            }else if(this.paper && this.paper.editor && this.paper.editor.hideTooltip){
                this.paper.editor.hideTooltip()
            }
        }catch(err){}

    }).mouseout(function(){
        this.attr("fill", "white")
        if(this.paper && this.paper.editor && this.paper.editor.hideTooltip)
            this.paper.editor.hideTooltip();

    }).mousedown(function(event){
        //console.log(event)
        if(this.paper && this.paper.editor)
            this.paper.editor.action = action;

    });
    var othis = this;
    if(mobilesafari){
        shape.node.addEventListener("touchstart", function(e){
            othis.action = action;
            e.preventDefault();
            return false
        }, false)
        shape.node.addEventListener("touchmove", function(e){
            e.preventDefault();
            return false;
        }, false)
        shape.node.addEventListener("touchend", function(e){
            e.preventDefault()
        }, false)
    }
    shape.node.is_tracker = true;
    return shape;
}

VectorEditor.prototype.trackerCircle = function(x, y){
    var w = 5
    var shape = this.draw.ellipse(x, y, w, w).attr({
        "stroke-width": 1,
        "stroke": "green",
        "fill": "white"
        //THE FOLLOWING LINES HAVE BEEN COMMENTED DUE TO A HORRIBLE BUG IN RAPHAEL
    }).mouseover(function(){
        this.attr("fill", "red")
        try{ //easy way out! try catch!
            if(this.paper.editor.trackers[0][0].attr("rotation").split(" ")[0] == "0"){ //ewwie!
                this.paper.editor.tooltip("Drag to rotate shape or double click to reset.",
                    {x: this.attr("cx")+5, y: this.attr("cy")});
            }
        }catch(err){}
    }).mouseout(function(){
        this.attr("fill", "white")
        this.paper.editor.hideTooltip()
    }).mousedown(function(){
        this.paper.editor.action = "rotate";
    }).dblclick(function(){
        this.paper.editor.trackers[0].shape.rotate(0, true); //absolute!
        this.paper.editor.updateTracker();
    });
    shape.node.is_tracker = true;
    return shape;
}

VectorEditor.prototype.hideTooltip = function(){
    this.tt.hide();
}

VectorEditor.prototype.tooltip = function(t,bbox){
    if(!this.tt){
        var set = this.draw.set();
        set.push(this.draw.text(0,0,"x"))
        set.push(this.draw.rect(0,0,1,1))
        this.tt = set;
    }
    var set = this.tt;

    set.show();
    set.toFront();
    var text = set[0];
    var rect = set[1];
    text.attr("text", t);
    text.attr("x", bbox.x);
    text.attr("y", bbox.y);
    var txb = text.getBBox() //i wish i knew a better way to align it like that
    text.attr("x", bbox.x + txb.width/2 + 8)
    txb = text.getBBox()

    rect.attr({
        x: txb.x-5,
        y: txb.y,
        width: txb.width+10,
        height: txb.height,
        r: 3
    })
    rect.attr("fill","#7cb6ef") //it's the first 6 letters of the hex SHA1 hash of "false"
        .insertBefore(text);

    return set;
}

VectorEditor.prototype.markTracker = function(shape){
    shape.node.is_tracker = true;
    return shape;
}


VectorEditor.prototype.newTracker = function(shape){
    for(var i = 0; i < this.trackers.length; i++){
        if(this.trackers[i].shape == shape){
            this.removeTracker(this.trackers[i]);
        }
    }
    this.showTracker(shape)
}

VectorEditor.prototype.showTracker = function(shape){
    var rot_offset = -14;
    var box = shape.getBBox();
    var tracker = this.draw.set();
    tracker.shape = shape;

    //define the origin to transform to
    tracker.lastx = 0 //if zero then easier
    tracker.lasty = 0 //if zero then easier

    tracker.push(this.markTracker(this.draw.ellipse(box.width/2, box.height/2, 7, 7).attr({
        "stroke": "gray",
        "stroke-opacity": 0.5,
        "fill": "gray",
        "fill-opacity": 0.15
    })).mousedown(function(){
        this.paper.editor.action = "move"
    }));

    //draw everything relative to origin (0,0) because it gets transformed later
    if(shape.subtype == "line"){
        var line = Raphael.parsePathString(shape.attr('path'));

        tracker.push(this.trackerBox(line[0][1]-box.x,line[0][2]-box.y,"path0"))
        tracker.push(this.trackerBox(line[1][1]-box.x,line[1][2]-box.y,"path1"))
        this.trackers.push(tracker)
    }else if(shape.type == "rect" || shape.type == "image"){
        tracker.push(this.draw.rect(-6, -6, box.width + 11, box.height + 11).attr({"opacity":0.3}))
        //tracker.push(this.trackerBox(-10, -10))
        //tracker.push(this.trackerBox(box.width + 10, -10))
        //tracker.push(this.trackerBox(box.width + 10, box.height + 10))
        //tracker.push(this.trackerBox(-10, box.height + 10))
        tracker.push(this.trackerCircle(box.width/2, rot_offset))
        tracker.push(this.trackerBox(box.width+5,box.height+5,"resize"))
        this.trackers.push(tracker)
    }else if(shape.type == "ellipse"){
        //tracker.push(this.trackerBox(box.x, box.y))
        //tracker.push(this.trackerBox(box.width, box.y))
        //tracker.push(this.trackerBox(box.width, box.height))
        //tracker.push(this.trackerBox(box.x, box.height))
        tracker.push(this.trackerCircle(box.width/2, rot_offset))
        tracker.push(this.trackerBox(box.width+5,box.height+5,"resize"))
        this.trackers.push(tracker)
    }else if(shape.type == "text"){
        tracker.push(this.draw.rect(-6, -6, box.width + 11, box.height + 11).attr({"opacity":0.3}))
        tracker.push(this.trackerCircle(box.width/2, rot_offset))
        tracker.push(this.trackerBox(box.width+5,box.height+5,"resize"))
        this.trackers.push(tracker)
    }else if(shape.type == "path" && shape.subtype != "line"){
        tracker.push(this.draw.rect(-6, -6, box.width + 11, box.height + 11).attr({"opacity":0.3}))
        tracker.push(this.trackerBox(box.width+5,box.height+5,"resize"))
        tracker.push(this.trackerCircle(box.width/2, rot_offset))
        this.trackers.push(tracker)
    }else{
        tracker.push(this.draw.rect(-6, -6, box.width + 11, box.height + 11).attr({"opacity":0.3}))
        tracker.push(this.trackerCircle(box.width/2, rot_offset))
        this.trackers.push(tracker)
    }
    this.updateTracker(tracker)
}

VectorEditor.prototype.showGroupTracker = function(shape){
    var tracker = this.draw.set();
    var box = shape.getBBox();

    tracker.push(this.markTracker(this.draw.ellipse(box.width/2, box.height/2, 7, 7).attr({
        "stroke": "gray",
        "stroke-opacity": 0.5,
        "fill": "gray",
        "fill-opacity": 0.15
    })).mousedown(function(){
        this.paper.editor.action = "move"
    }));

    tracker.push(this.draw.rect(-6, -6, box.width + 11, box.height + 11).attr({
        "stroke-dasharray": "-",
        "stroke": "blue"
    }))
    tracker.shape = shape;
    //define the origin to transform to
    tracker.lastx = 0 //if zero then easier
    tracker.lasty = 0 //if zero then easier
    this.trackers.push(tracker)

    this.updateTracker(tracker)
}


