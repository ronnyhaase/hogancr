var engine = require('./engine')

module.exports = exports = {
	TemplateEngine: engine.TemplateEngine
	, Engines: engine.TemplateEngine

	// Add engine implementations here...
	, HoganEngine: require('./engine.hogan')
}

console.log( engine.Engines.list() )
