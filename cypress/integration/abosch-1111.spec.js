describe('Abosch 1111', () => {
  // beforeEach(() => {
  //   cy.visit('http://localhost:3000/#/')
  // })
  
  describe('Sidebar', () => {
    beforeEach(() => {
      cy.get('button[class="sc-eCstlR hhNann"]').click()
      
    })
    it('should open up a sidebar menu by clicking on the menu icon and close the menu by clicking the X icon', () => {      
      cy.get('nav[class="sc-kEjbQP eKqFkT"]').should('be.visible')

      cy.get('button[class="sc-eCstlR hhNann"]').click()
      cy.get('nav[class="sc-kEjbQP eKqFkT"]').should('not.exist')

    })
    it('should allow a user to view the whole collection', () => {
      cy.get('a').contains('The Collection').click()

      cy.get('h2').contains('1111').should('exist')
      cy.url().should('include', 'collection')

    })
    it('should allow a user to view a page describing the 1111 collection', () => {
      cy.get('a').contains('About 1111').click()

      cy.get('h2').contains('The 1111 Collection').should('exist')
      cy.url().should('include', 'about')
    })
    it('should allow a user to view a random 1111 NFT', () => {
      cy.get('a').contains('Random').click()

      cy.get('div[class="sc-iktFfs jJvTFD"]').should('be.visible')
      cy.url().should('include', 'gallery')
    })
    it('should allow a user to connect their metamask wallet to search for NFTs', () => {
      cy.get('button').contains('Evolve my NFT').trigger('mouseover').get('button').contains('Connect Wallet').click({ force: true })
    })
    it('should allow a user to go to Koii\'s homepage', () => {
      cy.get('a').contains('Powered By Koii').should('have.attr', 'href').and('include', 'https://koii.cx/')
    })

  })
  describe('Collection', () => {
    beforeEach(() => {
      cy.get('button[class="sc-eCstlR hhNann"]').click()
      cy.get('a').contains('The Collection').click()
    })
    it('should allow a user to view the whole collection of NFTs', () => {
      cy.get('img').should('have.attr', 'src').and('include', '/static/media').should('have.length', 31)
    })
    it('should allow a user to navigate to the next page of NFTs', () => {
      cy.get('li[class="sc-eJMPIT bMNUqR"]').contains('47').click()
      cy.get('div[class="sc-iNqMzA fbnANa"]').find('img').should('have.length', 7)

    })
  })
  describe.skip('Evolve Flow', () => {

    describe('User with 1111 NFTs in wallet', () => {
      beforeEach(() => {
        cy.fixture('NFTCollection').then(( data ) => {
          cy.intercept('nftapilink', {
            statusCode: 200,
            body: data
          })
        })
        cy.get('button').contains('Verify your 1111').click()
        cy.get('button').contains('Connect ETH Wallet').click()  
      })
      it('Should prompt a user to install finnie if it is not connected already', () => {
        cy.get('button').contains('Evolve my NFT').click()

        cy.get('button').contains('Get Finnie').should('exist').click()
      })
      it('Should allow a user to evolve their NFTs once finnie is connected', () => {
        cy.get('button').contains('Evolve my NFT').click()
        
        cy.get('button').contains('Evolve').click()
      })
      it('Should tell the user that their NFT has been evolved and provide them with a link to share', () => {
        cy.get('button').contains('Share NFT')
      })
    })
    describe('Users without 1111 NFTs', () => {
      beforeEach(() => {
        cy.fixture('emptyNFTCOllECTION').then(( data ) => {
          cy.intercept('nftapilink', {
            statusCode: 200,
            body: data
          })
        })
        cy.get('button').contains('Verify your 1111').click()
        cy.get('button').contains('Connect ETH Wallet').click()  
      })
      it('Should prompt a user to view the 1111 Opensea NFT collection if none are found in the metamask wallet', () => {
        cy.get('button').contains('1111 Collection').should('exist').click()
      })
    })
  })
})