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
