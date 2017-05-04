var express = require('express');
var router = express.Router();

function MathRand(n) { 
  let c=""; 
  for(let i=0;i<n;i++){ 
    c+=Math.floor(Math.random()*10); 
  }
  return c
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/u', function (req, res) {
  console.log(req.session)
  console.log(req.session.randomcode);
  if(req.body.radnumber != req.session.randomcode){
    console.log('randomcode error');
    res.end({tel:req.body.tel})
  }else{
    console.log('sms start');
    var App = require('alidayu-node');
    var app = new App('23791472', '5be7d069598ca6ca69f10f31cc6731a7');
  
    let num = MathRand(6)
    app.smsSend({
        sms_free_sign_name: '371p物联网',
        sms_param: {number: num},
        rec_num: req.tel,
        sms_template_code: 'SMS_47995098'
    });
    console.log('sms success');
    console.log(req.tel);
    console.log(num);

    res.end({tel:req.body.tel,num:num})
  }

});

var captchapng = require('captchapng');

router.get('/captcha.png', function(req, res) {
  let num = MathRand(4)

  req.session.randomcode = num;
  console.log(req.session)
  req.session.save()

  console.log('randomcode: '+req.session.randomcode)

  let p = new captchapng(80,30,num);
  p.color(0, 0, 0, 0); 
  p.color(80, 80, 80, 255);
  let img = p.getBase64();
  let imgbase64 = new Buffer(img,'base64');
  res.writeHead(200, {
      'Content-Type': 'image/png'
  });
  res.end(imgbase64);
});

module.exports = router;
