/// <reference types="Cypress-xpath" />

import BasePage from "../pages/BasePage";

class Settings extends BasePage {

    clickSettingsOnNav() {
        try {
            const val = cy.get('.title > .item').should('have.text', 'Settings').click()
            cy.log('Settings has clicked on navigation side bar')
            return val
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }

    clickGeneralOnNav() {
        try {
            const val = cy.get('.content > [href="/settings"]').should('have.text', 'General').click()
            cy.log('General link has clicked')
            return val
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }

    clickWidgetOnNav() {
        try {
            const val = cy.get('[href="/widgets"]').should('have.text', 'Widgets').click()
            cy.log('Widget link has clicked')
            return val
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }

    clickSaveSettings() {
        try {
            const val = cy.get('.primary').should('be.visible').and('have.text', 'Save Settings').click()
            cy.log('Save Settings button has clicked')
            return val
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }

    clickApplyCode() {
        try {
            const val = cy.get('.fluid > .ui').should('have.text', 'Apply Coupon').click()
            cy.log('Apply Coupon button has clicked')
            return val
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }

    clickSubmitButton() {
        try {
            const val = cy.get('.container > :nth-child(5) > .ui').should('have.text', 'Submit').click()
            cy.log('Submit button has clicked')
            return val
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }

    clickUserEmailonMainPage() {
        cy.getLastEmail().then((lastEmail) => {
            cy.get(".text").should("have.text", lastEmail).click();
        });
    }

    clickChangePasswordButton() {
        cy.get(".nine > .ui").should("have.text", "Change Password").click();
    }

    getPageHeader() {
        cy.get('.content > span').should('have.text', 'Capital Market Assumptions')
    }

    getCMAPagePara() {
        cy.get('p').should('have.text', 'Use this page to review the available sets of asset categories and their associated Capital Market Assumptions (CMAs). ' +
            'Default CMA sets are provided at different levels of detail, and can be viewed but not edited. New CMA sets can be set up here, and are fully editable. ' +
            'Each Portfolio in the system has one of these CMA sets assigned to it.')
    }

    getCMAPopupContent() {
        cy.get('.large').should('exist').and('have.text', 'Capital Market Assumptions')
        cy.get('.helper-body > p').should('have.text', 'CMAs represent the assumed future performance of an asset category in terms of total return, yield, and dividends. '
            + 'Along with turnover and the optional inclusion efficiency of a portfolio, suggest ways to improve that tax efficiency, and project the dollar value of the portfolio over time with different location strategies implemented.')
    }


    verifyCMASetNameVerificationInTable(rowIndex, Name) {
        cy.get('table.striped tbody > tr').eq(rowIndex)//select row in indexed table
        .each(($row) => {
            // For each row
            cy.wrap($row)
                .find('td')
                .then(($tds) => { //each column
                    const cmaSetName = $tds.eq(0).text().trim();
                   
                    // Loglama ve Doğrulamalar
                    cy.log(`Table header names are verifying: ${cmaSetName}`);
                    expect(cmaSetName).to.equal(Name);
                });
        });
    }

    verifyCategoryVerificationInAddEditTable(tableIndex, rowIndex, Name, AssetType, TotalReturn, Yield, Dividend, StandardDeviation, TurnoverRate, EquivalentGroup) {
        cy.get('table.striped tbody').eq(tableIndex).find('tr').eq(rowIndex)//select row in indexed table
        .each(($row) => {
            // For each row
            cy.wrap($row)
                .find('td')
                .then(($tds) => { //each column
                    var cmaSetName = $tds.eq(0).text().trim();
                    var cmaAssetType = $tds.eq(1).text().trim();
                    var cmaTotalReturn = $tds.eq(2).text().trim();
                    var cmaYield = $tds.eq(3).text().trim();
                    var cmaDividend = $tds.eq(4).text().trim();
                    var cmaStandardDeviation = $tds.eq(5).text().trim();
                    var cmaTurnOverRate = $tds.eq(6).text().trim();
                    var cmaEquivalent = $tds.eq(7).text().trim();

                    // Loglama ve Doğrulamalar
                    cy.log(`Table header names are verifying: ${cmaSetName}, ${cmaAssetType}, ${cmaTotalReturn}, ${cmaYield}, ${cmaDividend}, ${cmaStandardDeviation}, ${cmaTurnOverRate}, ${cmaEquivalent}`);
                    expect(cmaSetName).to.equal(Name);
                    expect(cmaAssetType).to.equal(AssetType);
                    expect(cmaTotalReturn).to.equal(TotalReturn);
                    expect(cmaYield).to.equal(Yield);
                    expect(cmaDividend).to.equal(Dividend);
                    expect(cmaStandardDeviation).to.equal(StandardDeviation);
                    expect(cmaTurnOverRate).to.equal(TurnoverRate);
                    expect(cmaEquivalent).to.equal(EquivalentGroup);
                });
        });
    }


    createNewCategoryToCMASet(tableIndex, rowIndex, Name, AssetType, TotalReturn, Yield, StandardDeviation, TurnoverRate, EquivalentGroup) {
        cy.get('table.striped tbody').eq(tableIndex).find('tr').eq(rowIndex)//select row in indexed table
        .each(($row) => {
            // For each row
            cy.wrap($row)
                .find('td')
                .then(($tds) => { //each column
                    cy.get($tds).eq(0).type(Name)
                    cy.get($tds).eq(1).then(() => {
                        cy.selectItemInDropdownList(1,AssetType)
                    })
                    cy.get($tds).eq(2).clear().type(TotalReturn)
                    if (AssetType == 'Equity') {
                        cy.get($tds).eq(4).type(Yield)
                        
                    } else {
                        cy.get($tds).eq(3).type(Yield)
                    }
                    cy.get($tds).eq(5).type(StandardDeviation)
                    cy.get($tds).eq(6).type(TurnoverRate)
                    cy.get($tds).eq(7).type(EquivalentGroup)

                    // Loglama ve Doğrulamalar
                    cy.log(`New CMA created according to this info: Category Name: ${Name}, Asset Type: ${AssetType}, TotalReturn ${TotalReturn}, Yield/Dividend: ${Yield}, Standard Deviation: ${StandardDeviation}, Turnover Rate: ${TurnoverRate}, Eq.Group: ${EquivalentGroup}`);
                 
                });
        });
    }




    verifyCMASetTableHeaderVerification() {
        cy.get('table.striped thead').eq(1).find('tr').eq(0)//select row in indexed table
        .each(($row) => {
            // For each row
            cy.wrap($row)
                .find('th')
                .then(($tds) => { //each column
                    var cmaSetName = $tds.eq(0).text().trim();
                    var cmaAssetType = $tds.eq(1).text().trim();
                    var cmaTotalReturn = $tds.eq(2).text().trim();
                    var cmaYield = $tds.eq(3).text().trim();
                    var cmaDividend = $tds.eq(4).text().trim();
                    var cmaStandardDeviation = $tds.eq(5).text().trim();
                    var cmaTurnOverRate = $tds.eq(6).text().trim();
                    var cmaEquivalent = $tds.eq(7).text().trim();

                    cy.log(`Table header names are verifying: ${cmaSetName}, ${cmaAssetType}, ${cmaTotalReturn}, ${cmaYield}, ${cmaDividend}, ${cmaStandardDeviation}, ${cmaTurnOverRate}, ${cmaEquivalent}`);
                    expect(cmaSetName).to.equal('Name');
                    expect(cmaAssetType).to.equal('Asset Type');
                    expect(cmaTotalReturn).to.equal('Total Return');
                    expect(cmaYield).to.equal('Yield');
                    expect(cmaDividend).to.equal('Dividend');
                    expect(cmaStandardDeviation).to.equal('Standard Deviation');
                    expect(cmaTurnOverRate).to.equal('Turnover Rate');
                    expect(cmaEquivalent).to.equal('Equivalent Group');
                });
        });
    }



    getCMAPopupHeader(){
        cy.get('.large > .header').should('have.text','Add/Edit CMA Set')
    }

    getCMATabs(tabIndex, value){
        cy.get('.attached > a').eq(tabIndex).should('have.text',value)
    }

    getAddNewCategoryButton(){
        cy.get('.row > .ui').should('have.text','Add new category')
    }

    clickCancelAddCategoryButton(){
        cy.get(':nth-child(1) > .single > :nth-child(2)').as('cancelButton').click()
    }

    clickDeleteCategoryButton(){
        cy.get(':nth-child(9) > .ui > .icon').as('deleteCategory').click()
    }

    clickDeleteButton(){
        cy.get('.actions > .negative').should('have.text','Delete').click()
    }

    clickAutoMap(){
        cy.get('thead > tr > :nth-child(2) > .ui').should('have.text','Auto-Map').click()
    }
}

export default Settings