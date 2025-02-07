/// <reference types="Cypress" />
import BasePage from "../../pages/BasePage"
import Login from "../../pages/LoginPage"
import QuestionnaireElements from "../../pages/Questionnaire"

context('Questionaire SS case wizard', () => {

  describe('SS case wizard field and validation verifications', () => {
    beforeEach(() => {
      const lg = new Login()

      cy.visit(Cypress.env('frontendUrl'));
      lg.lastEmailLogin()
      cy.document().should('have.property', 'charset').and('eq', 'UTF-8')
    })

    it('Questionnaire', () => {

      const qs = new QuestionnaireElements();

      cy.log('Step 1 Control');
      step1Control(qs);

      cy.log('Step2 Control Single Not Filed');
      step2controlSingleNotFiled(qs);

      cy.log('Step2 Control Single is Filed');
      step2controlSingleFiled(qs);

      cy.log('Step3 Control About Spouse');
      step3ControlAboutSpouse(qs);

      cy.log('Step3 Control Widowed');
      step3ControlWidowed(qs);

      cy.log('Step4 Control Spouse Not Filed');
      step4ControlSpouseNotFiled(qs);

      cy.log('Step4 Control Spouse is Filed');
      step4ControlSpouseFiled(qs);

      cy.log('step5 Control Married Divorced');
      step5ControlMarriedDivorced(qs);

      cy.log('step5 Control Single Widowed');
      step5ControlSingleWidowed(qs);

      cy.log('step6 Control Start Recevie');
      step6ControlStartRecevie(qs);

      cy.log('step7 Control LifeExp Single');
      step7ControlLifeExpSingle(qs);

    })

    it('Questionnaire_ReviewSingle', () => {

      cy.log("Questionnaire_ReviewSingle");
      const qs = new QuestionnaireElements()

      cy.log("Control Review step for single martial status.");
      cy.generateRandomString(5).then((randomString) => {
        qs.getASSCButton().click();

        qs.getNameInput().type(randomString + ' Case');
        qs.getPrimaryInput().type(randomString + ' Name');
        cy.minusYear(50).then((mnYear) => {
          qs.getDateOfBirthInput().type('11/05/' + mnYear+'{enter}')
          cy.wait(1000)
        });
        qs.getNameInput().click();
        //cy.selectItemInDropdownList(0,'Single')
        qs.selectDropdownList("What is your client's marital status?", "Single");
        qs.getNextButton().click();

        //step2
        qs.getPrimaryMemberBenefit().type("2000");
        qs.getNextButton().click();

        //step3
        qs.getNonCoveredPension().clear();
        qs.getNonCoveredPension().type("0");
        qs.getNextButton().click();

        //step4
        qs.selectDropdownList(randomString + " Name's expected retirement age", "65 years");
        qs.getNextButton().click();

        qs.getNextButton().click();
        qs.getNextButton().should('exist');
        qs.getCancelButton().should('exist');
        qs.getPreviousButton().should('exist');
        qs.getSSCH1().contains('Review').should('exist');

        const MemeberNameReview = 'th.center.aligned[colspan="2"]';
        cy.verifyElementContainsText(randomString + " Name", MemeberNameReview);


        // Date Of Birth 
        cy.get('tbody tr:nth-child(1) td:nth-child(1)').should('contain', 'Date Of Birth');
        cy.minusYear(50).then((mnYear) => {
          cy.get('tbody tr:nth-child(1) td:nth-child(2)').should('contain', '11/5/'+mnYear);
        });
        
        // Retirement Age 
        cy.get('tbody tr:nth-child(2) td:nth-child(1)').should('contain', 'Retirement Age');
        cy.get('tbody tr:nth-child(2) td:nth-child(2)').should('contain', '65 years');

        // FRA Benefit 
        cy.get('tbody tr:nth-child(3) td:nth-child(1)').should('contain', 'FRA Benefit');
        cy.get('tbody tr:nth-child(3) td:nth-child(2)').should('contain', '$2,000');

        // Non-Covered Pension 
        cy.get('tbody tr:nth-child(4) td:nth-child(1)').should('contain', 'Non-Covered Pension');
        cy.get('tbody tr:nth-child(4) td:nth-child(2)').should('contain', '$0');

        // Marital Status 
        cy.get('tbody tr:nth-child(5) td:nth-child(1)').should('contain', 'Marital Status');
        cy.get('tbody tr:nth-child(5) td:nth-child(2)').should('contain', 'Single');

        // Life Expectancy 
        cy.get('tbody tr:nth-child(6) td:nth-child(1)').should('contain', 'Life Expectancy');
        cy.get('tbody tr:nth-child(6) td:nth-child(2)').should('contain', '85 years');
        

        cy.clickPencilIcon(randomString + " Name");
        qs.getSSCH1().contains('Tell us about your client').should('exist');
        cy.clickNTimes("Next", 5);
        cy.clickPencilIcon("Date Of Birth");
        qs.getSSCH1().contains('Tell us about your client').should('exist');
        cy.clickNTimes("Next", 5);
        cy.clickPencilIcon("FRA Benefit");
        qs.getSSCH1().contains("Your client's Social Security benefit").should('exist');
        cy.clickNTimes("Next", 4);
        cy.clickPencilIcon("Non-Covered Pension");
        qs.getSSCH1().contains("Employment Outside of Social Security").should('exist');
        cy.clickNTimes("Next", 3);
        cy.clickPencilIcon("Retirement Age");
        qs.getSSCH1().contains("When does your client expect to start receiving Social Security income?").should('exist');
        cy.clickNTimes("Next", 2);
        cy.clickPencilIcon("Life Expectancy");
        qs.getSSCH1().contains("Life Expectancy").should('exist');
        qs.getNextButton().click();
        cy.clickPencilIcon("Marital Status");
        qs.getSSCH1().contains("Tell us about your client").should('exist');
        cy.clickNTimes("Next", 5);
        qs.getSSCH1().contains("Review").should('exist');
        qs.getNextButton().click();
        cy.log("Good News");
        cy.log("Good news step for Single");
        qs.getSSCH1().contains('Good news - we found your client').should('exist');

        const rString = randomString;

        cy.contains('table.ui.celled.table', 'Custom Scenario').within(() => {
          cy.get('tbody tr:nth-child(1) td:nth-child(1)').should('contain', rString + ' Name Claims at:');
          cy.get('tbody tr:nth-child(1) td:nth-child(2)').should('contain', '65 years');
          //cy.get('tbody tr:nth-child(2) td p').should('contain', '$417,733'); 
        });


        cy.contains('table.ui.celled.table', 'Optimal Scenario').within(() => {
          cy.get('tbody tr:nth-child(1) td:nth-child(1)').should('contain', rString + ' Name Claims at:');
          cy.get('tbody tr:nth-child(1) td:nth-child(2)').should('contain', '70 years');
          //cy.get('tbody tr:nth-child(2) td').should('contain', '$448,880');
        });


        qs.getCancelButton().click();
      });

    })

    it('Questionnaire_ReviewMarried', () => {

      cy.log("Questionnaire_ReviewMarried");
      const qs = new QuestionnaireElements()



      cy.log("Control Review step for Married martial status.");
      cy.generateRandomString(5).then((randomString) => {
        qs.getASSCButton().click();
        //step1
        qs.getNameInput().type(randomString + ' Case');
        qs.getPrimaryInput().type(randomString + ' Name');
        cy.minusYear(62).then((mnYear) => {
          qs.getDateOfBirthInput().type('11/05/' + mnYear+'{enter}')
        });
        qs.getNameInput().click();
        qs.selectDropdownList("What is your client's marital status?", "Married");
        qs.getNextButton().click();

        //step2
        qs.getPrimaryMemberBenefit().type("2000");
        qs.getNextButton().click();


        //step3
        qs.getSecondaryMemberName().type("Name 2");
        cy.minusYear(50).then((mnYear) => {
          qs.getSecondaryMemberDateOfBirthInput().type('11/05/' + mnYear+'{enter}')
        });
        qs.getSecondaryMemberName().click();
        qs.getNextButton().click();

        //step4
        qs.getSecondaryMemberBenefit().type("2500");

        //step,5,6,7
        cy.clickNTimes("Next", 4);


        qs.getNextButton().should('exist');
        qs.getCancelButton().should('exist');
        qs.getPreviousButton().should('exist');
        qs.getSSCH1().contains('Review').should('exist');

        const MemberNameReview = 'th.center.aligned[colspan="2"]';
        cy.verifyElementContainsText(randomString + " Name", MemberNameReview);

        const member1TableSelector = '.six.wide.column:first tbody';
        // Verify Date Of Birth
        cy.minusYear(62).then((mnYear) => {
          cy.verifyTableRow(member1TableSelector, 1, 'Date Of Birth', '11/5/'+mnYear);
        });
        

        // Verify Retirement Age
        cy.verifyTableRow(member1TableSelector, 2, 'Retirement Age', '62 years');

        // Verify FRA Benefit
        cy.verifyTableRow(member1TableSelector, 3, 'FRA Benefit', '$2,000');

        // Verify Non-Covered Pension
        cy.verifyTableRow(member1TableSelector, 4, 'Non-Covered Pension', '$0');

        // Verify Marital Status
        cy.verifyTableRow(member1TableSelector, 5, 'Marital Status', 'Married');

        // Verify Life Expectancy
        cy.verifyTableRow(member1TableSelector, 6, 'Life Expectancy', '85 years');


        const member2TableSelector = '.six.wide.column:last tbody';

        // Verify Date Of Birth
        cy.minusYear(50).then((mnYear) => {
          cy.verifyTableRow(member2TableSelector, 1, 'Date Of Birth', '11/5/'+mnYear);
        });
        // Verify Retirement Age
        cy.verifyTableRow(member2TableSelector, 2, 'Retirement Age', '62 years');

        // Verify FRA Benefit
        cy.verifyTableRow(member2TableSelector, 3, 'FRA Benefit', '$2,500');

        // Verify Non-Covered Pension
        cy.verifyTableRow(member2TableSelector, 4, 'Non-Covered Pension', '$0');

        // Verify Life Expectancy
        cy.verifyTableRow(member2TableSelector, 5, 'Life Expectancy', '85 years');

        cy.clickPencilIcon(randomString + " Name");
        qs.getSSCH1().contains('Tell us about your client').should('exist');
        cy.clickNTimes("Next", 7);
        cy.clickPencilIcon("Date Of Birth");
        qs.getSSCH1().contains('Tell us about your client').should('exist');
        cy.clickNTimes("Next", 7);
        cy.clickPencilIcon("FRA Benefit");
        qs.getSSCH1().contains("Your client's Social Security benefit").should('exist');
        cy.clickNTimes("Next", 6);
        cy.clickPencilIcon("Non-Covered Pension");
        qs.getSSCH1().contains("Employment Outside of Social Security").should('exist');
        cy.clickNTimes("Next", 3);
        cy.clickPencilIcon("Retirement Age");
        qs.getSSCH1().contains("When does your client expect to start receiving Social Security income?").should('exist');
        cy.clickNTimes("Next", 2);
        cy.clickPencilIcon("Life Expectancy");
        qs.getSSCH1().contains("Life Expectancy").should('exist');
        qs.getNextButton().click();
        cy.clickPencilIcon("Marital Status");
        qs.getSSCH1().contains("Tell us about your client").should('exist');
        cy.clickNTimes("Next", 7);
        qs.getSSCH1().contains("Review").should('exist');
        qs.getNextButton().click();
        cy.log("Good News");
        cy.log("Good news step for Single");
        qs.getSSCH1().contains('Good news - we found your client').should('exist');

        const customScenarioTableSelector = '.six.wide.column:first table.ui.celled.table';
        cy.get(customScenarioTableSelector).within(() => {
          const customScenarioTableHeadings = 'thead tr th';

          // Verify Table Heading
          cy.get(customScenarioTableHeadings).should('have.css', 'background-color', 'rgb(16, 92, 145)').and('have.css', 'color', 'rgb(255, 255, 255)').and('have.css', 'text-align', 'center');

          cy.contains('Custom Scenario').should('exist');
          cy.contains(randomString + ' Name Claims at:').next().should('contain', '62 years');
          cy.contains('Name 2 Claims at:').next().should('contain', '62 years');
          //cy.contains('Total Benefits').next().find('p').should('contain', '$874,575');
        });

        // Second Table
        const optimalScenarioTableSelector = '.six.wide.column:last table.ui.celled.table';
        cy.get(optimalScenarioTableSelector).within(() => {
          const optimalScenarioTableHeadings = 'thead tr th';

          // Verify Table Heading
          cy.get(optimalScenarioTableHeadings).should('have.css', 'background-color', 'rgb(97, 146, 41)').and('have.css', 'color', 'rgb(255, 255, 255)').and('have.css', 'text-align', 'center');

          cy.contains('Optimal Scenario').should('exist');
          cy.contains(randomString + ' Name Claims at:').next().should('contain', '70 years');
          cy.contains('Name 2 Claims at:').next().should('contain', '62 years');
          //cy.contains('Total Benefits').next().should('contain', '$1,047,010');
        });


        qs.getCancelButton().click();
      });

    })

    it('Questionnaire_ReviewDivorced', () => {

      cy.log("Questionnaire_ReviewDivorced");
      const qs = new QuestionnaireElements()



      cy.log("Control Review step for divorced martial status.");
      cy.generateRandomString(5).then((randomString) => {
        qs.getASSCButton().click();
        //step1
        qs.getNameInput().type(randomString + ' Case');
        qs.getPrimaryInput().type(randomString + ' Name');
        cy.minusYear(40).then((mnYear) => {
          qs.getDateOfBirthInput().type('11/05/' + mnYear+'{enter}')
        });
        qs.getNameInput().click();
        qs.selectDropdownList("What is your client's marital status?", "Divorced");
        qs.getNextButton().click();

        //step2
        qs.getPrimaryMemberBenefit().type("2000");
        qs.getNextButton().click();


        //step3
        qs.getSecondaryMemberName().type("Name 2");
        cy.minusYear(30).then((mnYear) => {
          qs.getSecondaryMemberDateOfBirthInput().type('11/05/' + mnYear+'{enter}')
        });
        qs.getSecondaryMemberName().click();
        qs.getNextButton().click();

        //step4
        qs.getSecondaryMemberBenefit().type("2500");

        //step,5,6,7
        cy.clickNTimes("Next", 4);


        qs.getNextButton().should('exist');
        qs.getCancelButton().should('exist');
        qs.getPreviousButton().should('exist');
        qs.getSSCH1().contains('Review').should('exist');

        const MemberNameReview = 'th.center.aligned[colspan="2"]';
        cy.verifyElementContainsText(randomString + " Name", MemberNameReview);

        const member1TableSelector = '.six.wide.column:first tbody';
        // Verify Date Of Birth
        cy.minusYear(40).then((mnYear) => {
          cy.verifyTableRow(member1TableSelector, 1, 'Date Of Birth', '11/5/'+mnYear);
        });
        

        // Verify Retirement Age
        cy.verifyTableRow(member1TableSelector, 2, 'Retirement Age', '62 years');

        // Verify FRA Benefit
        cy.verifyTableRow(member1TableSelector, 3, 'FRA Benefit', '$2,000');

        // Verify Non-Covered Pension
        cy.verifyTableRow(member1TableSelector, 4, 'Non-Covered Pension', '$0');

        // Verify Marital Status
        cy.verifyTableRow(member1TableSelector, 5, 'Marital Status', 'Divorced');

        // Verify Life Expectancy
        cy.verifyTableRow(member1TableSelector, 6, 'Life Expectancy', '85 years');


        const member2TableSelector = '.six.wide.column:last tbody';

        // Verify Date Of Birth
        cy.minusYear(30).then((mnYear) => {
          cy.verifyTableRow(member2TableSelector, 1, 'Date Of Birth', '11/5/'+mnYear);
        });
        // Verify FRA Benefit
        cy.verifyTableRow(member2TableSelector, 2, 'FRA Benefit', '$2,500');

        // Verify Non-Covered Pension
        cy.verifyTableRow(member2TableSelector, 3, 'Non-Covered Pension', '$0');

        // Verify Life Expectancy
        cy.verifyTableRow(member2TableSelector, 4, 'Life Expectancy', '85 years');

        cy.clickPencilIcon(randomString + " Name");
        qs.getSSCH1().contains('Tell us about your client').should('exist');
        cy.clickNTimes("Next", 7);
        cy.clickPencilIcon("Date Of Birth");
        qs.getSSCH1().contains('Tell us about your client').should('exist');
        cy.clickNTimes("Next", 7);
        cy.clickPencilIcon("FRA Benefit");
        qs.getSSCH1().contains("Your client's Social Security benefit").should('exist');
        cy.clickNTimes("Next", 6);
        cy.clickPencilIcon("Non-Covered Pension");
        qs.getSSCH1().contains("Employment Outside of Social Security").should('exist');
        cy.clickNTimes("Next", 3);
        cy.clickPencilIcon("Retirement Age");
        qs.getSSCH1().contains("When does your client expect to start receiving Social Security income?").should('exist');
        cy.clickNTimes("Next", 2);
        cy.clickPencilIcon("Life Expectancy");
        qs.getSSCH1().contains("Life Expectancy").should('exist');
        qs.getNextButton().click();
        cy.clickPencilIcon("Marital Status");
        qs.getSSCH1().contains("Tell us about your client").should('exist');
        cy.clickNTimes("Next", 7);
        qs.getSSCH1().contains("Review").should('exist');
        qs.getNextButton().click();
        cy.log("Good News");
        cy.log("Good news step for Single");
        qs.getSSCH1().contains('Good news - we found your client').should('exist');

        const customScenarioTableSelector = '.six.wide.column:first table.ui.celled.table';
        cy.get(customScenarioTableSelector).within(() => {
          const customScenarioTableHeadings = 'thead tr th';

          // Verify Table Heading
          cy.get(customScenarioTableHeadings).should('have.css', 'background-color', 'rgb(16, 92, 145)').and('have.css', 'color', 'rgb(255, 255, 255)').and('have.css', 'text-align', 'center');

          cy.contains('Custom Scenario').should('exist');
          cy.contains(randomString + ' Name Claims at:').next().should('contain', '62 years');
          //cy.contains('Total Benefits').next().find('p').should('contain', '$388,700');
        });

        // Second Table
        const optimalScenarioTableSelector = '.six.wide.column:last table.ui.celled.table';
        cy.get(optimalScenarioTableSelector).within(() => {
          const optimalScenarioTableHeadings = 'thead tr th';

          // Verify Table Heading
          cy.get(optimalScenarioTableHeadings).should('have.css', 'background-color', 'rgb(97, 146, 41)').and('have.css', 'color', 'rgb(255, 255, 255)').and('have.css', 'text-align', 'center');

          cy.contains('Optimal Scenario').should('exist');
          cy.contains(randomString + ' Name Claims at:').next().should('contain', '70 years');
          //cy.contains('Total Benefits').next().should('contain', '$448,880');
        });


        qs.getCancelButton().click();
      });

    })

    it('Questionnaire_ReviewWidowed', () => {

      cy.log("Questionnaire_ReviewWidowed");
      const qs = new QuestionnaireElements()



      cy.log("Control Review step for widowed martial status.");
      cy.generateRandomString(5).then((randomString) => {
        qs.getASSCButton().click();
        //step1
        qs.getNameInput().type(randomString + ' Case');
        qs.getPrimaryInput().type(randomString + ' Name');
        cy.minusYear(40).then((mnYear) => {
          qs.getDateOfBirthInput().type('11/05/' + mnYear+'{enter}')
        });
        qs.getNameInput().click();
        qs.selectDropdownList("What is your client's marital status?", "Widowed");
        qs.getNextButton().click();

        //step2
        qs.getPrimaryMemberBenefit().type("2000");
        qs.getNextButton().click();


        //step3
        qs.getSecondaryMemberName().type("Name 2");
        cy.minusYear(30).then((mnYear) => {
          qs.getSecondaryMemberDateOfBirthInput().type('11/05/' + mnYear+'{enter}')
        });
        qs.getSecondaryMemberName().click();
        qs.getSecondaryMemberDeceasedDate().type('11/05/2021{enter}');
        qs.getSecondaryMemberName().click();
        qs.getNextButton().click();

        //step4
        qs.getSecondaryMemberBenefit().type("2500");

        //step,5,6,7
        cy.clickNTimes("Next", 4);


        qs.getNextButton().should('exist');
        qs.getCancelButton().should('exist');
        qs.getPreviousButton().should('exist');
        qs.getSSCH1().contains('Review').should('exist');

        const MemberNameReview = 'th.center.aligned[colspan="2"]';
        cy.verifyElementContainsText(randomString + " Name", MemberNameReview);

        const member1TableSelector = '.six.wide.column:first tbody';
        // Verify Date Of Birth
        cy.minusYear(40).then((mnYear) => {
          cy.verifyTableRow(member1TableSelector, 1, 'Date Of Birth', '11/5/'+mnYear);
        });
        
        // Verify Retirement Age
        cy.verifyTableRow(member1TableSelector, 2, 'Retirement Age', '60 years');

        // Verify FRA Benefit
        cy.verifyTableRow(member1TableSelector, 3, 'FRA Benefit', '$2,000');

        // Verify Non-Covered Pension
        cy.verifyTableRow(member1TableSelector, 4, 'Non-Covered Pension', '$0');

        // Verify Marital Status
        cy.verifyTableRow(member1TableSelector, 5, 'Marital Status', 'Widowed');

        // Verify Life Expectancy
        cy.verifyTableRow(member1TableSelector, 6, 'Life Expectancy', '85 years');


        const member2TableSelector = '.six.wide.column:last tbody';

        // Verify Date Of Birth
        cy.minusYear(30).then((mnYear) => {
          cy.verifyTableRow(member2TableSelector, 1, 'Date Of Birth', '11/5/'+mnYear);
        });

        // Verify Deceased Date
        cy.verifyTableRow(member2TableSelector, 2, 'Deceased Date', '11/5/2021');

        // Verify FRA Benefit
        cy.verifyTableRow(member2TableSelector, 3, 'FRA Benefit', '$2,500');




        cy.clickPencilIcon(randomString + " Name");
        qs.getSSCH1().contains('Tell us about your client').should('exist');
        cy.clickNTimes("Next", 7);
        cy.clickPencilIcon("Date Of Birth");
        qs.getSSCH1().contains('Tell us about your client').should('exist');
        cy.clickNTimes("Next", 7);
        cy.clickPencilIcon("FRA Benefit");
        qs.getSSCH1().contains("Your client's Social Security benefit").should('exist');
        cy.clickNTimes("Next", 6);
        cy.clickPencilIcon("Non-Covered Pension");
        qs.getSSCH1().contains("Employment Outside of Social Security").should('exist');
        cy.clickNTimes("Next", 3);
        cy.clickPencilIcon("Retirement Age");
        qs.getSSCH1().contains("When does your client expect to start receiving Social Security income?").should('exist');
        cy.clickNTimes("Next", 2);
        cy.clickPencilIcon("Life Expectancy");
        qs.getSSCH1().contains("Life Expectancy").should('exist');
        qs.getNextButton().click();
        cy.clickPencilIcon("Marital Status");
        qs.getSSCH1().contains("Tell us about your client").should('exist');
        cy.clickNTimes("Next", 7);
        qs.getSSCH1().contains("Review").should('exist');
        qs.getNextButton().click();
        cy.log("Good News");
        cy.log("Good news step for Single");
        qs.getSSCH1().contains('Good news - the scenario you entered is the optimal retirement scenario!').should('exist');

        const customScenarioTableSelector = '.six.wide.column:first table.ui.celled.table';
        cy.get(customScenarioTableSelector).within(() => {
          const customScenarioTableHeadings = 'thead tr th';

          // Verify Table Heading
          cy.get(customScenarioTableHeadings).should('have.css', 'background-color', 'rgb(16, 92, 145)').and('have.css', 'color', 'rgb(255, 255, 255)').and('have.css', 'text-align', 'center');

          cy.contains('Custom Scenario').should('exist');
          cy.contains(randomString + ' Name Claims at:').next().should('contain', '60 years');
          //cy.contains('Total Benefits').next().find('p').should('contain', '$662,602');
        });

        // Second Table
        const optimalScenarioTableSelector = '.six.wide.column:last table.ui.celled.table';
        cy.get(optimalScenarioTableSelector).within(() => {
          const optimalScenarioTableHeadings = 'thead tr th';

          // Verify Table Heading
          cy.get(optimalScenarioTableHeadings).should('have.css', 'background-color', 'rgb(97, 146, 41)').and('have.css', 'color', 'rgb(255, 255, 255)').and('have.css', 'text-align', 'center');

          cy.contains('Optimal Scenario').should('exist');
          cy.contains(randomString + ' Name Claims at:').next().should('contain', '60 years');
          //cy.contains('Total Benefits').next().should('contain', '$662,602');
        });


        qs.getCancelButton().click();
      });

    })

  })
})


