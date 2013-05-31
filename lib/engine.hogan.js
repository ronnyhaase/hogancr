/*
 *  Copyright (C) Ronny Haase, 2013
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

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
