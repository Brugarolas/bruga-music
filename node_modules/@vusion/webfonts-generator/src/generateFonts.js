var fs = require('fs')
var _ = require('underscore')
var Q = require('q')

var SVGIcons2SVGFontStream = require('svgicons2svgfont')
var svg2ttf = require('svg2ttf')
var ttf2woff = require('ttf2woff')
var ttf2woff2 = require('ttf2woff2')
var ttf2eot = require('ttf2eot')

/**
 * Generators for files of different font types.
 *
 * Generators have following properties:
 * [deps] {array.<string>} Names of font types that will be generated before current
 *		and passed to generator function.
 * fn {function(options, ...depsFonts, done)} Generator function with following arguments:
 *	 options {object} Options passed to 'generateFonts' function.
 *	 ...depsFonts Fonts listed in deps.
 *	 done {function(err, font)} Callback that takes error or null and generated font.
 */
var generators = {
	svg: {
		fn: function(options, done) {
			var font = new Buffer(0)
			var svgOptions = _.pick(options,
				'fontName',
				'fontId',
				'fontStyle',
				'fontWeight',
				'fixedWidth',
				'centerHorizontally',
				'normalize',
				'fontHeight',
				'round',
				'descent',
				'ascent',
				'metadata',
				'log'
			)

			if (options.formatOptions['svg']) {
				svgOptions = _.extend(svgOptions, options.formatOptions['svg'])
			}

			svgOptions.log = function(){}

			var fontStream = new SVGIcons2SVGFontStream(svgOptions)
				.on('data', function(data) {
					font = Buffer.concat([font, data])
				})
				.on('error', done)
				.on('end', function() {
					done(null, font.toString())
				})

			_.each(options.files, function(file, idx) {
				var glyph = typeof file === 'string' ? fs.createReadStream(file) : file;
				var name = options.names[idx]
				var unicode = String.fromCharCode(options.codepoints[name])
                var unicodeArray
                if (options.ligature) {
                    var ligature = ''
                    for(var i=0;i<name.length;i++) {
                        ligature+=String.fromCharCode(name.charCodeAt(i))
                    }
                    unicodeArray = [unicode,ligature]
                } else {
                    unicodeArray = [unicode]
                }
				glyph.metadata = {
					name: name,
					unicode: unicodeArray
				}
				fontStream.write(glyph)
			})

			fontStream.end()
		}
	},

	ttf: {
		deps: ['svg'],
		fn: function(options, svgFont, done) {
			var formatOptions = options.formatOptions['ttf'] || {};
			formatOptions.ts = 1484141760000;
			var font = svg2ttf(svgFont, formatOptions)
			font = new Buffer(font.buffer)
			done(null, font)
		}
	},

	woff: {
		deps: ['ttf'],
		fn: function(options, ttfFont, done) {
			var font = ttf2woff(new Uint8Array(ttfFont), options.formatOptions['woff'])
			font = new Buffer(font.buffer)
			done(null, font)
		}
	},

	woff2: {
		deps: ['ttf'],
		fn: function(options, ttfFont, done) {
			var font = ttf2woff2(new Uint8Array(ttfFont), options.formatOptions['woff2'])
			font = new Buffer(font.buffer)
			done(null, font)
		}
	},

	eot: {
		deps: ['ttf'],
		fn: function(options, ttfFont, done) {
			var font = ttf2eot(new Uint8Array(ttfFont), options.formatOptions['eot'])
			font = new Buffer(font)
			done(null, font)
		}
	}
}

/**
 * @returns Promise
 */
var generateFonts = function(options) {
	var genTasks = {}

	/**
	 * First, creates tasks for dependent font types.
	 * Then creates task for specified font type and chains it to dependencies promises.
	 * If some task already exists, it reuses it.
	 */
	var makeGenTask = function(type) {
		if (genTasks[type]) return genTasks[type]

		var gen = generators[type]
		var depsTasks = _.map(gen.deps, makeGenTask)
		var task = Q.all(depsTasks).then(function(depsFonts) {
			var args = [options].concat(depsFonts)
			return Q.nfapply(gen.fn, args)
		})
		genTasks[type] = task
		return task
	}

	// Create all needed generate and write tasks.
	for (var i in options.types) {
		var type = options.types[i]
		makeGenTask(type)
	}

	return Q.all(_.values(genTasks)).then(function(results) {
		return _.object(_.keys(genTasks), results)
	})
}

module.exports = generateFonts
