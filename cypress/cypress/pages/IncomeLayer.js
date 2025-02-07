import BasePage from "../pages/BasePage";

class IncomeLayerElements extends BasePage {

    getSelectors() {
        const SSLayer = '[style="background-color: rgb(127, 127, 127); max-width: 255px; min-height: 45px; padding: 10px; border-radius: 7px; margin: 0px 0px 12px;"]';
        const BDLayer = '[style="background-color: rgb(79, 129, 189); max-width: 255px; min-height: 45px; padding: 10px; border-radius: 7px; margin: 0px 0px 12px;"]';
        const BRLayer = '[style="background-color: rgb(155, 187, 89); max-width: 255px; min-height: 45px; padding: 10px; border-radius: 7px; margin: 0px 0px 12px;"]';
        const BRXPathLayer = '//div[@class="four wide column"]//div[contains(@style, "background-color: rgb(155, 187, 89)")]';
        const BDXPathLayer = '//div[@class="four wide column"]//div[contains(@style, "background-color: rgb(79, 129, 189)")]';
        const IFXPath = '//div[@class="four wide column"]//div[contains(@style, "background-color: rgb(192, 80, 77)")]';
        const AIXPath = '//div[@class="four wide column"]//div[contains(@style, "background-color: rgb(128, 100, 162)")]';
        const IFGrabBar = `${IFXPath}//i[contains(@class, "bars")]`;
        const AIGrabBar = `${AIXPath}//i[contains(@class, "bars")]`;
        const SSEditLayer = `${SSLayer} button.buttonToLink.incomeLayersEditIconAndToggle`;
        const BDEditLayer = BDXPathLayer + '//button[contains(@class, "buttonToLink incomeLayersEditIconAndToggle")]';
        const IFEditLayer = `${IFXPath}//button[contains(@class, "buttonToLink incomeLayersEditIconAndToggle")]`;
        const AIEditLayer = `${AIXPath}//button[contains(@class, "buttonToLink incomeLayersEditIconAndToggle")]`;
        const BREditLayer = `${BRXPathLayer}//button[contains(@class, "buttonToLink incomeLayersEditIconAndToggle")]`;
        const SSELayerEnabled = `${SSLayer} div.react-toggle.react-toggle--checked.incomeLayersToggleSS`;
        const BDELayerDisabled = `${BDLayer} div.react-toggle.incomeLayersToggleBD`;
        const BRELayerDisabled = `${BRLayer} div.react-toggle.incomeLayersToggleBR`;
        const IFELayerDisabled = `${IFXPath}//div[contains(@class, "incomeLayersToggleIF")]`;
        const AIELayerDisabled = `${AIXPath}//div[contains(@class, "incomeLayersToggleAI")]`;
        const SSELayerDisabled = `${SSLayer} div.react-toggle.incomeLayersToggleSS`;
        const BDELayerEnabled = `${BDLayer} div.react-toggle.react-toggle--checked.incomeLayersToggleBD`;
        const BRELayerEnabled = `${BRLayer} div.react-toggle.react-toggle--checked.incomeLayersToggleBR`;
        const IFLayerEnabled = `${IFXPath}//div[contains(@class, "react-toggle react-toggle--checked incomeLayersToggleIF")]`;
        const IFAssetBeforeEnabled = '(//div[@class="react-toggle react-toggle--checked incomeLayersEditToggle"])[1]';
        const IFAssetAftereEnabled = '(//div[@class="react-toggle react-toggle--checked incomeLayersEditToggle"])[2]';


        return {
            SSLayer,
            BDLayer,
            BRLayer,
            IFXPath,
            AIXPath,
            IFGrabBar,
            AIGrabBar,
            SSEditLayer,
            BDEditLayer,
            BREditLayer,
            IFEditLayer,
            AIEditLayer,
            SSELayerEnabled,
            BDELayerDisabled,
            BRELayerDisabled,
            IFELayerDisabled,
            AIELayerDisabled,
            SSELayerDisabled,
            BDELayerEnabled,
            BRELayerEnabled,
            IFLayerEnabled,
            IFAssetBeforeEnabled,
            IFAssetAftereEnabled


        };
    }

