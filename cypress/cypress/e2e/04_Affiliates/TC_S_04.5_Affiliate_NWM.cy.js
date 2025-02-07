/// <reference types="Cypress" />

import Affiliates from "../../pages/Affiliates";
import QuestionnaireElements from "../../pages/Questionnaire";
import IncomeLayerElements from "../../pages/IncomeLayer";
import SSElements from "../../pages/SampleScenario";
import Dashboard from "../../pages/Dashboard"

describe("Check North Western Mutual affiliate", () => {
  const dsh = new Dashboard()
  const ss = new SSElements;
  const il = new IncomeLayerElements();
  const aff = new Affiliates();
  const today = new Date();

  beforeEach(() => {
    cy.visit(Cypress.env('devIdP'));
    cy.get(':nth-child(2) > .text-dark').as('Plans')
      .invoke('text')
      .should((text) => {
        expect(text.trim()).equal("Plans")
      })
    cy.get('@Plans').click()
    cy.get(':nth-child(2) > .dropdown-menu > :nth-child(2) > .nav-link').should('have.text', 'Northwestern').click()
    cy.get('#UserId').select('Test Automation')
    cy.get('#Environment').select(Cypress.env('devAWSPA'))
    cy.get('form[action="/Plan/Submit"]').invoke('removeAttr', 'target')
    cy.get('.btn').should('have.text', 'Submit').click()
    cy.wait(7000);
  });

  it("Check the default set of NWM user in pages", () => {
    cy.get("base").should(
      "have.attr",
      "href",
      Cypress.env("baseHREF")
    );

    //If help page in dom when user logged in press Esc if not open help then press Esc
    cy.get("body").then(($body) => {
      if ($body.find(".slide").length > 0) {
        cy.get(".slider > :nth-child(1)").type("{esc}");
      }
    });
    //custodied account number, CA balance and heldaway account number, HA balance
    dsh.verifyDeluxeDashboardElements('3', '$1,500,000', '0', '$0')


    cy.get(".text").click();
    cy.contains("Profile").click();
    cy.verifyTextPresent("Email Address");
    cy.verifyTextPresent("test.automation+nmis+114688+0@lifeyield.com");
    cy.verifyTextPresent("Affiliation");
    cy.verifyTextPresent("Northwestern Mutual");
    cy.verifyTextPresent("Plan Information");
    cy.verifyTextPresent("Subscription");
    cy.get(':nth-child(2) > p').should('contain.text', 'Northwestern Mutual P+ License').and('contain.text', 'Active').and('contain.text', 'Licensed')
    cy.get(':nth-child(3) > p').should('contain.text', 'Northwestern Mutual SS+ License').and('contain.text', 'Active').and('contain.text', 'Licensed')
    cy.get(':nth-child(4) > p').should('contain.text', 'Northwestern Mutual I+ License').and('contain.text', 'Active').and('contain.text', 'Licensed')

    //Settings Page
    cy.get('.title > .item > [style="font-size: 14px;"]')
      .should("have.text", "Settings")
      .as("SettingsNav")
      .click();


    cy.log('Verify settings page fields')
    cy.verifyLabel('Ordinary Income Tax Rate')
    cy.get('#incomeTaxRate').should('have.value', '35.00%')
    cy.verifyLabel('Capital Gains Tax Rate')
    cy.get('#capitalTaxRate').should('have.value', '15.00%')
    cy.verifyLabel('Investment Timeframe')
    cy.selectedTextInDropdownList(0, '10 Years')
    cy.verifyDropdownList(0, ['10 Years', '15 Years', '20 Years', '25 Years', '30 Years'])
    cy.get(':nth-child(4) > .four > .field > .ui')
    cy.verifyLabel('Capital Market Assumptions')

    cy.get(':nth-child(6) > .four > .field > .ui').selectedTextInDropdownList(1, 'Level 1 - Active')
    cy.get(':nth-child(6) > .four > .field > .ui').verifyDropdownList(1, ['Level 1 - Active', 'Level 2 - Active/Passive'])
    
    cy.verifyLabel('Use Equivalents')
    cy.get('.react-toggle-track').as('EquivalentToggle').should('exist')

    cy.verifyLabel("Cost of Living Adjustment (COLA)");
    cy.get("#cola").should("have.value", "0.00%");
    cy.log("LY.A.AL.04");
    dsh.verifySSLayerFieldsPresent()

    cy.log("LY.A.AL.05");
    cy.verifyTextNotPresent("Nassau Income Accelerator");
    cy.verifyTextNotPresent("Report Customizations");
    cy.verifyTextNotPresent("Annuity Income Layer Name");
    cy.verifyTextNotPresent("Social Security+™ Disclosures");

    cy.get("#cola").as("cola").should("be.visible").and("have.value", "0.00%");
    cy.get("@cola").clear().type("9.01");
    cy.wait(250)
    cy.get("@cola").then(($val) => {
      const fav = $val.attr("value");
      expect(fav).to.eq("9.00%");
    });

    cy.get("@cola").clear().type("-1");
    cy.wait(250)
    cy.get("@cola").then(($val) => {
      const fav = $val.attr("value");
      expect(fav).to.eq("1.00%");
    });
    cy.get("@cola").clear();
    cy.get("#title").click();
    cy.verifyValidationMessage("COLA is required")

    cy.get('#socialSecurityTitle').as('SS').clear()
    cy.get("#title").click();
    cy.verifyValidationMessage("Social Security Title is required");

    cy.get('#benefitDelayTitle').as('BD').clear();
    cy.get("#title").click();
    cy.verifyValidationMessage("Benefit Delay Title is required");

    cy.get('#benefitReplacementTitle').as('BR').clear();
    cy.get("#title").click();
    cy.verifyValidationMessage("Benefit Replacement Title is required");

    cy.get('#incomeFloorTitle').as('IF').clear();
    cy.get("#title").click();
    cy.verifyValidationMessage("Income Floor Title is required");

    cy.get('#additionalIncomeTitle').as('AI').clear();
    cy.get("#title").click();
    cy.verifyValidationMessage("Additional Income Title is required");

    cy.get("#companyName")
      .should("have.value", "Northwestern Mutual")
      .and("have.attr", "disabled");
    cy.get("#firstName")
      .should("have.value", "Test")
      .and("have.attr", "disabled");
    cy.get("#lastName")
      .should("have.value", "Automation")
      .and("have.attr", "disabled");
    cy.get("#phoneNumber")
      .should("not.have.attr", "disabled");
      
    cy.get("#emailAddress")
      .should("have.value", "test.automation+nmis+114688+0@lifeyield.com")
      .and("have.attr", "disabled");
    cy.get('.primary').as('SaveSettings').should('have.attr', 'disabled');
    cy.get(".secondary").as("Discard").click();


    cy.get('[href="/ssa19/pa/socialSecurityCases"] > span').click();
    ss.searchTextOnSSListTable("Sample Scenario");
    cy.clickSwitchSSToIL();

    cy.verifyTextPresent("Social Security");
    cy.verifyTextPresent("Benefit Delay");
    cy.verifyTextPresent("Benefit Replacement");
    cy.verifyTextPresent("Income Floor");
    cy.verifyTextPresent("Additional Income");

    const yil = today.getFullYear();
    cy.log("LY.A.AL.06");

    il.clickEditLayerName("Additional Income");
    cy.verifyLabel("Layer Name:");
    cy.get("#incomeLayers\\.additionalIncome\\.name").should(
      "have.value",
      "Additional Income"
    );
    cy.verifyLabel("Start Year:");
    cy.get("#incomeLayers\\.additionalIncome\\.startYear", {
      log: "Start Year dropdown has seen",
    })
      .as("StartYear")
      .should("have.value", yil);
    cy.verifyLabel("End Year:");
    cy.get("#incomeLayers\\.additionalIncome\\.endYear", {
      log: "End Year dropdown has seen",
    })
      .as("EndYear")
      .should("have.value", "2059");
    cy.verifyLabel("Income Growth:");
    cy.get("#incomeLayers\\.additionalIncome\\.valueGrowthRate").should(
      "have.value",
      "0.00%"
    );
    cy.verifyLabel("Starting Income:");
    cy.get("#incomeLayers\\.additionalIncome\\.startValue")
      .as("startIncome")
      .should("have.value", "$0");
    cy.verifyLabel("Product Type:");
    cy.verifyOptionTexts("#incomeLayers\\.additionalIncome\\.productType", [
      "Investment"
    ]);
    cy.verifyTextNotPresent("Reduced Rate");
    cy.verifyTextNotPresent("Guaranteed Minimum");
    cy.verifyTextNotPresent("Purchase Amount");

    //Verify validations
    cy.get("@startIncome").clear();
    cy.verifyValidationMessage("Starting Income is required");
    cy.get("@startIncome").type("0");

    cy.get('#incomeLayers\\.additionalIncome\\.assetGrowthRate').as('assetGrowth').should('have.value', '0.00%')
    cy.get('@assetGrowth').clear()
    cy.get("@startIncome").click()
    cy.verifyValidationMessage("Asset Growth Rate is required");
    cy.get('@assetGrowth').type('10')
    cy.get('@assetGrowth').should('have.value', '1.00%')
    cy.verifyTextPresent("Save");
    cy.clickToText("Cancel");

    aff.getButtonName("Download PDF").click();
    const reportName = "SocialSecurity";
    cy.intercept(
      "POST",
      Cypress.env('backendUrl') + "/api/Reports/" + reportName + "/*"
    ).as("buttonRequest");
    cy.get(":nth-child(6) > div > .primary", { log: "Download PDF" }).click();
    cy.downloadReport(reportName);
    aff.getButtonName("Cancel").click();
    cy.clickSwitchILToSS();
  });

  afterEach(() => {
    cy.task("generateReport");
  });
});
