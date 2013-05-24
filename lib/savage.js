var TemplateEngine = function(){}
TemplateEngine.prototype.constructor = TemplateEngine

TemplateEngine.prototype.engine = null
TemplateEngine.prototype.render = function() {}
TemplateEngine.prototype.compile = function() {}

var HoganEngine = function(){
	this.engine = "hogan"
}
HoganEngine.prototype = new TemplateEngine
HoganEngine.prototype.constructor = HoganEngine
HoganEngine.prototype.logEngine = function() {
	console.log(this.engine)
}

var e = new HoganEngine()
e.logEngine()
