import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'


let blog
describe('when the component renders',() => {
  let container

  beforeEach(() => {
    blog = {
      title: 'title test',
      author:'author test',
      url: 'url test',
      likes: '5',
      user : {
        name:'name test'
      }
    }
    container  = render(<Blog blog={blog}/>).container
    //screen.debug(container)
  })

  test('shows title and author', () => {

    const element = screen.getByText('title test',{ exact:false })
    expect(element).toBeDefined()
    // const element = container.querySelector('.test')
    // expect(element).toHaveTextContent('5')
  })
  test('does not show url and likes',() => {

    const element = container.querySelector('.togglableContent')
    expect(element).toHaveStyle('display:none')
  })

  test('after clicking the button, url and likes are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.url')
    expect(div).not.toHaveStyle('display:none')
    const span = container.querySelector('.likes')
    expect(span).not.toHaveStyle('display:none')
  })

})
test('if the like button is clicked twice, the event handler the component received as props is called twice', async () => {

  const create = jest.fn()

  render(<Blog blog={blog} updateLikes={create}/>)

  const user = userEvent.setup()

  const view = screen.getByText('view')
  await user.click(view)

  const save = screen.getByText('add')
  await user.click(save)
  await user.click(save)

  expect(create.mock.calls).toHaveLength(2)
})
