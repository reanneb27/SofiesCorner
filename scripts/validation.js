var fname = document.getElementById('fname');
var fnameErrPara = document.getElementById('fname-err')
fname.addEventListener('input', function(e){
    var fnamePattern = /^[a-zA-Z ]+$/;
    var fnameValue = e.target.value;
    var fnameValid = fnamePattern.test(fnameValue);

    if(fnameValid){
        fnameErrPara.style.display = 'none';
    }else{
        fnameErrPara.style.display = 'block';
    }
})

var lname = document.getElementById('lname');
var lnameErrPara = document.getElementById('lname-err')
lname.addEventListener('input', function(l){
    var lnamePattern = /^[a-zA-Z ,.'-]+$/i;
    var lnameValue = l.target.value;
    var lnameValid = lnamePattern.test(lnameValue);

    if(lnameValid){
        lnameErrPara.style.display = 'none';
    }else{
        lnameErrPara.style.display = 'block';
    }
})

var email = document.getElementById('email');
var emailErrPara = document.getElementById('email-err')
email.addEventListener('input', function(l){
    var emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var emailValue = l.target.value;
    var emailValid = emailPattern.test(emailValue);

    if(emailValid){
        emailErrPara.style.color = 'black';
    }else{
        emailErrPara.style.color = 'red';
    }
})

function validatePassword() {
    var p = document.getElementById('password').value,
        errors = [];   
    
        
        var passwordMinErrPara = document.getElementById('passwordMin');
        var passwordLowErrPara = document.getElementById('passwordLow');
        var passwordUpErrPara = document.getElementById('passwordUp');
        var passwordNumErrPara = document.getElementById('passwordNum');    
        
    if (p.length < 6) {
        passwordMinErrPara.style.color = 'red';
         
    }else{
        passwordMinErrPara.style.color = 'black';
    }
    if (p.search(/[a-z]/i) < 0) {
        passwordLowErrPara.style.color = 'red';
        
    }else{
        passwordLowErrPara.style.color = 'black';
    }
    if (p.search(/[A-Z]/i) < 0) {
        passwordUpErrPara.style.color = 'red';
        
    }else{
        passwordUpErrPara.style.color = 'black';
    }
    if (p.search(/[0-9]/) < 0) {
        passwordNumErrPara.style.color = 'red';
         
    }else{
        passwordNumErrPara.style.color = 'black';
    }
    return true;    
}
