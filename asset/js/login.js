if(localStorage.getItem('loginToken')){
    alert('you have already login');
    window.location.href = 'index.html'
}

var formSubmitted = false;
String.prototype.hashCode = function() {
    var hash = 0,
      i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr = this.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; 
    }
    return hash;
}
  
  const password = 'Admin@123'; 
  const hashPassword = password.hashCode();
var adminInfo = [{
    user_id:'1', 
    name: "Admin",
    email: "admin@gmail.com",
    password:hashPassword ,
}];
var tokenJson = JSON.stringify(adminInfo);
localStorage.setItem('AdminData', tokenJson);

//

function validateField(fieldName) {
    const username = document.getElementById('username').value ;
    const password = document.getElementById('password').value ;
      
    var fieldValue = document.getElementById(fieldName).value;
    console.log(username);
    var isValid = true;
    if (fieldName === 'username') {
        if (username === '') {
            document.getElementById('usernameError').innerText = "Please enter username.";
            isValid = false;
        } else {
            document.getElementById('usernameError').innerText = "";
        }
    } else if (fieldName === 'password') {
        if (password === '') {
            document.getElementById('passwordError').innerText = "Please enter password.";
            isValid = false;
        } else {
            document.getElementById('passwordError').innerText = "";
        }
    }

    return isValid;
}

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var isValid = true;
    isValid &= validateField('username');
    isValid &= validateField('password');

    if (isValid) {
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        const hashpassword = password.hashCode();
        var existingUsers = JSON.parse(localStorage.getItem('AdminData')) || [];
        for(let i = 0; i < existingUsers.length; i++){
              if (existingUsers[i].email === username && existingUsers[i].password === hashpassword) {
                const uuid = crypto.randomUUID();
                var newToken = {
                    user_id: existingUsers[i].user_id, 
                    token: uuid,
                };
                var tokenJson = JSON.stringify(newToken);
                localStorage.setItem('loginToken', tokenJson);
                  window.location.href = 'index.html';
                  return;
              }
              alert('Invalid email or password. Please try again.');
            }          
    }
    formSubmitted = true;
    return isValid ? true : false;

});
document.getElementById('username').addEventListener('keyup', function() {
    console.log('sdcs');
    if (formSubmitted) {
        validateField('username');
    }
});
document.getElementById('password').addEventListener('keyup', function() {
    if (formSubmitted) {
        validateField('password');
    }
});