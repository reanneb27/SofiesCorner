const deliveryAddressContainer = document.getElementById('deliveryAddressContainer');
const deliveryAddressDynamicContainer = document.getElementById('deliveryAddressDynamicContainer');
const billingAddressContainer = document.getElementById('billingAddressContainer');
const billingAddressDynamicContainer = document.getElementById('billingAddressDynamicContainer');

// delivery address spans
var DA_full_name_span = document.getElementById('DA_full_name_span'); // results to null when no id found
var DA_houseNo_Street_Building_span = document.getElementById('DA_houseNo_Street_Building_span');
var DA_brgy_province_region_span = document.getElementById('DA_brgy_province_region_span');
var DA_zipcode_span = document.getElementById('DA_zipcode_span');
var DA_phoneNo_span = document.getElementById('DA_phoneNo_span');

// billing address spans
var BA_full_name_span = document.getElementById('BA_full_name_span');
var BA_houseNo_Street_Building_span = document.getElementById('BA_houseNo_Street_Building_span');
var BA_brgy_province_region_span = document.getElementById('BA_brgy_province_region_span');
var BA_zipcode_span = document.getElementById('BA_zipcode_span');
var BA_phoneNo_span = document.getElementById('BA_phoneNo_span');


// form
const addressFormContainer = document.getElementById('addressFormContainer');
addressFormContainer.style.display = 'none';
const addressFormContainerHeader = document.getElementById('addressFormContainerHeader');
const addressForm = document.getElementById('addressForm');
const copyDeliveryAddressBtnContainer = document.getElementById('copyDeliveryAddressBtnContainer');

// form fields
const full_name_input = document.getElementById('full_name_input')
const houseNo_Street_Building_input = document.getElementById('houseNo_Street_Building_input')
const brgy_province_region_input = document.getElementById('brgy_province_region_input')
const zipcode_input = document.getElementById('zipcode_input')
const phoneNo_input = document.getElementById('phoneNo_input')


addressForm.addEventListener('submit', async e => {
    flashContainer.innerHTML = '';
    e.preventDefault();
});

