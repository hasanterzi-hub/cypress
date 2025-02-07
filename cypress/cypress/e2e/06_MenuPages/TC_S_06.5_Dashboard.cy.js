/// <reference types="cypress" />

import Dashboard from "../../pages/Dashboard"

describe('This test suite makes test for dashboard page and side menu for different type subscriptions', () => {
    const dsh = new Dashboard()

    beforeEach(() => {
        cy.visit(Cypress.env('devIdpPlans'));
    })

    context('Yearly Subscriptions', () => {

        it('Yearly P+ subscription', () => {
            dsh.verifySubscriptionFeatures('P+ Yearly')
        })

        it('Yearly I+ subscription', () => {
            dsh.verifySubscriptionFeatures('I+ Yearly')
        })

        it('Yearly P+ & I+ subscription', () => {
            dsh.verifySubscriptionFeatures('Pro Yearly (P+ & I+)')
        })

        it('Yearly P+ & SS+ subscription', () => {
            dsh.verifySubscriptionFeatures('Pro Yearly (P+ & SS+)')
        })

        it('Yearly I+ & SS+ subscription', () => {
            dsh.verifySubscriptionFeatures('Pro Yearly (I+ & SS+)')
        })

        it('Yearly (P+ & I+ & SS+)', () => {
            dsh.verifySubscriptionFeatures('Deluxe Yearly (P+ & I+ & SS+)')
        })
    })

    context('Monthly Subscriptions',()=>{
        it('Monthly SS+ subscription', () => {
            dsh.verifySubscriptionFeatures('SS+ Monthly')
        })

        it('Monthly P+ subscription', () => {
            dsh.verifySubscriptionFeatures('P+ Monthly')
        })

        it('Monthly I+ subscription', () => {
            dsh.verifySubscriptionFeatures('I+ Monthly')
        })

        it('Monthly P+ & I+ subscription', () => {
            dsh.verifySubscriptionFeatures('Pro Monthly (P+ & I+)')
        })

        it('Monthly P+ & SS+ subscription', () => {
            dsh.verifySubscriptionFeatures('Pro Monthly (P+ & SS+)')
        })

        it('Monthly I+ & SS+ subscription', () => {
            dsh.verifySubscriptionFeatures('Pro Monthly (I+ & SS+)')
        })

        it('Monthly (P+ & I+ & SS+)', () => {
            dsh.verifySubscriptionFeatures('Deluxe Monthly (P+ & I+ & SS+)')
        })
    })
})