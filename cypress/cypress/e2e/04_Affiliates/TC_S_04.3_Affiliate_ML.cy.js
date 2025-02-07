/// <reference types="cypress" />

import Affiliates from "../../pages/Affiliates"


describe('Check Merrill Lynch affiliate', () => {
    const aff = new Affiliates()

    beforeEach('Open the Dew-aws and prepare to setup for testing', () => {

        cy.visit(Cypress.env('devIdP'));
        cy.get('#UserId').select('Test Automation')
        cy.get('#Affiliate').select('Merrill Lynch')
        cy.get('#Environment').select(Cypress.env('devAWSPA'))
        cy.get('form[action="/Home/Submit"]').invoke('removeAttr', 'target')
        cy.get('.btn').should('have.text', 'Submit').click()
        cy.wait(4000)
    })

    it('Check the default set of Merrill Lynch user in pages', () => {
        cy.get('base').should('have.attr', 'href', Cypress.env('baseHREF'))
        cy.log('LY.A.MRL.02, LY.A.MRL.03')
        cy.get('.modal > .content > .ui.image').compareSnapshot('MerillIntroPopUp')
        aff.getButtonName('Close').click()

        cy.log('LY.A.MRL.01')
        aff.verifyAffiliateCustomLogo('.header > img', 'ML_Logo', './assets/logos/merrill_lo1_ko.svg')
        cy.log('LY.A.MRL.06')
        aff.verifyAffiliateCustomLogo('.active > .ui', 'SSNavIcon', './assets/icons/ss_card_2.svg')
        aff.verifyAffiliateCustomLogo('.title > .item > .ui', 'SettingsNavIcon', './assets/icons/settings.svg')
        aff.verifyAffiliateCustomLogo('[href="http://resourcecentral.bankofamerica.com/Pages/GBWM/SocialSecurityAnalyzer.aspx"] > .ui', 'SupportNavIcon', './assets/icons/knowledge-base.svg')
        cy.verifyTextNotPresent('Marketing Resources')

        cy.log('LY.A.MRL.07')
        cy.get('.content > span').should('have.text','Social Security+™')
        cy.verifyTextPresent('Use this page to create and view Social Security cases.')

        cy.log('LY.A.MRL.P.01, LY.A.MRL.P.02')
        cy.checkProfilePage('Merrill Lynch')

        
        cy.log('Go to Settings page')
        cy.get('.title > .item > [style="font-size: 14px;"]').should('have.text', 'Settings').as('SettingsNav').click()

        cy.log('LY.A.MRL.S.01')
        cy.verifyTextPresent('Application Defaults')
        cy.verifyTextPresent('Advisor Information')

        cy.log('LY.A.MRL.S.02')
        cy.verifyTextNotPresent('Social Security Layer Name')
        cy.verifyTextNotPresent('Benefit Delay Layer Name')
        cy.verifyTextNotPresent('Benefit Replacement Layer Name')
        cy.verifyTextNotPresent('Income Floor Layer Name')
        cy.verifyTextNotPresent('Additional Income Layer Name')
        cy.verifyTextNotPresent('Nassau Income Accelerator')
        cy.verifyTextNotPresent('Report Customizations')
        cy.verifyTextNotPresent('Annuity Income Layer Name')
        cy.verifyTextNotPresent('Social Security+™ Disclosures')
        cy.verifyLabel('Cost of Living Adjustment (COLA)')
        cy.get('#cola').should('have.value', '2.30%')

        cy.log('LY.A.MRL.S.03')
        cy.get('#companyName').should('have.value', 'Merrill Lynch')
        cy.get('#firstName').as('firstName').and('have.attr', 'disabled')
        cy.get('#lastName').as('lastName').and('have.attr', 'disabled')
        cy.get('#emailAddress').should('have.value', 'test.automation+ml@lifeyield.com').and('have.attr', 'disabled')
        aff.getButtonName('Save Settings').should('have.text', 'Save Settings')
        aff.getButtonName('Discard').click()

        cy.clickToText('Sample Scenario')
        cy.get('.caseHeader > span').contains('Sample Scenario').as('header')
        cy.wait(2000)

        cy.log('LY.A.MRL.SSDP.02')
        cy.get('canvas').compareSnapshot({
            name: 'MerrilSSCanvas',
            testThreshold: 0.05
        })
        cy.get('[style="background-color: rgb(1, 33, 105); padding: 5px;"]').compareSnapshot('MerrillJohnAgeBar')
        cy.get('[style="background-color: rgb(128, 130, 133); padding: 5px;"]').compareSnapshot('MerrillJaneAgeBar')

        cy.log('LY.A.MRL.SSDP.03')
        cy.get('.question').click()
        cy.verifyTextPresent('Social Security+™')
        cy.verifyTextPresent('Social Security cases may be edited by Name and COLA (Cost of Living Adjustment). The assumed rate of inflation is set to 2.30% by default.')
        cy.verifyTextPresent('Additionally, the inputs for your client(s) may be edited')
        cy.verifyTextPresent('The results displayed in the chart shows how projected payments vary between the Maximized and Base strategies. Hover over the chart to see the details for each year. In the monthly view, the difference in Monthly payments is shown, along with the breakdown of benefits for each client both the Maximized and Base strategies. In the Annual and Cumulative views, the annual benefit amounts are displayed. A comparison of the cumulative benefits is shown in all three views.')
        cy.verifyTextPresent('The timeline view is interactive and you can click on the different ages to view the filing instructions and projected benefit amounts for the Base strategy.')
        cy.verifyTextPresent('Reports may be generated to provide a detailed Social Security analysis for your client(s).')
        cy.get('.question').click()
        cy.verifyTextNotPresent('Social Security+™')


        cy.log('LY.A.MRL.SSDP.04')
        cy.get('[style="text-align: right;"] > .ui > .divider').should('have.text','Download PDF').click()
        cy.verifyTextPresent('Set Advisor Information')
        cy.verifyTextPresent('Social Security Report')

        cy.log('LY.A.MRL.SSDP.06')
        cy.clickToText('Set Advisor Information')
        cy.verifyLabel('E-mail Address')
        cy.verifyLabel('First Name')
        cy.verifyLabel('Last Name')
        cy.verifyLabel('Company Name')
        cy.verifyLabel('Phone Number')
        cy.verifyLabel('Title')
        cy.verifyLabel('Address Line 1')
        cy.verifyLabel('Address Line 2')
        cy.verifyLabel('City')
        cy.verifyLabel('State')
        cy.verifyLabel('Zip Code')
        cy.verifyLabel('Country')
        cy.get('#country').should('have.attr', 'id', 'country')
        aff.getButtonName('Save')
        aff.getButtonName('Cancel').click()
        cy.wait(750)
        cy.get('[style="text-align: right;"] > .ui > .divider').click()

        cy.log('LY.A.MRL.SSDP.05')
        cy.clickToText('Social Security Report')
        cy.verifyTextPresent('Report Options')
        cy.verifyTextPresent('Maximized')
        cy.get(':nth-child(3) > .react-toggle > .react-toggle-track').as('Maximized').should('be.visible')
        cy.verifyTextPresent('Base')
        cy.get(':nth-child(5) > .react-toggle > .react-toggle-track').as('Base').should('be.visible')
        cy.verifyTextPresent('Additional Options')
        cy.verifyTextPresent('For presentation to client')
        cy.get('.ten > .react-toggle > .react-toggle-track').should('be.visible')
        
        aff.getButtonName("Download PDF").click();
        const reportName = 'SocialSecurity'
        cy.intercept("POST", Cypress.env('backendUrl')+'/api/Reports/'+reportName+'/*').as("buttonRequest");
        cy.get(':nth-child(9) > div > .primary',{log:'Download PDF'}).click()
        cy.downloadReport(reportName)
        aff.getButtonName("Cancel").click();
        
    })

    afterEach(() => {
        cy.task('generateReport')
    })
})