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

  static dbCollectionObject // error

  static async connect(url){
    var db = await MongoClient.connect(url)
    console.log('DB connected');
    return db
  }

  static async createCollection(db){
    // static variable
    dbCollectionObject = await db.createCollection("User")
    console.log("Collection created!");
  }

  async insertUser(){
    await eval(dbCollectionObject).insertOne(this.userObj)
    console.log("1 document inserted");
  }

  static createUser(dbConnection, name, email){
    var user = new Person(name, email)
    user.insertUser();
    return user
  }
}

try{
  dbConnection = Person.connect(process.env.DB).then(createCollection())
  user = Person.create(dbConnection, 'Test', 'test@gmail.com')  
}
catch(e)
{
  console.log(e)
}


