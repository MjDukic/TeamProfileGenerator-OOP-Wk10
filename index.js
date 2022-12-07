
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
                break;
            case 'Engineer':
                break;
            default:
            // for an uhoh
        }
    })

}

//creating function so that more employees can be added if wish to do so 
function anotherEmployee() {
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'more',
            message: 'Create another employee?'
        }
        //if no more employees, render the HTML
    ]).then(({ more }) => {
        if (more) newEmployee()
        else renderHTMLFile()
    })
}
//when the employees get their name, write it in a file
//using map bc we have an array and are trying to get an array
function renderHTMLFile() {
    fs.writeFileSync('./index.html', /*html*/ `
        <ul>
            ${employees.map(employee => /*html*/ `
                <li>
                    <div>
                        <h1>${employee.getName()}</h1>
                        <a href="mailto: ${employee.getEmail()}">${employee.getEmail()}<a>
                        <a href="https://github.com/${employee.getGithub()}">${employee.getGithub()}<a>
                    </div>
                </li>
            `)}
        </ul>
    `)
}

newEmployee()