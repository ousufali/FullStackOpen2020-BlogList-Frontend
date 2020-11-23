import React, { useState } from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog /> rendering', () => {
    let component
    const testBlog = {
        title: 'test title',
        author: 'test author',
        likes: 100,
        url: 'a.com',
        user: { id: 111 }
    }
    const user = jest.fn()
    const blogs = jest.fn()
    const setBlog = jest.fn()
    beforeEach(() => {
        component = render(<Blog blog={testBlog} blogs={blogs} setBlog={setBlog} user={user} />)
    })

    test('render blog title and author', () => {
        const button = component.getByText('view')
        fireEvent.click(button)
        const div = component.container.querySelector('.author')
        expect(div).toHaveTextContent('test author')
        const div1 = component.container.querySelector('.title')
        expect(div1).toHaveTextContent('test title')
    })


    test('blogs url and likes shown after view button click', () => {
        const button = component.getByText('view')
        fireEvent.click(button)
        const div = component.container.querySelector('.likes')
        expect(div).toHaveTextContent('likes 100')
        const div1 = component.container.querySelector('.url')
        expect(div1).toHaveTextContent('a.com')
    })
    test('like button clicked twice', () => {
        const button = component.getByText('view')
        fireEvent.click(button)
        const button1 = component.getByText('like')
        fireEvent.click(button1)
        fireEvent.click(button1)
        const div = component.container.querySelector('.likes')
        expect(div).toHaveTextContent('likes 102')
        
    })





})