    getEditPopupSelectors() {

        const saveButton = 'button.ui.primary.button[type="submit"]';
        const cancelButton = 'button.ui.secondary.button[type="button"]';
        const closeButton = 'button.ui.basic.button.close-button';
        const saveDisabledButton = 'button.ui.primary.disabled.button[type="submit"]';
        const BDLayerName = 'input[id="incomeLayers.benefitDelay.name"]';
        const StartYearBD = 'select[id="incomeLayers.benefitDelay.startYear"]';
        const EndYearBD = 'select[id="incomeLayers.benefitDelay.endYear"]';
        const AssetGrowthBD2 = 'input[id="incomeLayers.benefitDelay.growthRate"]';

        const BRLayerName = 'input[id="incomeLayers.benefitReplacement.name"]';
        const StartYearBR = 'select[id="incomeLayers.benefitReplacement.startYear"]';
        const EndYearBR = 'select[id="incomeLayers.benefitReplacement.endYear"]';
        const AssetGrowthBR2 = 'input[id="incomeLayers.benefitReplacement.growthRate"]';


        const IFLayerName = 'input[id="incomeLayers.incomeFloor.name"]';
        const StartYearIF = 'select[id="incomeLayers.incomeFloor.startYear"]';
        const EndYearIF = 'select[id="incomeLayers.incomeFloor.endYear"]';
        const AssetGrowthIF2 = 'input[id="incomeLayers.incomeFloor.assetGrowthRate"]';
        const IncomeGrowthIF2 = 'input[id="incomeLayers.incomeFloor.valueGrowthRate"]';
        const StartValueIF = 'input[id="incomeLayers.incomeFloor.startValue"]';

        const LayerHeader = ".ui.small.modal.transition.visible.active .header";

        const AILayerName = 'input[id="incomeLayers.additionalIncome.name"]';
        const StartYearAI = 'select[id="incomeLayers.additionalIncome.startYear"]';
        const EndYearAI = 'select[id="incomeLayers.additionalIncome.endYear"]';
        const IncomeGrowthAI2 = 'input[id="incomeLayers.additionalIncome.valueGrowthRate"]';
        const AssetGrowthAI2 = 'input[id="incomeLayers.additionalIncome.assetGrowthRate"]';
        const AIProductType = 'select[id="incomeLayers.additionalIncome.productType"]';
        const StartValueAI = 'input[id="incomeLayers.additionalIncome.startValue"]';

        const AIGuaranteedMinimum = 'input[id="incomeLayers.additionalIncome.guaranteedMinimum"]';
        const AIPurchaseAmount = 'input[id="incomeLayers.additionalIncome.purchaseAmount"]';

        const SSLayerName = 'input[id="incomeLayers.socialSecurity.name"]';
        const BDAssetBeforeEnabled='(//div[@class="react-toggle react-toggle--checked incomeLayersEditToggle"]/div)[1]';
        const BDAssetBeforeDisabled=':nth-child(12) > .field > .ui > .react-toggle > .react-toggle-track';
        const BDAssetAfterEnabled=':nth-child(12) > .field > .ui > .react-toggle > .react-toggle-thumb';
        const BDAssetAfterDisabled=':nth-child(10) > .field > .ui > .react-toggle > .react-toggle-thumb';

        const BRAssetBeforeEnabled='(//div[@class="react-toggle react-toggle--checked incomeLayersEditToggle"]/div)[1]';
        const BRAssetBeforeDisabled=':nth-child(12) > .field > .ui > .react-toggle > .react-toggle-track';
        const BRAssetAfterEnabled=':nth-child(12) > .field > .ui > .react-toggle > .react-toggle-thumb';
        const BRAssetAfterDisabled=':nth-child(10) > .field > .ui > .react-toggle > .react-toggle-thumb';

        const IFAssetBeforeEnabled='(//div[@class="react-toggle react-toggle--checked incomeLayersEditToggle"]/div)[1]';
        const IFAssetBeforeDisabled=':nth-child(16) > .field > .ui > .react-toggle > .react-toggle-track';
        const IFAssetAfterEnabled=':nth-child(16) > .field > .ui > .react-toggle > .react-toggle-thumb';
        const IFAssetAfterDisabled=':nth-child(14) > .field > .ui > .react-toggle > .react-toggle-thumb';

        const AIAssetBeforeEnabled='(//div[@class="react-toggle react-toggle--checked incomeLayersEditToggle"]/div)[1]';
        const AIAssetBeforeDisabled=':nth-child(20) > .field > .ui > .react-toggle > .react-toggle-track';
        const AIAssetAfterEnabled=':nth-child(20) > .field > .ui > .react-toggle > .react-toggle-thumb';
        const AIAssetAfterDisabled=':nth-child(18) > .field > .ui > .react-toggle > .react-toggle-thumb';
        return {
            saveButton,
            cancelButton,
            closeButton,
            saveDisabledButton,
            BDLayerName,
            StartYearBD,
            EndYearBD,
            AssetGrowthBD2,
            BRLayerName,
            StartYearBR,
            EndYearBR,
            AssetGrowthBR2,
            IFLayerName,
            AIPurchaseAmount,
            AIGuaranteedMinimum,
            AIProductType,
            IncomeGrowthAI2,
            EndYearAI,
            StartYearAI,
            AILayerName,
            StartYearAI,
            LayerHeader,
            StartValueIF,
            StartYearIF,
            EndYearIF,
            AssetGrowthIF2,
            IncomeGrowthIF2,
            SSLayerName,
            BDAssetAfterDisabled,
            BDAssetAfterEnabled,
            BDAssetBeforeDisabled,
            BDAssetBeforeEnabled,
            BRAssetAfterDisabled,
            BRAssetAfterEnabled,
            BRAssetBeforeDisabled,
            BRAssetBeforeEnabled,
            IFAssetBeforeEnabled,
            IFAssetBeforeDisabled,
            IFAssetAfterEnabled,
            IFAssetAfterDisabled,
            StartValueAI,
            AssetGrowthAI2,
            AIAssetBeforeEnabled,
            AIAssetBeforeDisabled,
            AIAssetAfterDisabled,
            AIAssetAfterEnabled


        };
    }

