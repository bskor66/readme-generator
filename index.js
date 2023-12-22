const inquirer = require("inquirer");
const fs = require("fs").promises;
const path = require("path");

// THEN a high-quality, professional README.md is generated with the  and sections entitled Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions

// WHEN I enter my GitHub username
// THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile
// WHEN I enter my email address
// THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions
// WHEN I click on the links in the Table of Contents
// THEN I am taken to the corresponding section of the README

appendAsync = async (path, data) => {
	try {
		await fs.appendFile(path, `\n${data}`, "utf-8");
	} catch (err) {
		throw err;
	}
};

newLine = async (path) => {
	try {
		await appendAsync(path, "");
	} catch (err) {
		throw err;
	}
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
		{
			name: "installation",
			message: "Provide installation instructions:",
			type: "input",
		},
		{
			name: "usage",
			message: "Explain the usage of your project:",
			type: "input",
		},
		{
			name: "license",
			message: "Select a license:",
			type: "list",
			choices: [
				{
					name: "MIT",
					value: {
						badge:
							"[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)",
						desc: "This project is licensed under the MIT License. The MIT License is a permissive free software license originating at the Massachusetts Institute of Technology (MIT). It's one of the most popular open-source licenses and is short and to the point. It allows users considerable freedom with the software including the right to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software. The only requirement is that the license notice and copyright notice must be included with all copies or substantial portions of the software, providing a minimal constraint on how the software can be used. This encourages open development and sharing, as it imposes very few restrictions on how the software can be utilized.",
					},
				},
				{
					name: "Mozilla",
					value: {
						badge:
							"[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)",
						desc: "This project is licensed under the 'Mozilla Public License 2.0' (MPL 2.0), a free and open-source license created by the Mozilla Foundation. It is a hybrid of the permissive BSD-style licenses and the copyleft GNU General Public License (GPL). The MPL 2.0 allows the source code to be used, modified, and distributed in both open and proprietary projects. However, it requires that modifications to the licensed code be made available under the same license. Unique to the MPL is the concept of 'file-level' copyleft, where only modifications to MPL-licensed files, rather than the entire project, must be released under the MPL. This license provides a balance between sharing improvements and allowing flexibility in incorporating the code into various types of projects.",
					},
				},
				{
					name: "Apache 2.0",
					value: {
						badge:
							"[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0",
						desc: "This project is licensed under the 'Apache License 2.0', a free, open-source license issued by the Apache Software Foundation. The Apache License 2.0 is known for its permissive nature, allowing users considerable freedom with the software. Users are permitted to use, modify, distribute, and even sublicense the code, making it a popular choice for both individual developers and organizations. One key feature of the Apache License is its grant of a patent license from contributors to users, protecting them from patent litigation. It also has requirements for modified versions of the licensed software to be documented and includes provisions to handle legal aspects such as trademark use. This makes the Apache License 2.0 a good balance between open development and protecting the interests of both the creators and the users of the software.",
					},
				},
				{
					name: "Eclipse Public",
					value: {
						badge:
							"[![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0)",
						desc: "This project is licensed under the 'Eclipse Public License 1.0' (EPL-1.0), an open-source license maintained by the Eclipse Foundation. The EPL is designed to be a commercially friendly copyleft license that provides the ability to freely use, modify, and distribute the software. A key feature of the EPL is that it allows the distribution of derivative works under different licenses, as long as the original code remains under the EPL. This is often referred to as 'weak copyleft.' The EPL requires that any modifications made to the original code be made available under the same license, ensuring that the community can benefit from improvements. Additionally, the EPL is compatible with various other licenses, including the GNU General Public License (GPL), allowing for greater flexibility and integration with other open-source projects. The EPL aims to balance the interests of both the open-source community and commercial adopters, making it a popular choice for many projects.",
					},
				},
			],
		},
		{
			name: "contributing",
			message: "Please list Contributors:",
			type: "input",
		},
		{
			name: "tests",
			message: "Explain testing instructions:",
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
		await appendAsync(outputDir, "## Description");
		await appendAsync(outputDir, answers.description);
		await newLine(outputDir);
		await appendAsync(outputDir, "## Table of Contents");
		await newLine(outputDir);
		await appendAsync(outputDir, "##  Installation");
		await appendAsync(outputDir, answers.installation);
		await newLine(outputDir);
		await appendAsync(outputDir, "## Usage");
		await appendAsync(outputDir, answers.usage);
		await newLine(outputDir);
		await appendAsync(outputDir, "## Contributing");
		await appendAsync(outputDir, answers.contributing);
		await newLine(outputDir);
		await appendAsync(outputDir, "## Tests");
		await appendAsync(outputDir, answers.tests);
	});
