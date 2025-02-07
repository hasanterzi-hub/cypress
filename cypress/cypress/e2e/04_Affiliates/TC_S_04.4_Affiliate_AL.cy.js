/// <reference types="cypress" />

import Affiliates from "../../pages/Affiliates";
import QuestionnaireElements from "../../pages/Questionnaire";
import IncomeLayerElements from "../../pages/IncomeLayer";

describe("Check Allianz affiliate", () => {
  const qs = new QuestionnaireElements();
  const il = new IncomeLayerElements();
  const aff = new Affiliates();
  const today = new Date();

  beforeEach("Open the Dew-aws and prepare to setup for testing", () => {
    cy.visit(Cypress.env('devIdP'));
    cy.get('#UserId').select('Randomly Generated User')
    cy.get("#Affiliate").select("Allianz");
    cy.get("#Environment").select(Cypress.env("devAWSPA"));
    cy.get('form[action="/Home/Submit"]').invoke("removeAttr", "target");
    cy.get(".btn").should("have.text", "Submit").click();
    cy.wait(4000);
    cy.get('.container > :nth-child(2) > div > .ui').should('have.text','Accept').click()
    cy.wait(3000);
  });

  it("Check the default set of Allianz user in pages", () => {
    cy.get("base").should(
      "have.attr",
      "href",
      Cypress.env("baseHREF")
    );

    //If tutorial page in dom when user logged in press Esc if not open tutorial then press Esc
    cy.get("body").then(($body) => {
      if ($body.find(".page").length > 0) {
        cy.get(".page").type("{esc}");
      } else {
        cy.get(".vertical > :nth-child(4)").click();
        cy.get(".page > .small > :nth-child(1)", {
          log: "Tutorial Page has seen",
        }).should("be.visible");
        cy.get(".page").type("{esc}");
      }
    });

    cy.log("LY.A.AL.02");
    aff.verifyAffiliateCustomLogo(
      ".header > img",
      "LY_Logo",
      "./assets/logos/ly_logo.svg"
    );
    aff.verifyAffiliateCustomLogo(
      ".active > .ui",
      "SSNavIcon",
      "./assets/icons/ss_card_2.svg"
    );
    aff.verifyAffiliateCustomLogo(
      ".title > .item > .ui",
      "SettingsNavIcon",
      "./assets/icons/settings.svg"
    );
    cy.verifyTextNotPresent("Support");
    cy.verifyTextNotPresent("Marketing Resources");

    cy.get('.text').click()
    cy.contains('Profile').click()
    cy.verifyTextPresent('User')
    cy.verifyTextPresent('Subscription')
    cy.verifyElementContainsText("Allianz Life", ':nth-child(2) > .nine')
    cy.verifyElementContainsText("Allianz Life SS+", 'p')
    cy.verifyElementContainsText('Active', 'p > :nth-child(1)')
    cy.verifyElementContainsText('Licensed', 'p > :nth-child(2)')

    //Settings Page
    cy.get('.title > .item > [style="font-size: 14px;"]')
      .should("have.text", "Settings")
      .as("SettingsNav")
      .click();
    cy.verifyLabel("Cost of Living Adjustment (COLA)");
    //cy.get('#cola').should('have.value','2.83%')

    cy.log("LY.A.AL.04");
    cy.verifyLabel("Social Security Layer Name");
    cy.get("#socialSecurityTitle")
      .as("SS")
      .should("have.value", "Social Security");
    cy.verifyLabel("Benefit Delay Layer Name");
    cy.get("#benefitDelayTitle").as("BD").should("have.value", "Benefit Delay");
    cy.verifyLabel("Benefit Replacement Layer Name");
    cy.get("#benefitReplacementTitle")
      .as("BR")
      .should("have.value", "Benefit Replacement");
    cy.verifyLabel("Income Floor Layer Name");
    cy.get("#incomeFloorTitle").as("IF").should("have.value", "Income Floor");
    cy.verifyLabel("Additional Income Layer Name");
    cy.get("#additionalIncomeTitle")
      .as("AI")
      .should("have.value", "Annuity Income");

    cy.log("LY.A.AL.05");
    cy.verifyTextNotPresent("Nassau Income Accelerator");
    cy.verifyTextNotPresent("Report Customizations");
    cy.verifyTextNotPresent("Annuity Income Layer Name");
    cy.verifyTextNotPresent("Social Security+™ Disclosures");

    cy.get("#cola").as("cola").should("be.visible").and("have.value", "0.00%");
    cy.get("@cola").clear().type("10.01");
    cy.get("@cola").then(($val) => {
      const fav = $val.attr("value");
      expect(fav).to.eq("10.00%");
    });

    cy.get("@cola").clear().type("-1");
    cy.get("@cola").then(($val) => {
      const fav = $val.attr("value");
      expect(fav).to.eq("1.00%");
    });
    cy.get("@cola").clear();
    cy.get("#title").click();
    cy.verifyValidationMessage("COLA is required");

    cy.get("@SS").clear();
    cy.get("#title").click();
    cy.verifyValidationMessage("Social Security Title is required");
    cy.get("@BD").clear();
    cy.get("#title").click();
    cy.verifyValidationMessage("Benefit Delay Title is required");
    cy.get("@BR").clear();
    cy.get("#title").click();
    cy.verifyValidationMessage("Benefit Replacement Title is required");
    cy.get("@IF").clear();
    cy.get("#title").click();
    cy.verifyValidationMessage("Income Floor Title is required");
    cy.get("@AI").clear();
    cy.get("#title").click();
    cy.verifyValidationMessage("Additional Income Title is required");

    cy.get("#companyName")
      .should("have.value", "Allianz Life")
      .and("have.attr", "disabled");
    cy.get("#phoneNumber").and("not.have.attr", "disabled");
    cy.get("#firstName").and("have.attr", "disabled");
    cy.get("#lastName").and("have.attr", "disabled");
    cy.get("#emailAddress").and("have.attr", "disabled");
    cy.get(".secondary").as("Discard").click();

    cy.clickToText("Sample Scenario");
    cy.get(".caseHeader > span").contains("Sample Scenario").as("header");
    cy.wait(2000);
    cy.clickSwitchSSToIL();


    cy.verifyTextPresent("Social Security");
    cy.verifyTextPresent("Benefit Delay");
    cy.verifyTextPresent("Benefit Replacement");
    cy.verifyTextPresent("Income Floor");
    cy.verifyTextPresent("Annuity Income");

    const yil = today.getFullYear();  
    cy.log("LY.A.AL.06");
    
    il.clickEditLayerName("Annuity Income");
    cy.verifyLabel("Layer Name:");
    cy.get('#incomeLayers\\.additionalIncome\\.name').should("have.value", "Annuity Income")
    cy.verifyLabel("Start Year:");
    cy.get('#incomeLayers\\.additionalIncome\\.startYear', {log: "Start Year dropdown has seen"}).as("StartYear").should("have.value", yil);
    cy.verifyLabel("End Year:");
    cy.get('#incomeLayers\\.additionalIncome\\.endYear', {log: "End Year dropdown has seen"}).as("EndYear").should("have.value", "2059");
    cy.verifyLabel("Income Growth:");
    cy.get('#incomeLayers\\.additionalIncome\\.valueGrowthRate').should("have.value", "0.00%");
    cy.verifyLabel("Starting Income:");
    cy.get('#incomeLayers\\.additionalIncome\\.startValue').as('startIncome').should("have.value", "$0");
    cy.verifyLabel("Product Type:");
    cy.verifyOptionTexts('#incomeLayers\\.additionalIncome\\.productType',['Fixed Indexed Annuity','Variable Annuity'])
    cy.verifyTextNotPresent('Reduced Rate')
    cy.verifyLabel("Guaranteed Minimum:");
    cy.get('#incomeLayers\\.additionalIncome\\.guaranteedMinimum').should("have.value", "$0");
    cy.verifyLabel("Purchase Amount:");
    cy.get('#incomeLayers\\.additionalIncome\\.purchaseAmount').should("have.value", "$0");
    cy.selectOptionByText('#incomeLayers\\.additionalIncome\\.productType','Variable Annuity')
    cy.verifyTextNotPresent('Guaranteed Minimum:')
    cy.verifyLabel("Reduced Rate:");
    cy.get('#incomeLayers\\.additionalIncome\\.reducedRate').as('reducedRate').should("have.value", "$0");
    cy.verifyLabel("Purchase Amount:");
    cy.get('#incomeLayers\\.additionalIncome\\.purchaseAmount').as('purchaseAmount').should("have.value", "$0");
    cy.get('@startIncome').clear().type('10000')
    cy.get('@reducedRate').clear().type('25000')
    cy.get('@purchaseAmount').clear().type('10000')
    cy.clickToText('Save')
    cy.wait(3000)
    cy.get('.chartContainer').compareSnapshot({
      name: 'ReducedRateAllianz',
      testThreshold: 0.05,
      recurseOptions: { limit: 3, delay: 500 }});

    //Verify validations
    il.clickEditLayerName("Annuity Income");
    cy.get('@startIncome').clear()
    cy.verifyValidationMessage('Starting Income is required')
    cy.get('@startIncome').type('0')
    
    cy.get('@reducedRate').clear()
    cy.verifyValidationMessage('Reduced Rate is required')
    cy.get('@reducedRate').type('0')

    cy.get('@purchaseAmount').clear()
    cy.verifyValidationMessage('Purchase Amount is required')
    cy.get('@purchaseAmount').type('0')

    cy.selectOptionByText('#incomeLayers\\.additionalIncome\\.productType','Fixed Indexed Annuity')
    cy.verifyTextPresent('Cancel')
    cy.clickToText('Save')
    
    aff.getButtonName("Download PDF").click();
    const reportName = 'SocialSecurity'
    cy.intercept("POST", Cypress.env('backendUrl')+'/api/Reports/'+reportName+'/*').as("buttonRequest");
    cy.get(':nth-child(6) > div > .primary',{log:'Download PDF'}).click()
    cy.downloadReport(reportName)
    aff.getButtonName("Cancel").click();
    cy.clickSwitchILToSS();
  });

  afterEach(() => {
    cy.task("generateReport");
  });
});
