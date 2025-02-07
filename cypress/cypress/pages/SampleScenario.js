import BasePage from "./BasePage";
import QuestionnaireElements from "./Questionnaire"

class SSElements extends BasePage {

    getSSListHeader() {
        try {
            const val = cy.get('.content > span').should('be.visible')
            cy.log('Element has seen on page')
            return val
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }

    getSSDetailHeader() {
        try {
            const val = cy.get('h2 > span').should('be.visible')
            cy.log('Element has seen on page')
            return val
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }

    getSStable() {
        const val = cy.get('table').should('be.visible')
        return val
    }

    getMonthly() {
        return BasePage.verifyGetElement('.btnActive > .chartTypeLabel1')
    }

    getAnnual() {
        return BasePage.verifyGetElement(':nth-child(3) > .chartTypeLabel1')
    }

    getCumulative() {
        return BasePage.verifyGetElement(':nth-child(5) > .chartTypeLabel1')
    }

    getDeleteSS() {
        try {
            const val = cy.get('.negative').should('be.visible')
            cy.log('Delete button has seen on page')
            return val
        } catch (error) {
            cy.log('Delete button has not seen on page. Error:' + error)
        }
    }

    getDuplicateSS() {
        try {
            const val = cy.get('.secondary').should('be.visible')
            cy.log('Duplicate button has seen on page')
            return val
        } catch (error) {
            cy.log('Duplicate button has not seen on page. Error:' + error)
        }
    }

    getHelpIcon() {
        try {
            const val = cy.get('.blue').should('be.visible')
            cy.log('Question help icon has seen on page')
            return val
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }

    getSwitchSS() {
        try {
            const val = cy.get('[style="color: black;"]', { timeout: 5000 }).should('be.visible')
            cy.log('Element has seen on page')
            return val
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }

    getSwitchIL() {
        try {
            const val = cy.get('[style="color: rgb(179, 179, 179);"]', { timeout: 2000 }).should('be.visible')
            cy.log('Element has seen on page')
            return val
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }

    getSwitch() {
        try {
            const val = cy.get('.toggleIncomeLayers', { timeout: 2000 }).should('be.visible')
            cy.log('Switch toggle has seen on page')
            return val
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }

    clickSwithSSFromIncomeLyrPage() {
        try {
            cy.get('canvas').click()
            const val = cy.xpath("//div[@class='react-toggle react-toggle--checked toggleIncomeLayers']", { timeout: 3000 }).should('be.visible').click()
            cy.log('Element has seen on page')
            return val
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }

    getDownloadPDF() {
        try {
            const val = cy.get('[style="text-align: right;"] > .ui').should('be.visible')
            cy.log('Element has seen on page')
            return val
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }

    getDownloadPDFPopUp() {
        try {
            const val = cy.get('.mini > .header').should('be.visible')
            cy.log('Popup has seen on page')
            return val
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }

    getDownloadPDFInPopUp() {
        try {
            const val = cy.get(':nth-child(6) > div > .primary').should('be.visible')
            cy.log('Popup has seen on page')
            return val
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }

    clickDownloadPDFInPopUp() {
        try {
            cy.get(':nth-child(6) > div > .primary').click()
            cy.readFile('SocialSecurityReport.pdf', { timeout: 20000 }).should('exist')
        } catch (error) {
            cy.log('Report PDF could not read on deownload folder. Error: ' + error)
        }
    }

    getIncomeCanvas() {
        try {
            const val = cy.get(':nth-child(1) > canvas', { timeout: 5000 }).should('be.visible')
            cy.log('Income chart has seen on page')
            return val
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }

    getAssetCanvas() {
        try {
            const val = cy.get(':nth-child(2) > canvas', { timeout: 5000 }).should('be.visible')
            cy.log('Element has seen on page')
            return val
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }

    clickBDSwitch() {
        const val = '[style="background-color: rgb(79, 129, 189); padding: 10px;"]'
        try {
            cy.get('body').then($body => {
                if ($body.find(val).length > 0) {
                    cy.get(val + '> .fitted > label').then($inAct => {
                        if ($inAct.is(':visible')) {
                            cy.get(val + '> .fitted > label').click()
                            cy.log('Inactive Benefit Delay switch is clicked')
                        } else {
                            cy.log('Inactive Benefit Delay switch is not clicked')
                        }
                    })
                } else {
                    cy.get(val + '> .checked > label').click()
                    cy.log('Active Benefit Delay switch is clicked')
                }
            })
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }

        /*
                try {
                    if (cy.get('[style="background-color: rgb(79, 129, 189); padding: 10px;"] > .fitted > label').should('be.visible').as('BDSwitch')) {
                        cy.get('@BDSwitch').click()
                        cy.log('Benefit inactive switch clicked')
                    } else {
                        cy.get('[style="background-color: rgb(79, 129, 189); padding: 10px;"] > .checked > label').click().as('BDActive')
                        cy.log('Benefit inactive switch clicked')
                    }
                } catch (error) {
                    cy.log('Element has not seen on page error:' + error)
                }*/

    }

    clickBRSwitch() {
        const val = '[style="background-color: rgb(155, 187, 89); padding: 10px;"]'
        try {
            cy.get('body').then($body => {
                if ($body.find(val).length > 0) {
                    cy.get(val + '> .fitted > label').then($inAct => {
                        if ($inAct.is(':visible')) {
                            cy.get(val + '> .fitted > label').click()
                            cy.log('Inactive Benefit Replacement switch is clicked')
                        } else {
                            cy.log('Inactive Benefit Replacement switch is not clicked')
                        }
                    })
                } else {
                    cy.get(val + '> .checked > label').click()
                    cy.log('Active Benefit Replacement switch is clicked')
                }
            })
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }

    clickIFSwitch() {
        const val = '[style="background-color: rgb(192, 80, 77); padding: 10px;"]'
        try {
            cy.get('body').then($body => {
                if ($body.find(val).length > 0) {
                    cy.get(val + '> .fitted > label').then($inAct => {
                        if ($inAct.is(':visible')) {
                            cy.get(val + '> .fitted > label').click()
                            cy.log('Inactive Benefit Replacement switch is clicked')
                        } else {
                            cy.log('Inactive Benefit Replacement switch is not clicked')
                        }
                    })
                } else {
                    cy.get(val + '> .checked > label').click()
                    cy.log('Active Benefit Replacement switch is clicked')
                }
            })
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }

    clickAISwitch() {
        const val = '[style="background-color: rgb(128, 100, 162); padding: 10px;"]'
        try {
            cy.get('body').then($body => {
                if ($body.find(val).length > 0) {
                    cy.get(val + '> .fitted > label').then($inAct => {
                        if ($inAct.is(':visible')) {
                            cy.get(val + '> .fitted > label').click()
                            cy.log('Inactive Benefit Replacement switch is clicked')
                        } else {
                            cy.log('Inactive Benefit Replacement switch is not clicked')
                        }
                    })
                } else {
                    cy.get(val + '> .checked > label').click()
                    cy.log('Active Benefit Replacement switch is clicked')
                }
            })
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }

    clickEditLayerName(layerName) {
        cy.contains('div', layerName, { timeout: 5000 }).find('.image').click()
        cy.log(layerName + ' edit icon has clicked')
    }

    getToggleOptimalInPopUp() {
        return cy.get('.react-toggle.react-toggle--checked.ReportOptionsToggle:eq(0)');
    }

    getToggleCustomInPopUp() {
        return cy.get('.react-toggle.react-toggle--checked.ReportOptionsToggle:eq(1)');
    }


    verifySSHelpIconAndText() {
        try {
            cy.get('.blue').click()
            cy.get('.helperHeaderBorder').should('have.text', 'Social Security+™')
            cy.verifyTextPresent("Social Security cases may be edited by Name and COLA (Cost of Living Adjustment). The assumed rate of inflation is set to 0% by default to show all results in today's dollars.")
            cy.verifyTextPresent("Additionally, the inputs for your client(s) may be edited.")
            cy.verifyTextPresent("The results displayed in the chart shows how projected payments vary between the Optimal and Custom strategies. Hover over the chart to see the details for each year. In the monthly view, the difference in Monthly payments is shown, along with the breakdown of benefits for each client both the Optimal and Custom strategies. In the Annual and Cumulative views, the annual benefit amounts are displayed. A comparison of the cumulative benefits is shown in all three views.")
            cy.verifyTextPresent("The timeline view is interactive and you can click on the different ages to view the filing instructions and projected benefit amounts for the Custom strategy.")
            cy.verifyTextPresent("Reports may be generated to provide a detailed Social Security analysis for your client(s).")
            cy.get('.blue').click()
            if ($body.find(".helperHeaderBorder").length > 0) {
                cy.get(".helperHeaderBorder").type("{esc}");
            } else {
                cy.log(`Help popup closed successfully`);
            }
        } catch (error) {
            cy.log(`Error: ${error}`);
        }
    }

    searchTextOnSSListTable(searchText){    
    const qs = new QuestionnaireElements()

        try {
            cy.log('Check default sample scenario')
            cy.get('.large > .ui > .prompt').as('Search').type(searchText)
            qs.getFirstItemOfSearchResult().should('have.text', searchText)
            qs.getFirstItemOfSearchResult().click()
            cy.get('@Search').type('{enter}')
            qs.getFirstItemOfSSList(searchText).click()
            ///Start to test
            cy.get('.caseHeader > span').contains(searchText).as('header')
            cy.wait(2000)
            cy.log(searchText+' is searched and found. Then opened the details of the case.')
        } catch (error) {
            cy.log(searchText+' not found in given time.')
        }
    }


}

export default SSElements