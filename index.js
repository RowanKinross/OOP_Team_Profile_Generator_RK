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

startApplication()
// .then(() => {
//   menubar()
// })

function startApplication() {
// When a user starts the application then they are prompted to enter the team manager’s:
return inquirer
.prompt([
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
.then(menubar())

.then((response) => {
  // When a user selects the engineer option then a user is prompted to enter the following and then the user is taken back to the menu:
  if (response.managerToDo === 'Add an Engineer'){
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
    .then(() => {
      menubar()
    })
    // When a user selects the intern option then a user is prompted to enter the following and then the user is taken back to the menu:
  } else if (response.managerToDo === 'Add an Intern') { 
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
    .then(() => {
      menubar()
    })
  } else { //set up the team
    //generate the html file
  };
})

}


function menubar(){
  inquirer
  .prompt([
    { // When a user enters those requirements then the user is presented with a menu with the option to:
      type: "rawlist",
      name: "managerToDo",
      message: "what would you like to do:",
      choices: ['Add an engineer', 'Add an intern', 'Finish building the team']
    }
  ])
  }





