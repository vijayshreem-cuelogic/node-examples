import mongoose from 'mongoose';
import 'dotenv/config'
var url = process.env.DB

const Schema = mongoose.Schema;
const Employee = new Schema({
  name: { 
    type: String,
    validate: {
      validator: (text) =>{
        return /[a-zA-Z]/.test(text);
      },
      message: props => `${props.value} is not a valid Name`
    },
    required: [true, 'Provide your name please!'],
  },
  age: Number,
  address: String,
  email: {
    type: String,
    index: true,
    validate: {
      validator: (text) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(text);
      },
      message: props => `${props.value} is an invalid email`
    },
    required: [true, 'Provide your email please!'],
    unique: true
  },
  password: {
    type: String,
    validate: {
      validator: (text) => {
        return /^[a-zA-Z0-9]{5,10}$/.test(text)
      },
      message: props => `${props.value} must be 5 to 10 characters long, atleast one uppercase, lowercase and digit.`
    },
    required: [true, 'Please provide a valid password.']
  }
})

mongoose.connect(url, { useCreateIndex: true })
const EmployeeModel = mongoose.model('Employee', Employee)

try{

  class User {
    constructor(user){
      this.name = arguments[0]
      this.age = arguments[1]
      this.email = arguments[2]
      this.password  = arguments[3]
      this.userObj = {
        name: this.name,
        age: this.age,
        email: this.email,
        password: this.password
      }
    }

    async insertUser(){
      let employee = await new EmployeeModel(this.userObj)
      employee.save()
      .catch(error => { console.log(`${employee} ---- `+error.toString().replace('ValidationError: ', '').split(',') )})
    }

    static createUser(...user){
      let employee = new User(...user)
      employee.insertUser()
      return employee 
    }
  }
  User.createUser('Test',  24, 'test@gmail.com', 'Test@123')
  User.createUser('Test1', 24 , 'test', 'Test123')
  User.createUser('Test2', 24 , 'test@gmail.com', 'test123')
  User.createUser('validUser', 20, 'valid@test.com', 'test123')
}
catch(e){
  console.log(e)
}