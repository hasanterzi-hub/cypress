/// <reference types="Cypress-xpath" />

export default class BasePage {
    static pause(ms) {
        cy.wait(ms)
    }

    static verifyGetElement(element) {
        cy.get(element, { timeout: 10000, log: true }).should('be.visible')
        cy.log(element + " has seen.")
    }

    static veriftGetTextElement(element) {
        cy.get(element).should('be.visible').invoke('val').as('name')
        cy.get('@name').then((name) => {
            cy.log(name + " has seen on page")
        })
        cy.log(element + " has seen.")
    }

    static buttonVerifyAndClick(elementText) {
        try {
            const val = cy.xpath("//button[contains(.,'" + elementText + "')]")
            val.should('be.visible').and('have.text', elementText).click()
            cy.log(elementText + ' button has clicked')
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }

}


