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

var engine = require('./engine')

module.exports = exports = {
	TemplateEngine: engine.TemplateEngine
	, Engines: engine.TemplateEngine

	// Add engine implementations here...
	, HoganEngine: require('./engine.hogan')
}

console.log('Engine list\n===========')
console.log( engine.Engines.list() )

console.log('\nResult\n======')
var h = engine.Engines.find('hogan')
h.init()
console.log( h.compile('{{helloworld}}!').render({helloworld:'Hello World'}) )