function step1Control(qs) {
  const currentYear = new Date().getFullYear();
  cy.log("Tells us about your client");
  cy.log("Control step 1, Martial status Single and not filed in 'Your client's social security benefit' step.");

  qs.getASSCButton().click();


  cy.log('LY.TC.SSA.Q.01');
  qs.getSSCHeader().contains('Add Social Security Case').should('exist');

  cy.log('LY.TC.SSA.Q.TUAYC.01');
  qs.getSSCH1().contains('Tell us about your client').should('exist');
  qs.getSSCParagraph().contains("(Just a few details to get things started - we don't need a lot of information, so this won't take long.) ").should('exist');
  //element control
  qs.getSSCElement().contains('b', 'Social Security case name').should('have.text', 'Social Security case name');
  qs.getNameInput().should('exist');

  qs.getSSCElement().contains('b', "What is your client's name?").should('have.text', "What is your client's name?");
  qs.getPrimaryInput().should('exist');

  qs.getSSCElement().contains('b', "When was your client born?").should('have.text', "When was your client born?");
  qs.getDateOfBirthInput().should('exist')
    .should('have.attr', 'placeholder', 'MM/DD/YYYY');
  qs.getSSCElement().contains('b', "What is your client's marital status?").should('have.text', "What is your client's marital status?");
  qs.getDropdownList("What is your client's marital status?")
    .should('exist')
    .find('.text')
    .each(($option) => {
      const optionText = $option.text();
      expect(['Single', 'Married', 'Divorced', 'Widowed']).to.include(optionText);
    });
  //Next Button Control
  qs.getNextButton().should('exist').should('be.disabled');
  //x button Control
  qs.getXButton().should('exist').find('i.close.icon');


  cy.log('LY.TC.SSA.Q.TUAYC.02');
  qs.getNameInput().type('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');//52 character
  qs.getPrimaryInput().type('Name 1');
  qs.getDateOfBirthInput().type('11/05/1958{enter}');
  qs.getNameInput().clear();
  cy.verifyValidationMessage('Case Name is required')
  qs.getPrimaryInput().clear();
  qs.getNameInput().clear();

  cy.log('LY.TC.SSA.Q.TUAYC.03');
  qs.getNameInput().type('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');//52 character
  cy.generateRandomString(5).then((randomString) => {
    qs.getPrimaryInput().type(randomString + ' Name');
  });
  qs.getDateOfBirthInput().clear();
  qs.getDateOfBirthInput().type('11/05/1958{enter}');
  qs.getNameInput().click();
  cy.verifyValidationMessage('The Case Name field has a maximum length of 50')
  qs.getNameInput().clear();
  qs.getPrimaryInput().clear();


  cy.log('LY.TC.SSA.Q.TUAYC.05');
  qs.getDropdownList("What is your client's marital status?").should('exist').should('have.attr', 'aria-expanded', 'false');
  qs.getDropdownList("What is your client's marital status?")
    .should('exist')
    .find('.text')
    .each(($option) => {
      const optionText = $option.text();
      expect(['Single', 'Married', 'Divorced', 'Widowed']).to.include(optionText);
    });



  cy.log('LY.TC.SSA.Q.TUAYC.07');
  qs.getXButton().click();
  qs.getASSCButton().click();
  cy.generateRandomString(5).then((randomString) => {
    qs.getNameInput().type(randomString + ' Name');
  });
  cy.generateRandomString(5).then((randomString) => {
    qs.getPrimaryInput().type(randomString + ' Name');
  });
  cy.minusYear(65).then((mnYear) => {
    qs.getDateOfBirthInput().type('11/05/' + mnYear+'{enter}');
  });
  qs.getNameInput().click();
  qs.getSSCElement().contains('b', "Is your client already claiming benefits?").should('have.text', "Is your client already claiming benefits?");
  qs.getDropdownList("Is your client already claiming benefits?")
    .should('exist')
    .should('have.attr', 'aria-expanded', 'false')
    .find('.text')
    .each(($option) => {
      const optionText = $option.text();
      expect(['Not Yet Filed', 'Already Filed']).to.include(optionText);
    });


  cy.log('LY.TC.SSA.Q.TUAYC.08');
  qs.getXButton().click();
  qs.getASSCButton().click();
  cy.generateRandomString(5).then((randomString) => {
    qs.getNameInput().type(randomString + ' Name');
  });
  cy.generateRandomString(5).then((randomString) => {
    qs.getPrimaryInput().type(randomString + ' Name');
  });
  cy.minusYear(18).then((mnYear) => {
    qs.getDateOfBirthInput().type('11/05/' + mnYear+'{enter}')
  });
  qs.getNameInput().click();
  qs.getSSCElement().contains('b', "Is your client already claiming benefits?").should('not.exist');
  qs.getXButton().click();
}