function updateAddress() {
    if (addressForm.checkValidity()){
        fetch('/account_profile/edit_address', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                address_type: addressFormContainerHeader.innerText,
                full_name: full_name_input.value,
                houseNo_Street_Building: houseNo_Street_Building_input.value,
                brgy_province_region: brgy_province_region_input.value,
                zipcode: zipcode_input.value,
                phoneNo: phoneNo_input.value
            })
        })
            .then(async response => {
                let data = await response.json();
    
                if (data.address_type == 'Delivery Address') {
                    deliveryAddressDynamicContainer.innerHTML = '<p>Full Name: <span id="DA_full_name_span"></span></p>\
                                                                <p>House No., Street Name, Building: <span id="DA_houseNo_Street_Building_span"></span></p>\
                                                                <p>Barangay, Province, Region: <span id="DA_brgy_province_region_span"></span></p>\
                                                                <p>Zip Code: <span id="DA_zipcode_span"></span></p>\
                                                                <p>Phone Number: <span id="DA_phoneNo_span"></span></p>\
                                                                <br>\
                                                                <div class="columns">\
                                                                    <div class="column">\
                                                                        <button onclick="editAddress(\'Delivery Address\')" class="button is-responsive is-block is-fullwidth is-link">\
                                                                            <span class="icon is-left">\
                                                                                <i class="fa-solid fa-edit"></i>\
                                                                            </span>\
                                                                            <span>Edit</span>\
                                                                        </button>\
                                                                    </div>\
                                                                    <div class="column">\
                                                                        <button onclick="deleteAddress(\'Delivery Address\')" class="button is-responsive is-block is-fullwidth is-danger">\
                                                                            <span class="icon is-left">\
                                                                                <i class="fa-solid fa-trash"></i>\
                                                                            </span>\
                                                                            <span>Delete</span>\
                                                                        </button>\
                                                                    </div>\
                                                                </div>';
                    
                    // reset delivery address spans
                    DA_full_name_span = document.getElementById('DA_full_name_span'); // results to null when no id found
                    DA_houseNo_Street_Building_span = document.getElementById('DA_houseNo_Street_Building_span');
                    DA_brgy_province_region_span = document.getElementById('DA_brgy_province_region_span');
                    DA_zipcode_span = document.getElementById('DA_zipcode_span');
                    DA_phoneNo_span = document.getElementById('DA_phoneNo_span');
    
                    // set the spans
                    DA_full_name_span.innerText = data.full_name;
                    DA_houseNo_Street_Building_span.innerText = data.houseNo_Street_Building;
                    DA_brgy_province_region_span.innerText = data.brgy_province_region;
                    DA_zipcode_span.innerText = data.zipcode;
                    DA_phoneNo_span.innerText = data.phoneNo;

                    flashContainer.innerHTML = '\
                    <div class="notification is-success py-2">\
                    <button class="delete" onclick="console.log(this.parentNode.remove())"></button>\
                    '+ "Successfully Set Delivery Address" +'\
                    </div>'
                }
                else if (data.address_type == 'Billing Address'){
                    billingAddressDynamicContainer.innerHTML = '<p>Full Name: <span id="BA_full_name_span"></span></p>\
                                                                <p>House No., Street Name, Building: <span id="BA_houseNo_Street_Building_span"></span></p>\
                                                                <p>Barangay, Province, Region: <span id="BA_brgy_province_region_span"></span></p>\
                                                                <p>Zip Code: <span id="BA_zipcode_span"></span></p>\
                                                                <p>Phone Number: <span id="BA_phoneNo_span"></span></p>\
                                                                <br>\
                                                                <div class="columns">\
                                                                    <div class="column">\
                                                                        <button onclick="editAddress(\'Billing Address\')" class="button is-responsive is-block is-fullwidth is-link">\
                                                                            <span class="icon is-left">\
                                                                                <i class="fa-solid fa-edit"></i>\
                                                                            </span>\
                                                                            <span>Edit</span>\
                                                                        </button>\
                                                                    </div>\
                                                                    <div class="column">\
                                                                        <button onclick="deleteAddress(\'Billing Address\')" class="button is-responsive is-block is-fullwidth is-danger">\
                                                                            <span class="icon is-left">\
                                                                                <i class="fa-solid fa-trash"></i>\
                                                                            </span>\
                                                                            <span>Delete</span>\
                                                                        </button>\
                                                                    </div>\
                                                                </div>';
                    
                    // reset billing address spans
                    BA_full_name_span = document.getElementById('BA_full_name_span');
                    BA_houseNo_Street_Building_span = document.getElementById('BA_houseNo_Street_Building_span');
                    BA_brgy_province_region_span = document.getElementById('BA_brgy_province_region_span');
                    BA_zipcode_span = document.getElementById('BA_zipcode_span');
                    BA_phoneNo_span = document.getElementById('BA_phoneNo_span');
    
                    // set the spans
                    BA_full_name_span.innerText = data.full_name;
                    BA_houseNo_Street_Building_span.innerText = data.houseNo_Street_Building;
                    BA_brgy_province_region_span.innerText = data.brgy_province_region;
                    BA_zipcode_span.innerText = data.zipcode;
                    BA_phoneNo_span.innerText = data.phoneNo;

                    flashContainer.innerHTML = '\
                    <div class="notification is-success py-2">\
                    <button class="delete" onclick="console.log(this.parentNode.remove())"></button>\
                    '+ "Successfully Set Billing Address" +'\
                    </div>'
                }
    
                addressForm.reset();
                cancelAddressUpdate();
            });
    }
    
}

function cancelAddressUpdate() {
    deliveryAddressContainer.style.display = 'block';
    billingAddressContainer.style.display = 'block';

    addressFormContainer.style.display = 'none';
}

function copyDeliveryAddress(){
    if (DA_full_name_span){
        full_name_input.value = DA_full_name_span.innerText;
        houseNo_Street_Building_input.value = DA_houseNo_Street_Building_span.innerText;
        brgy_province_region_input.value = DA_brgy_province_region_span.innerText;
        zipcode_input.value = DA_zipcode_span.innerText;
        phoneNo_input.value = DA_phoneNo_span.innerText;
    }
}

