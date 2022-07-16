#!/usr/bin/env node

const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");
const prompts = require("prompts");

let projectName;

if (process.argv.length < 3) {
	projectName = prompts({
		type: "text",
		message: "Enter the name of your app",
		name: "projectName",
		initial: "my-app",
	});
} else {
	projectName = process.argv[2];
}

const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const gitRepo = "https://github.com/zivnadel/create-ntmt-app.git";

function loadingAnimation(
	text = "",
	chars = ["⠙", "⠘", "⠰", "⠴", "⠤", "⠦", "⠆", "⠃", "⠋", "⠉"],
	delay = 100
) {
	let x = 0;

	return setInterval(function () {
		process.stdout.write("\r" + chars[x++] + " " + text);
		x = x % chars.length;
	}, delay);
}

try {
	fs.mkdirSync(projectPath);
} catch (err) {
	if (err.code === "EEXIST") {
		console.log(
			"\x1b[31m\x1b[0m",
			`The file ${projectName} already exists in the current directory, please give it a different name.`
		);
	} else {
		console.log(error);
	}
	process.exit(1);
}

async function main() {
	try {
		let loading = loadingAnimation();
		console.log("\x1b[32m\x1b[0m", "Downloading files...");
		execSync(`git clone --depth 1 ${gitRepo} ${projectPath}`);
		clearInterval(loading);

		process.chdir(projectPath);

		loading = loadingAnimation();
		console.log("\x1b[32m\x1b[0m", "Installing dependencies...");
		execSync("npm install");
		clearInterval(loading);

		loading = loadingAnimation();
		console.log("\x1b[32m\x1b[0m", "Removing unecessary files...");
		execSync("npx rimraf ./.git");
		fs.rm(path.join(projectPath, "bin"), { recursive: true });
		clearInterval(loading);

		console.log("\x1b[34m\x1b[0m", "Successfully finished instalation!");
		console.log("\x1b[34m\x1b[0m", `cd ${projectName} to get started! ✨`);
	} catch (error) {
		console.log(error);
	}
}

main();
