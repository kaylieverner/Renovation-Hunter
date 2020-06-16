/* eslint-disable no-use-before-define */
$(document).ready(function(){
  var jobContainer = $('.jobContainer');
  var jobCategorySelect = $('#category');
  var infoContainer = $('.infoContainer');
  var containerHeader = $('#containerHeader');
  $(document).on('click', 'button.info', handleInfo);
  jobCategorySelect.on('change', handleCategoryChange);
  var jobs;
  function getJobs(category) {
    var categoryString = category || '';
    if (categoryString) {
      categoryString = 'category/' + categoryString;
    }
    $.get('/api/jobs/' + categoryString, function(data) {
      jobs = data;
      if (!jobs || !jobs.length) {
        displayEmpty();
      } else {
        initializeRows();
      }
    });
  }
  getJobs();
  function initializeRows() {
    jobContainer.empty();
    var jobsToAdd = [];
    for (var i = 0; i < jobs.length; i++) {
      jobsToAdd.push(createNewRow(jobs[i]));
    }
    jobContainer.append(jobsToAdd);
  }
  function createNewRow(job) {
    var jobCard = $('<div>');
    jobCard.addClass('card');
    var jobCardHeading = $('<div>');
    jobCardHeading.addClass('card-header');
    var infoBtn = $('<button>');
    infoBtn.text('Homeowner Info');
    infoBtn.addClass('info btn btn-danger');
    var jobTitle = $('<h2>');
    var jobCategory = $('<h4>');
    var jobTimeframe = $('<h5>');
    jobTitle.text(job.title);
    jobCategory.text('Category: ' + job.category);
    jobTimeframe.text('Timeframe: ' + job.timeframe);
    jobCardHeading.append(jobTitle);
    jobCardHeading.append(jobCategory);
    jobCardHeading.append(jobTimeframe);
    var jobCardBody = $('<div>');
    jobCardBody.addClass('card-body');
    var jobBody = $('<p>');
    jobBody.text(job.description);
    jobCardBody.append(jobBody);
    jobCardBody.append(infoBtn);
    jobCard.append(jobCardHeading);
    jobCard.append(jobCardBody);
    jobCard.data('job', job);
    return jobCard;
  }
  function handleInfo() {
    var currentJob = $(this)
      .parent()
      .parent()
      .data('job');
    $.ajax({
      method: 'GET',
      url: '/api/users/user/' + currentJob.UserId
    })
      .then(function(data) {
        populateHomeownerData(data);
      });
  }
  function populateHomeownerData(user) {
    jobContainer.empty();
    infoContainer.empty();
    containerHeader.text('Homeowner Information');
    var userCard = $('<div>');
    userCard.addClass('card');
    var userCardHeading = $('<div>');
    userCardHeading.addClass('card-header');
    var userCardBody = $('<div>');
    userCardBody.addClass('card-body');
    var ownerName = $('<h2>');
    ownerName.text(user.firstName + ' ' + user.lastName);
    var ownerEmail = $('<p>');
    ownerEmail.text(user.email);
    var ownerPhoneNumber = $('<p>');
    ownerPhoneNumber.text(user.phoneNumber);
    var ownerAddress = $('<p>');
    ownerAddress.text(user.address);
    var ownerCityStateZip = $('<p>');
    ownerCityStateZip.text(user.city + ', ' + user.state + ' ' + user.zipCode);
    var messageOne = $('<h6>');
    messageOne.text('Contact the homeowner for more information');
    userCardHeading.append(ownerName);
    userCardBody.append(ownerEmail);
    userCardBody.append(ownerPhoneNumber);
    userCardBody.append(ownerAddress);
    userCardBody.append(ownerCityStateZip);
    userCardBody.append(messageOne);
    userCard.append(userCardHeading);
    userCard.append(userCardBody);
    infoContainer.append(userCard);
    userCard.data('user', user);
    return userCard;
  }
  function displayEmpty() {
    jobContainer.empty();
    var noJobMessage = $('<h2>');
    noJobMessage.html('No jobs posted for this category');
    jobContainer.append(noJobMessage);
  }
  function handleCategoryChange() {
    containerHeader.text('Available Jobs');
    infoContainer.empty();
    var newJobCategory = $(this).val();
    getJobs(newJobCategory);
  }
});