$(document).ready(function(){
  var acceptBtn = $('.acceptBtn');

  //query available jobs card based on selection the user makes

  //post bid amount upon clicking bid, then append to pending bids card

  //upon clicking accept, change to accepted button that is greyed out
  acceptBtn.on('click', function() {
    console.log('clicked');
    acceptBtn.addClass('disabled');
    acceptBtn.html('Accepted');
  });

  //edit bid page

  //delete bid, remove bid from database
});


