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


    context('Income Layer On Off Control Test', () => {

        it('Income Layer On Off', () => {
            const qs = new QuestionnaireElements();
            const il = new IncomeLayerElements();
            qs.getASSCButton().click();
            cy.generateRandomString(5).then((randomString) => {
                const caseName=randomString
                cy.addACustomSSscenario(caseName, "Married", 1968, 2685,1794,2065);
                cy.get('.caseHeader > span').contains(caseName)
            });


            cy.log('LY.TC.SSA.IL.1 - LY.TC.SSA.IL.CL.12 - Check when the user selects the View toggle to Income Layers')
            cy.wait(1000);
            const ssaSwitch = "//div[@class='react-toggle toggleIncomeLayers'] | //div[@class='react-toggle react-toggle--checked toggleIncomeLayers']";
            cy.xpath(ssaSwitch)
                .click();
            cy.wait(5000);

            cy.log('LY.TC.SSA.IL.CL.02 - Check charts, when user toggle switch on for SS layer and switch off for BD, BR, AI and IF layers.');
            //cy.get('canvas[role="img"]').compareSnapshot('OnlySSAOn', 0.1);
            cy.wait(1000);


            const elements = [
                il.getSelectors().SSLayer,
                il.getSelectors().BDLayer,
                il.getSelectors().BRLayer
            ];

            const xpathElements = [
                il.getSelectors().IFXPath,
                il.getSelectors().AIXPath
            ]

            // Check visibility for each element
            elements.forEach(selector => {
                cy.get(selector).should('be.visible');
            });

            xpathElements.forEach(xpath => {
                cy.xpath(xpath).should('be.visible');
            });

            cy.log('LY.TC.SSA.IL.CL.03 - Check charts, when user toggle switch on for SS and BD layers and switch off for BR, AI and IF.');
            cy.get(il.getSelectors().BDELayerDisabled).click();
            cy.wait(5000);
            //cy.get('div.twelve.wide.column').compareSnapshot('SSA_BD_On', 0.1);

            cy.log('LY.TC.SSA.IL.CL.04 - Check charts, when user toggle switch on for SS, BR and BD and switch off for AI and IF.');
            cy.get(il.getSelectors().BRELayerDisabled).click();
            cy.wait(5000);
            //cy.get('div.twelve.wide.column').compareSnapshot('SSA_BD_BR_On', 0.1);

            cy.log('LY.TC.SSA.IL.CL.05 - Check charts, when user toggle switch off for SS, AI, IF layers and switch on for BR and BD layers.');
            cy.get(il.getSelectors().SSELayerEnabled).click();
            cy.wait(5000);
            //cy.get('div.twelve.wide.column').compareSnapshot('BD_BR_On', 0.1);

            cy.log('LY.TC.SSA.IL.CL.06 - Check charts when user entered Start value, Asset growth, Income growth for AI and IF layers. SS, BD, BR layers are off.');
            cy.get(il.getSelectors().BDELayerEnabled).click();
            cy.wait(1000);
            cy.get(il.getSelectors().BRELayerEnabled).click();
            cy.wait(1000);

            il.clickEditLayerName("Income Floor");
            const AssetGrowthIF2 = 'input[id="incomeLayers.incomeFloor.assetGrowthRate"]';
            const IncomeGrowthIF2 = 'input[id="incomeLayers.incomeFloor.valueGrowthRate"]';
            const StartValueIF = 'input[id="incomeLayers.incomeFloor.startValue"]';

            cy.get(StartValueIF).clear();
            cy.get(StartValueIF).type("15000");

            cy.get(AssetGrowthIF2).clear();
            cy.get(AssetGrowthIF2).type("1");

            cy.get(IncomeGrowthIF2).clear();
            cy.get(IncomeGrowthIF2).type("1");

            cy.get('button[type="submit"]').click();

            cy.wait(5000);

            il.clickEditLayerName("Additional Income");

            const IncomeGrowthAI2 = 'input[id="incomeLayers.additionalIncome.valueGrowthRate"]';
            const AssetGrowthAI2 = 'input[id="incomeLayers.additionalIncome.assetGrowthRate"]';
            const StartValueAI = 'input[id="incomeLayers.additionalIncome.startValue"]';

            cy.get(StartValueAI).clear();
            cy.get(StartValueAI).type("15000");

            cy.get(IncomeGrowthAI2).clear();
            cy.get(IncomeGrowthAI2).type("1");

            cy.get(AssetGrowthAI2).clear();
            cy.get(AssetGrowthAI2).type("1");

            cy.get('button[type="submit"]').click();

            cy.wait(5000);
            //cy.get('div.twelve.wide.column').compareSnapshot('AI_IF_On', 0.1);

            cy.log('LY.TC.SSA.IL.CL.07 - Check charts when user entered Start value, Asset growth, Income growth for AI layer.SS, BD, BR and AI layers are off.');
            cy.xpath(il.getSelectors().IFLayerEnabled).click();
            cy.wait(2000);
            //cy.get('div.twelve.wide.column').compareSnapshot('AI_On', 0.1);

            cy.log('LY.TC.SSA.IL.CL.08 - Check charts when all layers are open');
            cy.get(il.getSelectors().BRELayerDisabled).click();
            cy.wait(2000);
            cy.xpath(il.getSelectors().IFELayerDisabled).click();
            cy.wait(2000);
            cy.get(il.getSelectors().BDELayerDisabled).click();
            cy.wait(2000);
            cy.get(il.getSelectors().SSELayerDisabled).click();
            cy.wait(2000);
            //cy.get('div.twelve.wide.column').compareSnapshot('ALL_On', 0.1);




            Cypress.Commands.add('hoverOnCanvas', (canvasSelector, x, y) => {
                cy.get(canvasSelector).then((canvas) => {
                    const canvasEl = canvas[0];
                    const clientX = canvasEl.getBoundingClientRect().left + x;
                    const clientY = canvasEl.getBoundingClientRect().top + y;
                    cy.get('body').trigger('mousemove', { clientX, clientY });
                });
            });


            cy.hoverOnCanvas('canvas', 100, 150);// TO DO


            //cy.get('div.twelve.wide.column').compareSnapshot('hover2', 0.1);

            cy.log('LY.TC.SSA.IL.CL.11 - Verify Income chart when SS layer disabled, -Enable IF and AI layers');

            cy.get(il.getSelectors().BDELayerEnabled).click();
            cy.wait(2000);
            cy.get(il.getSelectors().BRELayerEnabled).click();
            cy.wait(2000);
            cy.xpath(il.getSelectors().IFEditLayer).click();

            cy.xpath(il.getSelectors().IFAssetBeforeEnabled).click();
            cy.xpath(il.getSelectors().IFAssetBeforeEnabled).click();

            cy.get('button[type="submit"]').click();
            cy.wait(5000);
            //cy.get('div.twelve.wide.column').compareSnapshot('IF_AI_SS', 0.1);

            cy.log('AI Edit Icon click');
            cy.xpath(il.getSelectors().AIEditLayer).click();
            cy.wait(500);
            cy.xpath(il.getSelectors().IFAssetBeforeEnabled).click();
            cy.xpath(il.getSelectors().IFAssetBeforeEnabled).click();

            cy.get('button[type="submit"]').click();
            cy.wait(5000);

            cy.log('BR Edit Icon click');
            cy.xpath(il.getSelectors().BREditLayer).click();
            cy.xpath(il.getSelectors().IFAssetBeforeEnabled).click();
            cy.xpath(il.getSelectors().IFAssetBeforeEnabled).click();
            cy.get('button[type="submit"]').click();
            cy.wait(5000);

            cy.log('BD Edit Icon click');
            cy.xpath(il.getSelectors().BDEditLayer).click();
            cy.xpath(il.getSelectors().IFAssetBeforeEnabled).click();
            cy.xpath(il.getSelectors().IFAssetBeforeEnabled).click();
            cy.get('button[type="submit"]').click();
            cy.wait(5000);

            //cy.get('div.twelve.wide.column').compareSnapshot('BD_BR_IF_AI_AssetOff', 0.1);

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

