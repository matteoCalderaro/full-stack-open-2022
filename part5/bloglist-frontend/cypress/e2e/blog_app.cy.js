
describe('Blogg app',function(){

  beforeEach(function(){
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const newUser = {
      name: 'Matteo',
      username: 'mat',
      password: '123'
    }
    cy.request('POST', 'http://localhost:3003/api/users', newUser)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function(){
    cy.contains('log in to application')
  })

  describe('Login', function(){
    it('succeeds with correct credentials', function(){
      cy.get('#input_username').type('mat')
      cy.get('#input_password').type('123')
      cy.contains('login').click()
  
      cy.contains('Matteo logged')
    })

    it('fails with wrong credentials', function(){
      cy.get('#input_username').type('mat')
      cy.get('#input_password').type('321')
      cy.contains('login').click()
  
      cy.get('html').should('not.contain', 'Matteo logged')
      cy.get('#error_message').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When a user is logged in', function(){
    beforeEach(function(){
      cy.login({username:'mat', password:'123'})
    })

    it('A blog can be created',function(){
      cy.create(({title:'title_fake',url:'url_fake',author:'author_fake'}))
    })

    describe('When a blog already exist',function(){
      beforeEach(function(){
        cy.create(({title:'title_fake',url:'url_fake',author:'author_fake'}))
      })

      it('A blog can be liked',function(){
        cy.get('#view_button_blog').click()
        cy.contains('add').click()
        cy.get('.likes').should('contain','1')
      })

      it('A blog can be removed',function(){
        cy.get('#view_button_blog').click()
        cy.contains('add').click()
        cy.contains('remove').click()
        cy.get('#error_message').should('contain','blog removed')
      })

      it('Only the creator can remove a blog',function(){
        const newUser = {
          name: 'Michele',
          username: 'mik',
          password: '456'
        }
        cy.request('POST', 'http://localhost:3003/api/users', newUser)
        cy.login({username:'mik', password:'456'})
      
        cy.get('#view_button_blog').click()
        cy.contains('add').click()
        cy.contains('remove').click()
        cy.get('#error_message').should('contain','you cannot delete this blog')
      })
    })
    
    describe('When there are more than one blog',function(){
      beforeEach(function(){
        cy.create(({title:'title with the third most likes',url:'url_fake',author:'author_fake',likes: 1}))
        cy.create(({title:'title with the second most likes',url:'url_fake',author:'author_fake',likes: 2}))
        cy.create(({title:'title with the most likes',url:'url_fake',author:'author_fake',likes: 3}))
      })

      it('The blogs are ordered according to the nuber of likes',function(){
        cy.get('.blog').eq(0).should('contain', 'title with the most likes')
        cy.get('.blog').eq(1).should('contain', 'title with the second most likes')
      })
    })
    
  })

})