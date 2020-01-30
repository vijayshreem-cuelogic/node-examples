import MongoClient from 'mongodb'
import 'dotenv/config'
var url = process.env.DB

class Person{
  constructor(db, name, email){
    this._db = db;
    this._name = name;
    this._email = email;
    this.userObj = {
      name: this._name,
      email: this._email
    }
  }

  static async connect(url){
    var db = await MongoClient.connect(url)
    console.log('DB connected');
    return db
  }

  static async createUserCollection(dbConnection){
    // static variable
    dbCollection = await eval(dbConnection).createCollection("User")
    console.log("Collection created!");
    return dbCollection
  }

  async insertUser(){
    await eval(dbCollectionObject).insertOne(this.userObj)
    console.log("1 document inserted");
  }

  static createUser(name, email){
    var user = new Person(name, email)
    user.insertUser();
    return user
  }
}

try{
  var dbConnection = Person.connect(url)
  Person.dbCollectionObject = Person.createUserCollection(dbConnection)
  var user = Person.createUser('Test', 'test@gmail.com')  
  console.log('User Created'.concat(user))
}
catch(e)
{
  console.log(e)
}


