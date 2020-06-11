/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
$(document).ready(function () {
  // Getting references to our form and input
  var signUpForm = $('form.signup');
  var emailInput = $('input#email-input');
  var passwordInput = $('input#password-input');
  var companyName = $('input#inputCompanyName');
  var licenseNum = $('input#inputLicenseNum');
  var phoneNum = $('input#inputPhoneNum');
  var address = $('input#inputAddress');
  var city = $('input#inputCity');
  var state = $('select#inputState');
  var zip = $('input#inputZip');

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on('submit', function (event) {
    event.preventDefault();
    var workerData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      companyName: companyName.val().trim(),
      licenseNum: licenseNum.val().trim(),
      phoneNum: phoneNum.val().trim(),
      address: address.val().trim(),
      city: city.val().trim(),
      state: state.val().trim(),
      zip: zip.val().trim()
    };
    console.log(workerData);

    if (!workerData.email || !workerData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpWorker(workerData.email, workerData.password, workerData.companyName, workerData.licenseNum, workerData.phoneNum, workerData.address, workerData.city, workerData.state, workerData.zip);
    emailInput.val('');
    passwordInput.val('');
    companyName.val('');
    licenseNum.val('');
    phoneNum.val('');
    address.val('');
    city.val('');
    state.val('');
    zip.val('');
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpWorker(email, password, companyName, licenseNum, phoneNum, address, city, state, zip) {
    $.post('/api/signupbusiness', {
      email: email,
      password: password,
      companyName: companyName,
      licenseNum: licenseNum,
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

  function handleLoginErr(err) {
    $('#alert .msg').text(err.responseJSON);
    $('#alert').fadeIn(500);
  }
});