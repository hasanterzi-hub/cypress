import BasePage from "../pages/BasePage";

class Affiliates extends BasePage {

    getElements(){
        const StartYear = cy.get('#incomeLayers\\.additionalIncome\\.startYear', {log: "Start Year dropdown has seen"})
        const EndYear = cy.get('#incomeLayers\\.additionalIncome\\.endYear', {log: "End Year dropdown has seen"})
        const ProdType = cy.get('#incomeLayers\\.additionalIncome\\.productType', {log: "Product Type dropdown has seen"})
        const AssGrowth = cy.get('#incomeLayers\\.additionalIncome\\.assetGrowthRate', {log: "Asset Growth dropdown has seen"})

        return{
            StartYear,
            EndYear,
            ProdType,
            AssGrowth
        }
    }

    verifyAffiliateCustomLogo(element, affName, imagePath,) {
        try {
            cy.get(element).should('have.attr', 'src', imagePath).compareSnapshot({
                name: affName,
                testThreshold: 0.1,
                recurseOptions: { limit: 3, delay: 500 }});
            cy.log(affName + 'has seen on page')
            return val
        } catch (error) {
            cy.log('Logo not seen on page error:' + error)
        }
    }

    getResetAllButton() {
        try {
            const val = cy.xpath("//button[contains(.,'Reset All')]").contains('button', 'Reset All')
            cy.log('Reset All has seen on page')
            return val
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }

    getApplyButton() {
        try {
            const val = cy.xpath("//button[contains(.,'Apply Changes')]").contains('button', 'Apply Changes')
            cy.log('Apply Changes has seen on page')
            return val
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }

    getSaveButton() {
        try {
            const val = cy.xpath("//button[contains(.,'Save')]").contains('button', 'Save')
            cy.log('Save Changes has seen on page')
            return val
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }

    getCancelButton() {
        try {
            const val = cy.xpath("//button[contains(.,'Cancel')]").contains('button', 'Cancel')
            cy.log('Cancel Changes has seen on page')
            return val
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }
    
    getButtonName(buttonName) {
        try {
            const val = cy.xpath("//button[contains(.,'"+buttonName+"')]").contains('button', buttonName)
            cy.log('Button name '+ buttonName+' has found in dom')
            return val
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }

    getSaveButtonOnSSEdit() {
        try {
            const val = cy.get('.left > .primary').contains('button', 'Save')
            cy.log('Save button has seen on page')
            return val
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }

    /**
     * Get and edit information for primary and secondary individuals.
     * @typedef {'Single' | 'Single+72' | 'Married'| 'Married+72'} optionsOfMartialStatus
     * @param {string} primaryName - The name of the primary individual.
     * @param {string} primaryDob - The date of birth of the primary individual.
     * @param {string} primaryLongv - The longitude value for the primary individual.
     * @param {string} primaryBenefit - The benefit information for the primary individual.
     * @param {optionsOfMartialStatus} MStatus - Martial status selected item in dropdown.
     * @param {string} secondaryName - The name of the secondary individual.
     * @param {string} secondaryDob - The date of birth of the secondary individual.
     * @param {string} secondaryLongv - The longitude value for the secondary individual.
     * @param {string} secondaryBenefit - The benefit information for the secondary individual.
 */
    getSSEditInfo(primaryName, primaryDob, primaryLongv, primaryBenefit, MStatus, secondaryName, secondaryDob, secondaryLongv, secondaryBenefit){
        try {
            cy.get(':nth-child(2) > :nth-child(1) > .field > input',{log:'Primary client name field has seen'}).should('have.value',primaryName)
            cy.get(':nth-child(2) > :nth-child(2) > .field > .react-datepicker-wrapper > .react-datepicker__input-container input',{log:'Primary client DoB field has seen'}).should('have.value',primaryDob)
            cy.get(':nth-child(3) > .field > input',{log:'Primary client longevity age field has seen'}).should('have.value',primaryLongv)
            cy.get('#primaryMember\\.benefit',{log:'Primary client benefit field has seen'}).should('have.attr','value',primaryBenefit)
            if(MStatus=='Single+72'){
                cy.selectedTextInDropdownList(1,'Single')
            }else if(MStatus=='Married'){
                cy.selectedTextInDropdownList(0,MStatus)
                cy.get(':nth-child(3) > :nth-child(1) > .field > input',{log:'Secondary client name field has seen'}).should('have.value',secondaryName)
                cy.get(':nth-child(3) > :nth-child(2) > .field > .react-datepicker-wrapper > .react-datepicker__input-container > input',{log:'Secondary client DoB field has seen'}).should('have.value',secondaryDob)
                cy.get(':nth-child(3) > :nth-child(3) > .field > input',{log:'Secondary client longevity age field has seen'}).should('have.value',secondaryLongv)
                cy.get('#secondaryMember\\.benefit',{log:'Secondary client benefit field has seen'}).should('have.attr','value',secondaryBenefit)
            }else if(MStatus=='Married+72'){
                cy.selectedTextInDropdownList(1,'Married')
                cy.get(':nth-child(3) > :nth-child(1) > .field > input',{log:'Secondary client name field has seen'}).should('have.value',secondaryName)
                cy.get(':nth-child(3) > :nth-child(2) > .field > .react-datepicker-wrapper > .react-datepicker__input-container > input',{log:'Secondary client DoB field has seen'}).should('have.value',secondaryDob)
                cy.get(':nth-child(3) > :nth-child(3) > .field > input',{log:'Secondary client longevity age field has seen'}).should('have.value',secondaryLongv)
                cy.get('#secondaryMember\\.benefit',{log:'Secondary client benefit field has seen'}).should('have.attr','value',secondaryBenefit)
            }
            else{
                cy.selectedTextInDropdownList(0,MStatus)
            }
            
        } catch (error) {
            cy.log('Houston we have a problem:'+ error)
        }
    }

}

export default Affiliates