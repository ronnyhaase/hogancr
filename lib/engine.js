// --------------
// TemplateEngine - Prototype for all templating engines
//---------------
var TemplateEngine = function(){}
TemplateEngine.prototype = {
	constructor: TemplateEngine

	, engine: {
		init: function noop(){}
		, name: ''
		, _instance: null
	}
	, render: function() {}
	, compile: function() {}
}

// -------
// Engines - Handles all template engines
// -------
var Engines = function() {
	var
		_list = []

	this.list = function() {
		return _list.slice()
	}

	this.register = function(engine) {
		if (engine.prototype.constructor === TemplateEngine) {
			_list.push(engine)
			return true
		}
		else
			return false
	}

	this.find = function(name) {
		for( var i = 0, len = _list.length; i !== len; i++)
			if ( _list[i].engine.name === name )
				return _list[i]

		return false
	}
}

// -------
// Exports
// -------
module.exports = exports = {
	TemplateEngine: TemplateEngine
	, Engines: new Engines()
}