function step2controlSingleNotFiled(qs) {
  const currentYear = new Date().getFullYear();
  //step2-step2controlSingleNotFiled
  cy.log("step2controlSingleNotFiled");
  cy.log("Your client's social security benefit");

  qs.getASSCButton().click();
  cy.generateRandomString(5).then((randomString) => {
    qs.getNameInput().type(randomString + ' Name');
  });
  cy.generateRandomString(5).then((randomString) => {
    qs.getPrimaryInput().type(randomString + ' Name');
  });
  cy.minusYear(50).then((mnYear) => {
    qs.getDateOfBirthInput().type('11/05/' + mnYear+'{enter}');
  });
  qs.getNextButton().click();


  qs.getSSCH1().contains("Your client's Social Security benefit").should('exist');
  cy.get('p')
    .should('contain', 'If your client claims benefits before the age of 67, it will be reduced.')
    .should('contain', 'Claim later than 67 and their benefit will increase.')
    .should('contain', 'If they claim exactly at age 67, they will get something referred to as their "Estimated Monthly Benefit at Full Retirement".')
    .should('contain', 'You can look this up');
  cy.get('a#lnkSSAStep1')
    .should('have.attr', 'href', 'http://www.ssa.gov/myaccount/')
    .should('have.attr', 'target', '_blank')
    .should('have.attr', 'rel', 'noreferrer')
    .should('have.text', 'here');

  qs.getSSCElement().contains('b', "Your client's Estimated Monthly Benefit at Full Retirement*").should('have.text', "Your client's Estimated Monthly Benefit at Full Retirement*");
  qs.getSSCElement().contains('b', "Your client's annual salary").should('have.text', "Your client's annual salary");

  qs.getPrimaryMemberSalary().type("1000");
  qs.getPrimaryMemberBenefitDisabled().should('have.class', 'disabled');
  qs.getPrimaryMemberSalary().clear();
  qs.getPrimaryMemberBenefit().click();
  cy.verifyValidationMessage('Salary is required')

  qs.getPrimaryMemberBenefit().type("5000");
  cy.wait(1000);
  qs.getSSCElement().contains('b', "Your client's annual salary").click();
  cy.verifyValidationMessage('The FRA Benefit field must be less than $4,500.00')
  qs.getPrimaryMemberSalaryDisabled().should("exist");
  qs.getPrimaryMemberBenefit().clear();
  qs.getPrimaryMemberBenefit().type("2500");
  qs.getXButton().click();
}

