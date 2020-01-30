import mongoose from 'mongoose';
import 'dotenv/config'
var url = process.env.DB

mongoose.connect(url, { useNewUrlParser: true });
const User = mongoose.model('User', { name: String, age: Number, email: String, password: String})
const user = new User({name: 'Test', age: 20, email: 'test@gmail.com', password: 'test@123'})
user.save().then(()=> console.log('1 user created'))

