//
// Modules
//
var
	// Node modules
	fs = require('fs')
	, util = require('util')

	// External modules
	, hogan = require('hogan.js')

//
// CLI
//
var
	argv = process.argv.slice(2)
	, argc = argv.length

	, commandList = [
		{ s: '-i', l: '--input=', desc: 'The location of the tamplate input file (required)', callback: onArgInput }
		, { s: '-o', l: '--output=', desc: 'The filename where the output shall be written (required)', callback: onArgOutput }
		, { s: '-c', l: '--context=', desc: 'The location of a JSON input file defining the context (if not specified the context is an empty object)', callback: onArgContext }
		, { s: '-h', l: '--help', desc: 'Print hogancr help', callback: onArgHelp }
	]
	, cllen = commandList.length

	function onArgInput(value) {
		if ( fs.existsSync(value) )
			settings.input = value
		else {
			console.log('The input-file doesn\'t exist.')
			process.exit(1)
		}
	}

	function onArgOutput(value) {
		settings.output = value
	}

	function onArgContext(value) {
		if ( fs.existsSync(value) )
			settings.context = value
		else {
			console.log('The context-file doesn\'t exist.')
			process.exit(1)
		}
	}

	function onArgHelp() {
		settings.help = true
	}

//
// hoganrc
//
var settings = {
		input: null
		, context: null
		, output: null
		, help: false
	}

function printHelp() {
	util.puts('hogancr - Hogan.js Compile & Render CLI')
	util.puts('')
	util.puts('usage: hogancr -i<input> -o<output> [-c<context>]')
	util.puts('')
	util.puts('Options:')

	for ( var i = 0; i != cllen; i++ )
		util.puts( util.format('%s / %s : %s', commandList[i].s, commandList[i].l, commandList[i].desc) )
}

for (var i = 0; i != argc; i++) {
	for (var j = 0; j != cllen; j++) {
		var
			regex = new RegExp('^(' + commandList[j].s + '|' + commandList[j].l + ')(.*)$','g')
			, result = regex.exec(argv[i])

		if (result)
			commandList[j].callback(result[2])
	}
}

if ( settings.context === null )
	settings.context = {}

if ( (!settings.input || !settings.output /*|| !settings.context*/) && !settings.help )
	console.log('You must specify a input-, output- and context-file.\n\nType hogancr -h / --help to see the full argument list')
else if ( settings.help ) {
	printHelp()
	process.exit(0)
// Everything is fine
} else {
	process.exit(0)
}

