$(document).ready(function(){
  var acceptBtn = $('.acceptBtn');
  var jobContainer = $('.jobContainer');
  var jobCategorySelect = $('#category');
  // eslint-disable-next-line no-use-before-define
  jobCategorySelect.on('change', handleCategoryChange);
  var jobs;

  function createNewRow(job) {
    var jobCard = $('<div>');
    jobCard.addClass('card');
    var jobCardHeading = $('<div>');
    jobCardHeading.addClass('card-header');
    var jobTitle = $('<h2');
    var jobCategory = $('<h4>');
    var jobTimeframe = $('<h5>');
    jobTitle.text(job.title);
    jobCategory.text(job.category);
    jobTimeframe.text(job.timeline);
    jobCardHeading.append(jobTitle);
    jobCardHeading.append(jobCategory);
    jobCardHeading.append(jobTimeframe);
    var jobCardBody = $('<div');
    jobCardBody.addClass('card-body');
    var jobBody = $('<p>');
    jobBody.text(job.description);
    jobCardBody.append(jobBody);
    jobCard.append(jobCardHeading);
    jobCard.append(jobCardBody);
    jobCard.data('job', job);
    return jobCard;
  }

  function initializeRows() {
    jobContainer.empty();
    var jobsToAdd = [];
    for (var i = 0; i < jobs.length; i++) {
      jobsToAdd.push(createNewRow(jobs[i]));
    }
    jobContainer.append(jobsToAdd);
  }

  function displayEmpty() {
    jobContainer.empty();
    var noJobMessage = $('<h2');
    noJobMessage.html('No jobs posted for this category');
    jobContainer.append(noJobMessage);
  }

  //get jobs by category.  Referencing api/jobs/chosen category
  function getJobs(category) {
    $.get('/api/jobs/' + category, function(data) {
      jobs = data;
      if (!jobs || !jobs.length) {
        displayEmpty();
      } else {
        initializeRows();
      }
    });
  }

  function handleCategoryChange() {
    var newJobCategory = $(this).val();
    getJobs(newJobCategory);
  }

  //upon clicking accept, change to accepted button that is greyed out
  acceptBtn.on('click', function() {
    console.log('clicked');
    acceptBtn.addClass('disabled');
    acceptBtn.html('Accepted');
  });
});

getJobs();





