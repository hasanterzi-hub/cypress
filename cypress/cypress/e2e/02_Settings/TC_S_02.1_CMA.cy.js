/// <reference types="cypress" />
import Settings from "../../pages/Settings"
import { faker } from '@faker-js/faker';

describe('This test suite tests the CMA page and its funtions on PA application.', () => {
    const st = new Settings();
    var fakerCMAName = faker.company.name();

    beforeEach('Login form LifeYield Idp Deluxe subscription', () => {
        cy.visit(Cypress.env('devIdpPlans'));
        cy.ProductSubscriptionLogin('Deluxe Yearly (P+ & I+ & SS+)')
        cy.log('LY.PA.CMA.01 - Check when the user clicks the Capital Market Assumptions link under the Setting tab the left navigation bar.')
        cy.get('.title > .item > [style="font-size: 14px;"]').should('have.text', 'Settings').as('SettingsNav').click()
        cy.get('[href="' + Cypress.env('baseHREF') + 'capital-assumptions"] > .mItem').should('have.text', 'Capital Market Assumptions').click()
        cy.url().should('include', 'capital-assumptions')
        cy.wait(2000)
    })

    context('Capital Market Assumption page elements verification', () => {

        it('Verification elements, paragraphs, validation messages on CMA page and Add/Edit Popup.', () => {
            st.getPageHeader()
            st.getCMAPagePara()

            cy.log('Verify Popup content')
            cy.get('.blue.circular').click()
            st.getCMAPopupContent()
            
            cy.log('Verify that, Help popup not appears after close')
            cy.get('.ui > .close').click()
            cy.get('.large').should('not.exist')

            cy.log('Verify the default content of CMA table')
            cy.get('[title="Name"]').as('Name').should('have.text', 'Name')
            cy.get('[title="Last Update"]').as('LastUpdate').should('have.text', 'Last Update')

            cy.log('Verify default Last Update sorting order')
            st.verifyCMASetNameVerificationInTable(0, 'Level 2 (Customizable)')
            st.verifyCMASetNameVerificationInTable(1, 'Level 1 (Customizable)')
            st.verifyCMASetNameVerificationInTable(2, 'LifeYield Level 1 (Locked)')
            st.verifyCMASetNameVerificationInTable(3, 'LifeYield Level 2 (Locked)')
            cy.log('Verify sorting order according to Alphbetical Name order')
            cy.get('@Name').click()
            cy.wait(1500)
            st.verifyCMASetNameVerificationInTable(0, 'Level 1 (Customizable)')
            st.verifyCMASetNameVerificationInTable(1, 'Level 2 (Customizable)')
            st.verifyCMASetNameVerificationInTable(2, 'LifeYield Level 1 (Locked)')
            st.verifyCMASetNameVerificationInTable(3, 'LifeYield Level 2 (Locked)')
            cy.get('@LastUpdate').click()
            cy.get('.aligned > span').should('have.text', '4 CMA Sets')

            cy.get('.primary').should('have.text', 'Add a CMA Set').click()
            st.getCMAPopupHeader()
            st.getCMATabs(0, 'Manual')
            st.getCMATabs(1, 'Taxonomy')
            st.getCMATabs(2, 'Import')
            cy.get('button[id=btnCancelOnEditCma]').as('cancelButton').should('have.text', 'Cancel')
            cy.get('button[id=btnSaveOnEditCma]').as('saveButton').should('have.text', 'Save').and('have.attr', 'disabled')
            st.getAddNewCategoryButton()
            
            cy.log('Verify that CMA set name and it can not be empty validation message')
            cy.verifyTextPresent('CMA Set Name')
            cy.get('input[name=name]').as('CMASetName').should('exist').and('have.attr', 'value', '').click()
            cy.get('.attached > a').eq(1).click()
            cy.wait(500)
            cy.get('.attached > a').eq(0).click()
            cy.verifyValidationMessage('CMA Set Name is required')

            cy.log('Verify that primary cash category field and attributes')
            cy.get('div[name="primaryCashCategory"]')
                .should('have.attr', 'aria-disabled', 'true')
                .within(() => {
                    cy.get('.divider.text')
                        .should('have.text', 'Cash')
                });
            cy.log('Verify New CMA set table content')
            st.verifyCMASetTableHeaderVerification()
            cy.log('Verify that, default CASH category on table')
            st.verifyCategoryVerificationInAddEditTable(1,0,'Cash','Cash','1.72%','1.72%','','0.49%','0.00%','')

            cy.log('Verify that, Add new category and verify it in table')
            cy.get('.row > .ui').as('AddNewCategory').click()
            st.createNewCategoryToCMASet(1,0,'Test','Equity','7.00%','7.00%',' ','100.00%',' ')
            cy.get('[type="submit"]').as('enterCategory').click()
            st.verifyCategoryVerificationInAddEditTable(1,1,'Test','Equity','7.00%','','7.00%','','100.00%','')

            cy.log('Verify that, delete category and verify it in table')
            st.clickDeleteCategoryButton()
            cy.get('.tab').as('Add/EditPopUp').should('not.contain','Test')

            cy.log('Verify that, cancel add a new category and verify it in table')
            cy.get('@AddNewCategory').click()
            st.createNewCategoryToCMASet(1,0,'Test','Equity','7.00%','7.00%',' ','100.00%',' ')
            st.clickCancelAddCategoryButton()
            cy.get('@Add/EditPopUp').should('not.contain','Test')

            cy.log('Verify that, Same categorty name can not be added')
            cy.get('@AddNewCategory').click()
            st.createNewCategoryToCMASet(1,0,'Test','Equity','7.00%','7.00%',' ','100.00%',' ')
            cy.get('@enterCategory').click()
            cy.get('@AddNewCategory').click()
            cy.get('tbody > :nth-child(1) > :nth-child(1) > .field > input').type('Test')
            cy.get('@AddNewCategory').click()
            cy.verifyValidationMessage('There are duplicate categories. Please ensure category names are unique')
            cy.verifyValidationMessage('*required')
            st.clickCancelAddCategoryButton()
            st.clickDeleteCategoryButton()

            cy.log('Verify that, Add new CMA set with two additional category and verify them at CMA page main table')
            cy.get('@AddNewCategory').click() //First category
            st.createNewCategoryToCMASet(1,0,'Category1','Equity','7.00%','7.00%',' ','100.00%',' ')
            cy.get('@enterCategory').click()
            cy.get('@AddNewCategory').click() //Second category
            st.createNewCategoryToCMASet(1,0,'Category2','Bond','3.40%','3.40%',' ','0.00%','BND')
            cy.get('@enterCategory').click()
            cy.get('@CMASetName').type(fakerCMAName)
            cy.get('@saveButton').should('not.have.attr', 'disabled')
            cy.get('@saveButton').click()
            cy.get('@Add/EditPopUp').should('not.exist')
            cy.wait(2500)
            st.verifyCMASetNameVerificationInTable(0, fakerCMAName)
            st.verifyCMASetNameVerificationInTable(1, 'Level 2 (Customizable)')
            st.verifyCMASetNameVerificationInTable(2, 'Level 1 (Customizable)')
            st.verifyCMASetNameVerificationInTable(3, 'LifeYield Level 1 (Locked)')
            st.verifyCMASetNameVerificationInTable(4, 'LifeYield Level 2 (Locked)')

            cy.log('Verify that deletion of CMA set')
            cy.clickToText(fakerCMAName)


            cy.get('#btnDeleteCmaOnEditCma').click()
            cy.get(':nth-child(5) > .modal > .header').should('have.text', 'Please confirm ')
            cy.verifyTextPresent('Are you sure you want to delete this CMA?')
            cy.get('.actions > .secondary').should('have.text', 'Cancel')
            st.clickDeleteButton()
            cy.get(':nth-child(5) > .modal > .header').should('exist').and('have.text', 'Category Mapping')
            cy.verifyTextPresent('Please first select a capital market assumption that the deleted one should map to and provide how categories of the deleted capital market assumption should map.')
            cy.verifyTextPresent('Target CMA')
            cy.verifyDropdownList(1,['LifeYield Level 1 (Locked)','LifeYield Level 2 (Locked)','Level 1 (Customizable)','Level 2 (Customizable)'])
            cy.selectItemInDropdownList(1,'LifeYield Level 1 (Locked)')
            st.clickAutoMap()
            cy.verifyTextPresent('Source Category')
            cy.verifyTextPresent('Target Category')
            cy.verifyTextPresent('Category1')
            cy.verifyDropdownList(2,['Equity (Passive)','Equity (Active)','Taxable Bond','Municipal Bond','Cash','Other'])
            cy.selectedTextInDropdownList(2,'Equity (Passive)')
            cy.verifyTextPresent('Category2')
            cy.selectedTextInDropdownList(3,'Taxable Bond')
            cy.verifyTextPresent('Cash')
            cy.selectedTextInDropdownList(4,'Cash')
            cy.log('Cancelling of Auto-Map popup, redeleting process')
            cy.get('.actions > .secondary').should('have.text', 'Cancel').click()
            cy.get('#btnDeleteCmaOnEditCma').click()
            cy.get(':nth-child(5) > .modal > .header').should('have.text', 'Please confirm ')
            st.clickDeleteButton()
            cy.selectItemInDropdownList(1,'LifeYield Level 1 (Locked)')
            cy.log('Verify that, CMA set deleted successfully')
            st.clickAutoMap()
            cy.get('.actions > .primary').should('have.text', 'Ok').click()
            cy.verifyTextNotPresent(fakerCMAName)
            


        })
    })

})