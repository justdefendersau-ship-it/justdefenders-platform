const Imap = require("imap");

function checkEmail(){

  return new Promise((resolve)=>{

    try{

      const imap = new Imap({
        user: process.env.GMAIL_USER,
        password: process.env.GMAIL_PASS,
        host: "imap.gmail.com",
        port: 993,
        tls: true
      });

      imap.once("ready", function(){

        imap.openBox("INBOX", true, function(err, box){

          if(err){
            resolve({unread:0,status:false});
            return;
          }

          const unread = box.messages.unseen || 0;

          resolve({
            unread,
            status: unread > 0 ? "warn" : true
          });

          imap.end();
        });

      });

      imap.once("error", function(){
        resolve({unread:0,status:false});
      });

      imap.connect();

    }catch(e){
      resolve({unread:0,status:false});
    }

  });

}

module.exports = { checkEmail };