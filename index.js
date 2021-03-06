const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
var mysql = require("mysql");



var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: null,
    database: "employeetracker"
  });



numberArray = []
teamArray = []
deptArray = []


const setupQuestions = [
  {
      type: "list",
      name: "mainMenu",
      message: "What would you like to do?",
      choices: ['Add Department', 'Add Employee Role', 'Add Employee', 'Display Data', 'Exit'],
  },

  ]

const displayData = [
  {
      type: "list",
      name: "dataMenu",
      message: "What would you like to do?",
      choices: ['Display Departments', 'Display Empoloyee Roles', 'Display Employees','Main Menu'],
  },

  ]


const newDepartmentQuestion = [
  {
      type: "input",
      name: "name",
      message: "Enter the new department name:",
  },
  
  ]
 
  

  const newEmployeeRoleQuestion = [
    {
        type: "input",
        name: "title",
        message: "Enter the new employee role title:",
    },
    {
        type: "input",
        name: "salary",
        message: "Enter the new employee role salary:",
    },
    {
        type: "input",
        name: "department_id",
        message: "Enter the new department_id?"
    }
    

    ]
    const employeeQuestion = [
      {
          type: "input",
          name: "firstName",
          message: "Enter the employee's first name:",
      },
      {
          type: "input",
          name: "lastName",
          message: "Enter the employee's last name:",
      },
      {
          type: "input",
          name: "role",
          message: "imput role id?"
      },

      {
        type: "input",
        name: "manager",
        message: "imput manager id?"
    }
    
      
      ]




async function start(){
  console.log('\r\n')
  console.log("****************************************")
  console.log("*********Employee Tracker***************")
  console.log("****************************************")
  const department = await inquirer.prompt(setupQuestions).then(response => {

  
  switch (response.mainMenu) {
    case 'Add Department':
      addDepartment();
      break;
    case 'Add Employee Role':
      addEmployeeRole()
      break;
    case 'Add Employee':
      addEmployee()
      break;
    case 'Display Data':
      getData()
      break;
    case 'Exit':
      process.exit()
      break;
    }

}

)}; 

async function getData(){
  console.log('\r\n')
  console.log("****************************************")
  console.log("*********Display Data*****************")
  console.log("****************************************")
  const department = await inquirer.prompt(displayData).then(response => {

  
  switch (response.dataMenu) {
    case 'Display Departments':
      getDepartment();
      break;
    case 'Display Empoloyee Roles':
      getEmployeeRole()
      break;
    case 'Display Employees':
      getEmployee()
      break;
  }
}

)}; 

async function getDepartment(){
  connection.query("SELECT * FROM department", function (err, result) {
    if (err) throw err;
    console.log("")
    console.log("")
    console.log("********DEPARTMENT LIST***********")
    for(i=0; i < result.length; i++){
      console.log(result[i].name);
    }
    console.log("")
    console.log("")
    start()
});

}

async function getEmployeeRole(){
  
  connection.query("SELECT * FROM employee_role", function (err, result) {
    /* if (err) throw err; */
    console.log(result)
    console.log("********EMPLOYEE ROLES***********")
    for(i=0; i < result.length; i++){
    console.log(result[i].title,result[i].salary);
    }
    start()
});

}


async function getEmployee(){
  
  connection.query("SELECT * FROM employee", function (err, result) {
    if (err) throw err;
    console.log("")
    console.log("")
    console.log("********EMPLOYEE LIST***********")
    for(i=0; i < result.length; i++){
      console.log(result[i].first_name,result[i].last_name,result[i].role_id,result[i].manager_id);
  }
  console.log("")
  console.log("")
  start()
});

}

async function setDepartment(){
 const department = await inquirer.prompt(newDepartmentQuestion).then(response => {

    connection.query("INSERT INTO department SET ?",
    {
      name: response.name,

    }, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
    });
    connection.end();
    start()
      
  }




async function setEmployeeRole(){
  const role = await inquirer.prompt(newEmployeeRoleQuestion).then(response => {
       
        connection.query("INSERT INTO employee_role SET ?",
        {
            title: response.title,
            salary: response.salary,
            department_id: response.department_id,
    
        }, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
        connection.end();
        start()
          
  }
  )}; 


 
async function newEmployee(){
  const nathan = await inquirer.prompt(employeeQuestion).then(response => {
    connection.query("INSERT INTO employee SET ?",
    {
      first_name: response.firstName,
      last_name: response.lastName,
      role_id: response.role,
      manager_id: response.manager,

    }, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
    connection.end();
    start()
      
}
)};  

  async function addDepartment() {
    
      console.log('\r\n')
      console.log("****************************************")
      console.log("***********Enter New Department*********")
      console.log("****************************************")
      await setDepartment();

    }

    async function addEmployeeRole() {
      console.log('\r\n')
      console.log("****************************************")
      console.log("*********Enter New Employee Role********")
      console.log("****************************************")
      await setEmployeeRole();

    }

    async function addEmployee() {
      console.log('\r\n')
      console.log("****************************************")
      console.log("************Enter New Employee**********")
      console.log("****************************************")
      await newEmployee();

    }




  

   connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    // run the start function after the connection is made to prompt the user
    start()
    
  });
   





  