import PI_TSW from "../../pages/PI&TSW"


describe('This test block tests Plan Implementation application ', () => {

    beforeEach('Open the Dew-aws and prepare to setup for testing', () => {
        cy.visit(Cypress.env('devIdP'));
        cy.get('#UserId').select('Test Automation')
        cy.get('#Affiliate').select('MGP')
        cy.get('#Environment').select(Cypress.env('devAWSPI'))
        cy.readFile('cypress/Data/PlanImplementationTestFile.txt').then((fileContent) => {
            cy.get('#Payload').invoke('val', fileContent)
        })
        cy.get('form[action="/Home/Submit"]').invoke('removeAttr', 'target')
    })

    it('Plan Implementation First, Second and Third Page Tests', () => {
        const pi = new PI_TSW()

        cy.get('.btn').should('have.text', 'Submit').click()
        cy.wait(8000)

        cy.log('MGP_2 - Verify the LifeYield logo')
        pi.getLifeYieldLogo()

        

        cy.log('MGP_12 - Check "Next" button when no account is included')
        cy.get(':nth-child(2) > :nth-child(4) > input').uncheck()
        cy.get(':nth-child(3) > :nth-child(4) > input').uncheck()
        cy.get('.btn-common').should('have.text', 'NEXT').and('have.attr', 'disabled')

        cy.log('MGP_4 - Plan Implementation” text appearance requirement')
        pi.getPageHeader().contains('Plan Implementation')
        cy.log('MGP_3 - Verify the page headers on wizard')
        pi.getStepBarHeader(1, 'Account Setup')
        pi.getStepBarHeader(2, 'Options')
        pi.getStepBarHeader(3, 'Account Assignments')
        cy.get(':nth-child(1) > .counter').should('have.text', '1').compareSnapshot('Step 1')
        cy.get(':nth-child(2) > .counter').should('have.text', '2').compareSnapshot('Step 2 Not Active')
        cy.get(':nth-child(3) > .counter').should('have.text', '3').compareSnapshot('Step 3 Not Active')

        cy.log('MGP_5 - Check the table at"Account Setup" screen.')
        pi.verifyTableHeaderControl(1, 'Name')
        pi.verifyTableHeaderControl(2, 'Tax Type')
        pi.verifyTableHeaderControl(3, 'Balance')
        pi.verifyTableHeaderControl(4, 'Included')
        pi.verifyTableHeaderControl(5, 'Locked')
        pi.verifyTableHeaderControl(6, 'Portfolio Set')
        pi.verifyTableHeaderControl(7, 'Assignment')

        cy.log('MGP_6 - "Account Setup" page information message should displayed under the page name.')
        cy.get('.planImplementationHeader').should('have.text',' Please select the accounts to include in the analysis')

        cy.log('Check the case payload loaded correctly')
        //First Row
        pi.verifyAccountNameTypeBalance(1, 'Joint Account', 'Taxable', '$575,000', false, false)
        cy.verifyDropdownList(0, ['Set 1'])
        cy.verifyDropdownList(1, [ 'Capital Preservation I','Capital Preservation II'])
        //Second Row
        pi.verifyAccountNameTypeBalance(2, 'Traditional IRA', 'Tax-Deferred', '$325,000', true, true)
        cy.verifyDropdownList(2, ['Set 1'])
        cy.verifyDropdownList(3, ['Capital Preservation I','Capital Preservation II'])
        //Third Row
        pi.verifyAccountNameTypeBalance(3, 'Roth IRA', 'Tax-Free', '$80,000', true, false)
        cy.verifyDropdownList(4, ['Set 1'])
        cy.verifyDropdownList(5, ['Capital Preservation I','Capital Preservation II'])

        cy.log('MGP_9 & MGP_10 - Check the "?" icon and help context')
        cy.get('.question').as('questionIcon').compareSnapshot('Question Icon')
        cy.get('.question').click()
        cy.verifyListItemAtIndex(0, 'The accounts included in this analysis are summarized below, along with their tax type and balance.')
        cy.verifyListItemAtIndex(1, 'Accounts can be chosen to be included or excluded to be part of the analysis by selecting the selecting/unselecting the "Include" checkbox.')
        cy.verifyListItemAtIndex(2, 'Accounts can be chosen to be locked or unlocked to be part of the analysis by selecting/unselecting the "Lock" checkbox.')
        cy.verifyListItemAtIndex(3, 'Any locked accounts are unaffected by the analysis but may affect decisions for unlocked accounts.')
        cy.verifyListItemAtIndex(4, 'When a portfolio set is selected for an account, that account is assigned a portfolio from that set. Otherwise, a custom allocation is suggested.')
        cy.get('.question').click()
        cy.get('ul > li').should('not.exist')

        cy.log('Include and unlocked all accounts')
        cy.get(':nth-child(1) > :nth-child(4) > input').check()
        cy.get(':nth-child(2) > :nth-child(4) > input').check()
        cy.get(':nth-child(2) > :nth-child(5) > input').uncheck()
        cy.get(':nth-child(3) > :nth-child(4) > input').check()
        cy.get('.btn-common').should('have.text', 'NEXT').click()
        cy.wait(3000)

        // Second Page
        cy.log('')
        cy.get('.planImplementationHeader').should('have.text','  Select your preferred implementation strategy')
        cy.get('.centered').scrollIntoView()
        //cy.get('.centered').compareSnapshot('Page 2')
        cy.get(':nth-child(2) > .counter').should('have.text', '2').compareSnapshot('Step 2')
        cy.get(':nth-child(3) > .counter').should('have.text', '3').compareSnapshot('Step 3 Not Active')

        cy.log('Next button disabled')
        cy.get('[tabindex="4"]').should('have.text', 'NEXT').and('have.attr', 'disabled')

        cy.get('@questionIcon').eq(0).click()
        cy.log('Check content of first help content with first question mark')
        cy.verifyListItemAtIndex(0, 'Click one of the two implementation strategies that you would prefer to implement in the analysis.')

        cy.log('MGP_17 - Check "?" icon for both allocation and location centric help popup')
        cy.get('@questionIcon').eq(0).click()
        cy.get('ul > li').should('not.exist')
        cy.get('@questionIcon').eq(1).click()
        cy.log('Check content of second help content with second question mark')
        cy.get('ul > li').eq(0).should('have.text', 'This implementation approach makes account assignments that are as close as possible to the portfolio\'s target asset allocation.')
        cy.get('ul > li').eq(1).should('have.text', 'Portfolio drift is typically lower than with alternative approaches, but tax efficiency may also be lower.')
        cy.get('@questionIcon').eq(1).click()
        cy.get('ul > li').should('not.exist')
        cy.get('@questionIcon').eq(2).click()
        cy.verifyListItemAtIndex(0, 'This implementation approach makes account assignments that are as close as possible to optimal asset location for each account type.')
        cy.verifyListItemAtIndex(1, 'Tax drag is typically lower than with alternative approaches, but portfolio drift may be higher.')
        //Verify help popup close with Escape key button
        cy.get('body').trigger('keydown', { keyCode: 27 });
        cy.wait(200);
        cy.get('body').trigger('keyup', { keyCode: 27 });
        cy.get('ul > li').should('not.exist')
        
        cy.log('MGP_15 - Check the selectable Allocation and Location centric')
        cy.contains('Allocation Centric')
        cy.contains('Location Centric')

        cy.contains('Target Allocation')
        cy.contains('Proposed Allocation')
        //Verify the charts
        cy.log('MGP_16 & MGP_18 - Check Location Centric and Allocation Centric charts')
        //cy.get('#allocation-centric').compareSnapshot('AllocationCentricChart')
        cy.get('#allocation-centric').click()
        cy.get('#allocation-centric').should('have.attr', 'class', 'allocation-centric-div pointer')
        cy.scrollTo('bottom')
        //cy.get('#location-centric').compareSnapshot('LocationCentricChart')
        cy.get('#location-centric').click()
        cy.get('#location-centric').should('have.attr', 'class', 'location-centric-div pointer')
        cy.get('[tabindex="3"]').should('have.text', 'BACK')
        cy.get('[tabindex="4"]').should('have.text', 'NEXT').click()

        //Third Page
        cy.wait(1000)
        cy.get(':nth-child(3) > .counter').compareSnapshot('Step 3')
        pi.verifyTableHeaderControl(1, 'Name')
        pi.verifyTableHeaderControl(2, 'Portfolio Set')
        pi.verifyTableHeaderControl(3, 'Assignment')
        pi.verifyThirdPageTableResult(1, 'Joint Account', 'Set 1', 'Capital Preservation I')
        pi.verifyThirdPageTableResult(2, 'Traditional IRA', 'Set 1', 'Capital Preservation II')
        pi.verifyThirdPageTableResult(3, 'Roth IRA', 'Set 1', 'Capital Preservation I')

    })
     

    it.only('All accounts are locked and report is downloadable', () => {
        const pi = new PI_TSW()

        cy.get('.btn').should('have.text', 'Submit').click()
        cy.wait(5000)
        cy.log('First Row included and locked')
        cy.get(':nth-child(1) > :nth-child(4) > input').check()
        cy.get(':nth-child(1) > :nth-child(5) > input').check()

        cy.log('Third Row included and locked')
        cy.get(':nth-child(3) > :nth-child(5) > input').check()
        cy.get('.btn-common').should('have.text', 'NEXT').click()
        cy.wait(2000)

        //cy.get('.centered').compareSnapshot('Step2_AllAccountsLocked')
        cy.get('#allocation-centric').click()
        cy.get('[tabindex="4"]').should('have.text', 'NEXT').click()

        pi.verifyThirdPageTableResult(1, 'Joint Account', 'N/A', 'Custom')
        pi.verifyThirdPageTableResult(2, 'Traditional IRA', 'N/A', 'Custom')
        pi.verifyThirdPageTableResult(3, 'Roth IRA', 'N/A', 'Custom')

        /**Download Plan Implementation PDF */
        cy.intercept("POST", Cypress.env('backendUrl')+"/api/Reports/PlanImplementation/user_1").as("buttonRequest");
        pi.getDownloadPDF().should('have.text', 'DOWNLOAD PDF').click()
        cy.downloadReport('PlanImplementation')
    })
    

    //TO-DO
    /* it('Check idle timeout popup',()=>{
        cy.wait(250000)
        cy.get('.header > .yellow').compareSnapshot('YellowWarningsign')
        cy.get('.content > :nth-child(1)')
        cy.get('.content > :nth-child(2)')
        cy.get('.primary').should('have.text','Continue')
        cy.get('.secondary').should('have.text','Logout')
        cy.wait(60000)
    })*/
})
