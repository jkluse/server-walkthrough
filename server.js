"use strict";

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import routes from "./routes.js";

// __filename workaround for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);

const port = process.env.PORT || 8800;
const server = http.createServer(handleRoute);
let guestsPath = path.join(__dirname, "guests.json");

function handleRoute(req, res) {
	if (routes[req.url] !== undefined) {
		routes[req.url](req, res);
	} else {
		res.end("404, no such route");
	}
}

function handleRequests(req, res) {
	if (req.method === "GET" && req.url === "/guests") {
		fs.readFile(guestsPath, "utf-8", (err, guestsJSON) => {
			if (err) {
				console.error(err.stack);
				res.statusCode = 500;
				res.setHeader("Content-Type", "text/plain");
				res.end("Internal Server Error");
			}

			res.setHeader("Content-Type", "application/json");
			res.end(guestsJSON);
		});
	} else if (req.method === "GET" && req.url == "/guests/0") {
		fs.readFile(guestsPath, "utf-8", function (err, guestsJSON) {
			if (err) {
				console.error(err.stack);
				res.statusCode = 500;
				res.setHeader("Content-Type", "text/plain");
				res.end("Internal Server Error");
			}
			let guests = JSON.parse(guestsJSON);
			let guestJSON = JSON.stringify(guests[0]);
			res.setHeader("Content-Type", "application/json");
			res.end(guestJSON);
		});
	} else if (req.method === "GET" && req.url == "/guests/1") {
		fs.readFile(guestsPath, "utf-8", function (err, guestsJSON) {
			if (err) {
				console.error(err.stack);
				res.statusCode = 500;
				res.setHeader("Content-Type", "text/plain");
				res.end("Internal Server Error");
			}
			let guests = JSON.parse(guestsJSON);
			let guestJSON = JSON.stringify(guests[1]);
			res.setHeader("Content-Type", "application/json");
			res.end(guestJSON);
		});
	} else {
		res.statusCode = 404;
		res.setHeader("Content-Type", "text/plain");
		res.end("Not found");
	}
}

server.listen(port, () => console.log("Listening on port", port));
