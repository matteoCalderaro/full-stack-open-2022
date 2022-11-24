const listHelper = require('../utils/list_helper')
const {zeroBlogs, oneBlog, manyBlogs} = require('./list_test_helper')


test('test dummy return 1',() => {
  const result = listHelper.dummy(zeroBlogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('when list does not have any blog, retrun zero', () => {
    expect(listHelper.totalLikes(zeroBlogs)).toBe(0)
  })

  test('when list has only a blog, return the likes of that', () => {
    expect(listHelper.totalLikes(oneBlog)).toBe(5)
  })

  test('when list has many blogs, return the sum of likes of all blogs', () => {
    expect(listHelper.totalLikes(manyBlogs)).toBe(36)
  })

})

describe('blog with most likes', () => {

  test('when list does not have any blog, return zero', ()=> {
    expect(listHelper.favoriteBlog(zeroBlogs)).toBe(0)
  })

  test('when list has only a blog, return the blog itself', ()=> {
    expect(listHelper.favoriteBlog(oneBlog)).toEqual({
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    })
  })

  test('when list has many blogs, return the blog with most likes', ()=> {
    expect(listHelper.favoriteBlog(manyBlogs)).toEqual({
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    })
  })

})

describe('author who has the largest amount of blogs', () =>{

  test('when list does not have any blog, retrun zero', () => {
    expect(listHelper.mostBlogs(zeroBlogs)).toBe(0)
  })

  test('when list has only a blog, return the author', () => {
    expect(listHelper.mostBlogs(oneBlog)).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1
    })
  })

  test('when list has many blogs, return the the author with most blogs', () => {
    expect(listHelper.mostBlogs(manyBlogs)).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })
  })

})

describe('author who has the largest amount of likes', () =>{

  test('when list does not have any blog, retrun zero', () => {
    expect(listHelper.mostLikes(zeroBlogs)).toBe(0)
  })

  test('when list has only a blog, return the author', () => {
    expect(listHelper.mostLikes(oneBlog)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })

  test('when list has many blogs, return the author with most likes (among all blogs)', () => {
    expect(listHelper.mostLikes(manyBlogs)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })

})