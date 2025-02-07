/// <reference types="Cypress" />
import BasePage from "../../pages/BasePage"
import Login from "../../pages/LoginPage"
import IncomeLayerElements from "../../pages/IncomeLayer"
import QuestionnaireElements from "../../pages/Questionnaire"



describe('Income Layer Tests', () => {

    beforeEach(() => {
        const lg = new Login()

        cy.visit(Cypress.env('frontendUrl'));
        lg.lastEmailLogin()
        cy.document().should('have.property', 'charset').and('eq', 'UTF-8')
    })


    context('PopUp Control Test', () => {
        
        beforeEach(() => {
            const lg = new Login()

            lg.afterLoginCheckSSPage()
            const qs = new QuestionnaireElements();
            const ssaSwitch = "//div[@class='react-toggle toggleIncomeLayers'] | //div[@class='react-toggle react-toggle--checked toggleIncomeLayers']"

            qs.getASSCButton().click();
            cy.generateRandomString(5).then((randomString) => {
                const caseName=randomString
                cy.addACustomSSscenario(caseName, "Married", 1968, 2685,1794,2065);
                cy.get('.caseHeader > span').contains(caseName)
            });
            cy.wait(1000);
            
            cy.clickSwitchSSToIL();
           


        })

        it('Social Security Layer PopUp', () => {
            const il = new IncomeLayerElements();
            const qs = new QuestionnaireElements();
            const ssaSwitch = "//div[@class='react-toggle toggleIncomeLayers'] | //div[@class='react-toggle react-toggle--checked toggleIncomeLayers']"
            cy.get(il.getSelectors().SSEditLayer).should('be.visible');
            cy.log('LY.TC.SSA.IL.SS.01 - Check the Social Security Income Layer.')
            cy.get(il.getSelectors().SSELayerEnabled).should('be.visible');

            cy.log('LY.TC.SSA.IL.UI.PP.01 - Verify popup opens when clicking ellipsis button of Social Security layer.')
            cy.wait(1000);
            il.clickEditLayerName("Social Security");
            cy.verifyElementContainsText("Social Security", il.getEditPopupSelectors().LayerHeader);

            cy.log('LY.TC.SSA.IL.SS.02 - Check the Social Security pop-up.')
            cy.verifyLabel("Layer Name:");
            cy.verifyLabel("Strategy Type:");

            cy.verifyGetElement(il.getEditPopupSelectors().saveButton);
            cy.verifyGetElement(il.getEditPopupSelectors().cancelButton);
            cy.verifyGetElement(il.getEditPopupSelectors().closeButton);

            cy.log('LY.TC.SSA.IL.SS.04 - Verify validation for Layer Name in Social Security popup')
        



            cy.get(il.getEditPopupSelectors().SSLayerName).clear();
            cy.get(':nth-child(1) > .incomeLayerLabel').click();
            cy.verifyValidationMessage("Layer Name is required")
            cy.get(il.getEditPopupSelectors().saveDisabledButton).should('be.visible');

            cy.generateRandomString(5).then((randomString) => {
                cy.get(il.getEditPopupSelectors().SSLayerName).type(randomString);
                cy.get(':nth-child(1) > .incomeLayerLabel').click();

                cy.log('LY.TC.SSA.IL.SS.08 - Verify Save button.')
                cy.verifyGetElement(il.getEditPopupSelectors().saveButton);
                cy.get(il.getEditPopupSelectors().saveButton).click();
                cy.verifyElementContainsText(randomString, il.getEditPopupSelectors().LayerHeader);


            });
            cy.xpath(ssaSwitch)
            .click();
        cy.wait(1000);
        cy.xpath("//button[contains(text(),'Delete Case')]").click();
        cy.xpath("//div[@class='ui tiny modal transition visible active']//button[@class='ui negative button']").click();

        })


        it('Benefit Delay Layer Popup', () => {
            const il = new IncomeLayerElements();
            const qs = new QuestionnaireElements();
            const ssaSwitch = "//div[@class='react-toggle toggleIncomeLayers'] | //div[@class='react-toggle react-toggle--checked toggleIncomeLayers']"
            cy.log('LY.TC.SSA.IL.UI.PP.02 - Verify popup opens when clicking ellipsis button of Benefit Delay layer.')

            cy.wait(2000);
            il.clickEditLayerName("Benefit Delay");

            cy.verifyElementContainsText("Benefit Delay", il.getEditPopupSelectors().LayerHeader);

            cy.log('LY.TC.SSA.IL.BD.01 - Verify fields on Benefit Delay pop-up.')
            cy.verifyLabel("Layer Name:");
            cy.verifyLabel("Start Year:");
            cy.verifyLabel("End Year:");
            cy.verifyLabel("Asset Growth:");
            cy.verifyLabel("Show Assets Before First Income Payment:");
            cy.verifyLabel("Show Assets After First Income Payment:");

            cy.verifyGetElement(il.getEditPopupSelectors().BDLayerName);
            cy.verifyGetElement(il.getEditPopupSelectors().StartYearBD);
            cy.verifyGetElement(il.getEditPopupSelectors().EndYearBD);
            cy.verifyGetElement(il.getEditPopupSelectors().AssetGrowthBD2);
            cy.verifyGetElement(il.getEditPopupSelectors().saveButton);
            cy.verifyGetElement(il.getEditPopupSelectors().cancelButton);


            cy.log('LY.TC.SSA.IL.BD.12 - Verify validation for Layer Name in Benefit Delay popup.')
      
            cy.wait(2000);
            cy.get(il.getEditPopupSelectors().BDLayerName).clear();
            cy.get(il.getEditPopupSelectors().AssetGrowthBD2).click();
            //cy.verifyValidationMessage("Layer Name is required").should('exist');
            cy.get(il.getEditPopupSelectors().saveDisabledButton).should('be.visible');

            cy.log('LY.TC.SSA.IL.BD.13 - Verify validation for Asset Growth in Benefit Delay popup.')

            cy.generateRandomString(5).then((randomString) => {
                cy.get(il.getEditPopupSelectors().BDLayerName).type(randomString);
                cy.get(il.getEditPopupSelectors().AssetGrowthBD2).click();

                cy.get(il.getEditPopupSelectors().AssetGrowthBD2).invoke('val').then((value) => {

                    expect(value).to.equal('0.00%');
                });
                cy.wait(500)
                cy.get(il.getEditPopupSelectors().AssetGrowthBD2).clear();
                cy.get(il.getEditPopupSelectors().BDLayerName).click();
                cy.verifyValidationMessage("Growth Rate is required")
                cy.get(il.getEditPopupSelectors().saveDisabledButton).should('be.visible');

                cy.log('LY.TC.SSA.IL.BD.03 - Check the Asset Growth in the Benefit Delay pop-up.')
                cy.get(il.getEditPopupSelectors().AssetGrowthBD2).type("99");
                cy.get(il.getEditPopupSelectors().AssetGrowthBD2).invoke('val').then((value) => {

                    expect(value).to.equal('9.00%');
                });
                cy.wait(500)
                cy.get(il.getEditPopupSelectors().AssetGrowthBD2).clear();
                cy.get(il.getEditPopupSelectors().AssetGrowthBD2).type("9.99");

                cy.verifyValueInput(il.getEditPopupSelectors().AssetGrowthBD2,'9.99%')
          

                cy.log('LY.TC.SSA.IL.BD.08 - Verify increasing when user toggle on Show Asset Before First Income Payment.')
                cy.xpath(il.getEditPopupSelectors().BDAssetBeforeEnabled).should('be.visible');
                cy.xpath(il.getEditPopupSelectors().BDAssetBeforeEnabled).click();
                cy.get(il.getEditPopupSelectors().BDAssetAfterDisabled).should('be.visible');
                cy.get(il.getEditPopupSelectors().BDAssetAfterDisabled).click();

                cy.log('LY.TC.SSA.IL.BD.09 - Verify increasing when user toggle on Show Asset After First Income Payment.')
                cy.get(il.getEditPopupSelectors().BDAssetAfterEnabled).should('be.visible');
                cy.get(il.getEditPopupSelectors().BDAssetAfterEnabled).click();
                cy.get(il.getEditPopupSelectors().BDAssetBeforeDisabled).should('be.visible');
                cy.get(il.getEditPopupSelectors().BDAssetBeforeDisabled).click();

                cy.log('LY.TC.SSA.IL.BD.06 - Verify Save button.')
                cy.get(il.getEditPopupSelectors().saveButton).click();
                cy.wait(5000);
                cy.get('div.twelve.wide.column').compareSnapshot({
                    name: 'BD2_On',
                    testThreshold: 0.1,
                    recurseOptions: { limit: 3, delay: 500 }})


                cy.log('LY.TC.SSA.IL.BD.11 - Verify layer name can be changeable.')
                il.clickEditLayerName(randomString);
                cy.verifyElementContainsText(randomString, il.getEditPopupSelectors().LayerHeader);

                cy.log('LY.TC.SSA.IL.BD.05 - Verify popup close when clicking Close button.')
                cy.get(il.getEditPopupSelectors().closeButton).click();
                cy.get('div.twelve.wide.column').compareSnapshot({
                    name: 'BD2_On',
                    testThreshold: 0.1,
                    recurseOptions: { limit: 3, delay: 500 }})

                il.clickEditLayerName(randomString);
                cy.wait(500)
                cy.get(il.getEditPopupSelectors().BDLayerName).clear();
                cy.get(il.getEditPopupSelectors().BDLayerName).type("Benefit Delay");
                cy.get(il.getEditPopupSelectors().saveButton).click();
            });
            cy.xpath(ssaSwitch)
            .click();
        cy.wait(1000);
        cy.xpath("//button[contains(text(),'Delete Case')]").click();
        cy.xpath("//div[@class='ui tiny modal transition visible active']//button[@class='ui negative button']").click();
        })

        
        it('Benefit Replacement Layer Popup', () => {
            const il = new IncomeLayerElements();
            const qs = new QuestionnaireElements();
            const ssaSwitch = "//div[@class='react-toggle toggleIncomeLayers'] | //div[@class='react-toggle react-toggle--checked toggleIncomeLayers']"
            cy.log('LY.TC.SSA.IL.UI.PP.03 - Verify popup opens when clicking ellipsis button of Benefit Replacement layer.')

            il.clickEditLayerName("Benefit Replacement");

            cy.verifyElementContainsText("Benefit Replacement", il.getEditPopupSelectors().LayerHeader);

            cy.log('LY.TC.SSA.IL.BR.01 - Verify fields on Benefit Replacement pop-up.')
            cy.verifyLabel("Layer Name:");
            cy.verifyLabel("Start Year:");
            cy.verifyLabel("End Year:");
            cy.verifyLabel("Asset Growth:");
            cy.verifyLabel("Show Assets Before First Income Payment:");
            cy.verifyLabel("Show Assets After First Income Payment:");

            cy.verifyGetElement(il.getEditPopupSelectors().BRLayerName);
            cy.verifyGetElement(il.getEditPopupSelectors().StartYearBR);
            cy.verifyGetElement(il.getEditPopupSelectors().EndYearBR);
            cy.verifyGetElement(il.getEditPopupSelectors().AssetGrowthBR2);
            cy.verifyGetElement(il.getEditPopupSelectors().saveButton);
            cy.verifyGetElement(il.getEditPopupSelectors().cancelButton);


            cy.log('LY.TC.SSA.IL.BR.12 - Verify validation for Layer Name in Benefit Replacement popup.')
            cy.wait(500)
            cy.get(il.getEditPopupSelectors().BRLayerName).clear();
            cy.get(il.getEditPopupSelectors().AssetGrowthBR2).click();
            //cy.verifyValidationMessage("Layer Name is required").should('exist');
            cy.get(il.getEditPopupSelectors().saveDisabledButton).should('be.visible');

            cy.log('LY.TC.SSA.IL.BR.13 - Verify validation for Asset Growth in Benefit Replacement popup.')

            cy.generateRandomString(5).then((randomString) => {
                cy.get(il.getEditPopupSelectors().BRLayerName).type(randomString);
                cy.get(il.getEditPopupSelectors().AssetGrowthBR2).click();

                cy.get(il.getEditPopupSelectors().AssetGrowthBR2).invoke('val').then((value) => {

                    expect(value).to.equal('0.00%');
                });
                cy.wait(500)
                cy.get(il.getEditPopupSelectors().AssetGrowthBR2).clear();
                cy.get(il.getEditPopupSelectors().BRLayerName).click();
                cy.verifyValidationMessage("Growth Rate is required")
                cy.get(il.getEditPopupSelectors().saveDisabledButton).should('be.visible');

                cy.log('LY.TC.SSA.IL.BR.03 - Check the Asset Growth in the Benefit Replacement pop-up.')
                cy.get(il.getEditPopupSelectors().AssetGrowthBR2).type("99");
                cy.get(il.getEditPopupSelectors().AssetGrowthBR2).invoke('val').then((value) => {

                    expect(value).to.equal('9.00%');
                });
                cy.wait(500)
                cy.get(il.getEditPopupSelectors().AssetGrowthBR2).clear();
                cy.get(il.getEditPopupSelectors().AssetGrowthBR2).type("9.99");

                cy.verifyValueInput(il.getEditPopupSelectors().AssetGrowthBR2,'9.99%')
          

                cy.log('LY.TC.SSA.IL.BR.08 - Verify increasing when user toggle on Show Asset Before First Income Payment.')
                cy.xpath(il.getEditPopupSelectors().BRAssetBeforeEnabled).should('be.visible');
                cy.xpath(il.getEditPopupSelectors().BRAssetBeforeEnabled).click();
                cy.get(il.getEditPopupSelectors().BRAssetAfterDisabled).should('be.visible');
                cy.get(il.getEditPopupSelectors().BRAssetAfterDisabled).click();

                cy.log('LY.TC.SSA.IL.BR.09 - Verify increasing when user toggle on Show Asset After First Income Payment.')
                cy.get(il.getEditPopupSelectors().BRAssetAfterEnabled).should('be.visible');
                cy.get(il.getEditPopupSelectors().BRAssetAfterEnabled).click();
                cy.get(il.getEditPopupSelectors().BRAssetBeforeDisabled).should('be.visible');
                cy.get(il.getEditPopupSelectors().BRAssetBeforeDisabled).click();

                cy.log('LY.TC.SSA.IL.BR.06 - Verify Save button.')
                cy.get(il.getEditPopupSelectors().saveButton).click();
                cy.wait(5000);
                cy.get('div.twelve.wide.column').compareSnapshot({
                    name: 'BR2_On',
                    testThreshold: 0.1,
                    recurseOptions: { limit: 3, delay: 500 }})


                cy.log('LY.TC.SSA.IL.BR.11 - Verify layer name can be changeable.')
                il.clickEditLayerName(randomString);
                cy.verifyElementContainsText(randomString, il.getEditPopupSelectors().LayerHeader);

                cy.log('LY.TC.SSA.IL.BR.05 - Verify popup close when clicking Close button.')
                cy.get(il.getEditPopupSelectors().closeButton).click();
                cy.get('div.twelve.wide.column').compareSnapshot({
                    name: 'BR2_On',
                    testThreshold: 0.1,
                    recurseOptions: { limit: 3, delay: 500 }})

                il.clickEditLayerName(randomString);
                cy.wait(500)
                cy.get(il.getEditPopupSelectors().BRLayerName).clear();
                cy.get(il.getEditPopupSelectors().BRLayerName).type("Benefit Replacement");
                cy.get(il.getEditPopupSelectors().saveButton).click();
            });
            cy.xpath(ssaSwitch)
            .click();
        cy.wait(1000);
        cy.xpath("//button[contains(text(),'Delete Case')]").click();
        cy.xpath("//div[@class='ui tiny modal transition visible active']//button[@class='ui negative button']").click();
        })

        it('Income Floor Layer Popup', () => {
            const il = new IncomeLayerElements();
            const qs = new QuestionnaireElements();
            const ssaSwitch = "//div[@class='react-toggle toggleIncomeLayers'] | //div[@class='react-toggle react-toggle--checked toggleIncomeLayers']"
            cy.log('LY.TC.SSA.IL.UI.PP.04 - Verify popup opens when clicking ellipsis button of Income Floor layer.')

            il.clickEditLayerName("Income Floor");

            cy.verifyElementContainsText("Income Floor", il.getEditPopupSelectors().LayerHeader);

            cy.log('LY.TC.SSA.IL.IF.01 - Verify fields on Income Floor pop-up.')
            cy.verifyLabel("Layer Name:");
            cy.verifyLabel("Start Year:");
            cy.verifyLabel("End Year:");
            cy.verifyLabel("Asset Growth:");
            cy.verifyLabel("Income Growth:");
            cy.verifyLabel("Starting Income:");
            cy.verifyLabel("Show Assets Before First Income Payment");
            cy.verifyLabel("Show Assets After First Income Payment");

            cy.verifyGetElement(il.getEditPopupSelectors().IFLayerName);
            cy.verifyGetElement(il.getEditPopupSelectors().StartYearIF);
            cy.verifyGetElement(il.getEditPopupSelectors().EndYearIF);
            cy.verifyGetElement(il.getEditPopupSelectors().AssetGrowthIF2);
            cy.verifyGetElement(il.getEditPopupSelectors().IncomeGrowthIF2);
            cy.verifyGetElement(il.getEditPopupSelectors().StartValueIF);
            cy.verifyGetElement(il.getEditPopupSelectors().saveButton);
            cy.verifyGetElement(il.getEditPopupSelectors().cancelButton);

            cy.log('LY.TC.SSA.IL.IF.06 - Check Starting Income min and max value.')
            cy.get(il.getEditPopupSelectors().StartValueIF).click();
            cy.wait(500)
            cy.get(il.getEditPopupSelectors().StartValueIF).clear();
            cy.get(il.getEditPopupSelectors().StartValueIF).type("9999999");
            cy.verifyValidationMessage("Starting Income has a maximum of $999,999.99")
            cy.wait(500)
            cy.get(il.getEditPopupSelectors().StartValueIF).clear();
            cy.verifyValidationMessage("Starting Income is required")
            cy.get(il.getEditPopupSelectors().StartValueIF).type("0");


            cy.log('LY.TC.SSA.IL.IF.17 - Verify validation for Layer Name in Income Floor popup.')     
            cy.wait(500)
            cy.get(il.getEditPopupSelectors().IFLayerName).clear();
            cy.get(il.getEditPopupSelectors().StartValueIF).click();
            cy.verifyValidationMessage("Layer Name is required")
            cy.get(il.getEditPopupSelectors().saveDisabledButton).should('be.visible');
            cy.generateRandomString(5).then((randomString) => {
                cy.get(il.getEditPopupSelectors().IFLayerName).type(randomString);
                cy.get(il.getEditPopupSelectors().AssetGrowthIF2).click();

                
            cy.log('LY.TC.SSA.IL.IF.18 - Verify validation for Asset Growth in Income Floor popup.')

                cy.get(il.getEditPopupSelectors().AssetGrowthIF2).invoke('val').then((value) => {

                    expect(value).to.equal('0.00%');
                });
                cy.wait(500)
                cy.get(il.getEditPopupSelectors().AssetGrowthIF2).clear();
                cy.get(il.getEditPopupSelectors().IFLayerName).click();
                cy.verifyValidationMessage("Asset Growth Rate is required")
                cy.get(il.getEditPopupSelectors().saveDisabledButton).should('be.visible');

                cy.log('LY.TC.SSA.IL.IF.05 - Check the Asset Growth and Income Growth min and max value in the Income Floor.')
                cy.get(il.getEditPopupSelectors().AssetGrowthIF2).type("99");
                cy.get(il.getEditPopupSelectors().AssetGrowthIF2).invoke('val').then((value) => {

                    expect(value).to.equal('9.00%');
                });
                cy.wait(500)
                cy.get(il.getEditPopupSelectors().AssetGrowthIF2).clear();
                cy.get(il.getEditPopupSelectors().AssetGrowthIF2).type("9.99");

                cy.verifyValueInput(il.getEditPopupSelectors().AssetGrowthIF2,'9.99%')
                cy.wait(500)
                cy.get(il.getEditPopupSelectors().AssetGrowthIF2).clear();
                cy.get(il.getEditPopupSelectors().AssetGrowthIF2).type("0");

                cy.log('LY.TC.SSA.IL.IF.19 - Verify validation for Income Growth in Income Floor popup ')
                cy.get(il.getEditPopupSelectors().IncomeGrowthIF2).invoke('val').then((value) => {

                    expect(value).to.equal('0.00%');
                });
                cy.wait(500)
                cy.get(il.getEditPopupSelectors().IncomeGrowthIF2).clear();
                cy.get(il.getEditPopupSelectors().IFLayerName).click();
                cy.verifyValidationMessage("Income Growth Rate is required")
                cy.get(il.getEditPopupSelectors().saveDisabledButton).should('be.visible');

                cy.log('LY.TC.SSA.IL.IF.05 - Check the Asset Growth and Income Growth min and max value in the Income Floor.')
                cy.get(il.getEditPopupSelectors().IncomeGrowthIF2).type("99");
                cy.get(il.getEditPopupSelectors().IncomeGrowthIF2).invoke('val').then((value) => {

                    expect(value).to.equal('9.00%');
                });
                cy.wait(500)
                cy.get(il.getEditPopupSelectors().IncomeGrowthIF2).clear();
                cy.get(il.getEditPopupSelectors().IncomeGrowthIF2).type("9.99");

                cy.verifyValueInput(il.getEditPopupSelectors().IncomeGrowthIF2,'9.99%')
                cy.wait(500)
                cy.get(il.getEditPopupSelectors().IncomeGrowthIF2).clear();
                cy.get(il.getEditPopupSelectors().IncomeGrowthIF2).type("0");


                cy.log('LY.TC.SSA.IL.IF.13 - Verify increasing when user toggle on Show Asset Before First Income Payment.')
                cy.xpath(il.getEditPopupSelectors().IFAssetBeforeEnabled).should('be.visible');
                cy.xpath(il.getEditPopupSelectors().IFAssetBeforeEnabled).click();
                cy.get(il.getEditPopupSelectors().IFAssetAfterDisabled).should('be.visible');
                cy.get(il.getEditPopupSelectors().IFAssetAfterDisabled).click();

                cy.log('LY.TC.SSA.IL.IF.14 - Verify increasing when user toggle on Show Asset After First Income Payment.')
                cy.get(il.getEditPopupSelectors().IFAssetAfterEnabled).should('be.visible');
                cy.get(il.getEditPopupSelectors().IFAssetAfterEnabled).click();
                cy.get(il.getEditPopupSelectors().IFAssetBeforeDisabled).should('be.visible');
                cy.get(il.getEditPopupSelectors().IFAssetBeforeDisabled).click();

                cy.log('LY.TC.SSA.IL.IF.03 - Check the Start Year field displayed in the Income Floor popup.')
                cy.verifyGetElement(il.getEditPopupSelectors().StartYearIF);

                cy.log('LY.TC.SSA.IL.IF.04 - Check the End Year field displayed in the Income Floor popup.')//TO DO

                cy.log('LY.TC.SSA.IL.IF.09 - Verify Save button.')
                cy.get(il.getEditPopupSelectors().saveButton).click();
                cy.wait(5000);
                cy.get('div.twelve.wide.column').compareSnapshot({
                    name: 'IF2_On',
                    testThreshold: 0.1,
                    recurseOptions: { limit: 3, delay: 500 }})


                cy.log('LY.TC.SSA.IL.IF.16 - Verify layer name can be changeable.')
                il.clickEditLayerName(randomString);
                cy.verifyElementContainsText(randomString, il.getEditPopupSelectors().LayerHeader);

                cy.log('LY.TC.SSA.IL.IF.08 - Verify popup close when clicking Close button.')
                cy.get(il.getEditPopupSelectors().closeButton).click();
                cy.get('div.twelve.wide.column').compareSnapshot({
                    name: 'IF2_On',
                    testThreshold: 0.1,
                    recurseOptions: { limit: 3, delay: 500 }})

                il.clickEditLayerName(randomString);
                cy.wait(500)
                cy.get(il.getEditPopupSelectors().IFLayerName).clear();
                cy.get(il.getEditPopupSelectors().IFLayerName).type("Income Floor");
                cy.get(il.getEditPopupSelectors().saveButton).click();
            });
            cy.xpath(ssaSwitch)
            .click();
        cy.wait(1000);
        cy.xpath("//button[contains(text(),'Delete Case')]").click();
        cy.xpath("//div[@class='ui tiny modal transition visible active']//button[@class='ui negative button']").click();
        })

        it('Additional Income Layer Popup', () => {
            const il = new IncomeLayerElements();
            const qs = new QuestionnaireElements();
            const ssaSwitch = "//div[@class='react-toggle toggleIncomeLayers'] | //div[@class='react-toggle react-toggle--checked toggleIncomeLayers']"
            cy.log('LY.TC.SSA.IL.UI.PP.05 - Verify popup opens when clicking ellipsis button of Additional Income layer.')

            il.clickEditLayerName("Additional Income");

            cy.verifyElementContainsText("Additional Income", il.getEditPopupSelectors().LayerHeader);

            cy.log('LY.TC.SSA.IL.AI.01 - Verify fields on Additional Income pop-up.')
            cy.verifyLabel("Layer Name:");
            cy.verifyLabel("Start Year:");
            cy.verifyLabel("End Year:");
            cy.verifyLabel("Asset Growth:");
            cy.verifyLabel("Income Growth:");
            cy.verifyLabel("Show Assets Before First Income Payment");
            cy.verifyLabel("Show Assets After First Income Payment");
            cy.verifyLabel("Product Type:");
        
            cy.verifyGetElement(il.getEditPopupSelectors().AILayerName);
            cy.verifyGetElement(il.getEditPopupSelectors().StartYearAI);
            cy.verifyGetElement(il.getEditPopupSelectors().EndYearAI);
            cy.verifyGetElement(il.getEditPopupSelectors().IncomeGrowthAI2);
            cy.verifyGetElement(il.getEditPopupSelectors().AIProductType);
            cy.verifyGetElement(il.getEditPopupSelectors().saveButton);
            cy.verifyGetElement(il.getEditPopupSelectors().cancelButton);
            cy.verifyGetElement(il.getEditPopupSelectors().closeButton);


            cy.log('LY.TC.SSA.IL.AI.PT.02 - Check the default option selected in the Product Type drop down')
            cy.wait(1000);
            cy.get(il.getEditPopupSelectors().AIProductType).verifySelectedOption('Investment');

            cy.log('LY.TC.SSA.IL.AI.PT.I.01 - Check when the user selects the Product Type as Investment')
            cy.verifyGetElement(il.getEditPopupSelectors().AssetGrowthAI2);
            

            cy.log('LY.TC.SSA.IL.AI.PT.FIA.01 - Check when the user selects the Product Type as Fixed Indexed Annuity')
            cy.wait(1000);
            cy.selectOptionByText(il.getEditPopupSelectors().AIProductType, "Fixed Indexed Annuity");
            cy.verifyLabel("Guaranteed Minimum:");
            cy.verifyLabel("Purchase Amount:");
          
            cy.verifyGetElement(il.getEditPopupSelectors().AIGuaranteedMinimum);
            cy.verifyGetElement(il.getEditPopupSelectors().AIPurchaseAmount);

            cy.log('LY.TC.SSA.IL.AI.05 - Check Starting Income min and max value.')
            cy.get(il.getEditPopupSelectors().StartValueAI).click();
            cy.wait(500)
            cy.get(il.getEditPopupSelectors().StartValueAI).clear();
            cy.get(il.getEditPopupSelectors().StartValueAI).type("9999999");
            cy.verifyValidationMessage("Starting Income has a maximum of $999,999.99")
            cy.wait(500)
            cy.get(il.getEditPopupSelectors().StartValueAI).clear();
            //cy.verifyValidationMessage("Starting Income is required")
            cy.get(il.getEditPopupSelectors().StartValueAI).type("0");


            cy.log('LY.TC.SSA.IL.AI.14 - Verify validation for Layer Name in Additional Income popup.')     
            cy.wait(2000);
            cy.get(il.getEditPopupSelectors().AILayerName).clear();
            cy.get(il.getEditPopupSelectors().StartValueAI).click();
            cy.verifyValidationMessage("Layer Name is required")
            cy.get(il.getEditPopupSelectors().saveDisabledButton).should('be.visible');
            cy.generateRandomString(5).then((randomString) => {
                cy.get(il.getEditPopupSelectors().AILayerName).type(randomString);
                cy.get(il.getEditPopupSelectors().IncomeGrowthAI2).click();


                cy.log('LY.TC.SSA.IL.AI.PT.I.02 - Check the Asset Growth in the Additional Income pop-up when the user selects the Product Type as Invesment ')
                cy.wait(1000);
                cy.selectOptionByText(il.getEditPopupSelectors().AIProductType, "Investment");
                cy.get(il.getEditPopupSelectors().AssetGrowthAI2).invoke('val').then((value) => {

                    expect(value).to.equal('0.00%');
                });
                cy.wait(500)
                cy.get(il.getEditPopupSelectors().AssetGrowthAI2).clear();
                cy.get(il.getEditPopupSelectors().AILayerName).click();
                cy.verifyValidationMessage("Asset Growth Rate is required")
                cy.get(il.getEditPopupSelectors().saveDisabledButton).should('be.visible');

                cy.log('LY.TC.SSA.IL.AI.04 - Check the Asset Growth and Income Growth min and max value in the Additional Income.')
                cy.get(il.getEditPopupSelectors().AssetGrowthAI2).type("99");
                cy.get(il.getEditPopupSelectors().AssetGrowthAI2).invoke('val').then((value) => {

                    expect(value).to.equal('9.00%');
                });
                cy.wait(500)
                cy.get(il.getEditPopupSelectors().AssetGrowthAI2).clear();
                cy.get(il.getEditPopupSelectors().AssetGrowthAI2).type("9.99");

                cy.verifyValueInput(il.getEditPopupSelectors().AssetGrowthAI2,'9.99%')
                cy.wait(500)
                cy.get(il.getEditPopupSelectors().AssetGrowthAI2).clear();
                cy.get(il.getEditPopupSelectors().AssetGrowthAI2).type("0");

                cy.log('LY.TC.SSA.IL.AI.02 - Check the Start Year field displayed in the Additional Income. ')
                cy.verifyGetElement(il.getEditPopupSelectors().StartYearAI);
                //cy.log('LY.TC.SSA.IL.AI.03 - Check the End Year field displayed in the Additional Income. ')

                cy.log('LY.TC.SSA.IL.AI.16 - Verify validation for Income Growth in Additional Income popup ')
                cy.get(il.getEditPopupSelectors().IncomeGrowthAI2).invoke('val').then((value) => {

                    expect(value).to.equal('0.00%');
                });
                cy.get(il.getEditPopupSelectors().IncomeGrowthAI2).clear();
                cy.get(il.getEditPopupSelectors().AILayerName).click();
                cy.verifyValidationMessage("Income Growth Rate is required")
                cy.get(il.getEditPopupSelectors().saveDisabledButton).should('be.visible');

                cy.log('LY.TC.SSA.IL.AI.04 - Check the Asset Growth and Income Growth min and max value in the Additional Income.')
                cy.get(il.getEditPopupSelectors().IncomeGrowthAI2).type("99");
                cy.get(il.getEditPopupSelectors().IncomeGrowthAI2).invoke('val').then((value) => {

                    expect(value).to.equal('9.00%');
                });
                cy.wait(500)
                cy.get(il.getEditPopupSelectors().IncomeGrowthAI2).clear();
                cy.get(il.getEditPopupSelectors().IncomeGrowthAI2).type("9.99");

                cy.verifyValueInput(il.getEditPopupSelectors().IncomeGrowthAI2,'9.99%')
                cy.wait(500)
                cy.get(il.getEditPopupSelectors().IncomeGrowthAI2).clear();
                cy.get(il.getEditPopupSelectors().IncomeGrowthAI2).type("0");


                cy.log('LY.TC.SSA.IL.AI.PT.I.03 - Check the Assets toggle buttons in the pop-up when the user select the Product Type as Invesment')
                cy.xpath(il.getEditPopupSelectors().AIAssetBeforeEnabled).should('be.visible');
                cy.xpath(il.getEditPopupSelectors().AIAssetBeforeEnabled).click();
                cy.get(il.getEditPopupSelectors().AIAssetAfterDisabled).should('be.visible');
                cy.get(il.getEditPopupSelectors().AIAssetAfterDisabled).click();

                cy.log('LY.TC.SSA.IL.AI.PT.I.03 - Check the Assets toggle buttons in the pop-up when the user select the Product Type as Invesment')
                cy.get(il.getEditPopupSelectors().AIAssetAfterEnabled).should('be.visible');
                cy.get(il.getEditPopupSelectors().AIAssetAfterEnabled).click();
                cy.get(il.getEditPopupSelectors().AIAssetBeforeDisabled).should('be.visible');
                cy.get(il.getEditPopupSelectors().AIAssetBeforeDisabled).click();


                cy.log('LY.TC.SSA.IL.AI.PT.FIA.02 - Check the Guaranteed Minimum field when the user selects Fixed Indexed Annuity')
                cy.selectOptionByText(il.getEditPopupSelectors().AIProductType, "Fixed Indexed Annuity");
                cy.get(il.getEditPopupSelectors().AIGuaranteedMinimum).invoke('val').then((value) => {

                    expect(value).to.equal('$0');
                });

                cy.log('LY.TC.SSA.IL.AI.PT.FIA.03 - Check the Validation message when  Guaranteed Minimum field is empty and user clicks Save.')
                cy.wait(1000)
                cy.get(il.getEditPopupSelectors().AIGuaranteedMinimum).clear();
                cy.get(il.getEditPopupSelectors().AILayerName).click();
                cy.verifyValidationMessage("Guaranteed Minimum is required")
                cy.log('LY.TC.SSA.IL.AI.PT.FIA.04 - Check the maximum value allowed in the Guaranteed Minimum field')
                cy.wait(500)
                cy.get(il.getEditPopupSelectors().AIGuaranteedMinimum).clear();
                cy.get(il.getEditPopupSelectors().AIGuaranteedMinimum).type("9999999");
                cy.get(il.getEditPopupSelectors().AILayerName).click();
                cy.verifyValidationMessage("Guaranteed Minimum has a maximum of $999,999.99")


                cy.log('LY.TC.SSA.IL.AI.PT.FIA.05 - Check the Purchase Amount field when the user selects Fixed Indexed Annuity')
                cy.get(il.getEditPopupSelectors().AIPurchaseAmount).invoke('val').then((value) => {

                    expect(value).to.equal('$0');
                });

                cy.log('LY.TC.SSA.IL.AI.PT.FIA.06 - Check the Validation message when  Purchase Amount field is empty and user clicks Save.')
                cy.wait(500)
                cy.get(il.getEditPopupSelectors().AIPurchaseAmount).clear();
                cy.get(il.getEditPopupSelectors().AILayerName).click();
                cy.verifyValidationMessage("Purchase Amount is required")

                cy.log('LY.TC.SSA.IL.AI.PT.FIA.07 - Check the maximum value allowed in the Purchase Amount field')
                cy.wait(500)
                cy.get(il.getEditPopupSelectors().AIPurchaseAmount).clear();
                cy.get(il.getEditPopupSelectors().AIPurchaseAmount).type("9999999");
                cy.get(il.getEditPopupSelectors().AILayerName).click();
                cy.wait(1000);
                cy.verifyValidationMessage("Guaranteed Minimum has a maximum of $999,999.99")

                cy.selectOptionByText(il.getEditPopupSelectors().AIProductType, "Investment");

                cy.log('LY.TC.SSA.IL.AI.20 - Check layer toggle after clicking Save button.')
                cy.get(il.getEditPopupSelectors().saveButton).click();
                cy.wait(5000);
                cy.get('div.twelve.wide.column').compareSnapshot({
                    name: 'AI2_On',
                    testThreshold: 0.1,
                    recurseOptions: { limit: 3, delay: 500 }});


                cy.log('LY.TC.SSA.IL.AI.13 - Verify layer name can be changeable.')
                il.clickEditLayerName(randomString);
                cy.verifyElementContainsText(randomString, il.getEditPopupSelectors().LayerHeader);

                cy.log('LY.TC.SSA.IL.IF.08 - Verify popup close when clicking Close button.')
                cy.get(il.getEditPopupSelectors().closeButton).click();
                cy.get('div.twelve.wide.column').compareSnapshot({
                    name: 'AI2_On',
                    testThreshold: 0.1,
                    recurseOptions: { limit: 3, delay: 500 }})

                il.clickEditLayerName(randomString);
                cy.wait(500)
                cy.get(il.getEditPopupSelectors().AILayerName).clear();
                cy.get(il.getEditPopupSelectors().AILayerName).type("Additional Income");
                cy.get(il.getEditPopupSelectors().saveButton).click();
            });
            cy.xpath(ssaSwitch)
            .click();
        cy.wait(1000);
        cy.xpath("//button[contains(text(),'Delete Case')]").click();
        cy.xpath("//div[@class='ui tiny modal transition visible active']//button[@class='ui negative button']").click();
        })

    })


    afterEach(() => {
        cy.task('generateReport')
    })
})

