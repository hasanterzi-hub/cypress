/// <reference types="Cypress" />

import BasePage from "../pages/BasePage";

class PI_TSW extends BasePage {
    getLifeYieldLogo() {
        try {
            const val = cy.get('a > img')
            val.should('be.visible').should('have.attr','src','./assets/images/LifeYieldLogo.png')
            val.compareSnapshot('LifeYieldLogo')
            cy.log('LifeYield logo has seen and verified on page')
            return val
        } catch (error) {
            cy.log('Lifeyield logo has not seen on page error:' + error)
        }
    }

    getPageHeader() {
        try {
            const val = cy.get('.ui > :nth-child(1) > div > h2').should('be.visible')
            cy.log('Page header has seen on page')
            return val
        } catch (error) {
            cy.log('Page header has not seen on page error:' + error)
        }
    }

    getStepBarHeader(stepNum,header) {
        try {
            const val = cy.get(':nth-child('+stepNum+') > .title').should('be.visible').should('have.text',header)
            cy.log('Step header '+header+' has seen on page')
            return val
        } catch (error) {
            cy.log('Step header has not seen on page error:' + error)
        }
    }

    verifyAccountNameTypeBalance(lineNum, accName, typeName, dollarAmount, IncludedChecked, lockedChecked) {
        try {
            const name = cy.get('tbody > :nth-child('+lineNum+') > :nth-child(1)').should('be.visible')
            name.should('have.text', accName)
            cy.log('For line: '+lineNum+': Account Name is '+accName+'.')

            const type = cy.get('tbody > :nth-child('+lineNum+') > :nth-child(2)').should('be.visible')
            type.should('have.text', typeName)
            cy.log('For line: '+lineNum+': Account Name is '+accName+' Account type is '+typeName+'.')
            
            const amount = cy.get('tbody > :nth-child('+lineNum+') > [style="text-align: right;"]').should('be.visible')
            amount.should('have.text', dollarAmount)
            cy.log('For line: '+lineNum+': Account Name is '+accName+' Account type is '+typeName+', Account balance is '+dollarAmount)

            const included1 = cy.get(':nth-child('+lineNum+') > :nth-child(4) > input').should('be.visible')
            if (IncludedChecked == true) {
                included1.should('have.attr','checked')
                cy.log('For line: '+lineNum+': Account Name is '+accName+' Account type is '+typeName+'. Included checked.')
            } else {
                included1.should('not.have.attr','checked')
                cy.log('For line: '+lineNum+': Account Name is '+accName+' Account type is '+typeName+'. Included not checked.')
            }

            const included2 = cy.get(':nth-child('+lineNum+') > :nth-child(5) > input').should('be.visible')
            if (lockedChecked == true) {
                included2.should('have.attr','checked')
                cy.log('For line: '+lineNum+': Account Name is '+accName+' Account type is '+typeName+'. Locked checked.')
            } else {
                included2.should('not.have.attr','checked')
                cy.log('For line: '+lineNum+': Account Name is '+accName+' Account type is '+typeName+'. Locked not checked.')
            }
        } catch (error) {
            cy.log('Line: '+lineNum+', Account name '+accName+' has not seen on page error:' + error)
        }
    }

    getDropdownList(rowNum) {
        try {
            const val = cy.get(':nth-child('+rowNum+') > :nth-child(5)').next('tbody > :nth-child('+rowNum+') > [style="width: 150px;"]')
                .find('div[role="listbox"]').should('be.visible')
            cy.log('Element has been seen on the page')
            return val;
        } catch (error) {
            cy.log('Element has not been seen on the page. Error: ' + error);
        }
    }

    verifyThirdPageTableResult(row, Name, PortFolioSet, Assignment){
        if (row !=null&&Name !=null&&PortFolioSet !=null&&Assignment !=null) {
            try {
                cy.get('tbody > :nth-child('+row+') > :nth-child(1)').should('have.text',Name)
                cy.get('tbody > :nth-child('+row+') > :nth-child(2)').should('have.text',PortFolioSet)
                cy.get('tbody > :nth-child('+row+') > :nth-child(3)').should('have.text',Assignment)
                cy.log('Name: '+Name+', Portfolio Set: '+PortFolioSet+', Assignment: '+Assignment+'is verified.')
            } catch (error) {
                cy.log('Test is not verified. Error: '+error)
            }
        }else{
            cy.log('Parameters can not be null.')
        }
        
    }

