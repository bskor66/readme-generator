const inquirer = require("inquirer");
const fs = require("fs").promises;
const path = require("path");

// THEN a high-quality, professional README.md is generated with the  and sections entitled Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions

// WHEN I enter a description, installation instructions, usage information, contribution guidelines, and test instructions
// THEN this information is added to the sections of the README entitled Description, Installation, Usage, Contributing, and Tests
// WHEN I choose a license for my application from a list of options
// THEN a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under
// WHEN I enter my GitHub username
// THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile
// WHEN I enter my email address
// THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions
// WHEN I click on the links in the Table of Contents
// THEN I am taken to the corresponding section of the README

appendAsync = async (path, data) => {
	try {
		await fs.appendFile(path, data, "utf-8");
	} catch (err) {
		throw err;
	}
};

newLine = async (path) => {
	await appendAsync(path, "\n");
};

inquirer
	.prompt([
		{
			name: "title",
			message: "What is the title of your project:",
			type: "input",
		},
		{
			name: "description",
			message: "Describe your project:",
			type: "input",
		},
	])
	.then(async (answers) => {
		const outputName = "README.md";
		const outputDir = path.join(__dirname, "Output", outputName);

		console.log(answers);

		try {
			await fs.writeFile(outputDir, "");
		} catch (err) {
			throw err;
		}

		await appendAsync(outputDir, `# ${answers.title}`);
		await newLine(outputDir);
		await appendAsync(outputDir, `## Description`);
		await newLine(outputDir);
		await appendAsync(outputDir, answer.description);
	});
