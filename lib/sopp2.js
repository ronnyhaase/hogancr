function isLongOpt(s) {
	// TODO: Make this a RegEx
	return ( 
		// s is a String
		typeof s === 'string'
		// First two chars are '-'
		&& s[0] === '-' && s[1] === '-'
		// '--' is followed by at least one more character
		&& s[2] !== undefined
	)
}

function isShortOpt(s) {
	// TODO: Make this a RegEx
	return (
		// s is a String
		typeof s === 'string'
		// First char is '-'
		&& s[0] === '-'
		// There's a second char and it's not '-'
		&& s[1] !== undefined && s[1] !== '-'
	)
}

var
	arg = ''
	, arg_opt

// Iterate through arguments
for (var i = 0; i < argc; i++) {
	arg = argv[i]

	if ( isShortOpt(arg) ) {
	} else if ( isLongOpt(arg) ) {
		var
			lo_pos_eq = ( (lo_pos_eq = arg.indexOf('=')) !== -1 ) ? lo_pos_eq : arg.length
			, lo_name = arg.slice(0,lo_pos_eq)
			, lo_val = arg.slice(lo_pos_eq+1)

		if ( arg_opt = findLong(lo_name) ) {
			if ( arg_opt.type === Boolean )
				parsed[arg_opt.name] = true
			else if ( arg_opt.type === String && lo_val !== '' )
				parsed[arg_opt.name] = lo_val
			else if ( arg_opt.type === Array && lo_val !== '' ) {
				if ( parsed[arg_opt.name] === undefined )
					parsed[arg_opt.name] = [lo_val]
				else
					parsed[arg_opt.name].push(lo_val)
			}
		} else {
			parsed.illegal_.push(lo_name)
		}
	} else {
		parsed.files_.push(arg)
	}
}