    verifyTableHeaderControl(index, headerText){
        try {
            cy.get('thead > tr > :nth-child('+index+')').should('have.text',headerText)
            cy.log('Column '+index+', '+headerText+' header name is verified.')
        } catch (error) {
            cy.log('Text has not been seen on the page. Error: ' + error);
        }
    }

    getDownloadPDF() {
        try {
            const val = cy.get('[style="float: right;"]').should('be.visible')
            cy.log('Download PDF button has seen on page')
            return val
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }

    verifyWizardPageHeaders(text) {
        try {
            cy.get('.title.wizard').contains(text).should('be.visible').and('have.text',text)
            cy.log('header text: '+text+' has seen on page')
            return val
        } catch (error) {
            cy.log('Element has not seen on page error:' + error)
        }
    }

    


getIdPsetUp(Affiliate, Environment, TestFileName){
    try{
        cy.get('#Affiliate').select(Affiliate)
        cy.get('#Environment').select(Environment)
        cy.readFile('cypress/Data/'+TestFileName+'').then((fileContent) => {
            cy.get('#Payload').invoke('val', fileContent)
        })
        cy.get('form[action="/Home/Submit"]').invoke('removeAttr', 'target')
        cy.get('.btn').should('have.text', 'Submit').click()
        cy.wait(10000)            
    }catch(error){
        cy.log('Payload failed to submit error:' + error)

    }
}



getStepBarHeaderAll(header) {
    try {
        const val = cy.get('[style="padding-bottom: 0px; padding-top: 5px;"]').should('be.visible').should('have.text',header)
        cy.log('Step header '+header+' has seen on page')
        return val
    } catch (error) {
        cy.log('Step header has not seen on page error:' + error)
    }
}



getStepBarCounterActive(number) {
    try {
        const val = cy.xpath('//div[@class="counter active"]').should('be.visible').should('have.text',number)
        cy.log('Step number '+number+' has seen on page')
        return val
    } catch (error) {
        cy.log('Step number has not seen on page error:' + error)
    }
}



getTaxSmartWithdrawalHeader(headerText) {
    try {
        const val = cy.get('.taxSmartWithdrawalHeader').should('be.visible').should('have.text',headerText) 
        cy.log('Page header has seen on page')
        return val
    } catch (error) {
        cy.log('Page header has not seen on page error:' + error)
    }
}



getPortfolioAmountField() {
    try {
        const val = cy.xpath("//input[@id='withdrawalAmounts.portfolioAmount']").should('be.visible')
        cy.log('Portfolio Amaount Field has seen on page')
        return val
    } catch (error) {
        cy.log('Element has not seen on page error:' + error)
    }
}



getNextButtonStep1() {
    try {
        const val = cy.get('.btn-common').should('be.visible').should('have.text','NEXT')
        cy.log('NEXT button has seen on page')
        return val
    } catch (error) {
        cy.log('Element has not seen on page error:' + error)
    }
}



getNextButtonStep2() {
    try {
        const val = cy.get('[type="submit"]').should('be.visible').should('have.text','NEXT')
        cy.log('NEXT button has seen on page')
        return val
    } catch (error) {
        cy.log('Element has not seen on page error:' + error)
    }
}



getBackButtonStep2() {
    try {
        const val = cy.get('[type="button"]').should('be.visible').should('have.text','BACK')
        cy.log('BACK button has seen on page')
        return val
    } catch (error) {
        cy.log('Element has not seen on page error:' + error)
    }
}



getBackButtonStep3() {
    try {
        const val = cy.get('[style="float: left;"]').should('be.visible').should('have.text','BACK')
        cy.log('BACK button has seen on page')
        return val
    } catch (error) {
        cy.log('Element has not seen on page error:' + error)
    }
}



verifyTableBodyData(lineIndex, columnIndex, bodyDataText){
    try {
        cy.get('tbody > :nth-child('+lineIndex+') > :nth-child('+columnIndex+')').should('be.visible').should('have.text',bodyDataText)        
        cy.log('Line '+lineIndex+' Column '+columnIndex+' data('+bodyDataText+') is verified.')
    } catch (error) {
        cy.log('Line '+lineIndex+' + Column '+columnIndex+' data('+bodyDataText+') has not been seen on the page. Error: ' + error);
    }
}

verifyTableHeaderData(columnIndex, bodyDataText){
    try {
        cy.get('.striped > thead > tr > :nth-child('+columnIndex+')').should('be.visible').should('have.text',bodyDataText)        
        cy.log('Column '+columnIndex+' data('+bodyDataText+') is verified.')
    } catch (error) {
        cy.log('Column '+columnIndex+' data('+bodyDataText+') has not been seen on the page. Error: ' + error);
    }
}




verifyStep3WithdrawalOverviewTableBodyData(lineIndex, columnIndex, bodyDataText){
    try {
        cy.get('.striped > tbody > :nth-child('+lineIndex+') > :nth-child('+columnIndex+')').should('be.visible').should('have.text',bodyDataText) 
        cy.log('Line '+lineIndex+' Column '+columnIndex+' data('+bodyDataText+') is verified.')
    } catch (error) {
        cy.log('Line '+lineIndex+' + Column '+columnIndex+' data('+bodyDataText+') has not been seen on the page. Error: ' + error);
    }
}  



verifyStep3PortfolioAllocationTableBodyData(lineIndex, columnIndex, bodyDataText, color=undefined){
    try {
    cy.document().then((doc) => {
        const element = doc.querySelectorAll(`:nth-child(${lineIndex}) > [rowspan="3"]`)
        if (element.length) {
            if(color){
            cy.get('tbody.tbltaxSmartWithdrawal > :nth-child('+lineIndex+') > :nth-child('+columnIndex+')').should('be.visible').should('have.text',bodyDataText).should('have.attr', 'style', `color: ${color}; text-align: right;`);
            }
            else{
                cy.get('tbody.tbltaxSmartWithdrawal > :nth-child('+lineIndex+') > :nth-child('+columnIndex+')').should('be.visible').should('have.text',bodyDataText)                    
            }
        } else {
            if(color){
            cy.get('tbody.tbltaxSmartWithdrawal > :nth-child('+lineIndex+') > :nth-child('+(columnIndex-1)+')').should('be.visible').should('have.text',bodyDataText).should('have.attr', 'style', `color: ${color}; text-align: right;`);
            }
            else{  
                cy.get('tbody.tbltaxSmartWithdrawal > :nth-child('+lineIndex+') > :nth-child('+(columnIndex-1)+')').should('be.visible').should('have.text',bodyDataText)
            }                            
        }
        cy.log('Line '+lineIndex+' Column '+columnIndex+' data('+bodyDataText+') is verified.')           
        })
    } catch (error) {
    cy.log('Line '+lineIndex+' + Column '+columnIndex+' data('+bodyDataText+') has not been seen on the page. Error: ' + error);
    }
}





verifyStep3PortfolioAllocationTableBodyData2(lineIndex, columnIndex, bodyDataText, color=undefined){
    try {
    cy.document().then((doc) => {
        const element = doc.querySelectorAll(`:nth-child(${lineIndex}) > [rowspan="3"]`)
        if (element.length) {
            if(color){
            cy.get('tbody.tbltaxSmartWithdrawal > :nth-child('+lineIndex+') > :nth-child('+columnIndex+')').should('be.visible').should('contain.html',bodyDataText).should('have.attr', 'style', `color: ${color}; text-align: right;`);
            }
            else{
                cy.get('tbody.tbltaxSmartWithdrawal > :nth-child('+lineIndex+') > :nth-child('+columnIndex+')').should('be.visible').should('contain.html',bodyDataText)                   
            }
        } else {
            if(color){
            cy.get('tbody.tbltaxSmartWithdrawal > :nth-child('+lineIndex+') > :nth-child('+(columnIndex-1)+')').should('be.visible').should('contain.html',bodyDataText).should('have.attr', 'style', `color: ${color}; text-align: right;`);
            }
            else{  
                cy.get('tbody.tbltaxSmartWithdrawal > :nth-child('+lineIndex+') > :nth-child('+(columnIndex-1)+')').should('be.visible').should('contain.html',bodyDataText)
            }                            
        }
        cy.log('Line '+lineIndex+' Column '+columnIndex+' data('+bodyDataText+') is verified.')           
        })
    } catch (error) {
    cy.log('Line '+lineIndex+' + Column '+columnIndex+' data('+bodyDataText+') has not been seen on the page. Error: ' + error);
    }
}


verifyStep3PortfolioAllocationTableBodyData3(lineIndex, DataText){
    try {
        const val = cy.get(':nth-child('+lineIndex+') > [rowspan="3"]').should('be.visible').should('contain.html',DataText)
        cy.log('Body Data has seen on table')
        return val
    } catch (error) {
        cy.log('Element has not seen on table error:' + error)
    }
}






















verifyStep3PortfolioAllocationTableHeadData(columnIndex, headDataText){
    try {
        const val = cy.get('.fixed > thead > tr > :nth-child('+columnIndex+')').should('be.visible').should('have.text',headDataText)
        cy.log('Head Data has seen on table')
        return val
    } catch (error) {
        cy.log('Element has not seen on table error:' + error)
    }
}



verifyTableBodyCheckBox(lineIndex, columnIndex, checkedBox){
    try{
        const checkBoxWebElement = cy.get('tbody > :nth-child('+lineIndex+') > :nth-child('+columnIndex+') > input').should('be.visible')  
        if (checkedBox == true) {
        checkBoxWebElement.should('have.attr','checked')
        cy.log('Line '+lineIndex+' Column '+columnIndex+' checkbox is checked.')         
        }else {
        checkBoxWebElement.should('not.have.attr','checked')
        cy.log('Line '+lineIndex+' Column '+columnIndex+' checkbox is not checked.')
    }
    }catch(error){
        cy.log('Line '+lineIndex+' + Column '+columnIndex+' data('+bodyDataText+') has not been seen on the page. Error: ' + error);
    }
}



getTableBodyCheckBox(lineIndex, columnIndex) {
    try {
        const val = cy.get('tbody > :nth-child('+lineIndex+') > :nth-child('+columnIndex+') > input').should('be.visible') 
        cy.log('CheckBox has seen on table')
        return val
    } catch (error) {
        cy.log('Element has not seen on table error:' + error)
    }
}



getHeader_h1(h1text) {
    try {
        const val = cy.xpath(`//h1[.='${h1text}']`).should('be.visible')
        cy.log(''+h1text+' header has seen on page')
        return val
    } catch (error) {
        cy.log(''+h1text+' header has not seen on page error:' + error)
    }
}



/**
@typedef {1 | 3 | 5 } SelectableAmountLevelColumnNumber
@typedef {'Portfolio' | 'Taxable' | 'Tax-Deferred' | 'Tax-Free' | 'type*Client1' | 'type*Client2'} SelectableAmountName
@typedef {'portfolio' | 'taxable' | 'taxDeferred' | 'taxFree' | 'client1' | 'client2'} SelectableAmountNameForId
@typedef {'Portfolio' | 'Taxable' | 'Tax-Deferred' | 'Tax-Free' | 'type*Client1' | 'type*Client2' | 'Short-Term Gain Limit' | 'Long-Term Gain Limit'} Selectableh3Text   
@param {SelectableAmountLevelColumnNumber} amountLevelColumnNumber - Values to take => '1', '3', '5'   Means => 1-Portfolio Level 3-Taxability Type Level 5-Group Level
@param {SelectableAmountName} amountName - Values to take => 'Portfolio', 'Taxable', 'Tax-Deferred', 'Tax-Free', 'type*Client1', 'type*Client2'
@param {SelectableAmountNameForId} amountNameforId - Values to take => 'portfolio', 'taxable', 'taxDeferred', 'taxFree', 'client1', 'client2'
@param {Selectableh3Text} h3Text - Values to take => 'Portfolio', 'Taxable', 'Tax-Deferred', 'Tax-Free', 'type*Client1', 'type*Client2', 'Short-Term Gain Limit', 'Long-Term Gain Limit'
*/
getWithdrawalAmountLevelArea(amountLevelColumnNumber, amountName, amountNameforId){
    try{         
        const val = cy.xpath(`//h1[.='Amounts']/following-sibling::div[@class='row']/div[@class='column']['${amountLevelColumnNumber}']/child::h3[.='${amountName}']/following-sibling::div/input[@id='withdrawalAmounts.${amountNameforId}Amount']`)            
        return val     
        
    }catch(error){           
        cy.log('Elements have not seen on page error:' + error)
    }
}



/**
 * 
@typedef {'Portfolio' | 'Taxable' | 'Tax-Deferred' | 'Tax-Free' | 'type*Client1' | 'type*Client2' | 'Short-Term Gain Limit' | 'Long-Term Gain Limit'} Selectableh3Text
@param {Selectableh3Text} h3Text - Values to take => 'Portfolio', 'Taxable', 'Tax-Deferred', 'Tax-Free', 'type*Client1', 'type*Client2', 'Short-Term Gain Limit', 'Long-Term Gain Limit'
*/
getValidationMessage(h3Text){
    try{
        const val = cy.xpath(`//h3[.='${h3Text}']/following-sibling::div/input/following-sibling::div[@class='ui red basic label']`)
        return val

    }catch(error){
        cy.log('Validation message has not seen on page error:' + error)
    }

}  





verifyNEXTbuttonStep2() {
    try {
        const val = cy.get('[type="submit"]').should('be.visible').should('have.text','NEXT')
        cy.log('NEXT button has seen on page')
        return val
    } catch (error) {
        cy.log('Element has not seen on page error:' + error)
    }
}


getToolTipIconRebalancing(){
    try {
        const val = cy.get('[style="margin-top: 12px; right: 75px;"] > span > .question').should('be.visible')
        cy.log('Tool Tip Icon has seen on page')
        return val
    } catch (error) {
        cy.log('Element has not seen on page error:' + error)
    }
}


getToolTipTextRebalancing(){
    try {
        const val = cy.get('ul').should('be.visible')
        cy.log('Tool Tip Text has seen on page')
        return val
    } catch (error) {
        cy.log('Element has not seen on page error:' + error)
    }
}


getDropdown(){
    try {
        const val = cy.get('.ui.fluid.selection.dropdown').should('be.visible')
        cy.log('Dropdown has seen on page')
        return val
    } catch (error) {
        cy.log('Element has not seen on page error:' + error)
    }
}


getDropdownMenu(){
    try {
        const val = cy.get('.menu.transition').should('be.visible')
        cy.log('Dropdown Menu has seen on page')
        return val
    } catch (error) {
        cy.log('Element has not seen on page error:' + error)
    }
}



getToolTipIcon(h3Text){
    try {
        const val = cy.xpath(`//h3[text()='${h3Text}']//parent::div//following-sibling::span/i`).should('be.visible')
        cy.log('Tool Tip Icon has seen on page')
        return val
    } catch (error) {
        cy.log('Element has not seen on page error:' + error)
    }
}



getToolTipText(){
    try {
        const val = cy.xpath(`//div[@id='popper-container']`).should('be.visible')
        cy.log('Tool Tip Text has seen on page')
        return val
    } catch (error) {
        cy.log('Element has not seen on page error:' + error)
    }
}




getToggle(inputId){
    try {
        const val = cy.xpath(`//input[@id='${inputId}']//parent::div`).should('be.visible')
        cy.log('Toggle has seen on page')
        return val
    } catch (error) {
        cy.log('Element has not seen on page error:' + error)
    }
}


    
getToggleEditField(h3text){
    try {
        const val = cy.xpath(`//h3[text()='${h3text}']//following-sibling::div/input`).should('be.visible')
        cy.log('Toggle Field has seen on page')
        return val
    } catch (error) {
        cy.log('Element has not seen on page error:' + error)
    }
}


getHeader_h1_Step3(row) {
    try {
        const val = cy.xpath(`//div[@class='ui container']/div[${row}]/h1`).should('be.visible')
        cy.log('Header has seen on page')
        return val
    } catch (error) {
        cy.log('Header has not seen on page error:' + error)
    }
}


getToolTipIconStep3(h1Text){
    try {
        const val = cy.xpath(`//h1[contains(text(),'${h1Text}')]/i`).should('be.visible')
        cy.log('Tool Tip Icon has seen on page')
        return val
    } catch (error) {
        cy.log('Element has not seen on page error:' + error)
    }
}



        
verifyColumnRowPortfolioAllocation(lineIndex, columnIndex, data){
    try {
        const val = cy.xpath(`//h1[contains(text(),'Portfolio Allocation')]/following-sibling::div/div[${lineIndex}]/div[${columnIndex}]`).should('be.visible').should('have.text',data)
        cy.log(''+data+' has seen on page')
        return val
    } catch (error) {
        cy.log('Element has not seen on page error:' + error)
    }
}



verifyColumnRowTaxImpactTables(tableNumber,lineIndex, columnIndex, data){
    try {
        const val = cy.xpath(`//h1[contains(text(),'Tax Impact')]//following-sibling::div/div/div[${tableNumber}]//child::tr[${lineIndex}]/td[${columnIndex}]`).should('be.visible').should('contain.html',data)
        cy.log(''+data+' has seen on page')
        return val
    } catch (error) {
        cy.log('Element has not seen on page error:' + error)
    }
}


    
verifyReportGenerated(){
    try {
        const val = cy.xpath(`//div[contains(text(),'Report Generated')]`).should('be.visible', { timeout: 10000 })
        cy.log('Element has seen on page')
        return val
    } catch (error) {
        cy.log('Element has not seen on page error:' + error)
    }
}

}


export default PI_TSW