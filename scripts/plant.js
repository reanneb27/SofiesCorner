function getCookie(name){
  var pattern = RegExp(name + "=.[^;]*")
  var matched = document.cookie.match(pattern)
  if(matched){
      var cookie = matched[0].split('=')
      return cookie[1]
  }
  return '';
}

// price radio buttons
const priceRadioBtns = document.querySelectorAll('input[type=radio]');
priceRadioBtns.forEach(radio => {
  let radioVal = getCookie('price');
  if (radio.value == radioVal){
    radio.checked = true;
  }

  radio.addEventListener('click', e => {
    document.cookie = 'price=' + radio.value;
  });
})


// category checkboxes
const categoryCheckboxes = document.querySelectorAll('input[type=checkbox]');

// check first if there is an existing cookie, if not create default value
let checkboxVal = getCookie('categories');

categoryCheckboxes.forEach(checkbox => {
  let checkboxVal = getCookie('categories');
  if (checkboxVal){
    checkboxVal = JSON.parse(checkboxVal);
    // check first if value exists in cookie
    if (checkbox.value in checkboxVal){
      if (checkboxVal[checkbox.value]){
        checkbox.checked = true;
      }
    } else {
      checkboxVal[checkbox.value] = checkbox.checked;
      document.cookie = 'categories=' + JSON.stringify(checkboxVal);
    }
  }
  else {
    checkboxVal = {};
    checkboxVal[checkbox.value] = checkbox.checked;
    document.cookie = 'categories=' + JSON.stringify(checkboxVal);
  }

  checkbox.addEventListener('click', e => {
    let currCategories = JSON.parse(getCookie('categories'));
    currCategories[checkbox.value] = !currCategories[checkbox.value];
    document.cookie = 'categories=' + JSON.stringify(currCategories);
  })
})



// main sort dropdown
const sortDropdown = document.getElementById('sortDropdown');
sortDropdown.addEventListener('click', e => {
  sortDropdown.classList.toggle('is-active');
});

// Get all sort options on the page
const sortOptions = document.querySelectorAll('#dropdown-menu .dropdown-content a');
var currentSortOption;
var cookieSortOption = getCookie('sortOption');
sortOptions.forEach(sortOption => {
  if (sortOption.classList.contains('is-active')){
    currentSortOption = sortOption;
    if (!cookieSortOption){
      cookieSortOption = sortOption.innerText.trim();
      console.log(cookieSortOption);
      document.cookie = 'sortOption=' + cookieSortOption;
    }
  }
  
  sortOption.addEventListener('click', e => {
    if (!sortOption.classList.contains('is-active')){
      currentSortOption.classList.remove('is-active');
      sortOption.classList.add('is-active');
      currentSortOption = sortOption;
      
      document.cookie = 'sortOption=' + sortOption.innerText;

      window.location.reload();
    }
  })
});

if (currentSortOption.innerText.trim() != cookieSortOption){
  sortOptions.forEach(sortOption => {
    if (sortOption.innerText.trim() == cookieSortOption){
      currentSortOption.classList.remove('is-active');
      sortOption.classList.add('is-active');
      currentSortOption = sortOption;

      document.cookie = 'sortOption=' + sortOption.innerText.trim();
    }
  })
  
}



