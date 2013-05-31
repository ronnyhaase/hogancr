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
