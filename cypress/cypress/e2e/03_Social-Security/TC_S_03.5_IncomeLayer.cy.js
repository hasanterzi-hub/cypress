/// <reference types="Cypress" />
import BasePage from "../../pages/BasePage"
import Login from "../../pages/LoginPage"
import IncomeLayerElements from "../../pages/IncomeLayer"
import QuestionnaireElements from "../../pages/Questionnaire"
import SSElements from "../../pages/SampleScenario"



describe('Income Layer Tests', () => {

    beforeEach(() => {
        const lg = new Login()

        cy.visit(Cypress.env('frontendUrl'));
        lg.lastEmailLogin()
        cy.document().should('have.property', 'charset').and('eq', 'UTF-8')
    })

    context('Income Layer Default Control Test', () => {


        beforeEach(() => {
            const lg = new Login()

            lg.afterLoginCheckSSPage()
            cy.clickToText('Add a Social Security Case')
            cy.generateRandomString(8).then((randomString) => {
                const caseName = randomString
                cy.addACustomSSscenario(caseName, 'Married', 1968, 2685, 1974, 2065)
                cy.get('.caseHeader > span').contains(caseName)
            })
            //cy.checkToggleILToSS()
        })


        it('Income Layer Default Control', () => {
            const il = new IncomeLayerElements()
            const qs = new QuestionnaireElements()
            const ss = new SSElements()
            const ssaSwitch = "//div[@class='react-toggle toggleIncomeLayers'] | //div[@class='react-toggle react-toggle--checked toggleIncomeLayers']";

            cy.xpath(ssaSwitch).click();
            cy.wait(2000);

            cy.log('Check Income Layer Elements');
            // Create an array with all the elements' selectors
            const elements = [
                il.getSelectors().SSLayer,
                il.getSelectors().BDLayer,
                il.getSelectors().BRLayer,
                il.getSelectors().SSEditLayer,

                il.getSelectors().SSELayerEnabled,
                il.getSelectors().BDELayerDisabled,
                il.getSelectors().BRELayerDisabled

            ];

            const xpathElements = [
                il.getSelectors().IFXPath,
                il.getSelectors().AIXPath,
                il.getSelectors().IFEditLayer,
                il.getSelectors().AIEditLayer,
                il.getSelectors().IFGrabBar,
                il.getSelectors().AIGrabBar,
                il.getSelectors().BDEditLayer,
                il.getSelectors().BREditLayer,
                il.getSelectors().IFELayerDisabled,
                il.getSelectors().AIELayerDisabled
            ]

            // Check visibility for each element
            elements.forEach(selector => {
                cy.get(selector).should('be.visible');
            });

            xpathElements.forEach(xpath => {
                cy.xpath(xpath).should('be.visible');
            });


            cy.log('Check SS Layer');

            il.clickEditLayerName("Social Security");          
            cy.verifyElementContainsText("Social Security", il.getEditPopupSelectors().LayerHeader);
            cy.verifyLabel("Layer Name:");
            cy.verifyLabel("Strategy Type:");       
            cy.verifyGetElement(il.getEditPopupSelectors().saveButton);
            cy.verifyGetElement(il.getEditPopupSelectors().cancelButton);
            cy.verifyGetElement(il.getEditPopupSelectors().closeButton);
            cy.get(il.getEditPopupSelectors().closeButton).click();


            cy.log('Check Benefit Delay');
            il.clickEditLayerName("Benefit Delay");

            cy.verifyElementContainsText("Benefit Delay", il.getEditPopupSelectors().LayerHeader);

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
            cy.verifyGetElement(il.getEditPopupSelectors().closeButton);
            cy.get(il.getEditPopupSelectors().closeButton).click();


            cy.log('Check Benefit Replacement');
            il.clickEditLayerName("Benefit Replacement");

            cy.verifyElementContainsText("Benefit Replacement", il.getEditPopupSelectors().LayerHeader);

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
            cy.verifyGetElement(il.getEditPopupSelectors().closeButton);
            cy.get(il.getEditPopupSelectors().closeButton).click();
            cy.log('Check Income Floor');
            il.clickEditLayerName("Income Floor");
            cy.verifyElementContainsText("Income Floor", il.getEditPopupSelectors().LayerHeader);

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
            cy.verifyGetElement(il.getEditPopupSelectors().closeButton);
            cy.get(il.getEditPopupSelectors().closeButton).click();


            cy.log('Check Additional Income');
            il.clickEditLayerName("Additional Income");

            cy.verifyElementContainsText("Additional Income", il.getEditPopupSelectors().LayerHeader);

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
            cy.selectOptionByText(il.getEditPopupSelectors().AIProductType, "Fixed Indexed Annuity");
            cy.verifyLabel("Guaranteed Minimum:");
            cy.verifyLabel("Purchase Amount:");
          
            cy.verifyGetElement(il.getEditPopupSelectors().AIGuaranteedMinimum);
            cy.verifyGetElement(il.getEditPopupSelectors().AIPurchaseAmount);
            cy.get(il.getEditPopupSelectors().AIGuaranteedMinimum).clear();

            cy.verifyValidationMessage("Guaranteed Minimum is required");
            cy.get(il.getEditPopupSelectors().AIGuaranteedMinimum).type("9999999");
            cy.get(il.getEditPopupSelectors().AIPurchaseAmount).clear();
            cy.verifyValidationMessage("Purchase Amount is required");
            cy.get(il.getEditPopupSelectors().closeButton).click();

            il.verifyILHelpPopupAndText()
            
            cy.xpath(ssaSwitch).click();
            cy.wait(500)
            cy.clickSwitchILToSS()
            ss.getDeleteSS().click()
            qs.getModalDeleteButton().click()
            cy.wait(2000)
        })
    })

    afterEach(() => {
        cy.task('generateReport')
    })
})

