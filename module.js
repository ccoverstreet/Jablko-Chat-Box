// module.js: Jablko Chat Box Server-Side
// Cale Overstreet
// September 17, 2020
// Used for chatting with the Jablko chatbot without needing GroupMe

const fs = require("fs").promises;
const path = require("path");

const module_name = path.basename(__dirname);
const jablko = require(module.parent.filename);
const module_config = jablko.jablko_config.jablko_modules[module_name];

module.exports.permission_level = 0;

module.exports.generate_card = async (req) => {
	return (await fs.readFile(`${__dirname}/chat_box.html`, "utf8"))
		.replace(/\$MODULE_NAME/g, module_name);
}

module.exports.web_ask_jablko = async (req, res) => {
	console.log(req.body);	
	res.json({status: "good", response: await jablko.bot_brain.parse_message(req.body.message)});
}
