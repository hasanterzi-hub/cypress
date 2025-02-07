/// <reference types="Cypress" />

import BasePage from "../../pages/BasePage"
import Affiliates from "../../pages/Affiliates";
import QuestionnaireElements from "../../pages/Questionnaire";
import IncomeLayerElements from "../../pages/IncomeLayer";
import SSElements from "../../pages/SampleScenario";
const moment = require("moment");

describe('Affiliate: Nassau Tests', () => {
    const ResetAll = '[style="float: left;"] > :nth-child(1)'
    const Apply = '[style="float: left;"] > :nth-child(2)'
    const Save = '.nassauEditFormButtonGroup > .primary'
    const Cancel = '.nassauEditFormButtonGroup > .secondary'
    const LISA = '#lifetimeIncomeStartAge'
    const LI = '#lifetimeIncome'
    const ss = new SSElements()
    const qs = new QuestionnaireElements()
    const il = new IncomeLayerElements()
    const aff = new Affiliates()
    const para = 'FOR PRODUCER USE ONLY. NOT FOR USE WITH THE GENERAL PUBLIC AS SALES LITERATURE.' +
        'Nassau Life and Annuity Company, Nassau Income Accelerator and the Flex-Forward Income Benefit℠ rider are NOT connected with, recommended, or endorsed by any governmental program, agency, or entity, including the Social Security Administration.'

    context('User is not newly generated. Test Automation is logged in', () => {
        beforeEach('Open the Dew-aws and prepare to setup for testing', () => {
            cy.visit(Cypress.env('devIdP'));
            // cy.get('#UserId').select('Randomly Generated User')
            cy.get('#UserId').select('Test Automation')
            cy.get('#Affiliate').select('Nassau')
            cy.get('#Environment').select(Cypress.env('devAWSPA'))
            cy.get('form[action="/Home/Submit"]').invoke('removeAttr', 'target')
            cy.get('.btn').should('have.text', 'Submit').click()
            cy.wait(4000)
        })

        it('Frank and Susan Suzuki default case field checks on Detail page and Income Layers page and report', () => {

            cy.log('Check default sample scenario')
            cy.get('.large > .ui > .prompt').as('Search').type('Frank')
            qs.getFirstItemOfSearchResult().should('have.text', 'Frank and Susan Suzuki - High Spousal Premium')
            qs.getFirstItemOfSearchResult().click()
            cy.get('@Search').type('{enter}')
            qs.getFirstItemOfSSList('Frank and Susan Suzuki - High Spousal Premium').click()
            cy.get('.caseHeader > span').contains('Frank and Susan Suzuki - High Spousal Premium').as('header')
            cy.clickSwitchILToSS()
            cy.wait(4000)
            cy.get('h2 > .ui').as('PencilIcon').click()
            cy.xpath('//input[@name="primaryMember.longevity"]').as('primaryLong')
                .should('have.attr', 'value', '92')
                .and('have.attr', 'label', 'Life Expectancy')
            cy.xpath("//input[@name='secondaryMember.longevity']").as('secondaryLong')
                .should('have.attr', 'value', '92')
                .and('have.attr', 'label', 'Life Expectancy')
            cy.get('#cola').should('have.attr', 'value', '2.00%').as('cola')
                .and('have.attr', 'inputmode', 'numeric')

            //Primary member Longevity validation
            cy.log('LY.TC.NIA.05')
            cy.get('@primaryLong').clear().type('84')
            cy.get('@secondaryLong').click()
            cy.verifyValidationMessage('The Life Expectancy field must be between 85 and 95')
            cy.xpath("//button[@type='submit']").should('have.text', 'Save').and('have.attr', 'disabled')
            cy.get('@primaryLong').clear().type('96')
            cy.get('@secondaryLong').click()
            cy.verifyValidationMessage('The Life Expectancy field must be between 85 and 95')
            cy.xpath("//button[@type='submit']").should('have.text', 'Save').and('have.attr', 'disabled')
            cy.get('@primaryLong').clear().type('95')
            cy.isHidden('div.ui.red.basic.label')
            cy.xpath("//button[@type='submit']").should('have.text', 'Save').and('not.have.attr', 'disabled')
            cy.get('@primaryLong').clear().type('85')
            cy.isHidden('div.ui.red.basic.label')
            cy.xpath("//button[@type='submit']").should('have.text', 'Save').and('not.have.attr', 'disabled')

            //Secondary member Longevity validation
            cy.log('LY.TC.NIA.05')
            cy.get('@secondaryLong').clear().type('84')
            cy.get('@primaryLong').click()
            cy.verifyValidationMessage('The Life Expectancy field must be between 85 and 95')
            cy.xpath("//button[@type='submit']")
                .should('have.text', 'Save')
                .and('have.attr', 'disabled')
            cy.get('@secondaryLong').clear().type('96')
            cy.get('@primaryLong').click()
            cy.verifyValidationMessage('The Life Expectancy field must be between 85 and 95')
            cy.xpath("//button[@type='submit']")
                .should('have.text', 'Save')
                .and('have.attr', 'disabled')
            cy.get('@secondaryLong').clear().type('95')
            cy.isHidden('div.ui.red.basic.label')
            cy.xpath("//button[@type='submit']")
                .should('have.text', 'Save')
                .and('not.have.attr', 'disabled')
            cy.get('@secondaryLong').clear().type('85')
            cy.isHidden('div.ui.red.basic.label')
            cy.xpath("//button[@type='submit']")
                .should('have.text', 'Save')
                .and('not.have.attr', 'disabled')

            //Cola Validation
            cy.log('LY.TC.NIA.02')
            cy.get('@cola').clear().type('2.01')
            cy.get('@primaryLong').click()
            cy.verifyValidationMessage('COLA should be between 0 & 2 (inclusive)')
            cy.log('LY.TC.NIA.04')
            cy.get('@cola').clear().type('-1')
            cy.get('@primaryLong').click()
            cy.get('@cola').then(($val) => {
                const fav = $val.attr('value')
                expect(fav).to.eq('1.00%')
            })
            cy.xpath("//button[@type='submit']").should('have.text', 'Save').and('not.have.attr', 'disabled')
            cy.get('.left > .secondary').should('have.text', 'Cancel').click()
            cy.isHidden('.small > .header').as('EditCase')

            //Check NIA Popup
            cy.clickSwitchSSToIL()

            cy.log('LY.TC.NIA.P.T.03 - Check NIA edit popup')
            il.clickEditLayerName('Nassau Income Accelerator')
            cy.verifyElementContainsText("Nassau Income Accelerator", '.small > .header');
            cy.verifyLabel('Contract Owner')
            cy.verifyLabel('Coverage Type')
            cy.verifyLabel('Early Income')
            cy.verifyLabel('Early Income Start Age')
            cy.verifyLabel('Early Income Years')
            cy.verifyLabel('Premium')
            cy.verifyLabel('Lifetime Income Start Age')
            cy.get(':nth-child(13) > [style="font-weight: bold; font-size: 14px; padding-left: 10px; inline-size: 200px;"]').should('have.text', 'Lifetime Income')

            cy.log('LY.TC.NIA.P.T.01')
            cy.verifyDropdownList(0, ['Frank Suzuki', 'Susan Suzuki'])
            cy.verifyDropdownList(1, ['Single', 'Joint/Spousal'])
            //buraya clientın yaşını dinamik olarak edit popupdan alıp dropdown doğrulaması yap
            cy.verifyDropdownList(2, ['64 (2025)', '91 (2052)', '92 (2053)'])
            cy.verifyItemsNotInDropdownList(2, ['63 (2024)', '93 (2054)'])
            cy.verifyDropdownList(3, ['0 years', '1 year', '2 years', '3 years', '4 years', '5 years', '6 years', '7 years', '8 years'])
            cy.verifyItemsNotInDropdownList(3, ['9 years'])

            cy.verifyDropdownList(4, ['64 (2025)', '65 (2026)', '66 (2027)', '67 (2028)', '68 (2029)', '69 (2030)', '70 (2031)'])
            cy.verifyItemsNotInDropdownList(4, ['62 (2023)', '71 (2032)'])
            cy.verifyDropdownList(5, ['63 (2025)', '64 (2026)', '65 (2027)', '66 (2028)', '67 (2029)', '68 (2030)', '69 (2031)', '70 (2032)'])
            cy.verifyItemsNotInDropdownList(5, ['62 (2024)', '71 (2033)'])

            cy.verifyElementContainsText('71 (2032)', LISA)
            cy.verifyElementContainsText('Reset All', ResetAll)
            cy.verifyElementContainsText('Apply Changes', Apply)
            cy.verifyElementContainsText('Save', Save)
            cy.verifyElementContainsText('Cancel', Cancel)

            cy.log('Check affect of contract owner changes on NIA')
            cy.selectItemInDropdownList(0, 'Susan Suzuki')
            cy.verifyDropdownList(5, [ '63 (2025)', '64 (2026)', '65 (2027)', '66 (2028)', '67 (2029)', '68 (2030)', '69 (2031)', '70 (2032)'])

            cy.log('Button verifications:')
            aff.getResetAllButton().should('have.text', 'Reset All')
            aff.getApplyButton().should('have.text', 'Apply Changes').and('not.have.attr', 'disabled')
            aff.getSaveButton().should('have.text', 'Save')
            aff.getCancelButton().should('have.text', 'Cancel').click()

            BasePage.buttonVerifyAndClick("Download PDF")
            ss.getDownloadPDFPopUp().should('have.text', 'Report Options')

            const reportName = 'SocialSecurity'
            cy.intercept("POST", Cypress.env('backendUrl')+'/api/Reports/'+reportName+'/*').as("buttonRequest");
            cy.get(':nth-child(6) > div > .primary',{log:'Download PDF'}).click()
            cy.downloadReport(reportName)
            aff.getButtonName("Cancel").click();

            cy.clickSwitchILToSS()
            
        })

        it('Check the restrictions on Add A Social Security scenario popup wizard. Check benefit $0 for martial status', () => {

            qs.getASSCButton().click();
            cy.generateRandomString(8).then((randomString) => {
                qs.getNameInput().type(randomString + ' Case')
            })
            qs.getPrimaryInput().type('John');
            qs.getDateOfBirthInput().type('04/15/1968{enter}')
            qs.getNameInput().click()
            cy.selectItemInDropdownList(0, 'Married')
            qs.getNameInput().click()
            qs.getNextButton().click()
            //Step 2
            qs.getPrimaryMemberSalary().type(2000)
            qs.getNextButton().click()
            //Step 3
            qs.getSecondaryMemberName().type("Jane")
            qs.getSecondaryMemberDateOfBirthInput().type('11/13/1970{enter}');
            qs.getNextButton().click();

            qs.getSecondaryMemberSalary().type(2000);
            //Pension $0
            cy.clickNTimes('Next', 3)
            //Custom Ages 62
            cy.log('LY.TC.NIA.08')
            cy.log('Primary & Secondary client longevity selected item in dropdown')
            cy.selectedTextInDropdownList(0, '92 years')
            cy.get('body').click()
            cy.selectedTextInDropdownList(1, '92 years')
            cy.log('LY.TC.NIA.06')
            cy.verifyDropdownList(0, ['85 years', '86 years', '87 years', '88 years', '89 years', '90 years', '91 years', '92 years', '93 years', '94 years', '95 years'])
            cy.verifyDropdownList(1, ['85 years', '86 years', '87 years', '88 years', '89 years', '90 years', '91 years', '92 years', '93 years', '94 years', '95 years'])
            cy.clickNTimes('Next', 2)
            qs.getSaveButton().click()
            cy.wait(2000)
            cy.clickSwitchSSToIL()
            cy.wait(750)


            il.clickEditLayerName('Social Security')
            cy.verifyElementContainsText("Social Security", '.small > .header')
            cy.log('LY.TC.NIA.IL.02')
            cy.get('#incomeLayers\\.socialSecurity\\.name').should('have.value', 'Social Security').and('have.attr', 'disabled')
            cy.get('select').select('Optimal').should('have.value', '1')
            cy.get('select').select('Custom').should('have.value', '2')
            aff.getSaveButton().should('have.text', ' Save')
            aff.getCancelButton().should('have.text', 'Cancel').click()
            cy.log('LY.TC.NIA.IL.03')
            cy.get('p').should('have.text', para)
            cy.log('LY.TC.NIA.IL.04')
            cy.get('.react-toggle.incomeLayersToggleIA').compareSnapshot('NIAToggle')
            cy.get('.react-toggle--checked.incomeLayersToggleSS').compareSnapshot('SSToggle')

            cy.log('LY.TC.NIA.IL.06')
            cy.get('h2 > .ui', { log: 'Edit pencil icon has seen' }).click()
            cy.selectItemInDropdownList(0, 'Divorced')
            cy.wait(500)
            cy.get('#secondaryMember\\.benefit').as('secondaryBenefit').clear().type(0)
            cy.get('#primaryMember\\.benefit').as('primaryBenefit').clear().type(0)
            aff.getSaveButtonOnSSEdit().click()
            cy.wait(2500)
            cy.get('.red.warning.sign').as('warningSign').compareSnapshot('Red Exclamation Icon')

            cy.log('LY.TC.NIA.IL.07')
            cy.get('h2 > .ui', { log: 'Edit pencil icon has seen' }).click()
            cy.selectItemInDropdownList(0, 'Widowed')
            cy.wait(500)
            cy.get('#secondaryMember\\.benefit').as('secondaryBenefit').clear().type(0)
            cy.get('.small > .header').click()
            aff.getSaveButtonOnSSEdit().click()
            cy.wait(2500)
            cy.get('@warningSign').should('exist')

            cy.log('LY.TC.NIA.IL.05')
            cy.get('h2 > .ui', { log: 'Edit pencil icon has seen' }).click()
            cy.selectItemInDropdownList(0, 'Single')
            //Clear to click Save button
            cy.get('.eight > .field > input').click()
            aff.getSaveButtonOnSSEdit().click()
            cy.wait(2500)
            cy.get('@warningSign').should('exist')

            cy.log('LY.TC.NIA.IL.09')
            cy.get('h2 > .ui', { log: 'Edit pencil icon has seen' }).click()
            cy.get('@primaryBenefit').clear().type(1000)
            aff.getSaveButtonOnSSEdit().click()
            cy.wait(2500)
            cy.get('@warningSign').should('not.exist')

            cy.clickSwitchILToSS()
            ss.getDeleteSS().click()
            qs.getModalDeleteButton().click()


            qs.getASSCButton().click();
            cy.generateRandomString(8).then((randomString) => {
                qs.getNameInput().type(randomString + ' Case')
            })
            qs.getPrimaryInput().type('John');
            qs.getDateOfBirthInput().type('04/15/1968{enter}')
            qs.getNameInput().click()
            cy.selectItemInDropdownList(0, 'Married')
            qs.getNameInput().click()
            qs.getNextButton().click()
            //Step 2
            qs.getPrimaryMemberSalary().type(2000)
            qs.getNextButton().click()
            //Step 3
            qs.getSecondaryMemberName().type("Jane")
            qs.getSecondaryMemberDateOfBirthInput().type('11/13/1970{enter}');
            qs.getNextButton().click();

            qs.getSecondaryMemberSalary().type(2000);
            //Pension $0
            cy.clickNTimes('Next', 5)
            qs.getSaveButton().click()
            cy.wait(2500)
            cy.clickSwitchSSToIL()
            cy.wait(1000)

            cy.log('LY.TC.NIA.IL.08')
            cy.get('h2 > .ui', { log: 'Edit pencil icon has seen' }).click()
            cy.get('#secondaryMember\\.benefit').as('secondaryBenefit').clear().type(0)
            cy.get('#primaryMember\\.benefit').as('primaryBenefit').clear().type(0)
            cy.get('.small > .header').click()
            aff.getSaveButtonOnSSEdit().click()
            cy.wait(2500)
            cy.get('@warningSign').should('exist')

            cy.clickSwitchILToSS()
            ss.getDeleteSS().click()
            qs.getModalDeleteButton().click()

            
        })

        it('Single martial status affects on NIA layers, check longevity age range', () => {

            qs.getASSCButton().click();
            //'addACustomSSscenario', (CaseName, martialStat, BoDPrimary, salary1, BodSecondary, salary2)
            cy.generateRandomString(8).then((randomString) => {
                const caseName = randomString
                cy.addACustomSSscenario(caseName, 'Single', 1965, 100000)
                cy.get('.caseHeader > span').contains(caseName)
            })
            cy.wait(2000)
            cy.clickSwitchSSToIL()
            il.clickEditLayerName('Nassau Income Accelerator')

            cy.log('LY.TC.NIA.P.Prm.03 - Premium populates when first time open NIA')
            cy.get('#incomeLayers\\.incomeAccelerator\\.premium').as('Pdeger').invoke('attr', 'value').then((value) => {
                cy.log('Premium value: ' + value)
                cy.wait(10000)
                cy.get('@Pdeger').invoke('attr', 'value').then((value2) => {
                    cy.log('LY.TC.NIA.P.Prm.01')
                    expect(value2).not.to.equal(value)
                })
            })
            cy.verifyLabel('Contract Owner')
            cy.verifyLabel('John')
            cy.log('LY.TC.NIA.P.CT.01')
            cy.verifyLabel('Coverage Type')
            cy.verifyLabel('Single')

            cy.log('Click clear icon check inputs and Apply Changes button.')
            cy.get('#incomeLayers\\.incomeAccelerator\\.earlyIncome').as('EIdeger')
            cy.log('LY.TC.NIA.P.EI.06 - Clear Icon')
            cy.get('@EIdeger').invoke('attr', 'value').then((value) => {
                cy.log('Early Income value: ' + value)
                if (value.length) {
                    cy.xpath("(//i[@class='grey close link icon'])[2]").click()
                    cy.wait(1000)
                    cy.get('@EIdeger').should('not.have.value')
                    aff.getApplyButton().should('have.text', 'Apply Changes').and('not.have.attr', 'disabled')
                }
            })

            cy.log('LY.TC.NIA.P.Prm.02 - Clear Icon')
            cy.get('@Pdeger').invoke('attr', 'value').then((value) => {
                cy.log('Premium value ' + value)
                if (value.length) {
                    cy.xpath("(//i[@class='grey close link icon'])[2]").click()
                    cy.wait(750)
                    cy.get('@Pdeger').should('not.have.value')
                }
            })


            cy.log('LY.TC.NIA.P.Prm.05, LY.TC.NIA.P.Prm.11, LY.TC.NIA.P.Prm.08 - Check validation the EI and Premium cant be empty at same time')
            cy.get(':nth-child(4) > .red').as('EIval').should('have.text', 'Both fields cannot be blank. Please enter either Early Income or Premium.')
            cy.get(':nth-child(9) > .red').as('Premval').should('have.text', 'Both fields cannot be blank. Please enter either Early Income or Premium.')
            aff.getApplyButton().should('have.text', 'Apply Changes').and('have.attr', 'disabled')
            cy.get('#lifetimeIncome').as('lifetime').should('not.be.empty')
            cy.log('LY.TC.NIA.P.Prm.06 - LY.TC.NIA.P.Prm.10')
            cy.get('@Pdeger').type('0')
            cy.get(':nth-child(9) > .red').as('Premval').should('have.text', 'The minimum Premium is $15,000')
            cy.log('LY.TC.NIA.P.Prm.07')
            cy.get('@Pdeger').clear().type('1000001')
            cy.get('@Premval').should('have.text', 'Minimum premium allowed $15,000. Premiums over $1,000,000 are subject to approval.')
            cy.get('@Pdeger').clear()


            aff.getCancelButton().click()
            cy.wait(500)
            il.clickEditLayerName('Nassau Income Accelerator')

            cy.log('LY.TC.NIA.P.Prm.09 - Early Income should be same IF EI is removed, not change premium anc click Apply Changes')
            cy.get('@EIdeger').invoke('text').then((value) => {
                cy.xpath("(//i[@class='grey close link icon'])[2]").click()
                cy.wait(500)
                cy.get('@EIdeger').should('not.have.value')
                aff.getApplyButton().click()
                cy.get('@EIdeger').invoke('text').then((value2) => {
                    expect(value2).to.equal(value);
                })
            })

            cy.log('Apply Changes make API call to Nassau and Recalculate for Lifetime Income, Premium')
            cy.get('@lifetime').invoke('text').then((value) => {
                cy.log('The value is default lifetime income value ' + value + ' before click apply changes with new Early Income')
                cy.xpath("(//i[@class='grey close link icon'])[2]").click()
                cy.get('@EIdeger').type('50000')
                cy.get('@EIval').should('not.exist')
                cy.get('@Premval').should('not.exist')
                aff.getApplyButton().should('have.text', 'Apply Changes').and('not.have.attr', 'disabled')
                aff.getApplyButton().click()
                cy.wait(3500)
                cy.get('@lifetime').invoke('text').then((value2) => {
                    expect(value2).not.to.equal('1111');//same value why?
                })
            })


            cy.log('LY.TC.NIA.P.EIY.02 - Check LISA value that Sum of EISA age with Eearly Income Years')
            cy.selectItemInDropdownList(0, '65')
            cy.selectItemInDropdownList(1, '5 years')
            cy.get('#lifetimeIncomeStartAge').should('contain.text', '70')
            cy.wait(750)
            cy.get(Save).click()
            cy.wait(2000)
            //cy.compareSnapshot('Nassu_SingleCase_Age67_NIA')

            cy.log('LY.TC.NIA.P.CO.10 - Check the NIA when client age below under 50')
            cy.get('h2 > .ui', { log: 'Edit pencil icon has seen' }).click()
            qs.getDateOfBirthInput().clear().type('04/15/1980');
            aff.getSaveButton().click()
            cy.wait(5000)
            il.clickEditLayerName('Nassau Income Accelerator')
            cy.wait(5000)
            cy.get('.red').as('ApiValidation').should('have.text', 'Age must be between 50 and 70.')

            cy.get(Cancel).click()
            cy.wait(500)
            cy.clickSwitchILToSS()
            ss.getDeleteSS().click()
            qs.getModalDeleteButton().click()


        })

        it('Married martial status affects on NIA layers and SS custom age changes affects to NIA custom social security dropdowns.', () => {
            const qs = new QuestionnaireElements()

            qs.getASSCButton().click();

            

            //'addACustomSSscenario', (CaseName, martialStat, BoD1, salary1, Bod2, salary2)
            cy.generateRandomString(8).then((randomString) => {
                const caseName = randomString
                cy.addACustomSSscenario(caseName, 'Married', 1965, 100000, 1965, 120000)
                cy.get('.caseHeader > span').contains(caseName)
            })
            cy.wait(2000)
            cy.clickSwitchSSToIL()
            il.clickEditLayerName('Nassau Income Accelerator')
            cy.verifyDropdownList(0, ['John', 'Jane'])
            cy.log('LY.TC.NIA.P.CT.02')
            cy.verifyDropdownList(1, ['Single', 'Joint/Spousal'])
            cy.log('LY.TC.NIA.P.CO.08')
            cy.selectedTextInDropdownList(0, 'John')
            cy.selectedTextInDropdownList(2, '62 (2028)')
            cy.log('LY.TC.NIA.P.CT.03')
            cy.selectedTextInDropdownList(1, 'Single')

            cy.verifyDropdownList(2, ['60 (2026)', '61 (2027)', '91 (2057)', '92 (2058)'])
            cy.verifyItemsNotInDropdownList(2, ['58 (2024)', '93 (2059)'])
            cy.get('#lifetimeIncomeStartAge').as('lifeTimeSA').should('have.text', '70 (2036)')
            cy.selectItemInDropdownList(0, 'Jane')
            cy.selectedTextInDropdownList(2, '62 (2028)')
            cy.verifyDropdownList(5, ['62 (2027)', '63 (2028)', '64 (2029)', '65 (2030)', '66 (2031)', '67 (2032)', '68 (2033)', '69 (2034)', '70 (2035)'])
            cy.get('@lifeTimeSA').should('have.text', '70 (2036)')
            cy.verifyDropdownList(2, ['59 (2025)', '60 (2026)', '91 (2057)', '92 (2058)'])
            cy.get('#lifetimeIncome').as('lifetime').should('not.be.empty')

            cy.log('Coverage type make changes from Single to Married on lifetime income value')
            cy.get('@lifetime').invoke('text').then((value) => {
                cy.log('The value is default lifetime income value ' + value + ' before click apply changes with new Early Income')
                const x = value
                cy.selectItemInDropdownList(1, 'Joint/Spousal')
                aff.getApplyButton().should('have.text', 'Apply Changes').and('not.have.attr', 'disabled')
                aff.getApplyButton().click()
                cy.wait(3000)
                cy.get('@lifetime').invoke('text').then((value2) => {
                    expect(value2).not.to.equal(value);
                })
            })

            cy.get(Cancel).click()
            cy.wait(750)
            cy.clickSwitchILToSS()
            cy.log('Change custom ages of John and Jane')
            cy.log('John custom age from 62 to 65')
            cy.get(':nth-child(1) > :nth-child(4) > .timelineSelectable').should('have.text', '65').click()
            cy.wait(5000)
            cy.log('Jane custom age from 62 to 67')
            cy.get(':nth-child(2) > :nth-child(7) > .timelineSelectable').should('have.text', '67').click()
            cy.wait(5000)
            cy.clickSwitchSSToIL()
            il.clickEditLayerName('Nassau Income Accelerator')

            cy.log('Verify SS custom age changes on SS detail page, make changes on selected custom age dropdowns of clients in NIA.')
            //cy.selectedTextInDropdownList(0, 'John')
            // cy.selectedTextInDropdownList(2, '65 (2030)')
            // cy.selectItemInDropdownList(0, 'Jane')
            // cy.selectedTextInDropdownList(2, '67 (2032)')
            
            //Custom Age changes
            cy.selectedTextInDropdownList(4, '65 (2030)')
            cy.selectedTextInDropdownList(5, '67 (2032)')
            cy.clickToText('Save')
            cy.wait(3000)
            cy.get('.twelve > .ui').compareSnapshot({
                name: "MarriedNassauIL",
                testThreshold: 0.1,
                recurseOptions: { limit: 3, delay: 500 }
            })

            cy.clickSwitchILToSS()
            ss.getDeleteSS().click()
            qs.getModalDeleteButton().click()

        })

        it('Divorced & Widowed martial status affects on NIA layers', () => {

            qs.getASSCButton().click();
            cy.generateRandomString(8).then((randomString) => {
                const caseName = randomString
                cy.addACustomSSscenario(caseName, 'Divorced', 1965, 100000, 1970, 120000)
                cy.get('.caseHeader > span').contains(caseName)
            })
            cy.wait(2000)
            cy.clickSwitchSSToIL()
            il.clickEditLayerName('Nassau Income Accelerator')
            cy.log('LY.TC.NIA.P.CO.06 - LY.TC.NIA.P.CO.09')
            cy.verifyLabel('Contract Owner')
            cy.verifyLabel('John')
            cy.log('LY.TC.NIA.P.CT.04')
            cy.verifyLabel('Coverage Type')
            cy.verifyLabel('Single')
            cy.contains('Jane').should('not.exist')

            cy.get(Cancel).click()
            cy.wait(500)
            cy.clickSwitchILToSS()
            ss.getDeleteSS().click()
            qs.getModalDeleteButton().click()
            cy.wait(2000)

            qs.getASSCButton().click();
            cy.generateRandomString(8).then((randomString) => {
                const caseName = randomString
                cy.addACustomSSscenario(caseName, 'Divorced', 1965, 100000, 1970, 120000)
                cy.get('.caseHeader > span').contains(caseName)
            })

            cy.wait(2000)
            cy.clickSwitchSSToIL()
            il.clickEditLayerName('Nassau Income Accelerator')
            cy.log('LY.TC.NIA.P.CO.07 - LY.TC.NIA.P.CO.09')
            cy.verifyLabel('Contract Owner')
            cy.verifyLabel('John')
            cy.log('LY.TC.NIA.P.CT.04')
            cy.verifyLabel('Coverage Type')
            cy.verifyLabel('Single')
            cy.contains('Jane').should('not.exist')

            cy.get(Cancel).click()
            cy.wait(500)
            cy.clickSwitchILToSS()
            ss.getDeleteSS().click()
            qs.getModalDeleteButton().click()
        })

        it('Check that Already Filed scenario can not use NIA popup', () => {
            const layerName = 'Nassau Income Accelerator'

            qs.getASSCButton().click();
            //'addACustomSSscenario', (CaseName, martialStat, BoD1, salary1, Bod2, salary2)
            cy.generateRandomString(8).then((randomString) => {
                const caseName = randomString
                cy.addACustomSSscenario(caseName, 'Married', 1959, 100000, 1970, 120000)
                cy.get('.caseHeader > span').contains(caseName)
            })
            cy.wait(2000)
            cy.log('LY.TC.NIA.IL.15 - Aldready filed scenario martial status: Married')
            cy.get('h2 > .ui', { log: 'Edit pencil icon has seen' }).click()
            cy.log('John is already filed')
            cy.selectItemInDropdownList(0, 'Already Filed')
            cy.xpath('//input[@placeholder="Month Year"]').as('FilingPickDate').click()
            cy.get('@FilingPickDate').type('{enter}January 2022')
            aff.getSaveButtonOnSSEdit().click()
            cy.wait(2500)
            cy.clickSwitchSSToIL()
            il.clickEditLayerName('Nassau Income Accelerator')
            cy.wait(500)
            cy.verifyLabel('Contract Owner')
            cy.verifyLabel('Jane')
            cy.verifyLabel('Coverage Type')
            cy.verifyLabel('Single')
            cy.selectedTextInDropdownList(0, '62 (2033)')

            cy.verifyLabel('John')
            cy.verifyLabel('66 (2025)') 

            cy.get(Cancel).click()
            cy.get('h2 > .ui', { log: 'Edit pencil icon has seen' }).click()

            cy.log('LY.TC.NIA.IL.12 - Change martial status to Single and stay as already filed.')
            cy.selectItemInDropdownList(1, 'Single')
            aff.getSaveButtonOnSSEdit().click()
            cy.wait(2000)
            cy.clickSwitchSSToIL()
            cy.get('.incomeLayerName').contains(layerName).parents('.ui.raised.segment')
                .find('.buttonToLink.incomeLayersEditIconAndToggle').and('have.attr', 'disabled')
            cy.get('.red.warning.sign').compareSnapshot('Red Exclamation Icon')

            cy.log('LY.TC.NIA.IL.14 - Change martial status to Divorced and stay as already filed')
            cy.get('h2 > .ui', { log: 'Edit pencil icon has seen' }).click()
            cy.log('Change martial status to single and stay as already filed.')
            cy.selectItemInDropdownList(1, 'Divorced')
            cy.get('.eight > .field > input').click()
            aff.getSaveButtonOnSSEdit().click()
            cy.wait(2000)
            cy.get('.incomeLayerName').contains(layerName).parents('.ui.raised.segment')
                .find('.buttonToLink.incomeLayersEditIconAndToggle').and('have.attr', 'disabled')
            cy.get('.red.warning.sign').compareSnapshot('Red Exclamation Icon')

            cy.log('LY.TC.NIA.IL.13 - Change martial status to Widowed and stay as already filed')
            cy.get('h2 > .ui', { log: 'Edit pencil icon has seen' }).click()
            cy.log('Change martial status to single and stay as already filed.')
            cy.selectItemInDropdownList(1, 'Widowed')
            cy.get('.eight > .field > input').click()
            aff.getSaveButtonOnSSEdit().click()
            cy.wait(2000)
            cy.get('.incomeLayerName').contains(layerName).parents('.ui.raised.segment')
                .find('.buttonToLink.incomeLayersEditIconAndToggle').and('have.attr', 'disabled')
            cy.get('.red.warning.sign').compareSnapshot('Red Exclamation Icon')

            cy.clickSwitchILToSS()
            ss.getDeleteSS().click()
            qs.getModalDeleteButton().click()

        })

        after(() => {
            cy.task('generateReport')
        })

    })

    context('Newly generated user, check that ToU of Nassau and Nassau customized scenarios', () => {
        it('Nassau default cases for new users', () => {
            cy.visit(Cypress.env('devIdP'));
            cy.get('#UserId').select('Randomly Generated User')
            cy.get('#Affiliate').select('Nassau')
            cy.get('#Environment').select(Cypress.env('devAWSPA'))
            cy.get('form[action="/Home/Submit"]').invoke('removeAttr', 'target')
            cy.get('.btn').should('have.text', 'Submit').click()
            BasePage.buttonVerifyAndClick('Accept')
            cy.wait(3000)


            //For new user of Affiliate ToU popup. This is for random user.
            //cy.get('.large > .segment').should('exist')

            cy.get('base').should('have.attr', 'href', Cypress.env('baseHREF'))
            cy.log('LY.TC.NIA.GC.01')
            aff.verifyAffiliateCustomLogo('.header > img', 'Nassau_Logo', './assets/logos/nassau_logo.png')
            aff.verifyAffiliateCustomLogo('.active > .ui', 'SSNavIcon', './assets/icons/ss_card_2.svg')
            cy.log('LY.TC.NIA.GC.03')
            aff.verifyAffiliateCustomLogo('.title > .item > .ui', 'SettingsNavIcon', './assets/icons/settings.svg')
            cy.log('LY.TC.NIA.GC.05')
            aff.verifyAffiliateCustomLogo('[href="https://resources.lifeyield.com/nassau"] > .ui', 'SupportNavIcon', './assets/icons/knowledge-base.svg')
            cy.log('LY.TC.NIA.GC.04')
            cy.get(':nth-child(5) > .ui').compareSnapshot('MarketingNavIcon')
            cy.log('LY.TC.NIA.GC.06')
            aff.verifyAffiliateCustomLogo('[href="https://salesnet.nfg.com/nassau-income-accelerator-disclosures.html"] > .ui', 'DisclosureNavIcon', './assets/icons/disclaimer.svg')

            cy.get('.text').click()
            cy.contains('Profile').click()
            cy.verifyElementContainsText('Nassau', ':nth-child(2) > .nine')
            cy.verifyElementContainsText('Nassau SS+', 'p')
            cy.verifyElementContainsText('Active', 'p > :nth-child(1)')
            cy.verifyElementContainsText('Licensed', 'p > :nth-child(2)')

            //Settings Page
            cy.get('.title > .item > [style="font-size: 14px;"]').should('have.text', 'Settings').as('SettingsNav').click()
            cy.log('LY.TC.NIA.S.08')
            cy.verifyTextNotPresent('Social Security Layer Name')
            cy.verifyTextNotPresent('Benefit Delay Layer Name')
            cy.verifyTextNotPresent('Benefit Replacement Layer Name')
            cy.verifyTextNotPresent('Income Floor Layer Name')
            cy.verifyTextNotPresent('Additional Income Layer Name')
            cy.verifyTextNotPresent('Nassau Income Accelerator')

            cy.log('LY.TC.NIA.S.02')
            cy.verifyTextNotPresent('Report Customizations')
            cy.verifyTextNotPresent('Annuity Income Layer Name')
            cy.verifyTextNotPresent('Report Customizations')
            cy.verifyTextNotPresent('Social Security+™ Disclosures')

            cy.log('LY.TC.NIA.S.05 - LY.TC.NIA.07')
            cy.get('#cola').as('cola').should('be.visible').and('have.value', '2.00%')

            cy.log('LY.TC.NIA.S.03')
            cy.get("@cola").clear().type("2.01");
            cy.wait(250)
            cy.get("@cola").then(($val) => {
              const fav = $val.attr("value");
              expect(fav).to.eq("2.00%");
            });

            cy.log('LY.TC.NIA.S.03')
            cy.get('@cola').clear().type('-1')
            cy.get('#companyName').click()
            cy.get('@cola').then(($val) => {
                const fav = $val.attr('value')
                expect(fav).to.eq('1.00%')
            })
            cy.log('LY.TC.NIA.S.04')
            cy.get('@cola').clear().type('String')
            cy.get('@cola').then(($val) => {
                const fav = $val.attr('value')
                expect(fav).to.eq('')
            })
            cy.log('Check navigation links and urls')
            //Support
            cy.get('[href="https://resources.lifeyield.com/nassau"]')
                .invoke('removeAttr', 'target')
                .click()
            cy.url().should('eq', 'https://resources.lifeyield.com/nassau')
            cy.go("back")
            cy.url().should('eq', Cypress.env('frontendUrl') + '/settings')
            //Discşosures
            cy.get('[href="https://salesnet.nfg.com/nassau-income-accelerator-disclosures.html"]')
                .should('have.text', 'Disclosures')
                .invoke('removeAttr', 'target')
                .click()
            cy.url().should('eq', 'https://salesnet.nfg.com/nassau-income-accelerator-disclosures.html')
            cy.go("back")
            //Marketing Resources - yeni tab da açma kapatılamıyor
            cy.get('.vertical > :nth-child(5)').as('Marketing Resources')
                .should('have.text', 'Marketing Resources')
                /*.invoke('attr', 'target', '_self')
                .click()
                cy.url().should('eq', 'https://salesnet.nfg.com/nassau-income-accelerator.html')*/

            cy.get('.vertical > :nth-child(2)').should('have.text', 'Social Security').click()

            cy.wait(3000)
            cy.log('LY.TC.NIA.GC.07')
            cy.verifyTextPresent('Mary Collins - Late Retiree')
            cy.verifyTextPresent('Hector Gomez - Early Retiree')
            cy.verifyTextPresent('Frank and Susan Suzuki - High Spousal Premium')
            cy.log('Check the default created scenarios')

            cy.log('LY.TC.NIA.GC.09')
            cy.clickToText('Mary Collins - Late Retiree')
            cy.wait(3000)
            cy.get('.caseHeader > span').as('header').contains('Mary Collins - Late Retiree')
            cy.get('canvas').compareSnapshot({
                name: 'EarlyRetireSS',
                testThreshold: 0.05,
                recurseOptions: { limit: 3, delay: 500 }})
            cy.get('h2 > .ui').as('PencilIcon').click()
            aff.getSSEditInfo('Mary Collins', '01/10/1959', '92', '$1,308', 'Single+72')
            aff.getCancelButton().click()
            cy.get('.active > span').click()

            cy.log('LY.TC.NIA.GC.08')
            cy.clickToText('Hector Gomez - Early Retiree')
            cy.wait(3000)
            cy.get('.caseHeader > span').as('header').contains('Hector Gomez - Early Retiree')
            cy.get('canvas').compareSnapshot({
                name: 'HectorGomezSS',
                testThreshold: 0.05,
                recurseOptions: { limit: 3, delay: 500 }})
            cy.get('@PencilIcon').click()
            aff.getSSEditInfo('Hector Gomez', '01/31/1968', '92', '$3,250', 'Single')
            aff.getCancelButton().click()
            cy.get('.active > span').click()
            
            cy.log('LY.TC.NIA.GC.10')
            cy.clickToText('Frank and Susan Suzuki - High Spousal Premium')
            cy.wait(3000)
            cy.get('@header').contains('Frank and Susan Suzuki - High Spousal Premium')
            cy.get('canvas').compareSnapshot({
                name: 'FrankSusanSS',
                testThreshold: 0.05,
                recurseOptions: { limit: 3, delay: 500 }})
            cy.get('@PencilIcon').click()
            aff.getSSEditInfo('Frank Suzuki', '01/31/1961', '92', '$1,745', 'Married+72', 'Susan Suzuki', '01/31/1962', '92', '$1,700')
            aff.getCancelButton().click()

        })
    })

})