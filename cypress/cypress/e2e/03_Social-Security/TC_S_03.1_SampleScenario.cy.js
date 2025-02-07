/// <reference types="Cypress" />

import BasePage from "../../pages/BasePage"
import Login from "../../pages/LoginPage"
import SSElements from "../../pages/SampleScenario"
import QuestionnaireElements from "../../pages/Questionnaire"





describe('This is Sample Scenario default configuration and Search functions suite', () => {
    const ss = new SSElements()
    const lg = new Login()
    const qs = new QuestionnaireElements()

    beforeEach(() => {
        cy.visit(Cypress.env('frontendUrl'));
        lg.lastEmailLogin()
        cy.document().should('have.property', 'charset').and('eq', 'UTF-8')
    })

    context('Default case Sample Scenario data and UI Tests', () => {
        beforeEach(() => {
            const lg = new Login()
            const ss = new SSElements()

            lg.afterLoginCheckSSPage()
            ///Search the case:
            ss.searchTextOnSSListTable('Sample Scenario')
            cy.clickSwitchILToSS()
        })

        it('Verify Default Sample Scenario buttons and chart data with visual comparison', () => {
            cy.log('LY.TC.SSA.SS.M.01 - Check when the user clicks on sample scenario case in SSA-cases page of the SSA')
            cy.get('canvas[role="img"]').should('be.visible')
            //cy.get('[style="margin-top: 62px; margin-bottom: 14px;"] > :nth-child(1)').compareSnapshot('Default Sample Scenario', 0.1)
            cy.get('.caseHeader > span').contains('Sample Scenario').as('header')


            cy.log('LY.TC.SSA.SS.M.06 - Check when user hover mouse cursor on monthly chart')
            cy.get('.btnActive > .chartTypeLabel1').should('be.visible').and('have.text', 'Monthly')
            cy.get('canvas[role="img"]').compareSnapshot({
                name: 'Monthly',
                testThreshold: 0.05,
                recurseOptions: { limit: 3, delay: 500 }});
            cy.wait(1000)



            cy.log('LY.TC.SSA.SS.M.07 - Check when user click Annual tab on SS layer page')
            cy.get(':nth-child(3) > .chartTypeLabel1').should('have.text', 'Annual').click().as('Annual')
            cy.wait(1000)
            cy.log('LY.TC.SSA.SS.M.08 - Check when user hover mouse cursor on annual chart')
            cy.get('canvas[role="img"]').compareSnapshot({
                name: 'Annual',
                testThreshold: 0.05,
                recurseOptions: { limit: 3, delay: 500 }}
                )

            cy.log('LY.TC.SSA.SS.M.09 - Check when user click Cumulative tab on SS layer page')
            cy.get(':nth-child(5) > .chartTypeLabel1').should('have.text', 'Cumulative').click().as('Cumulative')
            cy.wait(1000)

            cy.log('LY.TC.SSA.SS.M.10 - Check when user hover mouse cursor on cumulative chart')
            cy.get('canvas[role="img"]').compareSnapshot({
                name: 'Cumulative',
                testThreshold: 0.05,
                recurseOptions: { limit: 3, delay: 500 }})

            cy.get('.chartTypeHeader > :nth-child(1)').click({ log: "Monthly Clicked" })

            cy.log('LY.TC.SSA.SS.M.02 - Check the SSA-cases  page, click the \'Sample Scenario\' case name displayed in the page')
            ss.getDeleteSS().should('have.text', 'Delete Case').scrollIntoView()
            ss.getDuplicateSS().should('have.text', 'Duplicate Case')
            ss.getHelpIcon().find('.question')
            ss.getSwitchSS().scrollIntoView().should('have.text', ' Social Security')
            ss.getSwitchIL().should('have.text', 'Income Layers')
            ss.getSwitch()

            ss.verifySSHelpIconAndText()

            cy.log('LY.TC.SSA.SS.M.05 - Check when the user clicks the Income Layers switch button in the sample scenario')
            ss.getDownloadPDF().should('contain', 'Download PDF').as('DownloadPDF').click()
            ss.getDownloadPDFPopUp().should('have.text', 'Report Options')
            ss.getDownloadPDFInPopUp().should('have.text', 'Download PDF')
            cy.get('div.sixteen.wide.column > span').should('have.text', 'Select filing strategies for the report:');
            cy.get('div.ui.input').should('contain', 'Optimal:');
            cy.get('div.ui.input').should('contain', 'Custom:');
            ss.getToggleOptimalInPopUp().should('be.visible');
            ss.getToggleCustomInPopUp().should('be.visible');

            cy.get(':nth-child(6) > div > .secondary').should('have.text', 'Cancel').click()

        })

        it('Check custom and optimal age bars', () => {
            cy.log('LY.TC.SSA.SS.M.11 - Check custom and optimal age bars')
            cy.get('[style="background-color: rgb(97, 146, 41); padding: 5px;"]', { log: 'Optimal bar element has seen.' })
            cy.get('[style="background-color: rgb(16, 92, 145); padding: 5px;"]', { log: 'Custom bar element has seen.' })
            cy.get('h2 > .ui', { log: 'Edit pencil icon has seen' }).screenshot('Edit Icon')
            cy.get('body').contains('No Benefit', { log: 'No Benefit has seen' })
            cy.get('body').contains('Own Benefit', { log: 'Own Benefit has seen' })
            cy.get('body').contains('Survivor Benefit', { log: 'Survivor Benefit has seen' })
            cy.get('body').contains('Spousal Benefit', { log: 'Spousal Benefit has seen' })
            cy.get('.timelineLegend').compareSnapshot({
                name: 'timelineLegend',
                testThreshold: 0.05,
                recurseOptions: { limit: 3, delay: 500 }});

            cy.log('LY.TC.SSA.SS.M.14 - Check clickable ages')
            cy.get(':nth-child(1) > .timelineSelected').should('have.text', '62').as('Age 62')
            cy.get(':nth-child(2) > .timelineSelectable').should('have.text', '63').as('Age 63')
            cy.get(':nth-child(3) > .timelineSelectable').should('have.text', '64').as('Age 64')
            cy.get(':nth-child(4) > .timelineSelectable').should('have.text', '65').as('Age 65')
            cy.get(':nth-child(5) > .timelineSelectable').should('have.text', '66').as('Age 66')
            cy.get(':nth-child(6) > .timelineSelectable').should('have.text', '67').as('Age 67')
            cy.get(':nth-child(7) > .timelineSelectable').should('have.text', '68').as('Age 68')
            cy.get(':nth-child(8) > .timelineSelectable').should('have.text', '69').as('Age 69')
            cy.get(':nth-child(1) > :nth-child(9) > .timelineSelectable').should('have.text', '70').as('Age 70')
        })

        it('Check under chart descriptions section', () => {
            cy.log('LY.TC.SSA.SS.M.15 - Check under chart descriptions section')
            cy.get('div:nth-child(1) > h3', { log: 'Optimal column' }).should('have.text', 'Optimal Filing Strategy')

            cy.get('.padded > div:nth-child(1) > .filingList > li', { log: 'Optimal column' })
                .first().should('have.text', 'John files for retirement benefits at age 70 in April 2038.')
                .next().should('have.text', 'Jane files for retirement benefits at age 65 in August 2039.')
                .next().should('have.text', 'Jane switches to survivor benefits at age 78 in May 2053.')

            cy.get('div:nth-child(2) > h3', { log: 'Custom column' }).should('have.text', 'Custom Filing Strategy')

            cy.get('.padded > div:nth-child(2) > .filingList > li', { log: 'Custom column' })
                .first().should('have.text', 'John files for retirement benefits at age 62 in May 2030.')
                .next().should('have.text', 'Jane files for retirement benefits at age 62 in September 2036.')
                .next().should('have.text', 'Jane switches to survivor benefits at age 78 in May 2053.')

            cy.clickSwitchSSToIL()
            cy.get('.chartContainer').as('IncomeChart').compareSnapshot({
                name: 'Sample Scenario Income Layer page',
                testThreshold: 0.05,
                recurseOptions: { limit: 3, delay: 500 }})

            cy.get('canvas', { log: 'Income chart is visible' }).should('be.visible')
            cy.contains('Social Security', { log: 'Social Security layer has seen', timeout: 5000 }).should('be.visible')
            cy.contains('Benefit Delay', { log: 'Benefit Delay layer has seen' }).should('be.visible')
            cy.contains('Benefit Replacement', { log: 'Benefit Replacement has seen' }).should('be.visible')
            cy.contains('Income Floor', { log: 'Income Floor layer has seen' }).should('be.visible')
            cy.contains('Additional Income', { log: 'Additional Income layer has seen' }).should('be.visible')

        })

        it('Check Social Security report is download in given time', () => {
            BasePage.buttonVerifyAndClick("Download PDF")
            ss.getDownloadPDFPopUp().should('have.text', 'Report Options')

            const reportName = 'SocialSecurity'
            cy.intercept("POST", Cypress.env('backendUrl')+'/api/Reports/'+reportName+'/*').as("buttonRequest");
            cy.get(':nth-child(6) > div > .primary',{log:'Download PDF'}).click()
            cy.downloadReport(reportName)
            BasePage.buttonVerifyAndClick("Cancel")
        })

    })

    context('This suite tests Social Security welcome/list page and Search functions', () => {
        beforeEach(() => {
            const ss = new SSElements()

            cy.log('LY.TC.SSA.SS.M.01 - Check when the user clicks on sample scenario case in SSA-cases page of the SSA')
            BasePage.veriftGetTextElement('.content > span')
            ss.getSSListHeader()
            ss.getSStable()
        })

        it('Check the SSA cases page icons, fields, list and refresh', () => {

            cy.log('LY.TC.SSA.CL.02 - Check the SSA - cases page ')
            cy.get('.header > img').should('be.visible').compareSnapshot({
                name: 'LifeYield Logo',
                testThreshold: 0.05,
                recurseOptions: { limit: 3, delay: 500 }})
            cy.get('.active > span', { timeout: 10000 }).contains('Social Security').should('have.text', 'Social Security')
            cy.get('.active > .ui').compareSnapshot({
                name: 'Social Security Icon',
                testThreshold: 0.03,
                recurseOptions: { limit: 3, delay: 500 }})
            cy.get('.title > .item').contains('Settings').should('have.text', 'Settings')
            cy.get('.title > .item > .ui').compareSnapshot({
                name: 'Settings Icon',
                testThreshold: 0.03,
                recurseOptions: { limit: 3, delay: 500 }})
            cy.get('[href="https://help.lifeyield.com/"] > span').contains('Support').should('have.text', 'Support')
            cy.get('[href="https://help.lifeyield.com/"] > .ui').compareSnapshot({
                name: 'Support Icon',
                testThreshold: 0.05,
                recurseOptions: { limit: 3, delay: 500 }})
            cy.get(':nth-child(5) > span').contains('Marketing Resources').as('Marketing Resources')
            cy.get(':nth-child(5) > .ui').compareSnapshot({
                name: 'Marketing Resources Icon',
                testThreshold: 0.05,
                recurseOptions: { limit: 3, delay: 500 }})
            cy.get('p').should('have.text', 'Use this page to create and view Social Security cases.')
            cy.get('.large > .ui > .prompt').should('have.attr', 'placeholder', 'Search...')
            /*cy.fixture('profile').then(function (profile) {
              const email = profile.email
              cy.get('.text').should('have.text', email)
            })*/
            cy.getLastEmail().then((lastEmail) => {
                qs.getEmailOnProfileMenu().should('have.text', lastEmail)
            });
        })

        it('Check the Search function list search create a scenario and search it', () => {

            cy.log('LY.TC.SSA.CL.03 - LY.TC.SSA.CL.04')
            cy.get('.large > .ui > .prompt').as('Search').type('Sample')
            qs.getFirstItemOfSearchResult().should('have.text', 'Sample Scenario')

            qs.getFirstItemOfSearchResult().click()
            cy.get('@Search').type('{enter}')
            qs.getFirstItemOfSSList('Sample Scenario').click()
            cy.get('.caseHeader > span').contains('Sample Scenario').as('header')

            cy.clickSwitchILToSS()

            cy.get('.btnActive > .chartTypeLabel1').should('be.visible').and('have.text', 'Monthly')
            cy.get(':nth-child(3) > .chartTypeLabel1').should('have.text', 'Annual').click().as('Annual')
            cy.get(':nth-child(5) > .chartTypeLabel1').should('have.text', 'Cumulative').click().as('Cumulative')
            cy.get('.active > span').click()

            //No result message of Search List
            cy.log('LY.TC.SSA.CL.05')
            cy.get('@Search').type('/*asd123')
            qs.getNoResultFould().should('have.text', 'No results found.')
            qs.clickSearchCleanIcon(1)

            //No result message of header page search
            cy.log('LY.TC.SSA.CL.06')
            cy.get('.small > .ui > .prompt').type('/*asd123')
            qs.getNoResultFould().should('have.text', 'No results found.')
            qs.clickSearchCleanIcon(0)


            qs.getASSCButton().click();
            cy.log('LY.TC.SSA.CL.13')
            cy.generateRandomString(8).then((randomString) => {
                const caseName = randomString
                cy.addACustomSSscenario(caseName, 'Single', 1975, 100000)
                cy.get('.caseHeader > span').contains(caseName)
                cy.get('.active > span', { log: 'SS link on Navigation bar' }).click()
                cy.get('.large > .ui > .prompt').type(caseName.substr(0, 4))
                qs.getFirstItemOfSearchResult().should('have.text', caseName + ' Case')
                cy.get('@Search').type('{enter}' + caseName + ' Case')
                qs.getFirstItemOfSSList(caseName + ' Case').click()
                cy.get('.caseHeader > span').contains(caseName + ' Case').as('header')
                ss.getDeleteSS().click()
                qs.getModalDeleteButton().click()
                cy.get('.large > .ui > .prompt').type(caseName.substr(0, 4))
                cy.wait(1500)
                qs.getNoResultFould().should('have.text', 'No results found.') //https://lifeyield.atlassian.net/browse/LCAS-1116
            })
        })
    })

    context('Sample Creation Test', () => {
        it('Check the SS case wizard steps', () => {
            const qs = new QuestionnaireElements()
            const headerSocialSecurityPlus = cy.get('h2.ui.header');
            const inputSocialSecurityAdvantage = cy.get('input[placeholder="Search..."]:eq(1)');
            const buttonAddASocialSecurityCase = cy.get('button:contains("Add a Social Security Case")');
            const buttonName = cy.get('th[title="Name"]');
            const textSampleScenario = cy.contains('Sample Scenario').closest('table').find('*');


            headerSocialSecurityPlus.should('be.visible');
            inputSocialSecurityAdvantage.should('be.visible');
            buttonAddASocialSecurityCase.should('be.visible');
            buttonName.should('be.visible');
            textSampleScenario.should('be.visible');
            cy.get('th[title="Name"]').click(); //buttonName click 
            textSampleScenario.should('be.visible');
            qs.getASSCButton().click();

            qs.getSSCHeader().contains('Add Social Security Case').should('exist');
            qs.getSSCH1().contains('Tell us about your client').should('exist');
            qs.getSSCParagraph().contains("(Just a few details to get things started - we don't need a lot of information, so this won't take long.) ").should('exist');
            qs.getSSCElement().contains('b', 'Social Security case name').should('have.text', 'Social Security case name');
            qs.getNameInput().should('exist');
            qs.getSSCElement().contains('b', "What is your client's name?").should('have.text', "What is your client's name?");
            qs.getPrimaryInput().should('exist');
            qs.getSSCElement().contains('b', "When was your client born?").should('have.text', "When was your client born?");
            qs.getDateOfBirthInput().should('exist')
                .should('have.attr', 'placeholder', 'MM/DD/YYYY');

            qs.getNextButton().should('exist').should('be.disabled');
            qs.getXButton().should('exist').find('i.close.icon').should('be.visible');
            qs.getPreviousButton().should('exist').should('be.disabled');
            qs.getCancelButton().should('exist').should('be.visible');

        })

        it('Create a simple social scenario ', () => {

            cy.generateRandomString(5).then((randomString) => {
                qs.getASSCButton().click();
                qs.getNameInput().type(randomString + ' Case');
                qs.getPrimaryInput().type(randomString + ' Name');

                qs.getDateOfBirthInput().type('11/05/1985{enter}');
                qs.getNameInput().click();

                qs.selectDropdownList("What is your client's marital status?", "Single");
                qs.getNextButton().click();

                //step2
                qs.getPrimaryMemberBenefit().type("2500");
                qs.getNextButton().click();

                //step3
                cy.randomBetween(1000, 2000).then((randomPension) => {
                    qs.getNonCoveredPension().type(randomPension);
                });

                cy.clickNTimes("Next", 4);
                qs.getSaveButton().click();

                cy.wait(1000);

                //const message = 'Social Security Case name already exists please choose another name';
                //cy.verifyServerMessage(message);

                qs.getSSCH2(randomString + " Case");
                qs.buttonActiveLinkMenu("Social Security").click();
                //Adding same SSA with existing name
                qs.getASSCButton().click();
                qs.getNameInput().type(randomString + ' Case');
                qs.getPrimaryInput().type('Same Name');

                qs.getDateOfBirthInput().type('11/05/1985{enter}');
                qs.getNameInput().click();

                qs.selectDropdownList("What is your client's marital status?", "Single");
                qs.getNextButton().click();

                //step2
                qs.getPrimaryMemberBenefit().type("2500");
                qs.getNextButton().click();

                //step3
                cy.randomBetween(1000, 2000).then((randomPension) => {
                    qs.getNonCoveredPension().type(randomPension);
                });

                cy.clickNTimes("Next", 4);
                qs.getSaveButton().click();

                cy.wait(1000);

                const message = 'Social Security Case name already exists please choose another name';
                cy.verifyServerMessage(message);

                qs.getCancelButton().click();
                cy.clickToText(randomString + ' Case');
                qs.getSSCH2(randomString + " Case");

                qs.getDuplicateButton().click();
                cy.wait(2000);
                qs.getSSCH2(randomString + " Case - Copy");

                qs.getDeleteButton().click();
                cy.wait(2000);
                cy.verifyTextPresent("Are you sure you want to delete this social security case?");
                qs.getModalDeleteButton().click();
                cy.wait(2000);
                cy.verifyTextNotPresent(randomString + " Case - Copy");
                cy.clickToText(randomString + ' Case');
                qs.getDeleteButton().click();
                cy.wait(2000);
                cy.verifyTextPresent("Are you sure you want to delete this social security case?");
                qs.getModalDeleteButton().click();
                cy.wait(2000);
                cy.verifyTextNotPresent(randomString + " Case");
            });
        });
    })

    afterEach(() => {
        cy.task('generateReport')
    })

})