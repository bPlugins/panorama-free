module.exports = function jsonAsObjectLiteralLoader(source) {
	return `module.exports = ${source};`;
};