    verifyILHelpPopupAndText(){
        try {
            cy.get('.blue').click()
            cy.get('.helperHeaderBorder').should('have.text','Income Layers')
            cy.verifyTextPresent('Income Layers bridge a gap between what Social Security may provide and a stated amount of additional income the recipient(s) need or want throughout retirement. Income Layers help determine income needs beyond those provided by Social Security.')
            cy.verifyTextPresent("To begin, select the appropriate Social Security strategy (Optimal or Custom) based on the information and results provided on the previous Social Security screen. Use the toggle switch at the top of this screen to go back and review the results and/or adjust inputs. Please note that whichever age(s) are selected before switching to Income Layer mode, those age(s) will be used as the defaults and will have an effect on the information used for Income Layers.")
            cy.verifyTextPresent("The Income chart represents the income throughout the selected timeframe. The Assets view shows the asset(s) required at the start period and shows the amount that is being drawn down.")
            cy.verifyTextPresent("With Benefit Delay, Social Security+ calculates the cost of extending the peak Social Security benefit amount forwards to the selected year. Benefit Delay is the amount it would cost to extend the assets needed in order to fund the delay.")
            cy.verifyTextPresent("Income Floor is the minimum amount of income needed during the specified time-frame. Income Floor can be thought of as an annual amount that a client needs in total, including Social Security income, Benefit Delay and/or Benefit Replacement if applicable.")
            cy.verifyTextPresent("Additional Income is an independent layer of income a retiree(s) might like to have for non-essential expenses beyond other incomes sources, such as Social Security income, Benefit Delay and/or Benefit Replacement if applicable.")
            cy.verifyTextPresent("Start Year: The Start Year is the first year that the corresponding income layer produces income. The last available Start Year will be the year before the last year for the spouse with the latest life expectancy. This is a required field if Income Floor and/or Additional Income are enabled.")
            cy.verifyTextPresent("End Year: The End Year is the last year that the corresponding income layer produces income. The End Year will be pre-populated with the next available year after the Start Year selected by the user. This is a required field if Income Floor and/or Additional Income are enabled.")
            cy.verifyTextPresent("Asset Growth: A growth rate assumption for the assets used to support the corresponding income layer. Note that this may change based on market changes or the retiree's expectation of market growth. The income growth rate increases the minimum annual income by the rate entered. This value cannot be less than 0.00% and must be less than 10.00%.")
            cy.verifyTextPresent("Starting Income: The amount of income the recipient desires for the income layer's start year. The minimum value must be greater than $0.00, and the maximum Starting Income must be less than $1,000,000.")
            cy.verifyTextPresent("Income Growth: The Income Growth Rate increases the minimum annual income by the rate entered. This value cannot be less than 0.00% and must be less than 10.00%.")
            cy.verifyTextPresent("Show Assets Before First Income Payment: When enabled the results will show the assets before the first income payment starts withdrawing money for that income layer.")
            cy.verifyTextPresent("Show Assets After First Income Payment: When enabled, the results will show the assets beginning after the first income payment is made for that income layer.When either of these options are disabled, no assets will be shown.")
            cy.verifyTextPresent("When the Product Type is set to Investment, enter an asset growth rate for those investments and select to have the assets displayed before or after a withdrawal is made.")
            cy.verifyTextPresent("When the Product Type is set to Fixed Indexed Annuity, enter the guaranteed minimum amount that is expected to be received on an annual basis and the total Purchase Amount for the Fixed Indexed Annuity.")
            cy.verifyTextPresent("When there is a Guaranteed Minimum, it will be reflected on the bar chart as a black line.")
            cy.verifyTextPresent("When there is a Purchase Amount, it will be displayed within the PDF report")
            cy.verifyTextPresent("Reports may be generated to provide a detailed Social Security analysis.")
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

    clickToText(text) {
        try {
            cy.contains(text).should('be.visible').click();
            cy.log(`Clicked on: ${text}`);
            cy.log(`The text for '${text}' element was found on the page and successfully clicked.`);
        } catch (error) {
            cy.log(`Cannot click on '${text}'. Error: ${error}`);
        }
    }

    clickEditLayerName(layerName) {
        cy.get('.incomeLayerName').contains(layerName).parents('.ui.raised.segment')
            .find('.buttonToLink.incomeLayersEditIconAndToggle img')
            .click();

        cy.log(layerName + ' edit icon has been clicked');
    }

}

export default IncomeLayerElements