/// <reference types="Cypress" />
//import SSElements from "../../Pages/Pages/SapmpleScenario"
import BasePage from "../pages/BasePage";

class Login extends BasePage {

  afterLoginCheckSSPage() {
    //      const ss = new SSElements()

    cy.document().should('have.property', 'charset').and('eq', 'UTF-8')
    cy.log('LY.TC.SSA.SS.M.01 - Check when the user clicks on sample scenario case in SSA-cases page of the SSA')
    BasePage.veriftGetTextElement('.content > span')
    //    ss.getSSListHeader()
    //  ss.getSStable()
    cy.log('Social Security List header and Table have controlled.')
  }

  lastEmailLogin() {
    cy.getLastEmail().then((lastEmail) => {
      cy.get('#username').type(lastEmail);
    });
    cy.getLastPassword().then((password)=>{
      cy.get('#password').type(password)
    })
    cy.get('#kc-login').contains('Sign in').click()
    cy.wait(4500)
  }
}

export default Login