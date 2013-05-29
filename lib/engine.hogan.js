var engine = require('./engine')

// -----------
// HoganEngine - Implementation of ´hogan.js´
//------------
var HoganEngine = function() {
	this.engine.name = 'hogan'
	this.engine.init = function() {
		try {
			this.engine._instance = require('hogan.js')
		} catch(e) {
			throw new Error('Unable to load hogan.js - Did you ´npm install´ it in your working directory or globally?')
		}
	}
}
HoganEngine.prototype = new engine.TemplateEngine()
//HoganEngine.prototype.constructor = HoganEngine
HoganEngine.prototype.render = function() {
//	return this.engine.parse.apply(this,arguments)
}
HoganEngine.prototype.compile = function() {
//	return this.engine.compile.apply(this,arguments)
}

console.log( engine.Engines.register(HoganEngine) )
