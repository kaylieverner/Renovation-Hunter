$(document).ready(function () {
  // Getting references to our form and input
  var signUpBtn = $('#signUpBtn');
  var firstName = $('#inputFirstName');
  var lastName = $('#inputLastName');
  var email = $('#inputEmail');
  var password = $('#inputPassword');
  var phoneNum = $('#inputPhoneNum');
  var address = $('#inputAddress');
  var city = $('#inputCity');
  var state = $('#inputState');
  var zip = $('#inputZip');
  var radioUserBtn = $('#radioUser');
  var radioContractorBtn = $('#radioContractor');
  var companyName = $('#inputCompanyName');
  var licenseNum = $('#inputLicenseNum');
  var contractorForm = $('#contractorForm');
  var userForm = $('#userForm');


  //when contractor account type is selected, show additional questions
  radioUserBtn.click(function() {
    $('#form_sub_containerUser').show();
    $('#form_sub_containerContractor').hide();
  });

  radioContractorBtn.click(function() {
    $('#form_container').find(':hidden').show().next();
    $('#form_sub_containerUser').hide();
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(firstName, lastName, email, password, phoneNum, address, city, state, zip) {
    $.post('/api/signup', {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      phoneNum: phoneNum,
      address: address,
      city: city,
      state: state,
      zip: zip
    })
      .then(function (data) {
        window.location.replace('/members');
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function signUpContractor(firstName, lastName, email, password, phoneNum, address, city, state, zip, companyName, licenseNum) {
    $.post('/api/signup', {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      phoneNum: phoneNum,
      address: address,
      city: city,
      state: state,
      zip: zip,
      companyName: companyName,
      licenseNum: licenseNum
    })
      .then(function (data) {
        window.location.replace('/members');
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  // When the signup button is clicked, we validate the email and password are not blank
  signUpBtn.on('click', function (event) {
    event.preventDefault();
    var userData = {
      firstName: firstName.val().trim(),
      lastName: lastName.val().trim(),
      email: email.val().trim(),
      password: password.val().trim(),
      phoneNum: phoneNum.val().trim(),
      address: address.val().trim(),
      city: city.val().trim(),
      state: state.val().trim(),
      zip: zip.val().trim()
    };

    var contractorData = {
      firstName: firstName.val().trim(),
      lastName: lastName.val().trim(),
      email: email.val().trim(),
      password: password.val().trim(),
      phoneNum: phoneNum.val().trim(),
      address: address.val().trim(),
      city: city.val().trim(),
      state: state.val().trim(),
      zip: zip.val().trim(),
      companyName: companyName.val().trim(),
      licenseNum: licenseNum.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    if (!contractorData.email || !contractorData.password) {
      return;
    }

    if (radioUserBtn.checked) {
      signUpUser(userData.firstName, userData.lastName, userData.email, userData.password, userData.phoneNum, userData.address, userData.city, userData.state, userData.zip);
      firstName.val('');
      lastName.val('');
      email.val('');
      password.val('');
      phoneNum.val('');
      address.val('');
      city.val('');
      state.val('');
      zip.val('');
    } else if (radioContractorBtn.checked) {
      signUpContractor(contractorData.firstName, contractorData.lastName, contractorData.email, contractorData.password, contractorData.phoneNum, contractorData.address, contractorData.city, contractorData.state, contractorData.zip);
      firstName.val('');
      lastName.val('');
      email.val('');
      password.val('');
      phoneNum.val('');
      address.val('');
      city.val('');
      state.val('');
      zip.val('');
      companyName.val('');
      licenseNum.val('');
    }
  });

  function handleLoginErr(err) {
    $('#alert .msg').text(err.responseJSON);
    $('#alert').fadeIn(500);
  }
});
