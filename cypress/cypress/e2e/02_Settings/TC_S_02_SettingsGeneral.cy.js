

import Login from "../../pages/LoginPage"
import Settings from "../../pages/Settings"
import Affiliates from "../../pages/Affiliates";
import QuestionnaireElements from "../../pages/Questionnaire"

describe('This test suite check social security Settings > General page', () => {
    const stt = new Settings()
    const aff = new Affiliates()
    const qs = new QuestionnaireElements()


    it.only('SS+ subscription general page tests, validations', () => {
        const lg = new Login()

        cy.visit(Cypress.env('frontendUrl'));
        lg.lastEmailLogin()
        lg.afterLoginCheckSSPage()

        cy.log('LY.PA.S.G:02')
        cy.clickToText('Settings')
        cy.verifyTextPresent('Application Defaults')
        cy.verifyTextPresent('Advisor Information')
        cy.verifyTextPresent('Report Customizations')
        cy.verifyLabel('Cost of Living Adjustment (COLA)')
        cy.get('#cola').should('have.value', '0.00%')

        cy.log('Check the income layer fields on Settings page')
        cy.verifyLabel('Social Security Layer Name')
        cy.get('#socialSecurityTitle').as('SS').should('have.value', 'Social Security')
        cy.verifyLabel('Benefit Delay Layer Name')
        cy.get('#benefitDelayTitle').as('BD').should('have.value', 'Benefit Delay')
        cy.verifyLabel('Benefit Replacement Layer Name')
        cy.get('#benefitReplacementTitle').as('BR').should('have.value', 'Benefit Replacement')
        cy.verifyLabel('Income Floor Layer Name')
        cy.get('#incomeFloorTitle').as('IF').should('have.value', 'Income Floor')
        cy.verifyLabel('Additional Income Layer Name')
        cy.get('#additionalIncomeTitle').as('AI').should('have.value', 'Additional Income')

        cy.get('@SS').clear()
        cy.get('@BD').clear()
        cy.get('@BR').clear()
        cy.get('@IF').clear()
        cy.get('@AI').clear()
        cy.log('LY.PA.S.G.19')
        cy.verifyValidationMessage('Social Security Title is required')
        cy.log('LY.PA.S.G.20')
        cy.verifyValidationMessage('Benefit Delay Title is required')
        cy.log('LY.PA.S.G.21')
        cy.verifyValidationMessage('Benefit Replacement Title is required')
        cy.log('LY.PA.S.G.22')
        cy.verifyValidationMessage('Income Floor Title is required')
        cy.get('#cola').click()
        cy.log('LY.PA.S.G.23')
        cy.verifyValidationMessage('Additional Income Title is required')
        cy.get('button.ui.primary').should('have.text', 'Save Settings').and('have.attr', 'disabled')
        cy.get('@SS').type('Social Security')
        cy.get('@BD').type('Benefit Delay')
        cy.get('@BR').type('Benefit Replacement')
        cy.get('@IF').type('Income Floor')
        cy.get('@AI').type('Additional Income')



        cy.log('LY.PA.S.G.11 - Check User Information entered at Register')
        cy.verifyTextPresent('Advisor Information')
        cy.readFile('cypress/fixtures/users.json').then((users) => {
            const lastUser = users.users[users.users.length - 1]
            cy.log('LY.PA.S.G.10 - Check the fields that user can not change info of these fields.')
            cy.get('#firstName').should('have.value', lastUser.firstName).and('have.attr', 'disabled')
            cy.get('#lastName').should('have.value', lastUser.lastName).and('have.attr', 'disabled')
            cy.get('#emailAddress').should('have.value', lastUser.email).and('have.attr', 'disabled')
            cy.get('#companyName').should('have.value', lastUser.company).and('have.attr', 'disabled')
            cy.get('#phoneNumber').should('have.value', lastUser.phone).and('have.attr', 'disabled')
            cy.get('#addressLine1').should('have.value', lastUser.address_line_1).and('not.have.attr', 'disabled')
            cy.get('#addressLine2').should('have.value', lastUser.address_line_2).and('not.have.attr', 'disabled')
            cy.get('#city').should('have.value', lastUser.city).and('not.have.attr', 'disabled')
            cy.get('#state').should('have.value', lastUser.state).and('not.have.attr', 'disabled')
            cy.get('#zipCode').should('have.value', lastUser.zipCode).and('not.have.attr', 'disabled')
            cy.get('#country').should('have.value', 'United States').and('not.have.attr', 'disabled')
        })

        cy.get('#addressLine2').clear()
        cy.log('LY.PA.S.G:05 - Check all fields character limits.')
        cy.log('Validation message and limits for advisor information')
        cy.get('#addressLine1').clear()
            .type('01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890')
        cy.get('#title').click()
        cy.verifyValidationMessage('Address Line 1 field has a maximum length of 100')
        cy.get('#city').clear()
            .type('012345678901234567890123456789012345678901234567890')
        cy.get('#title').click()
        cy.verifyValidationMessage('City field has a maximum length of 50')
        cy.get('#state').clear()
            .type('012345678901234567890123456789012345678901234567890')
        cy.get('#title').click()
        cy.verifyValidationMessage('State field has a maximum length of 30')
        cy.get('#zipCode').clear()
            .type('012345678901234567890123456789012345678901234567890')
        cy.get('#addressLine1').click()
        cy.verifyValidationMessage('Zip Code field has a maximum length of 20')

        cy.readFile('cypress/fixtures/users.json').then((users) => {
            const lastUser = users.users[users.users.length - 1]
            cy.get('#addressLine1').clear().type(lastUser.address_line_1)
            cy.get('#addressLine2').clear().type(lastUser.address_line_2)
            cy.get('#city').clear().type(lastUser.city)
            cy.get('#state').clear().type(lastUser.state)
            cy.get('#zipCode').clear().type(lastUser.zipCode)
        })



        cy.scrollTo("bottom")
        cy.verifyTextPresent('Report Customizations')
        cy.verifyTextPresent('Social Security+™ Disclosures')
        cy.get('#ssaDisclosures').type('This is a text data')
        cy.get('#ssaDisclosures').should('have.text', 'This is a text data')
        cy.get('#ssaDisclosures').clear()
        cy.verifyTextPresent('File size should be between 5k and 250k and should be in one of the following formats: .jpg, .jpeg, .png')
        aff.getButtonName('Select files...')
        cy.get('[type="file"]').selectFile('cypress/Data/Over250Kb.jpg', { force: true, log: 'Over250kb jpg file has selected' })
        cy.verifyValidationMessage('An error occurred while uploading the file. Please make sure the file size is between 5k and 250k and has one of the following extensions: .jpg, .jpeg, .png')
        cy.get('[type="file"]').selectFile('cypress/Data/PlanImplementationTestFile.txt', { force: true, log: 'File type is not among of .jpg, .jpeg, .png, .gif' })
        cy.verifyValidationMessage('An error occurred while uploading the file. Please make sure the file size is between 5k and 250k and has one of the following extensions: .jpg, .jpeg, .png')
        cy.get('[type="file"]').selectFile('cypress/Data/Under250Kb.jpg', { force: true, log: 'Under250kb jpg file has selected' })
        // Snapshot karşılaştırmayı gerçekleştirin
        cy.wait(500)
        cy.get(':nth-child(3) > div > .middle').should('be.visible')
        aff.getButtonName('Remove').click()
        cy.get(':nth-child(3) > div > .middle').should('not.exist')

        cy.log('Income Layers are configurable for new SS scenarios')
        cy.get('#cola').clear().type('1')
        cy.get('@SS').clear().type('SS')
        cy.get('@BD').clear().type('BD')
        cy.get('@BR').clear().type('BR')
        cy.get('@IF').clear().type('IF')
        cy.get('@AI').clear().type('AI')
        aff.getButtonName('Save Settings').click()
        cy.verifyServerMessage('Settings Saved')
        aff.getButtonName('Discard').click()

        qs.getASSCButton().click();
        //'addACustomSSscenario', (CaseName, martialStat, BoDPrimary, salary1, BodSecondary, salary2)
        cy.generateRandomString(8).then((randomString) => {
            const caseName = randomString
            cy.addACustomSSscenario(caseName, 'Married', 1968, 2685, 1974, 2065)
            cy.get('.caseHeader > span').contains(caseName)
        })
        cy.wait(1000)
        cy.clickSwitchSSToIL()
        cy.get('h2 > .ui', { log: 'Edit pencil icon has seen' }).click()
        cy.get('#cola').should('have.value', '1.00%')
        aff.getButtonName('Cancel').click()
        cy.verifyTextPresent('SS')
        cy.verifyTextPresent('BD')
        cy.verifyTextPresent('BR')
        cy.verifyTextPresent('IF')
        cy.verifyTextPresent('AI')
        cy.clickSwitchILToSS()
        cy.get('.title > .item > [style="font-size: 14px;"]').should('have.text', 'Settings').as('SettingsNav').click()

        cy.get('#cola').clear({ force: true }).type('0.00')
        cy.wait(500)

        cy.get('@SS').clear().type('Social Security')
        cy.get('@BD').clear().type('Benefit Delay')
        cy.get('@BR').clear().type('Benefit Replacement')
        cy.get('@AI').clear().type('Additional Income')
        cy.get('@IF').clear().type('Income Floor')

        aff.getButtonName('Save Settings').click()
        cy.verifyServerMessage('Settings Saved')

    })

    it('Deluxe subscription general page rate field tests and other fields validations', () => {
        cy.visit(Cypress.env('devIdpPlans'));
        cy.ProductSubscriptionLogin('Deluxe Yearly (P+ & I+ & SS+)')
        cy.wait(5000)
        cy.clickToText('Settings')

        cy.log('LY.PA.S.G.05 - Capital gain tax rate can not be over Ordinary Income tax rate.')
        cy.verifyLabel('Ordinary Income Tax Rate')
        cy.get('#incomeTaxRate').clear().type('5.00')
        cy.verifyLabel('Capital Gains Tax Rate')
        cy.get('#capitalTaxRate').should('have.value', '15.00%')
        cy.get('#cola').click()
        cy.get('button.ui.primary').should('have.text', 'Save Settings').and('have.attr', 'disabled')
        cy.verifyValidationMessage('Ordinary Income Tax Rate cannot be lower than Capital Gains Tax Rate')

        cy.log('LY.PA.S.G.06 - LY.PA.S.G.07 Check maximum/minimum values and non-numeric values for tax rates')
        cy.get('#incomeTaxRate').clear().type('+-/*asd999.9999')
        cy.get('#capitalTaxRate').clear().type('+-/*asd999.9999')
        cy.get('#cola').clear().type('+-/*asd999.9999')
        cy.get('#incomeTaxRate').should('have.value', '99.99%')
        cy.get('#capitalTaxRate').should('have.value', '99.99%')
        
        cy.log('LY.PA.S.G.04 - cerify discard button funtionality')
        cy.clickToText('Discard')
        cy.wait(1500)
        cy.clickToText('Settings')
        cy.get('#incomeTaxRate').should('have.value', '35.00%')
        cy.get('#capitalTaxRate').should('have.value', '15.00%')
        cy.get('#cola').should('have.value', '0.00%')

    })
})