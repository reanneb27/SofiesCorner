var changePasswordForm = document.getElementById('changePasswordForm');

var currentPasswordInput = document.getElementById("currentPasswordInput")
var newPasswordInput = document.getElementById("newPasswordInput")
var confirmPasswordInput = document.getElementById("confirmPasswordInput");

var changePasswordBtn = document.getElementById('changePasswordBtn');

function validatePassword(){
    if(newPasswordInput.value != confirmPasswordInput.value) 
        confirmPasswordInput.setCustomValidity("Passwords Don't Match");
    else if (newPasswordInput.value.length < 8) 
        confirmPasswordInput.setCustomValidity('Must be at least 8 characters.');
    else if (!/\d/.test(newPasswordInput.value))
        confirmPasswordInput.setCustomValidity('Must contain at least 1 numeric character.');
    else
        confirmPasswordInput.setCustomValidity('');
}
newPasswordInput.oninput = validatePassword;
confirmPasswordInput.oninput = validatePassword;


changePasswordForm.addEventListener('submit', async e => {
    flashContainer.innerHTML = '';
    e.preventDefault();

    fetch('/account_profile/change_password', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            current_password: currentPasswordInput.value,
            new_password: newPasswordInput.value
        })
    })
    .then(async response => {
        let data = await response.json();

        let flashClass = 'notification is-success py-2';
        if (data.type == 'error')
            flashClass = 'notification is-danger py-2 m-0';
        
        flashContainer.innerHTML = '\
        <div class="' + flashClass + '">\
        <button class="delete" onclick="console.log(this.parentNode.remove())"></button>\
        '+ data.message +'\
        </div>'

        changePasswordForm.reset();
    });
})