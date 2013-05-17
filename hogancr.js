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
		{ s: '-i', l: '--input=', desc: '', callback: onArgInput }
		, { s: '-c', l: '--context=', desc: '', callback: onArgContext }
		, { s: '-o', l: '--output=', desc: '', callback: onArgOutput }
		, { s: '-h', l: '--help', desc: '', callback: onArgHelp }
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
	util.puts('usage: hogancr -i[input] -c[context] -o[output]')
	util.puts('')
	util.puts('Options:')
	util.puts('-i / --input:   The template input file (required)')
	util.puts('-c / --context: The context input file (required)')
	util.puts('-o / --output:  The output file where the result will be written (required)')
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

if ( (!settings.input || !settings.output || !settings.context) && !settings.help )
	console.log('You must specify a input-, output- and context-file.')
else if ( settings.help ) {
	printHelp()
	process.exit(0)
// Everything is fine
} else {
	process.exit(0)
}
