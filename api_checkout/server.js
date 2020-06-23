var express = require('express');
var app= express();
var bodyParser = require('body-parser');
var server = app.listen(3000, listening);
const fetch = require("node-fetch");

function listening(){console.log('server is started ... ');}
app.use(express.static('website'));
app.use(bodyParser());
// create application/json parser
var jsonParser = bodyParser.json()





app.post('/post-payment', jsonParser,(req,res)=> {
  
    data = req.body
    console.log(data)
    
    let strbody = JSON.stringify({
        
            'transaction_amount': parseInt(data.transaction_amount),
            'token': data.token,
            'description': data.description,
            'installments': parseInt(data.installments),
            'payment_method_id':data.payment_method_id,
            'payer': {
              'email': 'test@gmail.com'
            }
          
    })
    console.log(strbody);
    fetch('https://api.mercadopago.com/v1/payments?access_token=TEST-2989627135752680-051314-ab06599f06f721877c640c402e19a5bf-351960109', {
                    method: 'POST',
                    body: strbody,
                    headers:{
                      'X-meli-session-id':data.deviceId
                    }
                    })
                .then((res)=>{
                return res.json();           
                })
                .then((data)=>{
                  console.log(data.status);
                  if (data.status == 'approved'){
                    res.sendFile('/Users/cgascon/Google Drive/Codes/Testing/api_checkout/website/success.html');
                  }else{
                    res.sendFile('/Users/cgascon/Google Drive/Codes/Testing/api_checkout/website/rejected.html');

                  }
                });
   



}

);