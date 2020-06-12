

//when user wants to edit a post, bring up the job post info based on id and route to posteditor HTML
function getPost(id) {
  var queryUrl;
  queryUrl = '/api/posts/' + id;
}
$.get(queryUrl, function (data) {
  if (data) {
    console.log(data.AuthorId || data.id);
    // If this post exists, prefill our cms forms with its data
    title.val(data.title);
    category.val(data.category);
    timeframe.val(data.timeframe);
    jobDescription.val(data.jobDescription);
    authorId = data.AuthorId || data.id;
    // If we have a post with this id, set a flag for us to know to update the post
    // when we hit submit
    updating = true;
  }
});

function updatePost(post) {
  $.ajax({
    method: 'PUT',
    url: '/api/posts',
    data: post
  }).then(function () {
    window.location.href = '/users';
  });
}