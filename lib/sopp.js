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

module.exports = exports = function sopp(settings, argv, slicepos) {
	var parsed = { illegal_: [], files_: [] }

	if ( typeof slicepos !== 'number' || slicepos < 0)
		slicepos = 2
	if ( !Array.isArray(argv) )
		argv = process.argv.slice(slicepos)

	var argc = argv.length

	function isArgShort(a) {
		// -> /^-{1}.+$/
		return (typeof a === 'string' && a[0] === '-' && a[1] !== '-' && a[1] !== undefined)
	}

	function isArgLong(a) {
		// -> /^-{2}.+$/
		return (typeof a === 'string' && a[0] === '-' && a[1] === '-' && a[2] !== undefined)
	}

	// Returns the command data for a short command char, or false if it is undefined
	function findShort(s) {
		for (var i = 0, slen = settings.length; i < slen; i++)
			if ( settings[i].short.indexOf(s) !== -1 )
				return settings[i]

		return false
	}

	function resolveShort(arg,pos,cmd) {
		if ( cmd.type === Boolean ) {
			parsed[cmd.name] = true
		} else if ( cmd.type === Array ) {
			if ( parsed[cmd.name] === undefined )
				parsed[cmd.name] = []

			parsed[cmd.name].push( arg.slice(pos+1) )

			pos = arg.length
		} else if (cmd.type === String) {
			parsed[cmd.name] = arg.slice(pos+1)

			pos = arg.length
		}

		return pos
	}

	// Expects 'arg' to be a valid short hand argument / list, e.g. "-a" or "-aBcD" !
	function matchShort(arg) {
		var match = false
			, cmd

		// Iterate through argument
		for ( var i = 1, alen = arg.length; arg[i] !== undefined; i++) {
			match = false

			if ( cmd = findShort(arg[i]) ) {
					match = true

					i = resolveShort(arg, i, cmd)
			}

			// No match, push to illegal_
			if (!match)
				parsed.illegal_.push( arg[i] )
		}
	}

	// Expects 'arg' to be a valid long command argument, e.g. --foo !
	function matchLong(arg) {
	}

	var
		reLongWithVal = /--([^-].+)=(.+)$/
		reLongWithoutVal =  //

	(function noConflict(opts) {
		var shortList = ''
			, longList = []
			, supportedTypes = [String, Boolean, Array]

		for (var i = 0, len = opts.length; i < len; i++) {
			// Look for duplicate short command
			if ( shortList.indexOf(opts[i].short) === -1 )
				shortList += opts[i].short
			else
				throw new Error('(sopp) The shortage ´' + opts[i].short  + '´ is assigned more than once!')

			// Look for duplicate long command
			if ( longList.indexOf(opts[i].long) === -1 )
				longList.push(opts[i].long)
			else
				throw new Error('(sopp) The long command ´' + opts[i].long  + '´ is assigned more than once!')

			// Check for type support
			if ( supportedTypes.indexOf(opts[i].type) === -1)
				throw new Error('(sopp) SOPP doesn\'t support the type "' + opts[i].type + '"!')
		}
	})(settings)

	for (var i = 0; i < argc; i++) {
		if ( isArgShort(argv[i]) )
			matchShort(argv[i])
		else if ( isArgLong(argv[i]) )
			matchLong(argv[i])
		else
			parsed.files_.push(argv[i])
	}

	return parsed
}
