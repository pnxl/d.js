/*
 * Copyright (C) 2022 pnxl <pix3l.icious@gmail.com>
 *
 * This file is part of Penguino.
 *
 * Penguino can not be copied and/or distributed without the express
 * permission of pnxl.
 *
 * fucking hell bro should i even be protecting console.log under copyright lmao
 */

require('colors');

module.exports = class print {
	static log(content) {
		console.log('    Info'.blue.bold + ' >> '.gray + content);
	}
	static debug(content) {
		console.log('   Debug'.cyan.bold + ' >> '.gray + content);
	}
	static warn(content) {
		console.log(' Warning'.yellow.bold + ' >> '.gray + content);
	}
	static error(content) {
		console.log('   Error'.red.bold + ' >> '.gray + content);
	}
	static success(content) {
		console.log(' Success'.green.bold + ' >> '.gray + content);
	}
	static ready(content) {
		console.log('   Ready'.rainbow.bold + ' >> '.gray + content);
	}
	static message(content) {
		console.log(' Message'.blue.bold + ' >> '.gray + content);
	}
	static comment(content) {
		console.log(`// ${content}`.gray.bold);
	}
	static apiReq(content) {
		console.log(' API-Req'.magenta.bold + ' >> '.gray + content);
	}
	static apiRes(content) {
		console.log(' API-Res'.magenta.bold + ' >> '.gray + content);
	}
};
