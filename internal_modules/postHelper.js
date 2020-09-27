console.log("********************************************************************");
console.log("INFO: Importing the internal postHelper module....");

//Application Internal Modules
const lodash = require('lodash');

exports.isPostExist = isPostExist;
exports.getPostByTitle = getPostByTitle;

function isPostExist(postList,postTitle)
{
  console.log("INFO: Checking, whether the postName: "+ postTitle+" \n\tis present in available POSTLIST or not");

  let isExist = false;
  postList.forEach(function(post){
    if(lodash.lowerCase(post.title) === lodash.lowerCase(postTitle))
      isExist = true;
  });
  return isExist;
}

function getPostByTitle(postList,postTitle)
{
  console.log("INFO: Checking, whether the postName: "+ postTitle+" \n\tis present in available POSTLIST or not");

  let existPost;
  postList.forEach(function(post){
    if(lodash.lowerCase(post.title) === lodash.lowerCase(postTitle))
    {
      existPost = post;
    }
  });
  return existPost;
}

console.log("INFO: Imported the postHelper module successfully");
console.log("********************************************************************");
