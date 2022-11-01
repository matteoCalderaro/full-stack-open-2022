const _ = require('lodash')
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if(blogs.length === 0) return 0
  return blogs.map(p => p.likes).reduce((p,c)=>p+c,0)
}

const favoriteBlog = (blogs) => {
  if(blogs.length === 0) return 0

  let arrSort = blogs.map(b => b.likes).sort((p,c)=>c-p)
  return blogs.filter(b => b.likes === arrSort[0])[0]
  
  // one other solution
  //return blogs.reduce((prev,curr)=> prev.likes < curr.likes ? curr : prev)
}

const mostBlogs = (blogs) => {
  if(blogs.length === 0) return 0
  const authorCount = _.countBy(blogs, "author");

  let totalBlogs = Object.keys(authorCount).reduce((p, c) => {
    return authorCount[p] > authorCount[c] ? p : c;
  }, 0);

  const author = ({
    author: totalBlogs,
    blogs: authorCount[totalBlogs]
  });
  return author
}

const mostLikes = (blogs) => {
  if(blogs.length === 0) return 0
  const authorSort = _.groupBy(blogs, "author");

  const objMostLikes = Object.values(authorSort)
    .filter((k) => k)
    .map((objs) => ({
      author: objs[0].author,
      likes: _.sumBy(objs, "likes")
    }))
    .reduce((p, c) => {
      return p.likes > c.likes ? p : c;
    }, 0);

  return objMostLikes;
}




module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}