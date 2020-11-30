/// <reference types="Cypress" />


describe("UI Elements", function()
{
    // setup
    before(function()
    {
        cy.visit("http://automationpractice.com/index.php")    
    })

    after(() => {
        cy.get('.logout').contains('Log me out').click()
      })

    it("Verify login url", function()
    {
             
        // Verify title of the page.
        cy.title().should("eq","My Store")
        // Verify sign in link is visible
        cy.get(".login").should("be.visible").click()
    })
    it("Verify create account form", function()
    {        
        // Verify email address text box is enabled and pass email
        cy.get("#email_create").should("be.enabled").type("rama.shrestha@gmail.com")
        // Click on create an account button
        cy.get("#SubmitCreate").click()
        // Check if user is created or not
        cy.get(".alert-danger").should("be.hidden")
    })
    it("Verify user registration form  and insert data", function()
    {
        cy.title().should("eq","Login - My Store")
        // Verify register button is visible
        cy.get("#submitAccount").should("be.visible")
        // Verify radio button for gender Mr. is not ckecked by default.
        // cy.get('[type="radio"]').first().should("not.be.checked")
        cy.get("#id_gender1").should("not.be.checked")
    })
    it("Verify creating new user- Positive test", function()
    {
         // Verify radio button for gender Mrs. is not ckecked by default and then check it.
         cy.get("#id_gender2").should("not.be.checked").check().should("be.checked")
        
         // Now, start inserting required fields
        //  Enter fist name
        // Type first name wait for 10ms and check typed value
        cy.get('#customer_firstname').type("Ram{enter}",{ delay: 10 }).should("have.value", "Ram")
        // cy.get("#customer_firstname").should("be.enabled").type('Ram')
        // Type last name
        // TODO: Found issues with wait command and type command    
        //  cy.get('#customer_lastname').type("Joshi",{ delay: 10 }).should("have.value", "Joshi")      

        // Enter email
        cy.get('#email').clear().type("rama.shrestha@gmail.com{enter}",{ delay: 10 }).should("have.value", "rama.shrestha@gmail.com")
        // cy.get("#email").type("ram.shrestha@gmail.com")
        // Enter password
        cy.get('#passwd').clear().type("12345{enter}", { delay: 10 }).should("have.value", "12345")
        // Enter address
        cy.get('#address1').clear().type("Diktel, Khotang",{ delay: 10 }).should("have.value", "Diktel, Khotang")
        cy.get("#firstname").should('have.value', 'Ram')
        cy.get("#lastname").should('have.value', 'Joshi')
        cy.get("#city").clear().type("Khotang",{ delay: 10 }).should("have.value", "Khotang")
        // select from dropdown
        cy.get('#id_state').select('Arizona') 
        // Enter phone number
        cy.get("#phone_mobile").type("1234567895")
        // Submit the form
        cy.get("#submitAccount").submit()
    })
    it ("Verify that the user account is created", function()
    {
        // Verify My Account text is present when signed in. -- There are many ways to verify but for now verifying the header contetn only.
        cy.get(".page-heading").contains("My account")

    })
})