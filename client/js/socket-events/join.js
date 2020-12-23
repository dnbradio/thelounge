"use strict";

import socket from "../socket";
import store from "../store";
import {switchToChannel} from "../router";
const Helper = require("../../../src/helper.js");

socket.on("join", function (data) {

	if (Helper.config.restrict.enable && data.chan.match(Helper.config.restrict.pattern) === null) {
		return;
	}
	
	store.getters.initChannel(data.chan);

	const network = store.getters.findNetwork(data.network);

	if (!network) {
		return;
	}

	network.channels.splice(data.index || -1, 0, data.chan);

	// Queries do not automatically focus, unless the user did a whois
	if (data.chan.type === "query" && !data.shouldOpen) {
		return;
	}

	switchToChannel(store.getters.findChannel(data.chan.id).channel);
});
