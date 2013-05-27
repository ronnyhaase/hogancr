var TemplateEngine = function(){}
TemplateEngine.prototype = {
	constructor: TemplateEngine

	, engine: null
	, render: function() {}
	, compile: function() {}
}

// -------------------------
// Hogan.js - Implementation
// -------------------------
var HoganEngine = function(){
	try {
		this.engine = require('hogan.js')
		this.engine.name = 'Hogan.js'
	} catch (e) {
		console.log('ERROR: Couldn\'t initialize Hogan engine.\nDid you ´npm install´ it in your project or globally?')
	}
}
HoganEngine.prototype = new TemplateEngine

HoganEngine.prototype = {
	constructor: HoganEngine
	, render: function() {
		return this.engine.parse.apply(this,arguments)
	}
	, compile: function() {
		return this.engine.compile.apply(this,arguments)
	}
}

var e = new HoganEngine()
console.log( e.compile('{{ hello }} You!').render({ hello: 'Hello' }) )
