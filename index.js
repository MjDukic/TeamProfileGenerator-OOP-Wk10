
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
                'Engineer',
                'Employee'
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


            default:
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'role',
                    message: 'What is this employees role?'
                }
            ]).then(({ role }) => {
                employees.push(new Employee(
                    name,
                    id,
                    email,
                    role
                ))

                anotherEmployee()
            })
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


//how do i get it to show on html for the specific subclass without bug
//how to connect bootstrap and style

function renderHTMLFile() {
    fs.writeFileSync('./index.html', /*html*/ `
        <ul>
            ${employees.map(employee => /*html*/ `
                <li>
                    <div>
                        <h1>${employee.getRole()}<h1>
                        <h2>${employee.getName()}</h2>
                        <a href="mailto: ${employee.getEmail()}">${employee.getEmail()}<a>
                        <p>${employee.getId()}<p>
                        <a href="https://github.com/${employee.getGithub()}">${employee.getGithub()}<a>


                    </div>
                </li>
            `)}
        </ul>

    `)
}



newEmployee();