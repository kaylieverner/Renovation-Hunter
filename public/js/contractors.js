$(document).ready(function(){
  var acceptBtn = $('.acceptBtn');

  //query available jobs card based on selection the user makes.  - dropdown menu, date search, keyword search.//


  //upon clicking accept, change to accepted button that is greyed out
  acceptBtn.on('click', function() {
    console.log('clicked');
    acceptBtn.addClass('disabled');
    acceptBtn.html('Accepted');
  });


});


