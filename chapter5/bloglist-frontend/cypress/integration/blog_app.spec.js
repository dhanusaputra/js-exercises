describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'admin',
      username: 'admin',
      password: 'admin',
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    const user2 = {
      name: 'admin2',
      username: 'admin2',
      password: 'admin2',
    }
    cy.request('POST', 'http://localhost:3001/api/users', user2)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function() {
    cy.contains('login')
  })

  describe('login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('admin')
      cy.get('#password').type('admin')
      cy.get('#login-button').click()

      cy.contains('admin logged in')
    })
    it('fails with wrong credentials', function() {
      cy.get('#username').type('admin')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'admin', password: 'admin' })
    })
    it('a blog can be created', function() {
      cy.get('#create-new-blog-button').click()
      cy.get('#title').type('title')
      cy.get('#author').type('author')
      cy.get('#url').type('url')
      cy.get('#create-button').click()

      cy.get('.info')
        .should('contain', 'a new blog')
      cy.get('.blogs')
        .should('contain', 'title author')
    })

    describe('and blogs exists', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'title1', author: 'author1', url: 'url1' })
        cy.createBlog({ title: 'title2', author: 'author2', url: 'url2', likes: 10 })
        cy.createBlog({ title: 'title3', author: 'author3', url: 'url3', likes: 20 })
      })
      it('user can like a blog', function(){
        cy.contains('title1').find('button').as('viewButton')
        cy.get('@viewButton').click()
        cy.contains('title1').parent().should('contain', 'likes 0')
        cy.contains('title1').parent().contains('like').as('likeButton')
        cy.get('@likeButton').click()
        cy.contains('title1').parent().should('contain', 'likes 1')
      })
      it('user can delete a blog', function(){
        cy.contains('title1').find('button').as('viewButton')
        cy.get('@viewButton').click()
        cy.contains('title1').parent().contains('remove').as('removeButton')
        cy.get('@removeButton').click()
        cy.get('.blogs').should('not.contain', 'title1 author1')
      })
      it('other user cannot delete a blog', function(){
        cy.logout()
        cy.login({ username: 'admin2', password: 'admin2' })
        cy.contains('title1').find('button').as('viewButton')
        cy.get('@viewButton').click()
        cy.contains('title1').parent().contains('remove').as('removeButton')
        cy.get('@removeButton').click()
        cy.get('.error')
          .should('contain', 'not allowed')
          .and('have.css', 'color', 'rgb(255, 0, 0)')
          .and('have.css', 'border-style', 'solid')
        cy.get('.blogs').should('contain', 'title1 author1')
      })
      it('blogs are ordered according to likes desc', function(){
        cy.contains('title1').find('button').click()
        cy.contains('title2').find('button').click()
        cy.contains('title3').find('button').click()
        let tmp = 0
        cy.get('[data-cy=likes]').each(like => {
          tmp = tmp === 0 ? (Number(like.text())) : tmp
          assert.isAtLeast(tmp, Number(like.text()))
          tmp=Number(like.text())
        })
      })
    })
  })
})