function editAddress(addressType) {
    if (addressType == 'Delivery Address') {
        deliveryAddressContainer.style.display = 'none';
        billingAddressContainer.style.display = 'none';
        copyDeliveryAddressBtnContainer.style.display = 'none';

        addressFormContainerHeader.innerText = addressType;
        addressFormContainer.style.display = 'block';

        // add old address data if editing
        if (DA_full_name_span){
            full_name_input.value = DA_full_name_span.innerText;
            houseNo_Street_Building_input.value = DA_houseNo_Street_Building_span.innerText;
            brgy_province_region_input.value = DA_brgy_province_region_span.innerText;
            zipcode_input.value = DA_zipcode_span.innerText;
            phoneNo_input.value = DA_phoneNo_span.innerText;
        }
    }
    else if (addressType == 'Billing Address'){
        deliveryAddressContainer.style.display = 'none';
        billingAddressContainer.style.display = 'none';
        copyDeliveryAddressBtnContainer.style.display = 'block';

        addressFormContainerHeader.innerText = addressType;
        addressFormContainer.style.display = 'block';

        // add old address data if editing
        if (BA_full_name_span){
            full_name_input.value = BA_full_name_span.innerText;
            houseNo_Street_Building_input.value = BA_houseNo_Street_Building_span.innerText;
            brgy_province_region_input.value = BA_brgy_province_region_span.innerText;
            zipcode_input.value = BA_zipcode_span.innerText;
            phoneNo_input.value = BA_phoneNo_span.innerText;
        }
    }
}


function deleteAddress(editAddress){
    fetch('/account_profile/delete_address', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            address_type: editAddress
        })
    })
        .then(async response => {
            let data = await response.json();

            if (data.address_type == 'Delivery Address'){
                deliveryAddressDynamicContainer.innerHTML = '<button onclick="editAddress(\'Delivery Address\')" class="button is-block is-fullwidth is-link">\
                                                                <span class="icon is-left">\
                                                                    <i class="fa-solid fa-plus"></i>\
                                                                </span>\
                                                                <span>Add new delivery address</span>\
                                                            </button>';

                // reset delivery address spans
                DA_full_name_span = document.getElementById('DA_full_name_span'); // results to null when no id found
                DA_houseNo_Street_Building_span = document.getElementById('DA_houseNo_Street_Building_span');
                DA_brgy_province_region_span = document.getElementById('DA_brgy_province_region_span');
                DA_zipcode_span = document.getElementById('DA_zipcode_span');
                DA_phoneNo_span = document.getElementById('DA_phoneNo_span');

                flashContainer.innerHTML = '\
                    <div class="notification is-success py-2">\
                    <button class="delete" onclick="console.log(this.parentNode.remove())"></button>\
                    '+ "Successfully Deleted Delivery Address" +'\
                    </div>'
            }
            else if (data.address_type == 'Billing Address'){
                billingAddressDynamicContainer.innerHTML = '<button onclick="editAddress(\'Billing Address\')" class="button is-block is-fullwidth is-link">\
                                                                <span class="icon is-left">\
                                                                    <i class="fa-solid fa-plus"></i>\
                                                                </span>\
                                                                <span>Add new billing address</span>\
                                                            </button>';

                // reset billing address spans
                BA_full_name_span = document.getElementById('BA_full_name_span');
                BA_houseNo_Street_Building_span = document.getElementById('BA_houseNo_Street_Building_span');
                BA_brgy_province_region_span = document.getElementById('BA_brgy_province_region_span');
                BA_zipcode_span = document.getElementById('BA_zipcode_span');
                BA_phoneNo_span = document.getElementById('BA_phoneNo_span');

                flashContainer.innerHTML = '\
                    <div class="notification is-success py-2">\
                    <button class="delete" onclick="console.log(this.parentNode.remove())"></button>\
                    '+ "Successfully Deleted Billing Address" +'\
                    </div>'
            }

        });
}