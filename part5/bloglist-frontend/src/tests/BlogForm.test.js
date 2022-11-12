import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from '../components/BlogForm'

test('<BlogForm/> the form calls the event handler it received as props with the right details when a new blog is created', async () => {
  const create = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<BlogForm create={create} />)
  //screen.debug(container)
  //Alternative
  //const input = screen.getByPlaceholderText('write title here',{exact:false})
  const input = container.querySelector('#test')

  const newBlogButton = screen.getByText('newBlog')

  await user.type(input, 'testing a form...')
  await user.click(newBlogButton)

  expect(create.mock.calls).toHaveLength(1)
  expect(create.mock.calls[0][0].title).toBe('testing a form...')
})