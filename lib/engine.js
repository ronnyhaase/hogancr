// --------------
// TemplateEngine - Prototype for all templating engines
//---------------
var TemplateEngine = function(){}
TemplateEngine.prototype = {
	constructor: TemplateEngine

	, _engine: null
	, name: ''
	, init: function noop() {}
	, compile: function () {
		if (! this._engine )
			throw new Error('Engine not initialized!')
	}
	, render: function () {
		if (! this._engine )
			throw new Error('Engine not initialized!')
	}
}

// -------
// Engines - Handles all template engines
// -------
var Engines = function() {
	var
		_list = []

	this.list = function() {
		var result = []

		for( var i = 0, len = _list.length; i !== len; i++)
			result.push( _list[i].name )

		return result
	}

	this.register = function(engine) {
		if (engine.prototype instanceof TemplateEngine) {
			_list.push(new engine())
			return true
		}
		else
			return false
	}

	this.find = function(name) {
		for( var i = 0, len = _list.length; i !== len; i++)
			if ( _list[i].name === name )
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
