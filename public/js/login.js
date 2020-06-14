/* eslint-disable no-use-before-define */
$(document).ready(function () {
  // Getting references to our form and inputs
  var loginForm = $('form.login');
  var emailInput = $('input#email-input');
  var passwordInput = $('input#password-input');
  var toggleForm = $('#acctType');




  // When the form is submitted, we validate there's an email and password entered
  loginForm.on('submit', function (event) {
    event.preventDefault();
    var loginData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      choice: toggleForm.val().trim()
    };
    console.log(loginData);
    if (!loginData.email || !loginData.password) {
      return;
    }

    if (loginData.choice === 'Contractor') {
      loginWorker(loginData.email, loginData.password);
      emailInput.val('');
      passwordInput.val('');

    } else if (loginData.choice === 'Homeowner') {
      loginUser(loginData.email, loginData.password);
      emailInput.val('');
      passwordInput.val('');
    }
  });


  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post('/api/loginuser', {
      email: email,
      password: password
    })
      .then(function () {
        window.location.replace('/members');
        // If there's an error, log the error
      })
      .catch(function (err) {
        console.log(err);
      });
  }


  function loginWorker(email, password) {
    $.post('/api/loginWorker', {
      email: email,
      password: password
    })
      .then(function () {
        window.location.replace('/contractors');
      // If there's an error, log the error
      })
      .catch(function (err) {
        console.log(err);
      });
  }
});
