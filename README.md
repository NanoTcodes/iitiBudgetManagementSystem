
# Project Title
IITI Budget Allocation website


## Description

The "IIT Indore Budget Allocation System" is a web-based solution designed to replace the traditional offline management of budget-related activities at IIT Indore.Admin has rights to user and department management, viewing, editing, and downloading budget data.Admin also has the control over features such as resetting the financial year, adding new users and increasing the allocated budget. F&A Employees can make the expense entries(indents) within the allocated budget, view, and download budget data. Departments have access to view and download their own budget.


## Motivation

The finance department at IIT Indore, currently relying on Excel sheets, seeks a centralized website accessible to Admin, F&A Employees, and individual Departments.This project will reduce the time and efforts of managing budget-related data.
## Tech/Framework used

* [![React](https://www.vectorlogo.zone/logos/reactjs/reactjs-ar21.svg)](https://reactjs.org/)

* [![Node js](https://www.vectorlogo.zone/logos/nodejs/nodejs-ar21.svg)](https://nodejs.org/en)

* [![CSS](https://www.vectorlogo.zone/logos/w3_css/w3_css-ar21.svg)](https://www.w3schools.com/css/css_intro.asp)

* [![Mongodb](https://www.vectorlogo.zone/logos/mongodb/mongodb-ar21.svg)](https://www.mongodb.com/)
## Run Locally

Clone the project

```bash
  git clone https://github.com/hiteshmaurya56/iitiBudgetManagementSystem.git
```

Go to the project directory

```bash
  cd iitiBudgetManagementSystem
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  cd server
  npm start
```

Start the developing server

```bash
  cd client
  npm start
```

Open http://localhost:3000 with your browser to see the result.
## Usage
The "IIT Indore Budget Allocation System" caters to distinct user roles.Upon logging in, users will be directed to their respective dashboards based on their roles.

### Department

* Get an interface ,showing all details regarding allocated budget ,  expence , current balance and indents
* User go through these deatils and have a option to download it.

### F/A Employee

* Get an interface, showing details regarding allocated budget( consumable and equipmental) ,  expence and current balance of every department .
* go to a department to see/modify/add their indent details.
* get a option to download these details.  

### Admin

* Get some additional features over F/A Employee : Reset the year , manage users, allocate budget.   

