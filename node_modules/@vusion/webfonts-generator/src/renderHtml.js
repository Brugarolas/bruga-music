var fs = require('fs')
var path = require('path')
var _ = require('underscore')
var handlebars = require('handlebars')

var renderCss = require('./renderCss')

handlebars.registerHelper('removePeriods', function (selector) {
	return selector.replace(/\./, '');
});

var renderHtml = function(options, urls) {
	var source = fs.readFileSync(options.htmlTemplate, 'utf8')
	var template = handlebars.compile(source)

	var htmlFontsPath = path.relative(options.htmlDest, options.dest)
	// Styles embedded in the html file should use default CSS template and
	// have path to fonts that is relative to html file location.
	var styles = renderCss(_.extend({}, options, {
		cssFontPath: htmlFontsPath
	}), urls)

	var ctx = _.extend({
		names: options.names,
		fontName: options.fontName,
		styles: styles,
		codepoints: options.codepoints,
	}, options.templateOptions)

	if (typeof options.htmlContext == 'function') {
		options.htmlContext(ctx, options, handlebars);
	}

	return template(ctx)
}

module.exports = renderHtml
