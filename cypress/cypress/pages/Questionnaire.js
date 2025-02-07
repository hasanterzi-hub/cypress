import BasePage from "../pages/BasePage";

class QuestionnaireElements extends BasePage {

    getASSCButton() {
        try {
            const val = cy.get('button.ui.primary.right.floated.button.ui.button').contains('Add a Social Security Case').should('be.visible')
            cy.log('Add a Social Security Case button has seen on page')
            return val
        } catch (error) {
            cy.log('Add a Social Security Case button has not seen on page error:' + error)
        }
    }

    getSSCHeader() {
        try {
            const val = cy.get('.header').should('be.visible')
            cy.log('Social Security header has seen on page')
            return val
        } catch (error) {
            cy.log('Social Security header has not seen on page error:' + error)
        }
    }
    getSSCH1() {
        try {
            const val = cy.get('h1').should('be.visible')
            cy.log('Element has seen on page')
            return val
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }
    getSSCH2(headerName) {
        try {
            const val = cy.get('h2.caseHeader span').should('be.visible').contains(headerName)
            cy.log(headerName + ' header has seen on page')
            return val
        } catch (error) {
            cy.log(headerName + ' header has not seen on page error:' + error)
        }
    }

    buttonActiveLinkMenu(name) {
        try {
            const val = cy.get('a.active.item.active span').should('be.visible').contains(name)
            cy.log(name + ' menu has seen on page')
            return val
        } catch (error) {
            cy.log(name + ' menu has not seen on page error:' + error)
        }
    }
    getSSCParagraph() {
        try {
            const val = cy.get('p').should('be.visible')
            cy.log('Element has seen on page')
            return val
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }

    getSSCElement() {
        try {
            const val = cy.get('div.right.aligned.middle.aligned.eight.wide.column').should('be.visible')
            cy.log('Element has seen on page')
            return val
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }

    getNameInput() {
        try {
            const val = cy.get('input[name="name"]').should('be.visible')
            cy.log('Case name input has seen on page')
            return val
        } catch (error) {
            cy.log('Case name input has not seen on page error:' + error)
        }
    }

    getPrimaryInput() {
        try {
            const val = cy.get('input[name="primaryMember.name"]').should('be.visible')
            cy.log('Primary member name input has seen on page')
            return val
        } catch (error) {
            cy.log('Primary member name input has not seen on page error:' + error)
        }
    }

    getDateOfBirthInput() {
        try {
            const val = cy.get('input[name="primaryMember.dateOfBirth"]').should('be.visible')
            cy.log('Date of birth input has seen on page')
            return val
        } catch (error) {
            cy.log('Date of birth input has not seen on page error:' + error)
        }
    }
    getDropdownList(listName) {
        try {
            const val = cy.get(`div.right.aligned.middle.aligned.eight.wide.column:contains("${listName}")`).next('div.middle.aligned.six.wide.column')
                .find('div[role="listbox"]').should('be.visible');
            cy.log(listName + ' has been seen on the page');
            return val;
        } catch (error) {
            cy.log(listName + 'Element has not been seen on the page. Error: ' + error);
        }
    }

    selectDropdownList(listName, selectName) {
        try {
            const val = cy.get(`div.right.aligned.middle.aligned.eight.wide.column:contains("${listName}")`).next('div.middle.aligned.six.wide.column')
                .find('div[role="listbox"]').should('be.visible').click()
                .get('.menu.transition')
                .contains('div', selectName)
                .click();
            cy.log(selectName + ' has been seen on the page');
            return val;
        } catch (error) {
            cy.log(selectName + ' has not been seen on the page. Error: ' + error);
        }
    }

    getNextButton() {
        try {
            const val = cy.get('button.ui.primary.button').contains('button', 'Next')
            cy.log('Next button has seen on page')
            return val
        } catch (error) {
            cy.log('Next button has not seen on page error:' + error)
        }
    }

    getCancelButton() {
        try {
            const val = cy.get('button.ui.secondary.button').contains('button', 'Cancel')
            cy.log('Cancel button has seen on page')
            return val
        } catch (error) {
            cy.log('Cancel button has not seen on page error:' + error)
        }
    }

    getSaveButton() {
        try {
            const val = cy.get('.actions > .primary').contains('button', 'Save')
            cy.log('Save button has seen on page')
            return val
        } catch (error) {
            cy.log('Save button has not seen on page error:' + error)
        }
    }

    getXButton() {
        try {
            const val = cy.get('button.ui.basic.button.close-button').should('be.visible')
            cy.log('X button has seen on page')
            return val
        } catch (error) {
            cy.log('X button has not seen on page error:' + error)
        }
    }
    
    //STEP2
    getPrimaryMemberBenefit() {
        try {
            const val = cy.get('input[name="primaryMember.benefit"]').should('be.visible')
            cy.log('Primary member benefit input has seen on page')
            return val
        } catch (error) {
            cy.log('Primary member benefit input has not seen on page error:' + error)
        }
    }
    getPrimaryMemberSalary() {
        try {
            const val = cy.get('input[name="primaryMember.salary"]')
            cy.log('Primary member salary input has seen on page')
            return val
        } catch (error) {
            cy.log('Primary member salary input has not seen on page error:' + error)
        }
    }

    getPrimaryMemberBenefitDisabled() {
        try {
            const val = cy.get('div.field')
                .find('input[name="primaryMember.benefit"]')
                .parent()
            cy.log('Element has seen on page')
            return val
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }
    getPrimaryMemberSalaryDisabled() {
        try {
            const val = cy.get('div.disabled.field input[name="primaryMember.salary"]')
            cy.log('Element has seen on page')
            return val
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }
    getPriorFilingDate() {
        try {
            const val = cy.get('input[name="primaryMember.priorFilingDate"]').should('be.visible')
            cy.log('Element has seen on page')
            return val
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }

    //STEP3

    getSecondaryMemberName() {
        try {
            const val = cy.get('input[name="secondaryMember.name"]').should('be.visible')
            cy.log('Element has seen on page')
            return val
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }

    getSecondaryMemberDateOfBirthInput() {
        try {
            const val = cy.get('input[name="secondaryMember.dateOfBirth"]').should('be.visible')
            cy.log('Element has seen on page')
            return val
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }
    getSecondaryMemberBenefit() {
        try {
            const val = cy.get('input[name="secondaryMember.benefit"]')
            cy.log('Element has seen on page')
            return val
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }
    getSecondaryMemberBenefitDisabled() {
        try {
            const val = cy.get('div.field')
                .find('input[name="secondaryMember.benefit"]')
                .parent()
            cy.log('Element has seen on page')
            return val
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }
    getSecondaryMemberSalary() {
        try {
            const val = cy.get('input[name="secondaryMember.salary"]')
            cy.log('Element has seen on page')
            return val
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }
    getSecondaryMemberSalaryDisabled() {
        try {
            const val = cy.get('div.field')
                .find('input[name="secondaryMember.salary"]')
                .parent()
            cy.log('Element has seen on page')
            return val
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }
    getSecondaryMemberDeceasedDate() {
        try {
            const val = cy.get('input[name="secondaryMember.deceasedDate"]').should('be.visible')
            cy.log('Element has seen on page')
            return val
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }
    getPreviousButton() {
        try {
            const val = cy.get('button.ui.primary.button').contains('button', 'Previous')
            cy.log('Element has seen on page')
            return val
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }

    //default checker
    //step3
    getNonCoveredPension() {
        try {
            const val = cy.get('input[name="primaryMember.pension"]').should('be.visible')
            cy.log('Element has seen on page')
            return val
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }

    getDuplicateButton() {
        try {
            const val = cy.get('button.ui.secondary.button').contains('button', 'Duplicate')
            cy.log('Element has seen on page')
            return val
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }

    getDeleteButton() {
        try {
            const val = cy.get('button.ui.negative.button').contains('button', 'Delete')
            cy.log('Element has seen on page')
            return val
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }
    getModalDeleteButton() {
        try {
            const val = cy.get('.ui.tiny.modal.transition.visible.active button.ui.negative.button').contains('button', 'Delete')
            cy.log('Element has seen on page')
            return val
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }
    //step 5
    getNonCoveredPensionSecondary() {
        try {
            const val = cy.get('input[name="secondaryMember.pension"]').should('be.visible')
            cy.log('Element has seen on page')
            return val
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }

    getEmailOnProfileMenu() {
        try {
            const val = cy.get('.text').should('be.visible')
            cy.log('Email has seen on menu dropdown')
            return val
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }

    getFirstItemOfSearchResult() {
        try {
            const val = cy.xpath('(//div[@class="result"]/div/span)[1]').should('be.visible')
            cy.log('First item has seen at Search result')
            return val
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }

    getFirstItemOfSSList(name) {
        try {
            const val = cy.get('[style="cursor: pointer;"] > :nth-child(1)').should('be.visible')
            val.should('have.text', name)
            cy.log('First item in Social Security list has seen')
            return val
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }


    getNoResultFould() {
        try {
            const val = cy.get('div.results.transition.visible > div > div').should('be.visible')
            cy.log('No Result Fould message has been seen on below of Search list')
            return val
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }

    clickSearchCleanIcon(index) {
        try {
            cy.get('i.grey.close.link.icon').eq(index).should('be.visible').click()
            cy.log('Search textbox (x) icon has been seen and clicked')
            cy.get('.large > .ui > .prompt').should('have.attr', 'value', '')
            cy.log('It is verified that there is no text in Search textbox')
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }

}

export default QuestionnaireElements