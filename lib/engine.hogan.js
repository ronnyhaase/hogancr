var libengine = require('./engine')
	, TemplateEngine = libengine.TemplateEngine
	, Engines = libengine.Engines

// -----------
// HoganEngine - Implementation of ´hogan.js´
//------------
var HoganEngine = function() {}
HoganEngine.prototype = new TemplateEngine()
HoganEngine.prototype.constructor = HoganEngine

HoganEngine.prototype.name = 'hogan'
HoganEngine.prototype.init = function() {
	try {
		this._engine = require('hogan.js')
	} catch(e) {
		throw new Error('Unable to load hogan.js - Did you ´npm install´ it in your working directory or globally?')
	}

	return this
}
HoganEngine.prototype.compile = function() {
	TemplateEngine.prototype.compile.apply(this,arguments)

	return this._engine.compile.apply(this._engine,arguments)
}
HoganEngine.prototype.render = function() {
	TemplateEngine.prototype.render.apply(this,arguments)

	return this._engine.render.apply(this._engine,arguments)
}

//
// Registration
//
Engines.register(HoganEngine)
