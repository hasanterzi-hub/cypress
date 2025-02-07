import BasePage from "../pages/BasePage";

class PortfolioDetail extends BasePage {

    getCurrentTaxScore() {
        return cy.get('label')
    }

    getHeldAwayBalance() {
        return cy.get(':nth-child(3) > h1')
    }

    getCurrentTarget() {
        return cy.get(':nth-child(4) > h1')
    }

    getCurrentBalance() {
        return cy.get('.four > :nth-child(1) > h1')
    }

    get10YearBenefit() {
        return cy.get(':nth-child(2) > div > h1')
    }

    /**
     * Verify data of custodied, held-away and excluded account tables.
     * @param {number} rowIndex - row index number.
     * @param {string} verifyAccountName - Account name which is given to account. 
     * @param {string} verifyAccountTaxType - Account type Taxable, Tax-Deferred, Tax-Free
     * @param {string} verifyAccountOutputType - Trade, TargetAssignement, ProRataWithdrawal
     * @param {string} verifyAccountBalance - Balance of account
     */
    getAccountNameVerificationInTable(rowIndex, verifyAccountName, verifyAccountTaxType, verifyAccountOutputType, verifyAccountBalance) {

        cy.get('table.sortable.striped.table.accountTable tbody > tr').eq(rowIndex) //select table
            .each(($row) => {
                // For each row
                cy.wrap($row)
                    .find('td')
                    .then(($tds) => { //each column
                        const accountName = $tds.eq(0).text().trim(); // Account Name
                        const taxType = $tds.eq(3).text().trim(); //  tax type
                        const outputType = $tds.eq(4).text().trim(); //  output type
                        const balance = $tds.eq(5).text().trim(); // balance

                        // Loglama ve Doğrulamalar
                        cy.log(`Account Name: ${accountName}, Tax Type: ${taxType}, Output Type: ${outputType}, Balance: ${balance}`);
                        expect(accountName).to.equal(verifyAccountName);
                        expect(taxType).to.equal(verifyAccountTaxType);
                        expect(outputType).to.equal(verifyAccountOutputType);
                        expect(balance).to.equal(verifyAccountBalance);
                    });
            });
    }
}

export default PortfolioDetail