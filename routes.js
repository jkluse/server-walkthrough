const routes = {
	"/special-message": function (req, res) {
		res.end("You're SPECIAL");
	},
	"/non-special-message": function (req, res) {
		res.end("You're borning!");
	},
};

export default routes;
