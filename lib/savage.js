var TemplateEngine = function(){}
TemplateEngine.prototype = {
	constructor: TemplateEngine

	, engine: {}
	, render: function() {}
	, compile: function() {}
}

var Engines = new function() {
	var
		_list = []
	
	this.list = function() {
		return _list.slice()
	}

	this.register = function(engine) {
		if (engine instanceof TemplateEngine)
			_list.push(engine)
	}
	
	this.find = function(name) {
		for( var i = 0, len = _list.length; i !== len; i++)
			if ( _list[i].engine.name === name )
				return _list[i]
	}
}

// ------------
// - Hogan.js -
// ------------
var HoganEngine = function() {
/*//	console.log( require('hogan.js') )
	try {
		console.log(this.prototype)
//		this.engine.name = 'Hogan.js'
	} catch (e) {
		console.log('ERROR: Couldn\'t initialize Hogan engine.\nDid you ´npm install´ it in your project or globally?')
	}*/
}
HoganEngine.prototype = new TemplateEngine

HoganEngine.prototype = {
	init: function() {
		console.log('init')
	}
	, constructor: HoganEngine.init
	, render: function() {
		return this.engine.parse.apply(this,arguments)
	}
	, compile: function() {
		return this.engine.compile.apply(this,arguments)
	}
}

//var e = new HoganEngine()
exports.TemplateEngine = TemplateEngine
//exports.Engines = Engines
exports.HoganEngine = HoganEngine
