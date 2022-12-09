
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const fs = require('fs');
const Employee = require('./lib/Employee');

const employees = []

//inquirer app here to gather information about the team members, and generate the HTML file using fs
// turned into one bug function 

function newEmployee() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'position',
            message: 'What position is this employee?',
            choices: [
                'Manager',
                'Intern',
                'Engineer'
            ]
        },
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of this employee?'
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the email of this employee?'
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the id of this employee?'
        }
        //depending on what they pick is what we will prompt them to do next
    ]).then(({ position, name, email, id }) => {
        switch (position) {


            case 'Manager':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'officeNumber',
                        message: 'What is the office number?'
                    }
                ]).then(({ officeNumber }) => {
                    employees.push(new Manager(
                        name,
                        id,
                        email,
                        officeNumber
                    ))
                    //calling the other function here so that both questions dont get asked at same time
                    anotherEmployee()

                })
                break;


            case 'Intern':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'school',
                        message: 'What school does this employee go to?'
                    }
                ]).then(({ school }) => {
                    employees.push(new Intern(
                        name,
                        id,
                        email,
                        school
                    ))

                    anotherEmployee()
                })
                break;


            case 'Engineer':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'github',
                        message: 'What is the engineers github username?'
                    }
                ]).then(({ github }) => {
                    employees.push(new Engineer(
                        name,
                        id,
                        email,
                        github
                    ))

                    anotherEmployee()
                })
                break;


        }
    })

}

//creating function so that more employees can be added if wish to do so 
function anotherEmployee() {
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'more',
            message: 'Create another employee profile?'
        }
        //if no more employees, render the HTML
    ]).then(({ more }) => {
        if (more) newEmployee()
        else renderHTMLFile()
    })
}
//when the employees get their name, write it in a file
//using map bc we have an array and are trying to get an array

//how to connect bootstrap and style

/* <div class="d-flex justify-content-between">...</div> */


function renderHTMLFile() {
    fs.writeFileSync('./index.html', /*html*/ `
    <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Teams Profile</title>
  <link rel="stylesheet" href="./style.css">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
  
  
</head>

<header style="text-align: center; font-size: 40px; font-weight: bolder; background-color: rgb(94, 166, 199); color: whitesmoke;" > MY TEAMS PROFILE </header>
        <div class="row main" style="text-align: center;" >
            ${employees.map(employee => {
        switch (employee.getRole()) {
            case 'Manager':
                return /*html*/ `
                        <div class="card" style="width: 18rem;" style= "margin: 5px;">
                        <div class="card-header">
                            <h1>${employee.getRole()}<h1>
                        </div>
                            <h3 class="list-group-item">${employee.getName()}<h3>
                            <h3 class="list-group-item">${employee.getId()}<h3>
                            <h3 class="list-group-item">${employee.getEmployeeDetail()}<h3>
                            <h3 class="list-group-item"> <a href="mailto: ${employee.getEmail()}">${employee.getEmail()}</a><h3>
                        </div>
                    `
            case 'Engineer':
                return /*html*/ `
                        <div class="card" style="width: 18rem;">
                        <div class="card-header">
                            <h1>${employee.getRole()}<h1>
                        </div>
                            <h3 class="list-group-item">${employee.getName()}<h3>
                            <h3 class="list-group-item">${employee.getId()}<h3>
                            <h3 class="list-group-item"> <a href="mailto: ${employee.getEmail()}">${employee.getEmail()}</a><h3>
                            <h3 class="list-group-item"><a href="https://github.com/${employee.getGithub()}">${employee.getGithub()}</a><h3>
                        </div>`
            case 'Intern':
                return /*html*/ `
                        <div class="card" style="width: 16rem;">
                         <div class="card-header">
                            <h1>${employee.getRole()}<h1>
                        </div>
                            <h3 class="list-group-item">${employee.getName()}<h3>
                            <h3 class="list-group-item">${employee.getId()}<h3>
                            <h3 class="list-group-item">${employee.getEmployeeDetail()}<h3>
                            <h3 class="list-group-item"> <a href="mailto: ${employee.getEmail()}">${employee.getEmail()}</a><h3>
                        </div>`
        }

    })}
        </div>`)
}






newEmployee();