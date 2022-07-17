#!/usr/bin/env node

const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");
const prompts = require("prompts");

/* 
This function gets the project name from the args, and if no argument provided,
the function prompts the user to enter a project name
*/
async function getProjectName() {
	if (process.argv.length < 3 || process.argv[2] === "with-cypress") {
		return (projectName = await prompts({
			type: "text",
			message: "Enter the name of your app",
			name: "projectName",
			initial: "my-app",
		})).projectName;
	}
	return (projectName = process.argv[2]);
}

/* 
This functios deletes properties of a package.json file.
*/
function deleteProperties(json) {
	delete json["name"];
	delete json["version"];
	delete json["description"];
	delete json["repository"];
	delete json["author"];
	delete json["license"];
	delete json["bugs"];
	delete json["main"];
	delete json["bin"];
	delete json["keywords"];
}

function deleteCypressProperties(json) {
	delete json.scripts["cy:open-only"];
	delete json.scripts["cy:run-only"];
	delete json.scripts["cy:open"];
	delete json.scripts["cy:run"];
	delete json.devDependencies["cypress"];
	delete json.devDependencies["start-server-and-test"];
}

function isWithCypress() {
	if (process.argv.length > 3) {
		for (let i = 3; i < process.argv.length; i++) {
			if (process.argv[i] === "with-cypress") {
				return true;
			}
		}
	}
	return false;
}

async function main() {
	try {
		const projectName = await getProjectName();
		const currentPath = process.cwd();
		const projectPath = path.join(currentPath, projectName);
		const gitRepo = "https://github.com/zivnadel/create-ntmt-app.git";
		const withCypress = isWithCypress();

		fs.mkdirSync(projectPath);

		// cloning files from repo
		console.log("\x1b[32m");
		console.log("🕐 Downloading files...");
		execSync(`git clone --depth 1 ${gitRepo} ${projectPath}`);
		process.chdir(projectPath);

		// removing package.json properties relevant to the npm package and not the boilerplate
		const packageJSON = require("../package.json");
		deleteProperties(packageJSON);

		if (!withCypress) {
			deleteCypressProperties(packageJSON);
			fs.rm(path.join(projectPath, "cypress"), { recursive: true }, (error) => {
				if (error) {
					console.log("\x1b[31m", error, "\x1b[0m");
				}
			});
			fs.rm(
				path.join(projectPath, "cypress.config.ts"),
				{ recursive: true },
				(error) => {
					if (error) {
						console.log("\x1b[31m", error, "\x1b[0m");
					}
				}
			);
		}

		fs.writeFileSync(
			path.join(projectPath, "package.json"),
			JSON.stringify(packageJSON, null, 2),
			(error) => {
				if (error) {
					console.log("\x1b[31m", error, "\x1b[0m");
				}
			}
		);

		console.log("🕑 Installing dependencies...");
		execSync("npm install");

		console.log(
			"🕒 Removing unecessary files and adding configuration...",
			"\x1b[0m"
		);
		execSync("npx rimraf ./.git");

		// adding .env files to .gitignore
		fs.appendFileSync(
			path.join(projectPath, ".gitignore"),
			"\n# local env files\n.env.local\n.env.development.local\n.env.test.local\n.env.production.local"
		);

		// removing "bin" directory
		fs.rm(path.join(projectPath, "bin"), { recursive: true }, (error) => {
			if (error) {
				console.log("\x1b[31m", error, "\x1b[0m");
			}
		});

		console.log("\x1b[34m", "Successfully finished instalation!");
		console.log("\x1b[34m", `cd ${projectName} to get started! ✨`, "\x1b[0m");
	} catch (error) {
		if (error.code === "EEXIST") {
			console.log(
				"\x1b[31m",
				`File name already exists in the current directory, please give it a different name.`,
				"\x1b[0m"
			);
		} else {
			console.log("\x1b[31m", error, "\x1b[0m");
		}
		process.exit(1);
	}
}

main();
