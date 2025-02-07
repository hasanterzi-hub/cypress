import PI_TSW from "../../pages/PI&TSW"

describe('This test block tests different affiliates ', () => {

    beforeEach(() => {
        cy.visit(Cypress.env('devIdP'));
        cy.get('#UserId').select('Test Automation')
    })

    it('TaxSmartWithdrawal application tests. Page control, functional and report testing.', () => {
        const tsw = new PI_TSW()



        //*  GENERAL  *//
        cy.log('TSW.UI.G.01 - Verify that the TSW wizard opens')
        tsw.getIdPsetUp('MGP', Cypress.env('devAWSTSW'), 'TaxSmartWithdrawalTestFile.txt') 

        //
        cy.log('TSW.UI.G.02 - Verify that a "powered by LifeYield" logo')
        tsw.getLifeYieldLogo()

        //
        cy.log('TSW.UI.G.03 - Verify that the text “Tax-Smart Withdrawals')
        tsw.getPageHeader().should('have.text', 'Tax-Smart Withdrawals')
        tsw.getNextButtonStep1().click().wait(2000)        
        tsw.getPageHeader().should('have.text', 'Tax-Smart Withdrawals')     
        tsw.getPortfolioAmountField().type('1')
        tsw.getNextButtonStep2().click().wait(2000)        
        tsw.getPageHeader().should('have.text', 'Tax-Smart Withdrawals')

        //
        cy.log('TSW.UI.G.04 - Verify that the three-step-process bar')
        tsw.getStepBarHeaderAll('Account Setup'+'Options'+'Summary')
        tsw.getStepBarCounterActive('123')





        //*  ACCOUNT SETUP PAGE  *//
        cy.log('TSW.UI.AS.01 - Verify that the active-step-process')        
        tsw.getBackButtonStep3().click().wait(2000)
        tsw.getStepBarHeaderAll('Account Setup'+'Options'+'Summary')
        tsw.getStepBarCounterActive('12')      
        tsw.getBackButtonStep2().click()
        tsw.getStepBarHeaderAll('Account Setup'+'Options'+'Summary')
        tsw.getStepBarCounterActive('1')

        //
        cy.log('TSW.UI.AS.04 - Verify that the “Account Setup” table headers')
        tsw.verifyTableHeaderControl(1,'Name')
        tsw.verifyTableHeaderControl(2,'Tax Type')
        tsw.verifyTableHeaderControl(3,'Balance')
        tsw.verifyTableHeaderControl(4,'Included')
        tsw.verifyTableHeaderControl(5,'Locked') 
      
        //
        cy.log('TSW.UI.AS.05 - Verify that the “Name” column datas')
        tsw.verifyTableBodyData(1,1,'TAX DEFERRED ACCOUNT 1')
        tsw.verifyTableBodyData(2,1,'TAX DEFERRED ACCOUNT 2')
        tsw.verifyTableBodyData(3,1,'TAX Free ACCOUNT 1')
        tsw.verifyTableBodyData(4,1,'TAX Free ACCOUNT 2')
        tsw.verifyTableBodyData(5,1,'TAXABLE ACCOUNT 1')
        tsw.verifyTableBodyData(6,1,'TAXABLE ACCOUNT 2')
        tsw.verifyTableBodyData(7,1,'TAXABLE ACCOUNT 3')
        tsw.verifyTableBodyData(8,1,'TAXABLE ACCOUNT 4')

        //
        cy.log('TSW.UI.AS.06 - Verify that the “Tax Type” column datas')
        tsw.verifyTableBodyData(1,2,'Tax-Deferred')
        tsw.verifyTableBodyData(2,2,'Tax-Deferred')
        tsw.verifyTableBodyData(3,2,'Tax-Free')
        tsw.verifyTableBodyData(4,2,'Tax-Free')
        tsw.verifyTableBodyData(5,2,'Taxable')
        tsw.verifyTableBodyData(6,2,'Taxable')
        tsw.verifyTableBodyData(7,2,'Taxable')
        tsw.verifyTableBodyData(8,2,'Taxable')

        //
        cy.log('TSW.UI.AS.07 - Verify that the “Balance” column datas')
        tsw.verifyTableBodyData(1,3,'$44,000')
        tsw.verifyTableBodyData(2,3,'$132,000')
        tsw.verifyTableBodyData(3,3,'$44,000')
        tsw.verifyTableBodyData(4,3,'$132,000')
        tsw.verifyTableBodyData(5,3,'$58,000')
        tsw.verifyTableBodyData(6,3,'$38,000')
        tsw.verifyTableBodyData(7,3,'$58,000')
        tsw.verifyTableBodyData(8,3,'$38,000')

        //
        cy.log('TSW.UI.AS.08 - Verify that the “Included” and “Locked” column selected checkboxes')
        //Included Column
        tsw.verifyTableBodyCheckBox(1,4,true)
        tsw.verifyTableBodyCheckBox(2,4,false)
        tsw.verifyTableBodyCheckBox(3,4,true)
        tsw.verifyTableBodyCheckBox(4,4,false)
        tsw.verifyTableBodyCheckBox(5,4,true)
        tsw.verifyTableBodyCheckBox(6,4,true)
        tsw.verifyTableBodyCheckBox(7,4,true)
        tsw.verifyTableBodyCheckBox(8,4,true)
        //Locked Column      
        tsw.verifyTableBodyCheckBox(1,5,true)
        tsw.verifyTableBodyCheckBox(2,5,false)
        tsw.verifyTableBodyCheckBox(3,5,true)
        tsw.verifyTableBodyCheckBox(4,5,false)
        tsw.verifyTableBodyCheckBox(5,5,false)
        tsw.verifyTableBodyCheckBox(6,5,false)
        tsw.verifyTableBodyCheckBox(7,5,false)
        tsw.verifyTableBodyCheckBox(8,5,false)

        //
        cy.log('TSW.UI.AS.09 - Verify that the “Next” button in "Account Setup" screen ')
        tsw.getNextButtonStep1().click()
        tsw.getStepBarCounterActive(12)
        tsw.getBackButtonStep2().click()

        //
        cy.log('TSW.UI.AS.10 - Verify that the “Next” button is disabled when all checkboxes which in Included column are unselected')
        tsw.getNextButtonStep1().should('not.have.attr','disabled')      
        tsw.getTableBodyCheckBox(1,4).click()       
        tsw.getTableBodyCheckBox(3,4).click()          
        tsw.getTableBodyCheckBox(5,4).click()  
        tsw.getTableBodyCheckBox(6,4).click()  
        tsw.getTableBodyCheckBox(7,4).click()  
        tsw.getTableBodyCheckBox(8,4).click()
        tsw.getNextButtonStep1().should('have.attr','disabled')  

        //
        cy.log('TSW.UI.AS.11 - Verify that the “Next” button is disabled when all checkboxes which in Included column are unselected')
        //Included Column     
        tsw.getTableBodyCheckBox(1,4).click()
        tsw.getTableBodyCheckBox(2,4).click()        
        tsw.getTableBodyCheckBox(3,4).click()  
        tsw.getTableBodyCheckBox(4,4).click()         
        tsw.getTableBodyCheckBox(5,4).click()  
        tsw.getTableBodyCheckBox(6,4).click()  
        tsw.getTableBodyCheckBox(7,4).click()  
        tsw.getTableBodyCheckBox(8,4).click()
        //Locked Column
        tsw.getTableBodyCheckBox(2,5).click()  
        tsw.getTableBodyCheckBox(4,5).click()         
        tsw.getTableBodyCheckBox(5,5).click()  
        tsw.getTableBodyCheckBox(6,5).click()  
        tsw.getTableBodyCheckBox(7,5).click()  
        tsw.getTableBodyCheckBox(8,5).click()
        tsw.getNextButtonStep1().should('not.have.attr','disabled') 
        
        //
        cy.log('TSW.UI.AS.12 - Verify that the Options page opens when clicking the "Next" button')
        tsw.getNextButtonStep1().click()
        tsw.getStepBarCounterActive(12) 
        tsw.getPortfolioAmountField()
        tsw.getBackButtonStep2().click()

        //
        cy.log('TSW.UI.AS.14 - Verify that the Step-1 taxSmartWithdrawalHeader text')//targetAllocation is used in portfolio
        tsw.getTaxSmartWithdrawalHeader(' Please select the accounts to include in the analysis. The overall target allocation assigned to the portfolio is Custom.')
        tsw.getNextButtonStep1().click()
 






        //*  OPTIONS PAGE  *//
        cy.log('TSW.UI.OP.01 - Verify that the active-step-process (Step-1 & Step-2)')
        tsw.getStepBarCounterActive('12')
        tsw.getStepBarHeaderAll('Account Setup'+'Options'+'Summary')   

        //
        cy.log('TSW.UI.OP.02 - Verify that the Step-2 taxSmartWithdrawalHeader text')
        tsw.getTaxSmartWithdrawalHeader('Please specify how much to withdraw from the portfolio level and/or any combination of the tax registration levels. Select any additional options to be included.')

        //
        cy.log('TSW.UI.OP.03 - Verify that the Step-2 subheader("Amounts" & "Options")')
        tsw.getHeader_h1('Amounts')
        tsw.getHeader_h1('Options')

        //
        cy.log('TSW.UI.OP.04 - Verify that the withdrawal amount(s) levels')
        tsw.getBackButtonStep2().click()
        tsw.getTableBodyCheckBox(1,5).click()  
        tsw.getTableBodyCheckBox(2,5).click()
        tsw.getNextButtonStep1().click() 
        tsw.getWithdrawalAmountLevelArea(1,'Portfolio','portfolio').should('be.visible')
        tsw.getWithdrawalAmountLevelArea(3,'Tax-Free','taxFree').should('be.visible')
        tsw.getWithdrawalAmountLevelArea(3,'Tax-Free','taxDeferred').should('not.exist')
        tsw.getWithdrawalAmountLevelArea(3,'Tax-Free','taxable').should('not.exist')
        tsw.getWithdrawalAmountLevelArea(3,'Tax-Deferred','taxDeferred').should('be.visible')
        tsw.getWithdrawalAmountLevelArea(3,'Tax-Deferred','taxable').should('not.exist')
        tsw.getWithdrawalAmountLevelArea(3,'Taxable','taxable').should('be.visible')
        tsw.getWithdrawalAmountLevelArea(5,'Gamze','client1').should('be.visible')

        //*  OPTIONS PAGE - Amounts - Portfolio level withdrawal  *//
        cy.log('TSW.UI.OP.PLW.01 & 02 - Verify that the "Portfolio" label and its editable input field')
        tsw.getWithdrawalAmountLevelArea(1,'Portfolio','portfolio').clear().type(1000)

        //
        cy.log('TSW.UI.OP.PLW.03 - Verify that the Portfolio inline text “$0”')
        tsw.getWithdrawalAmountLevelArea(1,'Portfolio','portfolio').should('have.attr', 'placeholder', '$0')
        
        //
        cy.log('TSW.UI.OP.PLW.04 - Verify that the available overall portfolio balance validation message')
        tsw.getWithdrawalAmountLevelArea(1,'Portfolio','portfolio').clear().type(999888777666555)
        tsw.getValidationMessage('Portfolio').should('contain.text','Amount exceeds the available portfolio balance $')

        //*  OPTIONS PAGE - Amounts - Registration level withdrawal  *//
        cy.log('TSW.UI.OP.RLW.01&02 - Verify that the three input fields to enter Taxable and/or Tax-Deferred and/or Tax-Free registration withdrawal amounts and its labels')
        tsw.getBackButtonStep2().click()
        tsw.getTableBodyCheckBox(3,5).click()  
        tsw.getTableBodyCheckBox(4,5).click()         
        tsw.getTableBodyCheckBox(5,5).click()  
        tsw.getTableBodyCheckBox(6,5).click()  
        tsw.getTableBodyCheckBox(7,5).click()  
        tsw.getTableBodyCheckBox(8,5).click()
        tsw.getNextButtonStep1().click()
        tsw.getWithdrawalAmountLevelArea(1,'Portfolio','portfolio').clear()
        tsw.getWithdrawalAmountLevelArea(3,'Taxable','taxable').wait(1000).clear().type(1000)
        tsw.getWithdrawalAmountLevelArea(3,'Tax-Deferred','taxDeferred').wait(1000).clear().type(2000)
        tsw.getWithdrawalAmountLevelArea(3,'Tax-Free','taxFree').wait(1000).clear().type(3000)

        //
        cy.log('TSW.UI.OP.RLW.04 - Verify that the user can enter withdrawal amounts at both portfolio-level and/or registration-level')
        tsw.getWithdrawalAmountLevelArea(1,'Portfolio','portfolio').type(6000)

        //
        cy.log('TSW.UI.OP.RLW.05 - Verify that the available overall Taxable balance validation message')
        tsw.getWithdrawalAmountLevelArea(3,'Taxable','taxable').wait(1000).clear().type(999888777666555)
        tsw.getValidationMessage('Taxable').should('contain.text','Amount exceeds the available taxable balance $')

        //
        cy.log('TSW.UI.OP.RLW.06 - Verify that the available overall Tax-Deferred balance validation message')
        tsw.getWithdrawalAmountLevelArea(3,'Tax-Deferred','taxDeferred').wait(1000).clear().type(999888777666555)
        tsw.getValidationMessage('Tax-Deferred').should('contain.text','Amount exceeds the available tax-deferred balance $')

        //
        cy.log('TSW.UI.OP.RLW.07 - Verify that the available overall Tax-Free balance validation message')
        tsw.getWithdrawalAmountLevelArea(3,'Tax-Free','taxFree').wait(1000).clear().type(999888777666555)
        tsw.getValidationMessage('Tax-Free').should('contain.text','Amount exceeds the available tax-free balance $') 

        //*  OPTIONS PAGE - Amounts - Group-level withdrawal  *//
        cy.log('TSW.UI.OP.GLW.01&03 - Verify that the client-specific feature is to withdraw the tax-deferred amount')
        tsw.getWithdrawalAmountLevelArea(5,'Gamze','client1').should('be.visible')
        tsw.getBackButtonStep2().click()
        tsw.getTableBodyCheckBox(1,5).click()  
        tsw.getTableBodyCheckBox(2,5).click() 
        tsw.getNextButtonStep1().click()
        tsw.getWithdrawalAmountLevelArea(5,'Gamze','client1').should('not.exist')

        //
        cy.log('TSW.UI.OP.GLW.04&05 - Verify results when there is withdrawal at group(client) level')
        tsw.getBackButtonStep2().click()
        tsw.getTableBodyCheckBox(1,5).click()  
        tsw.getTableBodyCheckBox(2,5).click()
        tsw.getNextButtonStep1().click()
        tsw.getWithdrawalAmountLevelArea(1,'Portfolio','portfolio').clear()
        tsw.getWithdrawalAmountLevelArea(3,'Taxable','taxable').clear()
        tsw.getWithdrawalAmountLevelArea(3,'Tax-Free','taxFree').clear()
        tsw.getWithdrawalAmountLevelArea(5,'Gamze','client1').type(176000)
        tsw.getNextButtonStep2().click()
        //Withdrawal Overview Table
        tsw.verifyStep3WithdrawalOverviewTableBodyData(1,3,'$44,000')
        tsw.verifyStep3WithdrawalOverviewTableBodyData(2,3,'$132,000')
        tsw.verifyStep3WithdrawalOverviewTableBodyData(3,3,'$44,000')
        tsw.verifyStep3WithdrawalOverviewTableBodyData(4,3,'$132,000')
        tsw.verifyStep3WithdrawalOverviewTableBodyData(5,3,'$58,000')
        tsw.verifyStep3WithdrawalOverviewTableBodyData(6,3,'$38,000')
        tsw.verifyStep3WithdrawalOverviewTableBodyData(7,3,'$58,000')
        tsw.verifyStep3WithdrawalOverviewTableBodyData(8,3,'$38,000')
        tsw.verifyStep3WithdrawalOverviewTableBodyData(1,4,'$0')
        tsw.verifyStep3WithdrawalOverviewTableBodyData(2,4,'$18,000')
        tsw.verifyStep3WithdrawalOverviewTableBodyData(3,4,'$0')
        tsw.verifyStep3WithdrawalOverviewTableBodyData(4,4,'$18,000')
        tsw.verifyStep3WithdrawalOverviewTableBodyData(5,4,'$14,000')
        tsw.verifyStep3WithdrawalOverviewTableBodyData(6,4,'$4,000')
        tsw.verifyStep3WithdrawalOverviewTableBodyData(7,4,'$14,000')
        tsw.verifyStep3WithdrawalOverviewTableBodyData(8,4,'$4,000')
        tsw.verifyStep3WithdrawalOverviewTableBodyData(1,5,'$44,000')
        tsw.verifyStep3WithdrawalOverviewTableBodyData(2,5,'$114,000')
        tsw.verifyStep3WithdrawalOverviewTableBodyData(3,5,'$0')
        tsw.verifyStep3WithdrawalOverviewTableBodyData(4,5,'$0')
        tsw.verifyStep3WithdrawalOverviewTableBodyData(5,5,'$0')
        tsw.verifyStep3WithdrawalOverviewTableBodyData(6,5,'$0')
        tsw.verifyStep3WithdrawalOverviewTableBodyData(7,5,'$0')
        tsw.verifyStep3WithdrawalOverviewTableBodyData(8,5,'$0')
        //Portfolio Allocation Table
        tsw.verifyStep3PortfolioAllocationTableBodyData(1,3,'$50,000')
        tsw.verifyStep3PortfolioAllocationTableBodyData(2,3,'$50,000')
        tsw.verifyStep3PortfolioAllocationTableBodyData(3,3,'$92,000')
        tsw.verifyStep3PortfolioAllocationTableBodyData(4,3,'$88,000')
        tsw.verifyStep3PortfolioAllocationTableBodyData(5,3,'$44,000')
        tsw.verifyStep3PortfolioAllocationTableBodyData(6,3,'$44,000')
        tsw.verifyStep3PortfolioAllocationTableBodyData(7,3,'$88,000')
        tsw.verifyStep3PortfolioAllocationTableBodyData(8,3,'$44,000')
        tsw.verifyStep3PortfolioAllocationTableBodyData(9,3,'$44,000')
        tsw.verifyStep3PortfolioAllocationTableBodyData(1,5,'$50,000')
        tsw.verifyStep3PortfolioAllocationTableBodyData(2,5,'$50,000')
        tsw.verifyStep3PortfolioAllocationTableBodyData(3,5,'$92,000')
        tsw.verifyStep3PortfolioAllocationTableBodyData(4,5,'$0')
        tsw.verifyStep3PortfolioAllocationTableBodyData(5,5,'$9,000')
        tsw.verifyStep3PortfolioAllocationTableBodyData(6,5,'$9,000')
        tsw.verifyStep3PortfolioAllocationTableBodyData(7,5,'$88,000')
        tsw.verifyStep3PortfolioAllocationTableBodyData(8,5,'$44,000')
        tsw.verifyStep3PortfolioAllocationTableBodyData(9,5,'$44,000')
        tsw.verifyStep3PortfolioAllocationTableBodyData(1,7,'$0')
        tsw.verifyStep3PortfolioAllocationTableBodyData(2,7,'$0')
        tsw.verifyStep3PortfolioAllocationTableBodyData(3,7,'$0')
        tsw.verifyStep3PortfolioAllocationTableBodyData(4,7,'-$88,000','red')
        tsw.verifyStep3PortfolioAllocationTableBodyData(5,7,'-$35,000','red')
        tsw.verifyStep3PortfolioAllocationTableBodyData(6,7,'-$35,000','red')
        tsw.verifyStep3PortfolioAllocationTableBodyData(7,7,'$0')
        tsw.verifyStep3PortfolioAllocationTableBodyData(8,7,'$0')
        tsw.verifyStep3PortfolioAllocationTableBodyData(9,7,'$0')
        tsw.verifyStep3PortfolioAllocationTableBodyData(1,4,'26.04%')
        tsw.verifyStep3PortfolioAllocationTableBodyData(2,4,'26.04%')
        tsw.verifyStep3PortfolioAllocationTableBodyData(3,4,'47.92%')
        tsw.verifyStep3PortfolioAllocationTableBodyData(4,4,'50.00%')
        tsw.verifyStep3PortfolioAllocationTableBodyData(5,4,'25.00%')
        tsw.verifyStep3PortfolioAllocationTableBodyData(6,4,'25.00%')
        tsw.verifyStep3PortfolioAllocationTableBodyData(7,4,'50.00%')
        tsw.verifyStep3PortfolioAllocationTableBodyData(8,4,'25.00%')
        tsw.verifyStep3PortfolioAllocationTableBodyData(9,4,'25.00%')
        tsw.verifyStep3PortfolioAllocationTableBodyData(1,6,'26.04%')
        tsw.verifyStep3PortfolioAllocationTableBodyData(2,6,'26.04%')
        tsw.verifyStep3PortfolioAllocationTableBodyData(3,6,'47.92%')
        tsw.verifyStep3PortfolioAllocationTableBodyData(4,6,'0.00%')
        tsw.verifyStep3PortfolioAllocationTableBodyData(5,6,'50.00%')
        tsw.verifyStep3PortfolioAllocationTableBodyData(6,6,'50.00%')
        tsw.verifyStep3PortfolioAllocationTableBodyData(7,6,'50.00%')
        tsw.verifyStep3PortfolioAllocationTableBodyData(8,6,'25.00%')
        tsw.verifyStep3PortfolioAllocationTableBodyData(9,6,'25.00%')
        tsw.verifyStep3PortfolioAllocationTableBodyData(1,8,'0.00%')
        tsw.verifyStep3PortfolioAllocationTableBodyData(2,8,'0.00%')
        tsw.verifyStep3PortfolioAllocationTableBodyData(3,8,'0.00%')
        tsw.verifyStep3PortfolioAllocationTableBodyData(4,8,'-50.00%','red')
        tsw.verifyStep3PortfolioAllocationTableBodyData(5,8,'25.00%')
        tsw.verifyStep3PortfolioAllocationTableBodyData(6,8,'25.00%')
        tsw.verifyStep3PortfolioAllocationTableBodyData(7,8,'0.00%')
        tsw.verifyStep3PortfolioAllocationTableBodyData(8,8,'0.00%')
        tsw.verifyStep3PortfolioAllocationTableBodyData(9,8,'0.00%')

        //
        cy.log('TSW.UI.OP.GLW.06 - Verify the message displaying the maximum amount that can be withdrawn due to an overdraw request  at the group(client) level')
        tsw.getBackButtonStep3().click()
        tsw.getWithdrawalAmountLevelArea(5,'Gamze','client1').wait(1000).clear().type(200000)
        tsw.getValidationMessage('Gamze').should('contain.text','Amount exceeds the available tax-deferred balance of $176,000 for Gamze')

        //
        cy.log('TSW.UI.OP.GLW.08 - Verify the message displaying the maximum amount that can be withdrawn due to an overdraw request  at one of the registration(enrolment) levels')
        tsw.getWithdrawalAmountLevelArea(5,'Gamze','client1').wait(1000).clear()
        tsw.getWithdrawalAmountLevelArea(3,'Taxable','taxable').wait(1000).clear().type(200000)
        tsw.getValidationMessage('Taxable').should('contain.text','Amount exceeds the available taxable balance $192,000')
        tsw.getWithdrawalAmountLevelArea(3,'Tax-Deferred','taxDeferred').wait(1000).clear().type(200000)
        tsw.getValidationMessage('Taxable').should('contain.text','Amount exceeds the available tax-deferred balance $176,000')
        tsw.getWithdrawalAmountLevelArea(3,'Tax-Free','taxFree').wait(1000).clear().type(200000)
        tsw.getValidationMessage('Taxable').should('contain.text','Amount exceeds the available tax-free balance $176,000')

        //
        cy.log('TSW.UI.OP.GLW.09 - Verify condition when the amount withdrawn at portfolio level is less than the amount withdrawn from each of the accounts at registration level')
        tsw.getWithdrawalAmountLevelArea(1,'Portfolio','portfolio').wait(1000).clear().type(2000)
        tsw.getWithdrawalAmountLevelArea(3,'Taxable','taxable').wait(1000).clear().type(5000)
        tsw.getWithdrawalAmountLevelArea(3,'Tax-Deferred','taxDeferred').wait(1000).clear().type(5000)
        tsw.getWithdrawalAmountLevelArea(3,'Tax-Free','taxFree').wait(1000).clear().type(5000)
        tsw.getNextButtonStep2().click()
        tsw.verifyStep3WithdrawalOverviewTableBodyData(2,5,'$5,000')
        tsw.verifyStep3WithdrawalOverviewTableBodyData(4,5,'$5,000')
        tsw.verifyStep3WithdrawalOverviewTableBodyData(5,5,'$5,000')
        tsw.verifyStep3WithdrawalOverviewTableBodyData(9,5,'$15,000')

        //
        cy.log('TSW.UI.OP.GLW.10 - Verify condition when the amount withdrawn at portfolio level is more than the total amount withdrawn from the accounts at registration level')
        tsw.getBackButtonStep3().click()
        tsw.getWithdrawalAmountLevelArea(1,'Portfolio','portfolio').clear().type(15000)
        tsw.getWithdrawalAmountLevelArea(3,'Taxable','taxable').wait(1000).clear().type(5000)
        tsw.getWithdrawalAmountLevelArea(3,'Tax-Deferred','taxDeferred').wait(1000).clear().type(6000)
        tsw.getWithdrawalAmountLevelArea(3,'Tax-Free','taxFree').wait(1000).clear().type(1000)
        tsw.getNextButtonStep2().click()
        tsw.verifyStep3WithdrawalOverviewTableBodyData(2,5,'$6,000')
        tsw.verifyStep3WithdrawalOverviewTableBodyData(4,5,'$1,000')
        tsw.verifyStep3WithdrawalOverviewTableBodyData(5,5,'$5,000')
        tsw.verifyStep3WithdrawalOverviewTableBodyData(7,5,'$3,000')
        tsw.verifyStep3WithdrawalOverviewTableBodyData(9,5,'$15,000')
    
        //
        cy.log('TSW.UI.OP.GLW.11 - Verify that the next button is not active until at least 1 value is entered in the portfolio, T, D, F and client name fields')
        cy.log('TSW.UI.OP.GLW.12 - Verify that Numeric data should be defined to Portfolio, Taxable, Tax-Deferred, Tax-Free and Member')
        cy.log('TSW.UI.OP.O.15 - In step 2, verify that the “Next” button is activated only after the user has entered at least one or more withdrawal level amounts')
        tsw.getBackButtonStep3().click()  
        tsw.getWithdrawalAmountLevelArea(1,'Portfolio','portfolio').clear()
        tsw.getWithdrawalAmountLevelArea(3,'Taxable','taxable').wait(1000).clear()
        tsw.getWithdrawalAmountLevelArea(3,'Tax-Deferred','taxDeferred').wait(1000).clear()
        tsw.getWithdrawalAmountLevelArea(3,'Tax-Free','taxFree').wait(1000).clear()
        tsw.verifyNEXTbuttonStep2().should('be.disabled')
        tsw.getWithdrawalAmountLevelArea(1,'Portfolio','portfolio').type(2800)
        tsw.verifyNEXTbuttonStep2().should('be.enabled')
        tsw.getWithdrawalAmountLevelArea(1,'Portfolio','portfolio').clear()
        tsw.verifyNEXTbuttonStep2().should('be.disabled')
        tsw.getWithdrawalAmountLevelArea(3,'Taxable','taxable').wait(1000).type(2800)
        tsw.verifyNEXTbuttonStep2().should('be.enabled')
        tsw.getWithdrawalAmountLevelArea(3,'Taxable','taxable').clear()
        tsw.verifyNEXTbuttonStep2().should('be.disabled')
        tsw.getWithdrawalAmountLevelArea(3,'Tax-Deferred','taxDeferred').wait(1000).type(2800)
        tsw.verifyNEXTbuttonStep2().should('be.enabled')
        tsw.getWithdrawalAmountLevelArea(3,'Tax-Deferred','taxDeferred').clear()
        tsw.verifyNEXTbuttonStep2().should('be.disabled')
        tsw.getWithdrawalAmountLevelArea(3,'Tax-Free','taxFree').type(2800)
        tsw.verifyNEXTbuttonStep2().should('be.enabled')
        tsw.getWithdrawalAmountLevelArea(3,'Tax-Free','taxFree').clear()
        tsw.verifyNEXTbuttonStep2().should('be.disabled')
        tsw.getWithdrawalAmountLevelArea(5,'Gamze','client1').type(2800)
        tsw.verifyNEXTbuttonStep2().should('be.enabled')
        tsw.getWithdrawalAmountLevelArea(5,'Gamze','client1').clear()
        tsw.verifyNEXTbuttonStep2().should('be.disabled')
        tsw.getWithdrawalAmountLevelArea(1,'Portfolio','portfolio').type(2800)
        tsw.getWithdrawalAmountLevelArea(3,'Taxable','taxable').wait(1000).type(2800)
        tsw.verifyNEXTbuttonStep2().should('be.enabled')
        tsw.getWithdrawalAmountLevelArea(1,'Portfolio','portfolio').clear()
        tsw.getWithdrawalAmountLevelArea(5,'Gamze','client1').type(2800)
        tsw.verifyNEXTbuttonStep2().should('be.enabled')
        tsw.getWithdrawalAmountLevelArea(1,'Portfolio','portfolio').type(2800)
        tsw.verifyNEXTbuttonStep2().should('be.enabled')
 






        //*  OPTIONS PAGE - Options  *//

        cy.log('TSW.UI.OP.O.01 - Verify that the Rebalancing Tool Tip Icon and its text')
        tsw.getToolTipIconRebalancing().click()
        tsw.getToolTipTextRebalancing().should('have.text','\'Full\' rebalancing involves implementing optimal location, with meeting the portfolio allocation target a side effect of that implementation, and tax harvesting taking place along the way through optimal lot selection.\'Opportunistic\' rebalancing, involves processing a withdrawal while observing a portfolio\'s alignment with its target allocation The primary goal is to meet the withdrawal request, while taking advantage of any opportunities to reduce allocation drift and improve asset location.\'None\' rebalancing involves no rebalancing and no location. Any provided target and CMAs are therefore ignored, with the emphasis falling to tax lot selection')

        //
        cy.log('TSW.UI.OP.O.02 - Verify that under the Rebalance heading there is a drop-down menu with None, Full,  Opportunistic')
        cy.log('TSW.UI.OP.O.03 - Verify that the default value is "Opportunistic"')
        tsw.getDropdown().should('have.text','OpportunisticNoneFullOpportunistic').click()    
        tsw.getDropdownMenu().should('have.text','NoneFullOpportunistic') 
      
        //
        cy.log('TSW.UI.OP.O.04 - Verify that  Rebalancing, Short-Term Gain Limit, Long-Term Gain Limit display under the Options header')
        cy.xpath(`//h1[text()='Options']//parent::div//parent::div//following-sibling::div//h3`).should('have.text','RebalancingShort-Term Gain LimitLong-Term Gain Limit')

        //
        cy.log('TSW.UI.OP.O.05 - Verify the tool tip text for the Short-Term Gain Limit')
        tsw.getToolTipIcon('Short-Term Gain Limit').click()
        tsw.getToolTipText().should('have.text','Maximum allowed Short-Term Gain for this portfolio')     

        //
        cy.log('TSW.UI.OP.O.06 - Verify the tool tip text for the Long-Term Gain Limit')
        tsw.getToolTipIcon('Long-Term Gain Limit').click()
        tsw.getToolTipText().should('have.text','Maximum allowed Long-Term Gain for this portfolio')

        //
        cy.log('TSW.UI.OP.O.07 - Verify the Gain Limit toggles(default disable)')
        tsw.getToggle('isLongTerm').should('not.contain.html', 'checked')
        tsw.getToggle('isShortTerm').should('not.contain.html', 'checked')

        //
        cy.log('TSW.UI.OP.O.08 - Verify that $0 shows an inline text, the value is removed when the user starts editing the field')
        tsw.getToggle('isShortTerm').click()
        tsw.getToggleEditField('Short-Term Gain Limit').should('have.attr', 'placeholder', '$0').should('have.attr', 'value', '')
        tsw.getToggleEditField('Short-Term Gain Limit').type('28')
        tsw.getToggleEditField('Short-Term Gain Limit').should('have.attr', 'placeholder', '$0').should('have.attr', 'value', '$28')
        tsw.getToggle('isLongTerm').click()
        tsw.getToggleEditField('Long-Term Gain Limit').should('have.attr', 'placeholder', '$0').should('have.attr', 'value', '')
        tsw.getToggleEditField('Long-Term Gain Limit').type('28')
        tsw.getToggleEditField('Long-Term Gain Limit').should('have.attr', 'placeholder', '$0').should('have.attr', 'value', '$28')

        //
        cy.log('TSW.UI.OP.O.09 - Verify that there is an on/off button next to the Short-Term Gain Limit label')
        cy.xpath(`//h3[text()='Short-Term Gain Limit']//following-sibling::span/div/div[@class='react-toggle-track']`).should('be.visible').click()

        //
        cy.log('TSW.UI.OP.O.10 - Verify that there is an on/off button next to the Long-Term Gain Limit label')
        cy.xpath(`//h3[text()='Long-Term Gain Limit']//following-sibling::span/div/div[@class='react-toggle-track']`).should('be.visible').click()

        //
        cy.log('TSW.UI.OP.O.11 - Verify that value should not be entered without Short-Term Gain Limit on/off button on')
        tsw.getToggleEditField('Short-Term Gain Limit').should('be.disabled')
        tsw.getToggle('isShortTerm').click()
        tsw.getToggleEditField('Short-Term Gain Limit').should('not.be.disabled').click()

        //
        cy.log('TSW.UI.OP.O.12 - Verify that value should not be entered without Long-Term Gain Limit on/off button on')
        tsw.getToggleEditField('Long-Term Gain Limit').should('be.disabled')
        tsw.getToggle('isLongTerm').click()
        tsw.getToggleEditField('Long-Term Gain Limit').should('not.be.disabled').click()

        //
        cy.log('TSW.UI.OP.O.13 - Verify maximum ST/LT gain limit value')
        tsw.getToggleEditField('Short-Term Gain Limit').type(10000000000)
        tsw.getToggleEditField('Long-Term Gain Limit').type(10000000000)
        tsw.getValidationMessage('Short-Term Gain Limit').should('exist').should('have.text','The maximum ST gain limit is $9,999,999,999.')
        tsw.getValidationMessage('Long-Term Gain Limit').should('exist').should('have.text','The maximum LT gain limit is $9,999,999,999.')
        tsw.getToggleEditField('Short-Term Gain Limit').clear().type(9999999999)
        tsw.getToggleEditField('Long-Term Gain Limit').clear().type(9999999999)
        tsw.getValidationMessage('Short-Term Gain Limit').should('not.exist')
        tsw.getValidationMessage('Long-Term Gain Limit').should('not.exist')

        //
        cy.log('TSW.UI.OP.O.14 - Verify minimum ST/LT gain limit value')
        tsw.getToggleEditField('Short-Term Gain Limit').clear().type(0)
        tsw.getToggleEditField('Long-Term Gain Limit').clear().type(0)
        tsw.getValidationMessage('Short-Term Gain Limit').should('not.exist')
        tsw.getValidationMessage('Long-Term Gain Limit').should('not.exist')
        tsw.getToggleEditField('Short-Term Gain Limit').clear().type(-1)//ui prevents minus number typing
        tsw.getToggleEditField('Long-Term Gain Limit').clear().type(-1)//ui prevents minus number typing
        tsw.getValidationMessage('Short-Term Gain Limit').should('not.exist')
        tsw.getValidationMessage('Long-Term Gain Limit').should('not.exist')

        //
        cy.log('TSW.UI.OP.O.16 & 17 - Verify that when the user switches between steps 1,2 and 3, the account setup step settings and option step selection remain within the wizard.')
        tsw.getBackButtonStep2().click()  
        tsw.verifyTableBodyData(1,1,'TAX DEFERRED ACCOUNT 1')
        tsw.verifyTableBodyData(2,1,'TAX DEFERRED ACCOUNT 2')
        tsw.verifyTableBodyData(3,1,'TAX Free ACCOUNT 1')
        tsw.verifyTableBodyData(4,1,'TAX Free ACCOUNT 2')
        tsw.verifyTableBodyData(5,1,'TAXABLE ACCOUNT 1')
        tsw.verifyTableBodyData(6,1,'TAXABLE ACCOUNT 2')
        tsw.verifyTableBodyData(7,1,'TAXABLE ACCOUNT 3')
        tsw.verifyTableBodyData(8,1,'TAXABLE ACCOUNT 4')
        tsw.verifyTableBodyData(1,2,'Tax-Deferred')
        tsw.verifyTableBodyData(2,2,'Tax-Deferred')
        tsw.verifyTableBodyData(3,2,'Tax-Free')
        tsw.verifyTableBodyData(4,2,'Tax-Free')
        tsw.verifyTableBodyData(5,2,'Taxable')
        tsw.verifyTableBodyData(6,2,'Taxable')
        tsw.verifyTableBodyData(7,2,'Taxable')
        tsw.verifyTableBodyData(8,2,'Taxable')        
        tsw.verifyTableBodyData(1,3,'$44,000')
        tsw.verifyTableBodyData(2,3,'$132,000')
        tsw.verifyTableBodyData(3,3,'$44,000')
        tsw.verifyTableBodyData(4,3,'$132,000')
        tsw.verifyTableBodyData(5,3,'$58,000')
        tsw.verifyTableBodyData(6,3,'$38,000')
        tsw.verifyTableBodyData(7,3,'$58,000')
        tsw.verifyTableBodyData(8,3,'$38,000')
        tsw.verifyTableBodyCheckBox(1,4,true)
        tsw.verifyTableBodyCheckBox(2,4,true)
        tsw.verifyTableBodyCheckBox(3,4,true)
        tsw.verifyTableBodyCheckBox(4,4,true)
        tsw.verifyTableBodyCheckBox(5,4,true)
        tsw.verifyTableBodyCheckBox(6,4,true)
        tsw.verifyTableBodyCheckBox(7,4,true)
        tsw.verifyTableBodyCheckBox(8,4,true)     
        tsw.verifyTableBodyCheckBox(1,5,false)
        tsw.verifyTableBodyCheckBox(2,5,false)
        tsw.verifyTableBodyCheckBox(3,5,false)
        tsw.verifyTableBodyCheckBox(4,5,false)
        tsw.verifyTableBodyCheckBox(5,5,false)
        tsw.verifyTableBodyCheckBox(6,5,false)
        tsw.verifyTableBodyCheckBox(7,5,false)
        tsw.verifyTableBodyCheckBox(8,5,false)
        tsw.getNextButtonStep1().click()
        tsw.getWithdrawalAmountLevelArea(1,'Portfolio','portfolio').should('have.attr', 'value', '$2,800')
        tsw.getWithdrawalAmountLevelArea(3,'Taxable','taxable').should('have.attr', 'value', '$2,800')
        tsw.getWithdrawalAmountLevelArea(3,'Tax-Deferred','taxDeferred').should('have.attr', 'value', '')
        tsw.getWithdrawalAmountLevelArea(3,'Tax-Free','taxFree').should('have.attr', 'value', '')
        tsw.getWithdrawalAmountLevelArea(5,'Gamze','client1').should('have.attr', 'value', '$2,800')
        tsw.getDropdown().should('have.text','OpportunisticNoneFullOpportunistic')
        tsw.getToggle('isShortTerm').should('contain.html', 'checked')
        tsw.getToggle('isLongTerm').should('contain.html', 'checked')
        tsw.getToggleEditField('Short-Term Gain Limit').should('have.attr', 'value', '$1')
        tsw.getToggleEditField('Long-Term Gain Limit').should('have.attr', 'value', '$1')

        //
        cy.log('TSW.UI.OP.O.19 - Verify that the Summary page opens when clicking the Next button')
        tsw.getNextButtonStep2().click()
        tsw.getStepBarCounterActive('123')




        //*  SUMMARY PAGE  *//

        cy.log('TSW.UI.SP.01 - Verify that the header of the step should read “Summary”.')
        tsw.getStepBarHeaderAll('Account Setup'+'Options'+'Summary')

        //
        cy.log('TSW.UI.SP.02 - Verify that the page is divided into three sections')
        cy.log('TSW.UI.SP.04 - Verify that Withdrawal Overview sub-header displayed in page')
        cy.log('TSW.UI.SP.09 - Verify that Portfolio Allocation sub-header displayed in page')
        cy.log('TSW.UI.SP.18 - Verify that Tax Impact sub-header displayed in page')
        tsw.getHeader_h1_Step3(1).should('have.text','Withdrawal Overview')
        tsw.getHeader_h1_Step3(2).should('contain.html', 'Portfolio Allocation')
        tsw.getHeader_h1_Step3(3).should('contain.html', 'Tax Impact')

        //
        cy.log('TSW.UI.SP.03 - Verify the information message as "Here is the summary of your withdrawal request" under the "Summary" header')
        cy.get('.taxSmartWithdrawalHeader').should('have.text',' Here is the summary of your withdrawal request.')

        //
        cy.log('TSW.UI.SP.05 - Verify the "Withdrawal Overview" information message')
        cy.get(':nth-child(1) > p').should('have.text','Your portfolio includes the following accounts. Any locked balance - either the entire account balance or the total value of any locked holdings within the account - are shown for reference, along with the suggested withdrawal amount.')

        //
        cy.log('TSW.UI.SP.06 - Verify that this table should be display  "Account Name, Tax Type, Balance, Locked, Suggested Withdrawal" fields.')
        tsw.verifyTableHeaderData(1,'Account Name')
        tsw.verifyTableHeaderData(2,'Tax Type')
        tsw.verifyTableHeaderData(3,'Balance')
        tsw.verifyTableHeaderData(4,'Locked')
        tsw.verifyTableHeaderData(5,'Suggested Withdrawal')

        //
        cy.log('TSW.UI.SP.09 - Verify that table a must have Withdrawal Overview total row under it')
        tsw.verifyStep3WithdrawalOverviewTableBodyData(9,1,'Total:')
        tsw.verifyStep3WithdrawalOverviewTableBodyData(9,2,'')
        tsw.verifyStep3WithdrawalOverviewTableBodyData(9,3,'$544,000')
        tsw.verifyStep3WithdrawalOverviewTableBodyData(9,4,'$72,000')
        tsw.verifyStep3WithdrawalOverviewTableBodyData(9,5,'$5,600')

        //
        cy.log('TSW.UI.SP.10 - Verify "Portfolio Allocation tooltip text')
        tsw.getToolTipIconStep3('Portfolio Allocation').click()
        tsw.getToolTipText().should('have.text','The chart below shows your portfolio allocation before and after the withdrawal, when compared to the target allocation. A common measure of alignment between a portfolio and its target allocation is referred to as \'drift\', with 0.00% drift indicating perfect alignment and 100.00% drift indicating that the portfolio and its target allocation have nothing in common. The drift percentage before and after the withdrawal is shown next to corresponding asset allocation.')  

        //
        cy.log('TSW.UI.SP.11 - Verify that 3 charts should be displayed under portfolio allocation.')
        tsw.verifyColumnRowPortfolioAllocation(1,1,'Before ')
        tsw.verifyColumnRowPortfolioAllocation(2,1,'Target ')
        tsw.verifyColumnRowPortfolioAllocation(3,1,'After ')

        //
        cy.log('TSW.UI.SP.12 - Verify that there are drift values ​​next to the before and after charts')
        tsw.verifyColumnRowPortfolioAllocation(1,3,'Drift 65.65% ')
        tsw.verifyColumnRowPortfolioAllocation(3,3,'Drift 65.31% ')

        //
        cy.log('TSW.UI.SP.17 - Verify that the table is displayed correctly')
        tsw.verifyStep3PortfolioAllocationTableHeadData(2,'Category')
        tsw.verifyStep3PortfolioAllocationTableHeadData(3,'Current')
        tsw.verifyStep3PortfolioAllocationTableHeadData(4,'Proposed')
        tsw.verifyStep3PortfolioAllocationTableHeadData(5,'Change')
        tsw.verifyStep3PortfolioAllocationTableBodyData2(1,2,'Cash')
        tsw.verifyStep3PortfolioAllocationTableBodyData2(2,2,'Short Term Bonds')
        tsw.verifyStep3PortfolioAllocationTableBodyData2(3,2,'Large Cap Growth Stocks')
        tsw.verifyStep3PortfolioAllocationTableBodyData2(4,2,'Large Cap Value Stocks')
        tsw.verifyStep3PortfolioAllocationTableBodyData2(5,2,'International Emerging Stocks')
        tsw.verifyStep3PortfolioAllocationTableBodyData2(6,2,'Short Term Bonds')
        tsw.verifyStep3PortfolioAllocationTableBodyData2(7,2,'Large Cap Value Stocks')
        tsw.verifyStep3PortfolioAllocationTableBodyData2(8,2,'International Emerging Stocks')
        tsw.verifyStep3PortfolioAllocationTableBodyData2(9,2,'Short Term Bonds')
        tsw.verifyStep3PortfolioAllocationTableBodyData3(1,'Taxable')
        tsw.verifyStep3PortfolioAllocationTableBodyData3(4,'Tax-Deferred')
        tsw.verifyStep3PortfolioAllocationTableBodyData3(7,'Tax-Free')

        //
        cy.log('TSW.UI.SP.19 - Verify "Tax Impact" tooltip text')
        tsw.getToolTipIconStep3('Tax Impact').click()
        tsw.getToolTipText().should('have.text','Below is a summary of the total Short-term and Long-term Gains and Losses for this portfolio with the corresponding net totals.')

        //
        cy.log('TSW.UI.SP.20 - Verify that there should be tables with Short-Term Gain, Short-Term Loss , Realized Net Short-Term Gain, change values.')
        tsw.verifyColumnRowTaxImpactTables(1,1,1,'Short-Term Gain')
        tsw.verifyColumnRowTaxImpactTables(1,1,2,'$0')
        tsw.verifyColumnRowTaxImpactTables(1,2,1,'Short-Term Loss')
        tsw.verifyColumnRowTaxImpactTables(1,2,2,'-$1,680')
        tsw.verifyColumnRowTaxImpactTables(1,3,1,'Realized Net Short-Term Gain')
        tsw.verifyColumnRowTaxImpactTables(1,3,2,'-$1,680')

        //
        cy.log('TSW.UI.SP.21 - Verify that there should be tables with Long-Term Gain, Long-Term Loss , Realized Net Long-Term Gain, change values.')
        tsw.verifyColumnRowTaxImpactTables(2,1,1,'Long-Term Gain')
        tsw.verifyColumnRowTaxImpactTables(2,1,2,'$0')
        tsw.verifyColumnRowTaxImpactTables(2,2,1,'Long-Term Loss')
        tsw.verifyColumnRowTaxImpactTables(2,2,2,'$0')
        tsw.verifyColumnRowTaxImpactTables(2,3,1,'Realized Net Long-Term Gain')
        tsw.verifyColumnRowTaxImpactTables(2,3,2,'$0')                             

        //
        cy.log('TSW.UI.SP.24 - Verify that when the Back button is clicked, it returns to the Options step and the data remains the same.')
        tsw.getBackButtonStep3().click().wait(2000)
        tsw.getWithdrawalAmountLevelArea(1,'Portfolio','portfolio').should('have.attr', 'value', '$2,800')
        tsw.getWithdrawalAmountLevelArea(3,'Taxable','taxable').should('have.attr', 'value', '$2,800')
        tsw.getWithdrawalAmountLevelArea(3,'Tax-Deferred','taxDeferred').should('have.attr', 'value', '')
        tsw.getWithdrawalAmountLevelArea(3,'Tax-Free','taxFree').should('have.attr', 'value', '')
        tsw.getWithdrawalAmountLevelArea(5,'Gamze','client1').should('have.attr', 'value', '$2,800')
        tsw.getDropdown().should('have.text','OpportunisticNoneFullOpportunistic')
        tsw.getToggle('isShortTerm').should('contain.html', 'checked')
        tsw.getToggle('isLongTerm').should('contain.html', 'checked')
        tsw.getToggleEditField('Short-Term Gain Limit').should('have.attr', 'value', '$1')
        tsw.getToggleEditField('Long-Term Gain Limit').should('have.attr', 'value', '$1')

        //
        cy.log('TSW.UI.SP.25 - Verify that there is a download pdf button and when clicked the report downloads in pdf format.')
        tsw.getNextButtonStep2().click().wait(3000)
        cy.intercept("POST", Cypress.env('backendUrl')+"/api/Reports/TaxSmartWithdrawal/*").as("buttonRequest");
        tsw.getDownloadPDF().click({ times: 3 })
        cy.downloadReport('TaxSmartWithdrawal')
    })
})

 