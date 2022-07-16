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

try {
	fs.mkdirSync(projectPath);
} catch (err) {
	if (err.code === "EEXIST") {
		console.log(
			"\x1b[31m",
			`The file ${projectName} already exists in the current directory, please give it a different name.`,
			"\x1b[0m"
		);
	} else {
		console.log(error);
	}
	process.exit(1);
}

async function main() {
	try {
		console.log("\x1b[32m");
		console.log("🕐 Downloading files...");
		execSync(`git clone --depth 1 ${gitRepo} ${projectPath}`);
		process.chdir(projectPath);

		console.log("🕑 Installing dependencies...");
		execSync("npm install");

		console.log("🕒 Removing unecessary files...", "\x1b[0m");
		execSync("npx rimraf ./.git");
		fs.rm(path.join(projectPath, "bin"), { recursive: true }, (error) => {
			if (error) {
				console.log("\x1b[31m", error, "\x1b[0m");
			}
		});

		console.log("\x1b[34m", "Successfully finished instalation!");
		console.log("\x1b[34m", `cd ${projectName} to get started! ✨`, "\x1b[0m");
	} catch (error) {
		console.log("\x1b[31m", error, "\x1b[0m");
	}
}

main();
