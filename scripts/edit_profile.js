var editProfileDiv = document.getElementById('editProfileDiv');
var displayProfileDiv = document.getElementById('displayProfileDiv');

var profileFirstNameSpan = document.getElementById('profileFirstNameSpan');
var profileLastNameSpan = document.getElementById('profileLastNameSpan');
var profileEmailSpan = document.getElementById('profileEmailSpan');
var navProfileFirstNameSpan = document.getElementById('nav_profile_first_name');

var profileFirstNameInput = document.getElementById('profileFirstNameInput');
var profileLastNameInput = document.getElementById('profileLastNameInput');
var profileEmailInput = document.getElementById('profileEmailInput');

var editProfileBtn = document.getElementById('editProfileBtn');
var updateProfileBtn = document.getElementById('updateProfileBtn');
var cancelEditProfileBtn = document.getElementById('cancelEditProfileBtn');

var flashContainer = document.getElementById('flash-container');

var editProfileForm = document.getElementById('editProfileForm');
editProfileDiv.style.display = 'none';

editProfileBtn.addEventListener('click', (event) => {
  displayProfileDiv.style.display = 'none';
  editProfileDiv.style.display = 'block';

  profileFirstNameInput.value = profileFirstNameSpan.innerText;
  profileLastNameInput.value = profileLastNameSpan.innerText;
  profileEmailInput.value = profileEmailSpan.innerText;
});

cancelEditProfileBtn.addEventListener('click', event => {
  displayProfileDiv.style.display = 'block';
  editProfileDiv.style.display = 'none';
});

editProfileForm.addEventListener('submit', e => {
  flashContainer.innerHTML = '';
  e.preventDefault();

  fetch('/account_profile/edit_profile', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      first_name: profileFirstNameInput.value,
      last_name: profileLastNameInput.value,
      email: profileEmailInput.value,
    })
  })
  .then(async response => {
    let data = await response.json();
    
    let flashClass = 'notification is-success py-2';
    if (data.type == 'error')
      flashClass = 'notification is-danger py-2 m-0';
    else { // means change data in database is successful, change the fields now and hide and reset form fields
      profileFirstNameSpan.innerHTML = profileFirstNameInput.value;
      navProfileFirstNameSpan.innerHTML = profileFirstNameInput.value;
      profileLastNameSpan.innerHTML = profileLastNameInput.value;
      profileEmailSpan.innerHTML = profileEmailInput.value;

      editProfileForm.reset();

      displayProfileDiv.style.display = 'block';
      editProfileDiv.style.display = 'none';
    }
    
    flashContainer.innerHTML = '\
    <div class="' + flashClass + '">\
    <button class="delete" onclick="console.log(this.parentNode.remove())"></button>\
    '+ data.message +'\
    </div>'
  });
});