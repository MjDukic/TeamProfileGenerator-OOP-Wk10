
const Employee = require("./Employee");

//using super to pass on to the employee class
class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email, 'Engineer')
        this.github =  github
    }

    getGithub() {
        return this.github
    }
}

module.exports = Engineer;
