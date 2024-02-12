const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
const Employee = require("./lib/Employee.js");





//function for team manager to sign in
function teamManager(){
  return inquirer
  .prompt ([
    { // Name
      type: "input",
      name: "name",
      message: "Welcome back team manager. Please enter your name:",
    },
    { // Employee ID
      type: "input",
      name: "id",
      message: "Employee ID:"
    },
    { // Email address
      type: "input",
      name: "email",
      message: "Email:"
    },
    { // Office number
      type: "input",
      name: "officeNumber",
      message: "Office Number:"
    }
  ])
}

function engineerQ() {
  return inquirer
  .prompt([
    { // Engineer's Name
    type: "input",
    name: "name",
    message: "Name:"
    },
    { // ID
    type: "input",
    name: "id",
    message: "ID:"
    },
    { // Email  
    type: "input",
    name: "email",
    message: "Email:"
    },
    { // GitHub username
    type: "input",
    name: "github",
    message: "GitHub Username:"
    }
  ])
}

function internQ() {
  return inquirer
  .prompt([
    { // Intern’s name
    type: "input",
    name: "name",
    message: "Name:"
    },
    { // ID
    type: "input",
    name: "id",
    message: "ID:"
    },
    { // Email  
    type: "input",
    name: "email",
    message: "Email:"
    },
    { // School
    type: "input",
    name: "school",
    message: "School:"
    }
  ])
}

function menuBar() {
  return inquirer
  .prompt([
    {
    type: "rawlist",
    name: "menuBarOpt",
    message: "what would you like to do:",
    choices: ['Add an engineer', 'Add an intern', 'Finish building the team'],
    default: 2
    }
  ]).then(answer => {
    switch (answer.menuBarOpt) {
      case 'Add an engineer':
          console.log('Adding an engineer...');
          engineerQ().then(answers => {
              console.log(`Engineer: ${answers.name} was added`);
              menuBar(); // Return to menu after completing engineer input
          });
          break;
      case 'Add an intern':
          console.log('Adding an intern...');
          internQ().then(answers => {
              console.log(`Intern: ${answers.name} was added`);
              menuBar(); // Return to menu after completing intern input
          });
          break;
      case 'Finish building the team':
          console.log('Finishing building the team...');
          // Add finish building the team sequence
            //print to html
            //close inquirer
          break;
  }
  })
}

function startApplication() { // once application open in node
  teamManager().then(() => { // ask for the manager's details
    console.log(`manager login successful`)
    menuBar() // ask what the manager would like to do & proceed with what follows that choice
  }).catch(error => { // log an error if problem with manager logging in
    console.error('Login failed:', error);
  });
}

startApplication()