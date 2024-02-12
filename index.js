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

const employeeArr = [];




// validation to check if email input exists and is in the right format:
const emailValidation = (email) => {
  valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
  if (valid) {
      return true;
  } else {
      return 'Please enter a valid email'
  }
}
// validation to check if input exists:
const inputValidation = (input) => {
  if (!input) {
      return 'input cannot be blank.'
  } else {
      return true;
  }
}




//function for team manager to sign in / creating team manager object:
function teamManager(){
  return inquirer
  .prompt ([
    { // Name
      type: "input",
      name: "name",
      message: "Welcome back team manager. Please enter your name:",
      validate: inputValidation
    },
    { // Employee ID
      type: "input",
      name: "id",
      message: "Employee ID:",
      validate: inputValidation 
    },
    { // Email address
      type: "input",
      name: "email",
      message: "Email:",
      validate: emailValidation
    },
    { // Office number
      type: "input",
      name: "officeNumber",
      message: "Office Number:",
      validate: inputValidation
    }
  ])
}



// function for creating an engineer object:
function engineerQ() {
  return inquirer
  .prompt([
    { // Engineer's Name
    type: "input",
    name: "name",
    message: "Name:",
    validate: inputValidation
    },
    { // ID
    type: "input",
    name: "id",
    message: "ID:",
    validate: inputValidation 
    },
    { // Email  
    type: "input",
    name: "email",
    message: "Email:",
    validate: emailValidation
    },
    { // GitHub username
    type: "input",
    name: "github",
    message: "GitHub Username:",
    validate: inputValidation
    }
  ])
}




// function for creating an intern object:
function internQ() {
  return inquirer
  .prompt([
    { // Intern’s name
    type: "input",
    name: "name",
    message: "Name:",
    validate: inputValidation
    },
    { // ID
    type: "input",
    name: "id",
    message: "ID:",
    validate: inputValidation 
    },
    { // Email  
    type: "input",
    name: "email",
    message: "Email:",
    validate: emailValidation
    },
    { // School
    type: "input",
    name: "school",
    message: "School:",
    validate: inputValidation
    }
  ])
}



// function for giving menu options:
function menuBar() {
  return inquirer
  .prompt([
    {
    type: "list",
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
              let newEngineer = new Engineer(answers.name, answers.id, answers.email, answers.github)
              employeeArr.push(newEngineer)
              menuBar(); // Return to menu after completing engineer input
          });
          break;
      case 'Add an intern':
          console.log('Adding an intern...');
          internQ().then(answers => {
              console.log(`Intern: ${answers.name} was added`);
              let newIntern = new Intern(answers.name, answers.id, answers.email, answers.school)
              employeeArr.push(newIntern)
              menuBar(); // Return to menu after completing intern input
          });
          break;
      case 'Finish building the team':
          console.log('Finishing building the team...');
          //print to html
          const data = render(employeeArr)
          fs.writeFileSync(outputPath, data)
          break; //close inquirer
  }
  })
}


// function to start the application:
function startApplication() { // once application is open in node,
  teamManager().then((response) => { // 1. ask for the manager's details
    const teamManager = new Manager(response.name, response.id, response.email, response.officeNumber)
    employeeArr.push(teamManager) // 2. push manager to employee array
    console.log(`manager login successful`)
    menuBar() // 3. Ask what the manager would like to do & proceed with what follows that choice (either create employee cards or complete the team's html page)
  }).catch(error => { // log an error if problem with manager's input
    console.error('Login failed:', error);
  });
}

startApplication()