function step2controlSingleFiled(qs) {
  const currentYear = new Date().getFullYear();

  //step2-step2controlSingleFiled

  cy.log("step2controlSingleFiled");
  cy.log("Your client's social security benefit");
  qs.getASSCButton().click();
  cy.generateRandomString(5).then((randomString) => {
    qs.getNameInput().type(randomString + ' Name');
  });
  cy.generateRandomString(5).then((randomString) => {
    qs.getPrimaryInput().type(randomString + ' Name');
  });
  cy.minusYear(63).then((mnYear) => {
    qs.getDateOfBirthInput().type('11/05/' + mnYear+'{enter}');
  });
  qs.getNameInput().click();

  qs.selectDropdownList("Is your client already claiming benefits?", "Already Filed")

  qs.getNextButton().click();
  qs.getSSCElement().contains('b', "On what date did your client previously file?").should('have.text', "On what date did your client previously file?");

  qs.getPrimaryMemberBenefit().should('exist');
  qs.getPriorFilingDate().should('exist');
  qs.getNextButton().should('exist').should('be.disabled');
  qs.getXButton().click();


}

function step3ControlAboutSpouse(qs) {
  const currentYear = new Date().getFullYear();
  //step3ControlAboutSpouse

  cy.log("step3ControlAboutSpouse");
  cy.log("Tell us about your client's spouse...(Married/Divorced)");

  //step1
  qs.getASSCButton().click();
  cy.generateRandomString(5).then((randomString) => {
    qs.getNameInput().type(randomString + ' Name');
  });
  qs.getPrimaryInput().type("Name 1");

  cy.minusYear(50).then((mnYear) => {
    qs.getDateOfBirthInput().type('11/05/' + mnYear+'{enter}');
  });
  qs.getNameInput().click();
  qs.selectDropdownList("What is your client's marital status?", "Married")

  qs.getNextButton().click();

  //step2
  qs.getPrimaryMemberBenefit().type("2500");
  qs.getNextButton().click();


  //step3
  qs.getSSCH1().contains("Tell us about your client's spouse...").should('exist');
  qs.getSSCParagraph().should('contain', "Since your client is married, they have the option of claiming benefits on their spouse's Social Security account.")
    .should('contain', 'This can significantly increase the income they receive.');

  //qs.getSSCElement().contains('b', "What is your client's spouses name?").should('have.text', "What is your client's spouses name?");
  qs.getSSCElement().contains('b', "When was your client's spouse born?").should('have.text', "When was your client's spouse born?");

  qs.getSecondaryMemberName().should('exist');
  qs.getSecondaryMemberDateOfBirthInput().should('exist');
  qs.getNextButton().should('exist').should('be.disabled');

  qs.getPreviousButton().should('exist');
  qs.getSecondaryMemberDateOfBirthInput().clear();
  //current year not selected
  qs.getSecondaryMemberDateOfBirthInput().type('01/01/' + currentYear+'{enter}')


  qs.getSSCH1().contains("Tell us about your client's spouse...").click();
  qs.getPreviousButton().click();

  qs.getNextButton().click();
  qs.getSecondaryMemberDateOfBirthInput().clear();
  cy.minusYear(50).then((mnYear) => {
    qs.getSecondaryMemberDateOfBirthInput().type('11/05/' + mnYear+'{enter}')
  });

  qs.getSecondaryMemberName().click();
  qs.getPreviousButton().click();

  qs.getNextButton().click();
  qs.getSecondaryMemberDateOfBirthInput().clear();
  cy.minusYear(63).then((mnYear) => {
    qs.getSecondaryMemberDateOfBirthInput().type('11/05/' + mnYear+'{enter}')
  });
  qs.getSecondaryMemberName().click();
  qs.getSSCElement().contains('b', "Is your client's spouse already claiming benefits?").should('have.text', "Is your client's spouse already claiming benefits?");



  qs.getSecondaryMemberName().type('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
  qs.getSecondaryMemberDateOfBirthInput().click();
  qs.getNextButton().should('exist').should('be.disabled');
  cy.verifyValidationMessage('The Name field has a maximum length of 15')


  qs.getSecondaryMemberName().clear();
  qs.getSecondaryMemberName().type('Name 1');
  qs.getNextButton().should('exist').should('be.disabled');
  cy.verifyValidationMessage("Client's name and spouse's name should be different.");

  qs.getSecondaryMemberName().clear();
  qs.getSecondaryMemberName().type('Name 2');

  qs.getXButton().click();

}

function step3ControlWidowed(qs) {
  const currentYear = new Date().getFullYear();

  //step3ControlWidowed

  //step1
  qs.getASSCButton().click();
  cy.generateRandomString(5).then((randomString) => {
    qs.getNameInput().type(randomString + ' Name');
  });
  qs.getPrimaryInput().type("Name 1");

  cy.minusYear(50).then((mnYear) => {
    qs.getDateOfBirthInput().type('11/05/' + mnYear+'{enter}');
  });
  qs.getNameInput().click();
  qs.selectDropdownList("What is your client's marital status?", "Widowed")

  qs.getNextButton().click();

  //step2
  qs.getPrimaryMemberBenefit().type("2500");
  qs.getNextButton().click();


  //step3
  qs.getSecondaryMemberName().type("Name 2");
  cy.minusYear(50).then((mnYear) => {
    qs.getSecondaryMemberDateOfBirthInput().type('11/05/' + mnYear+'{enter}')
  });
  qs.getSecondaryMemberName().click();
  qs.getSecondaryMemberDeceasedDate().type('11/05/2021{enter}');
  qs.getSecondaryMemberName().click();
  qs.getNextButton().click();

  qs.getSSCH1().contains("Name 2's Social Security benefit").should("be.visible");
  qs.getCancelButton().click();

}

function step4ControlSpouseNotFiled(qs) {
  const currentYear = new Date().getFullYear();

  cy.log("step4ControlSpouseNotFiled");
  cy.log("Spouse Social Security benefit(Married)");
  cy.log("Control step 4, Martial status Married and not filed in 'Spouse social security benefit' step.");

  //step1
  qs.getASSCButton().click();
  cy.generateRandomString(5).then((randomString) => {
    qs.getNameInput().type(randomString + ' Name');
  });
  qs.getPrimaryInput().type("Name 1");

  cy.minusYear(50).then((mnYear) => {
    qs.getDateOfBirthInput().type('11/05/' + mnYear+'{enter}')
  });
  qs.getNameInput().click();
  qs.selectDropdownList("What is your client's marital status?", "Married")

  qs.getNextButton().click();

  //step2
  qs.getPrimaryMemberBenefit().type("2000");
  qs.getNextButton().click();


  //step3
  qs.getSecondaryMemberName().type("Name 2");
  cy.minusYear(50).then((mnYear) => {
    qs.getSecondaryMemberDateOfBirthInput().type('11/05/' + mnYear+'{enter}')
  });
  qs.getSecondaryMemberName().click();
  qs.getNextButton().click();

  //step 4
  qs.getSSCH1().contains("Name 2's Social Security benefit").should("be.visible");
  qs.getSecondaryMemberSalary().type("1000");
  qs.getSecondaryMemberBenefitDisabled().should('have.class', 'disabled');

  qs.getSecondaryMemberSalary().clear();
  cy.verifyValidationMessage('Salary is required')
  qs.getSecondaryMemberBenefit().type("5000");
  cy.verifyValidationMessage('The FRA Benefit field must be less than $4,500.00')
  qs.getSecondaryMemberSalaryDisabled().should('have.class', 'disabled');
  qs.getSecondaryMemberBenefit().type("2000");
  qs.getCancelButton().click();
}

function step4ControlSpouseFiled(qs) {
  const currentYear = new Date().getFullYear();

  cy.log("step4ControlSpouseFiled");
  cy.log("Spouse Social Security benefit(Married Filed)");
  cy.log("Control step 4, Martial status Married and filed in 'Spouse social security benefit' step.");

  //step1
  qs.getASSCButton().click();
  cy.generateRandomString(5).then((randomString) => {
    qs.getNameInput().type(randomString + ' Name');
  });
  qs.getPrimaryInput().type("Name 1");

  cy.minusYear(65).then((mnYear) => {
    qs.getDateOfBirthInput().type('11/05/' + mnYear+'{enter}');
  });
  qs.getNameInput().click();
  qs.selectDropdownList("What is your client's marital status?", "Married")

  qs.getNextButton().click();

  //step2
  qs.getPrimaryMemberBenefit().type("2000");
  qs.getNextButton().click();


  //step3
  qs.getSecondaryMemberName().type("Name 2");
  cy.minusYear(50).then((mnYear) => {
    qs.getSecondaryMemberDateOfBirthInput().type('11/05/' + mnYear+'{enter}')
  });
  qs.getSecondaryMemberName().click();
  qs.getNextButton().click();

  //step 4
  qs.getSSCH1().contains("Name 2's Social Security benefit").should("be.visible");
  qs.getSecondaryMemberSalary().type("1000");
  qs.getSecondaryMemberBenefitDisabled().should('have.class', 'disabled');

  qs.getSecondaryMemberSalary().clear();
  cy.verifyValidationMessage('Salary is required')
  qs.getSecondaryMemberBenefit().type("5000");
  cy.verifyValidationMessage('The FRA Benefit field must be less than $4,500.00')
  qs.getSecondaryMemberSalaryDisabled().should('have.class', 'disabled');
  qs.getSecondaryMemberBenefit().type("2000");
  qs.getCancelButton().click();
}

function step5ControlMarriedDivorced(qs) {
  const currentYear = new Date().getFullYear();

  cy.log("Employment Outside of Social Security)");
  cy.log("Employment Outside of Social Security(MarriedDivorced)");
  cy.log("Control step 5, Martial status Married/Divorced and filed in 'Employment Outside of Social Security' step.");

  //step1
  qs.getASSCButton().click();
  cy.generateRandomString(5).then((randomString) => {
    qs.getNameInput().type(randomString + ' Name');
  });
  qs.getPrimaryInput().type("Name 1");

  cy.minusYear(50).then((mnYear) => {
    qs.getDateOfBirthInput().type('11/05/' + mnYear+'{enter}')
    
  });
  qs.getNameInput().click();
  qs.selectDropdownList("What is your client's marital status?", "Married")

  qs.getNextButton().click();

  //step2
  qs.getPrimaryMemberBenefit().type("2000");
  qs.getNextButton().click();


  //step3
  qs.getSecondaryMemberName().type("Name 2");
  cy.minusYear(50).then((mnYear) => {
    qs.getSecondaryMemberDateOfBirthInput().type('11/05/' + mnYear+'{enter}')
  });
  qs.getSecondaryMemberName().click();
  qs.getNextButton().click();

  //step 4
  qs.getSecondaryMemberBenefit().type("2500");
  qs.getNextButton().click();

  //step5
  qs.getSSCH1().contains("Employment Outside of Social Security").should('exist');
  cy.get('p')
    .should('contain', 'If your client or their spouse were ever employed by an organization that did not pay into Social Security (such as some government agencies), ')
    .should('contain', 'and are entitled to a pension from that employment, their Social Security benefits may be reduced*')
    .should('contain', "If this doesn't apply to your client, you can skip this page.");


  cy.get('p')
    .should('contain', 'The two relevant provisions within the Social Security rules are the')
    .and('contain', 'Windfall Elimination Provision (WEP)')
    .and('contain', 'Government Pension Offset provision (GPO)');
  cy.get('p a')
    .should('have.length', 2)
    .should('have.attr', 'href', 'https://www.ssa.gov/pubs/EN-05-10045.pdf')
    .should('have.attr', 'target', '_blank')
    .should('have.attr', 'rel', 'noreferrer')
    .next()
    .should('have.attr', 'href', 'https://www.ssa.gov/pubs/EN-05-10007.pdf')
    .should('have.attr', 'target', '_blank')
    .should('have.attr', 'rel', 'noreferrer');

  qs.getNonCoveredPension().clear();
  qs.getNextButton().should('exist').should('be.disabled');
  qs.getNonCoveredPension().type("11000");
  qs.getNonCoveredPensionSecondary().clear();
  qs.getNonCoveredPensionSecondary().type("0");
  cy.verifyValidationMessage('Pension must be less than $10,000.00')

  qs.getNonCoveredPension().clear();
  qs.getNonCoveredPensionSecondary().clear();
  qs.getNonCoveredPensionSecondary().type("11000");
  cy.verifyValidationMessage('Pension must be less than $10,000.00')

  qs.getNonCoveredPension().type("0");
  qs.getNonCoveredPensionSecondary().clear();
  qs.getNonCoveredPensionSecondary().type("0");
  qs.getNextButton().should('exist');
  cy.clickNTimes("Previous", 4);

  //Divorced
  qs.selectDropdownList("What is your client's marital status?", "Divorced");
  cy.clickNTimes("Next", 4);
  qs.getSSCH1().contains("Employment Outside of Social Security").should('exist');
  qs.getNonCoveredPension().should('exist');
  qs.getNonCoveredPensionSecondary().should('exist');
  qs.getCancelButton().click();

}

function step5ControlSingleWidowed(qs) {
  const currentYear = new Date().getFullYear();

  cy.log("Employment Outside of Social Security)");
  cy.log("Employment Outside of Social Security(Single/Widowed)");
  cy.log("Control step 5, Martial status Single/Widowed and filed in 'Employment Outside of Social Security' step.");

  //step1
  qs.getASSCButton().click();
  cy.generateRandomString(5).then((randomString) => {
    qs.getNameInput().type(randomString + ' Name');
  });
  qs.getPrimaryInput().type("Name 1");

  cy.minusYear(50).then((mnYear) => {
    qs.getDateOfBirthInput().type('11/05/' + mnYear+'{enter}');
  });
  qs.getNameInput().click();
  qs.getNextButton().click();

  //step2
  qs.getPrimaryMemberBenefit().type("2000");
  qs.getNextButton().click();


  //step3
  qs.getSSCH1().contains("Employment Outside of Social Security").should('exist');
  cy.get('p')
    .should('contain', 'If your client was ever employed by an organization that did not pay into Social Security (such as some government agencies), ')
    .should('contain', 'and are entitled to a pension from that employment, their Social Security benefits may be reduced*.')
    .should('contain', "If this doesn't apply to your client, you can skip this page.");


  cy.get('p')
    .should('contain', 'The two relevant provisions within the Social Security rules are the')
    .and('contain', 'Windfall Elimination Provision (WEP)')
    .and('contain', 'Government Pension Offset provision (GPO)');
  cy.get('p a')
    .should('have.length', 2)
    .should('have.attr', 'href', 'https://www.ssa.gov/pubs/EN-05-10045.pdf')
    .should('have.attr', 'target', '_blank')
    .should('have.attr', 'rel', 'noreferrer')
    .next()
    .should('have.attr', 'href', 'https://www.ssa.gov/pubs/EN-05-10007.pdf')
    .should('have.attr', 'target', '_blank')
    .should('have.attr', 'rel', 'noreferrer');

  qs.getNonCoveredPension().clear();
  qs.getNextButton().should('exist').should('be.disabled');
  qs.getNonCoveredPension().type("11000");
  cy.verifyValidationMessage('Pension must be less than $10,000.00')

  cy.clickNTimes("Previous", 2);

  //Widowed
  qs.selectDropdownList("What is your client's marital status?", "Widowed");
  cy.clickNTimes("Next", 2);

  //step 3
  qs.getSecondaryMemberName().type("Name 2");
  cy.minusYear(50).then((mnYear) => {
    qs.getSecondaryMemberDateOfBirthInput().type('11/05/' + mnYear+'{enter}')
  });
  qs.getSecondaryMemberName().click();
  cy.minusYear(20).then((mnYear) => {
    qs.getSecondaryMemberDeceasedDate().type('11/05/' + mnYear+'{enter}')
  });
  qs.getSecondaryMemberName().click();
  qs.getNextButton().click();

  //step 4
  qs.getSecondaryMemberBenefit().type("2500");
  qs.getNextButton().click();

  //step 5
  qs.getNonCoveredPension().clear();
  qs.getNonCoveredPension().type("11000");
  cy.verifyValidationMessage('Pension must be less than $10,000.00')
  qs.getCancelButton().click();
}

function step6ControlStartRecevie(qs) {
  const currentYear = new Date().getFullYear();

  cy.log("When does your client expect to start receiving Social Security income?)");
  cy.log("When does your client expect to start receiving Social Security income?");
  cy.log("Control step 6 for all martial status.");

  //When does your client expect to start receiving Social Security income
  qs.getASSCButton().click();
  cy.generateRandomString(5).then((randomString) => {
    qs.getNameInput().type(randomString + ' Name');
  });
  qs.getPrimaryInput().type("Name 1");

  cy.minusYear(50).then((mnYear) => {
    qs.getDateOfBirthInput().type('11/05/' + mnYear+'{enter}')
  });
  qs.getNameInput().click();
  qs.selectDropdownList("What is your client's marital status?", "Married");

  qs.getNextButton().click();

  //step2
  qs.getPrimaryMemberBenefit().type("2000");
  qs.getNextButton().click();


  //step3
  qs.getSecondaryMemberName().type("Name 2");
  cy.minusYear(50).then((mnYear) => {
    qs.getSecondaryMemberDateOfBirthInput().type('11/05/' + mnYear+'{enter}')
  });
  qs.getSecondaryMemberName().click();
  qs.getNextButton().click();

  //step 4
  qs.getSecondaryMemberBenefit().type("2500");
  qs.getNextButton().click();

  //step 5
  qs.getNonCoveredPension().clear();
  qs.getNonCoveredPension().type("0");
  qs.getNonCoveredPensionSecondary().clear();
  qs.getNonCoveredPensionSecondary().type("0");
  qs.getNextButton().click();

  //step 6
  qs.getSSCH1().contains("When does your client expect to start receiving Social Security income?").should('exist');
  qs.getNextButton().should('exist');
  qs.getPreviousButton().should('exist');
  qs.getCancelButton().should('exist');
  qs.selectDropdownList("Name 1's expected retirement age", "62 years");
  qs.getSSCElement().contains('b', "Name 1's expected retirement age").should('have.text', "Name 1's expected retirement age");
  qs.getSSCElement().contains('b', "Name 2's expected retirement age").should('have.text', "Name 2's expected retirement age");
  cy.clickNTimes("Previous", 5);

  //Divorced
  qs.selectDropdownList("What is your client's marital status?", "Divorced");
  cy.clickNTimes("Next", 5);
  qs.getSSCElement().contains('b', "Name 1's expected retirement age").should('have.text', "Name 1's expected retirement age");
  qs.getSSCElement().contains('b', "Name 2's expected retirement age").should('not.exist');
  cy.clickNTimes("Previous", 5);

  //Widowed
  qs.selectDropdownList("What is your client's marital status?", "Widowed");
  cy.clickNTimes("Next", 2);
  qs.getSecondaryMemberName().type("Name 2");
  cy.minusYear(50).then((mnYear) => {
    qs.getSecondaryMemberDateOfBirthInput().type('11/05/' + mnYear+'{enter}')
  });
  qs.getSecondaryMemberName().click();
  cy.minusYear(20).then((mnYear) => {
    qs.getSecondaryMemberDeceasedDate().type('11/05/' + mnYear+'{enter}')
  });
  qs.getSecondaryMemberName().click();
  cy.clickNTimes("Next", 3);
  qs.getSSCElement().contains('b', "Name 1's expected retirement age").should('have.text', "Name 1's expected retirement age");
  cy.clickNTimes("Previous", 5);

  //Single
  qs.selectDropdownList("What is your client's marital status?", "Single");
  cy.clickNTimes("Next", 3);
  qs.getSSCElement().contains('b', "Name 1's expected retirement age").should('have.text', "Name 1's expected retirement age");
  qs.getCancelButton().click();
}

function step7ControlLifeExpSingle(qs){

  cy.log("Life Expectancy)");
  cy.log("Control step 6, Life Expectancy for all martial status.");


  //step 1
  qs.getASSCButton().click();
  cy.generateRandomString(5).then((randomString) => {
    qs.getNameInput().type(randomString + ' Name');
  });
  qs.getPrimaryInput().type("Name 1");

  cy.minusYear(50).then((mnYear) => {
    qs.getDateOfBirthInput().type('11/05/' + mnYear+'{enter}')
  });
  qs.getNameInput().click();
  qs.selectDropdownList("What is your client's marital status?", "Married");

  qs.getNextButton().click();

  //step2
  qs.getPrimaryMemberBenefit().type("2000");
  qs.getNextButton().click();


  //step3
  qs.getSecondaryMemberName().type("Name 2");
  cy.minusYear(50).then((mnYear) => {
    qs.getSecondaryMemberDateOfBirthInput().type('11/05/' + mnYear+'{enter}')
  });
  qs.getSecondaryMemberName().click();
  qs.getNextButton().click();

  //step 4
  qs.getSecondaryMemberBenefit().type("2500");
  qs.getNextButton().click();

  //step 5
  qs.getNonCoveredPension().clear();
  qs.getNonCoveredPension().type("0");
  qs.getNonCoveredPensionSecondary().clear();
  qs.getNonCoveredPensionSecondary().type("0");
  qs.getNextButton().click();

  //step 6
  qs.getNextButton().click();

  //step 7
  qs.getSSCH1().contains("Life Expectancy").should('exist');
  qs.getNextButton().should('exist');
  qs.getPreviousButton().should('exist');
  qs.getCancelButton().should('exist');
  qs.getSSCElement().contains('b', "Name 1's life expectancy").should('have.text', "Name 1's life expectancy");
  qs.getSSCElement().contains('b', "Name 2's life expectancy").should('have.text', "Name 2's life expectancy");
  cy.clickNTimes("Previous", 6);

  //Divorced
  qs.selectDropdownList("What is your client's marital status?", "Divorced");
  cy.clickNTimes("Next", 6);
  qs.getSSCElement().contains('b', "Name 1's life expectancy").should('have.text', "Name 1's life expectancy");
  qs.getSSCElement().contains('b', "Name 2's life expectancy").should('have.text', "Name 2's life expectancy");
  cy.clickNTimes("Previous", 6);

  //Widowed
  qs.selectDropdownList("What is your client's marital status?", "Widowed");
  cy.clickNTimes("Next", 2);
  qs.getSecondaryMemberName().type("Name 2");
  qs.getSecondaryMemberDateOfBirthInput().clear();
  cy.minusYear(50).then((mnYear) => {
    qs.getSecondaryMemberDateOfBirthInput().type('11/05/' + mnYear+'{enter}')
  });
  qs.getSecondaryMemberName().click();
  qs.getSecondaryMemberDeceasedDate().clear();
  cy.minusYear(20).then((mnYear) => {
    qs.getSecondaryMemberDeceasedDate().type('11/05/' + mnYear+'{enter}')
  });
  qs.getSecondaryMemberName().click();
  cy.clickNTimes("Next", 4);
  qs.getSSCElement().contains('b', "Name 1's life expectancy").should('have.text', "Name 1's life expectancy");
  cy.clickNTimes("Previous", 6);

  //Single
  qs.selectDropdownList("What is your client's marital status?", "Single");
  cy.clickNTimes("Next", 4);
  qs.getSSCElement().contains('b', "Name 1's life expectancy").should('have.text', "Name 1's life expectancy");
  qs.getCancelButton().click();
  
}