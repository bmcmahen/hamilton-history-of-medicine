import asciiJSON from 'ascii-json'


/**
 * Inject data and optional client scripts into markup.
 *
 * @param {String} markup
 * @param {Object} data
 * @param {?Array} scripts
 */

function injectIntoMarkup(markup, data, scripts) {
	var escapedJson = asciiJSON.stringify(data).replace(/<\//g, '<\\/');
	var injected = '<script>window.__reactTransmitPacket=' + escapedJson + '</script>';

	if (scripts) {
		injected += scripts.map(function(script) {
			return '<script src="' + script + '"></script>';
		}).join('');
	}

	if (markup.indexOf('</body>') > -1) {
		return markup.replace('</body>', injected + '$&');
	} else {
		return markup + injected;
	}
}

export default injectIntoMarkup
