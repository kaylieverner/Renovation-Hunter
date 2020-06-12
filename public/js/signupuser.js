/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
$(document).ready(function() {
    // Getting references to our form and input
    var signUpForm = $('form.signup');
    var emailInput = $('input#email-input');
    var passwordInput = $('input#password-input');
    var firstName = $('input#inputFirstName');
    var lastName = $('input#inputLastName');
    var phoneNum = $('input#inputPhoneNum');
    var address = $('input#inputAddress');
    var city = $('input#inputCity');
    var state = $('select#inputState');
    var zip = $('input#inputZip');

    // When the signup button is clicked, we validate the email and password are not blank
    signUpForm.on('submit', function(event) {
      event.preventDefault();
      var userData = {
        email: emailInput.val().trim(),
        password: passwordInput.val().trim(),
        firstName: firstName.val().trim(),
        lastName: lastName.val().trim(),
        phoneNum: phoneNum.val().trim(),
        address: address.val().trim(),
        city: city.val().trim(),
        state: state.val().trim(),
        zip: zip.val().trim()
      };
      console.log(userData);
      if (!userData.email || !userData.password) {
        return;
      }
      // If we have an email and password, run the signUpUser function
      signUpUser(userData.email, userData.password, userData.firstName, userData.lastName,userData.phoneNum,userData.address,userData.city,userData.state,userData.zip);
      emailInput.val('');
      passwordInput.val('');
      firstName.val('');
      lastName.val('');
      phoneNum.val('');
      address.val('');
      city.val('');
      state.val('');
      zip.val('');
    });
    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(email, password, firstName, lastName, phoneNum,address,city,state,zip) {
      $.post('/api/signup', {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        phoneNum: phoneNum,
        address: address,
        city: city,
        state: state,
        zip: zip
      })
        .then(function(data) {
          console.log(data);
          window.location.replace('/members');
        })
        .catch(handleLoginErr);
    }
    function handleLoginErr(err) {
      $('#alert .msg').text(err.responseJSON);
      $('#alert').fadeIn(500);
    }