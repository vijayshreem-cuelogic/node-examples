import http from 'http'
import 'dotenv/config'

class AppServer{
  constructor(sysPort){
    this._port = sysPort
  }
  call(){
    http.createServer((req, res) => {
      res.write(`Node Server running on PORT ${this._port}`);
      res.end();
    }).listen(process.env.PORT)
  }

  logMessage(){
    console.log(`Node Server running on PORT ${this._port}`)
  }
}


  (async()=>{
    try{
      var initServer = new AppServer(process.env.PORT)
      await initServer.call()
      initServer.logMessage();
    }
    catch(e){
      console.log(`Server error ${e}`)
    }
  })();