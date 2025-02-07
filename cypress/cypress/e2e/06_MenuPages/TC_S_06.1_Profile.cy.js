import { faker } from "@faker-js/faker";
import Login from "../../pages/LoginPage";
import Settings from "../../pages/Settings";
import { getLastUserPassword } from "../../support/utils";
const moment = require("moment");

context("Create a new annual subscribed user and change his/her password. Check password field functionalities", () => {
  const todayDate = moment();
  const todayDateString = todayDate.format("l");
  const nextYearDate = todayDate.add(1, "years");
  const nextYearDateString = nextYearDate.format("l");
  const nextYearDateFormatLL = nextYearDate.format("LL");

  describe("Create new user with annual subscription for Social Security application", function () {
    this.beforeEach(function () {
      cy.visit(Cypress.env("frontendUrl"));
    });
    var firstName = faker.person.firstName();
    var lastName = faker.person.lastName();

    var address_line_1 = faker.location.streetAddress();
    var email = faker.internet
      .email({ firstName: firstName, lastName: lastName })
      .toLowerCase();
    var company = faker.company.name();
    var phone = faker.phone.number("501-###-###");
    var address_line_2 = faker.location.secondaryAddress();
    var city = faker.location.city();
    var state = faker.location.state();
    var zipCode = faker.location.zipCode();
    let generatedPassword;

    var password = "Mark2009?";


    it("Create a new user to change password", () => {
      cy.get("a[autoid='Register']").click();

      //Fill the register form
      cy.get("#firstName").type(firstName);
      cy.get("#lastName").type(lastName);
      cy.get("#company_name").type(company);
      cy.get("#phoneNumber").type(phone);
      cy.get("#email").type(email);
      cy.generatePassword(16).then((passwordObject) => {
        generatedPassword = passwordObject;
        cy.get("#password").type(passwordObject);
        cy.get("#password-confirm").type(passwordObject);
      });

      cy.get("#address_line_1").type(address_line_1);
      cy.get("#address_line_2").type(address_line_2);
      cy.get("#city").type(city);
      cy.get("#state").type(state);
      cy.get("#postal_code").type(zipCode);

      cy.get("#submit").click();
      //remember address
      cy.wait(500);
      cy.get("#btnAnnualSSAPurchase").click();
      cy.get("div > .checkbox > i").click();
      cy.get("#name").type(firstName);
      cy.iframe('input[name="cardnumber"]').type("4242424242424242");
      cy.iframe('input[name="exp-date"]').type("0428");
      cy.iframe('input[name="cvc"]').type("242");
      //Accept
      cy.get("fieldset > .checkbox > i").click();
      cy.get('button[type="submit"]').should("have.text", "Continue").click();
      cy.get('button[type="submit"]')
        .should("have.text", "Complete Purchase")
        .click();
      cy.get(".very > h2").should("have.text", "Purchase Complete");
      cy.get("header > .ui").should("have.text", "Get Started").click();
      cy.fixture("profile").then((data) => {
        cy.get("#code").type(data.verificationCode);
      });
      cy.get(".primary").should("have.text", "Activate").click();
      cy.get(".content > span").should("have.text", "Social Security+™");

      cy.fixture("users.json").then((users) => {
        const newUser = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: generatedPassword,
          company: company,
          address_line_1: address_line_1,
          address_line_2: address_line_2,
          phone: phone,
          city: city,
          state: state,
          zipCode: zipCode,
        };

        // Fixture'a yeni kullanıcıyı ekleyin
        users.users.push(newUser);
        cy.writeFile("cypress/fixtures/users.json", users);
        cy.wait(2000);
      });
    });

    it("Check profile page, Details and Payment page", () => {
      const lg = new Login();
      const st = new Settings();

      lg.lastEmailLogin();
      cy.document().should("have.property", "charset").and("eq", "UTF-8");

      st.clickUserEmailonMainPage()
      cy.contains("Profile").click();
      cy.url().should(
        "eq",
        Cypress.env('frontendUrl') + "/profile"
      );
      cy.verifyH2Text("Profile");
      cy.verifyH2Text("User");
      cy.verifyTextPresent("Email Address");
      cy.getLastEmail().then((lastEmail) => {
        cy.get(":nth-child(1) > .nine").should("have.text", lastEmail);
      });
      cy.get(".nine > .ui", { log: "Change Password button" }).should(
        "have.text",
        "Change Password"
      );
      cy.verifyTextPresent("Password");
      cy.verifyTextPresent("Two Factor Enabled");
      cy.get('.react-toggle-track').compareSnapshot(
        {
          name: "TwoFactorButtonOFF",
          testThreshold: 0.05,
          recurseOptions: { limit: 3, delay: 500 }
        }
      )
      cy.verifyH2Text("Subscription");
      cy.verifyTextPresent("Plan Information");
      cy.verifyTextPresent("SS+");
      cy.verifyTextPresent("Active");
      cy.verifyTextPresent("Owner");
      cy.get(".basic > :nth-child(2)").should(
        "have.text",
        "Period: " + todayDateString + " - " + nextYearDateString
      );
      cy.get("#btnDetailsOnProfile")
        .as("detailsButton")
        .should("have.text", "Details");
      cy.verifyTextPresent("Billing Information");
      cy.get("#btnUpdateOnProfile")
        .as("cardUpdateButton")
        .should("have.text", "Update");
      cy.verifyTextPresent("Visa ending in 4242");

      st.clickChangePasswordButton()
      cy.url().should(
        "eq",
          Cypress.env('frontendUrl') + "/changePassword"
      );
      cy.verifyH2Text("Change Password");
      cy.verifyTextPresent("Current Password");
      cy.verifyTextPresent("New Password");
      cy.verifyTextPresent("Confirm New Password");
      st.clickSubmitButton();
      cy.verifyValidationMessage("Current Password is required");
      cy.verifyValidationMessage("New Password is required");
      cy.verifyValidationMessage("Confirm New Password is required");

      cy.log("CurrentPassword Not Match");
      cy.get("#currentPassword")
        .as("currentPassw")
        .should("have.attr", "type", "password")
        .type("123");
      cy.get("#newPassword")
        .as("NewPassw")
        .should("have.attr", "type", "password")
        .type("Mark2009**");
      cy.get("#confirmNewPassword")
        .as("confirmPassw")
        .should("have.attr", "type", "password")
        .type("Mark2009**");
      st.clickSubmitButton();
      cy.get(".error > .content > .header").should("have.text", "Error");
      cy.get(".error > .content > p")
        .as("ErrorMessage")
        .should(
          "have.text",
          "The password you entered does not match your current password"
        );

      cy.log("NewPassword Rule");
      cy.get("@currentPassw").type(password);
      cy.get("@NewPassw").clear();
      cy.verifyValidationMessage("New Password is required");
      cy.get("@NewPassw").type("123");
      cy.verifyValidationMessage(
        "New Password should be between 8-64 characters and contain 3 out of 4 of the following: a digit (0-9), a lower case letter (a-z), an upper case letter (A-Z), or a special character."
      );
      cy.verifyValidationMessage(
        "New Password must match Confirm New Password"
      );
      st.clickSubmitButton();
      cy.log("7 Character with one capitalize char and 3 numbers");
      cy.get("@NewPassw").clear().type("Mar*200");
      cy.verifyValidationMessage(
        "New Password should be between 8-64 characters and contain 3 out of 4 of the following: a digit (0-9), a lower case letter (a-z), an upper case letter (A-Z), or a special character."
      );

      
      cy.log('No upper case letter with 9 digits')
      cy.get('@NewPassw').clear().type('mark2009*')
      cy.verifyTextNotPresent('New Password should be between 8-64 characters and contain 3 out of 4 of the following: a digit (0-9), a lower case letter (a-z), an upper case letter (A-Z), or a special character.')
      cy.log('No Number with 9 digits')
      cy.get('@NewPassw').clear().type('MarkMark*')
      cy.verifyTextNotPresent('New Password should be between 8-64 characters and contain 3 out of 4 of the following: a digit (0-9), a lower case letter (a-z), an upper case letter (A-Z), or a special character.')


      cy.log('NewPassword suits password rule but not with comply confim password')
      getLastUserPassword().then((lastPassword) => {
        cy.get("@currentPassw").clear().type(lastPassword);
      })
      cy.get('@NewPassw').clear().type('Mark2009**')
      cy.verifyTextNotPresent('New Password should be between 8-64 characters and contain 3 out of 4 of the following: a digit (0-9), a lower case letter (a-z), an upper case letter (A-Z), or a special character.')
      cy.get('@confirmPassw').clear().type('123')
      cy.verifyValidationMessage('New Password must match Confirm New Password')
      cy.get('@confirmPassw').clear()
      cy.verifyValidationMessage('Confirm New Password is required')

      cy.log('New Password is common used password')
      cy.get('@NewPassw').clear().type('Mark2009')
      cy.get('@confirmPassw').clear().type('Mark2009')
      st.clickSubmitButton()
      cy.verifyTextPresent('Password cannot be used because it belongs to a list of commonly used passwords.')


      

      cy.generatePassword(16).then((passwordObject) => {
        cy.get("@NewPassw").clear().type(passwordObject);
        cy.get("@confirmPassw").clear().type(passwordObject);
        st.clickSubmitButton();

        cy.url().should(
          "eq",
            Cypress.env('frontendUrl') + "/socialSecurityCases"
        );
        cy.verifyServerMessage("Password changed");

        cy.log('Logout with new password')
        st.clickUserEmailonMainPage()
        cy.contains("Logout").click();

        cy.log('Login with new password')
        cy.getLastEmail().then((lastEmail) => {
          cy.get("#username").type(lastEmail);
        });

        cy.get('#password').type(passwordObject)
        cy.get('#kc-login').contains('Sign in').click()
        cy.wait(4500)
        cy.url().should(
          "eq",
            Cypress.env('frontendUrl') + "/socialSecurityCases"
        );
        st.clickUserEmailonMainPage()
        cy.contains("Profile").click();
        st.clickChangePasswordButton()
        cy.get("@currentPassw").clear().type(passwordObject);
        getLastUserPassword().then((lastPassword) => {
          cy.get("@NewPassw").clear().type(lastPassword);
          cy.get("@confirmPassw").clear().type(lastPassword);
        });
      });

      st.clickSubmitButton();
      cy.verifyServerMessage("Password changed");
    })
  })

  describe("Create new user with annual subscription for Social Security application", function () {
    const lg = new Login();
    const st = new Settings();

    this.beforeEach(function () {
      cy.visit(Cypress.env("frontendUrl"));
      lg.lastEmailLogin();
      cy.document().should("have.property", "charset").and("eq", "UTF-8");

      st.clickUserEmailonMainPage()
      cy.contains("Profile").click();
      cy.url().should(
        "eq",
          Cypress.env('frontendUrl') + "/profile"
      );
    })

    it('Subscription Detail page, Coupon field verification.', () => {

      cy.get("#btnDetailsOnProfile")
        .should("have.text", "Details").click();
      cy.url().should('contain',
          Cypress.env('frontendUrl') + "/subscription/"
      );
      cy.verifyH2Text("Details");
      cy.verifyTextPresent("Subscription");
      cy.verifyTextPresent("Plan Information");
      cy.verifyTextPresent("Name");
      cy.verifyTextPresent("SS+");
      cy.verifyTextPresent("Cost");
      cy.verifyTextPresent("$350.00 / Year");
      cy.verifyTextPresent("Status");
      cy.verifyTextPresent("Active");
      cy.verifyTextPresent("Next Billing On:");
      cy.verifyTextPresent(nextYearDateFormatLL);
      cy.verifyTextPresent("Next Billing Amount:");
      cy.verifyTextPresent("$350.00");
      //Coupon Code Verification and apply

      cy.verifyTextPresent("Have a Promotional Code?");
      cy.get('#code').as('code').should('have.attr', 'placeholder', 'Coupon Code').and('not.have.value').click()
      st.clickApplyCode()
      cy.verifyValidationMessage('Coupon Code is required')
      cy.get('@code').type('WrongCode')
      st.clickApplyCode()
      cy.verifyValidationMessage('This Coupon Code is not valid.')
      cy.get('@code').clear().type('LIFEYIELD_50')
      st.clickApplyCode()
      //cy.verifyServerMessage('Coupon applied')
      cy.get(':nth-child(3) > .very > tbody > tr > :nth-child(2) > :nth-child(1)').should('have.text', 'lifeyield_50')
      cy.get('tr > :nth-child(2) > :nth-child(2)').should('have.text', '(50% off forever)')
      cy.verifyTextPresent("Scheduled Changes")
      cy.get('.red').compareSnapshot({
        name: "ScheduledChanges",
        testThreshold: 0.02,
        recurseOptions: { limit: 3, delay: 500 },
      });
      cy.get('.red').should('have.attr', 'title', 'There are subscription changes scheduled on next renewal. Upon renewal the subscription will be changed as below.')
      cy.verifyTextPresent("$175.00")
      cy.get('@code').clear().type('LIFEYIELD_75')
      st.clickApplyCode()
      cy.get('tr > :nth-child(2) > :nth-child(2)').should('have.text', '(75% off forever)')
      cy.verifyTextPresent("$87.50")
    })

    it('Card Update page tests', () => {
      cy.get("#btnUpdateOnProfile")
        .as("cardUpdateButton")
        .should("have.text", "Update").click();
      cy.url().should(
        "eq",
        Cypress.env("frontendUrl") + "/billing"
      );
      cy.verifyTextPresent("Update Credit Card Information");
      cy.get(".credit").compareSnapshot({
        name: "CreditIconInPaymentUpdate",
        testThreshold: 0.01,
        recurseOptions: { limit: 3, delay: 500 },
      });
      cy.get('#imgSecureLock').compareSnapshot({
        name: "SecureLock",
        testThreshold: 0.01,
        recurseOptions: { limit: 3, delay: 500 },
      });
      cy.get("#name").should("not.have.value");
      cy.iframe('input[name="cardnumber"]').should("not.have.value");
      cy.iframe('input[name="exp-date"]').should("not.have.value");
      cy.iframe('input[name="cvc"]').should("not.have.value");

      cy.verifyTextPresent('This is a secure site. All your information is transmitted via SSL with 128-bit encryption.')
      cy.get('#divTextBillingPrivacyInfoOnCheckout').contains('LifeYield respects and protects your privacy. The financial information you provided will be used only to process your order and will not be shared with outside companies for their promotional use.')
      cy.get('#divTextBillingPrivacyInfoOnCheckout > a').should('have.text', 'Click here')
      cy.get('#divTextBillingPrivacyInfoOnCheckout').contains(' to review our full privacy statement.')

      cy.log('Check validations when form is not filled')
      cy.get('.stackable > :nth-child(4) > .ui').as('UpdatePay')
        .should('have.attr', 'type', 'submit')
        .click()

      cy.verifyValidationMessage('Address Line 1 is required')
      cy.verifyValidationMessage('City is required')
      cy.verifyValidationMessage('State/Province is required')
      cy.verifyValidationMessage('Zip Code is required')
      cy.verifyValidationMessage('The Cardholder\'s Name is required')

      cy.log('Check saved Billing Address fills the form when checked the box')
      cy.get('.checkbox').as('addressCheckBox').should('have.text', 'My billing information is the same as my advisor information').click()
      cy.readFile('cypress/fixtures/users.json').then((users) => {
        const lastUser = users.users[users.users.length - 1]
        cy.get('#addressLine1').should('have.value', lastUser.address_line_1)
        cy.get('#addressLine2').should('have.value', lastUser.address_line_2)
        cy.get('#city').should('have.value', lastUser.city)
        cy.get('#state').should('have.value', lastUser.state)
        cy.get('#zip').should('have.value', lastUser.zipCode)
        cy.get('#country').should('have.value', 'United States')

        cy.get("#name").type(lastUser.firstName + ' ' + lastUser.lastName)
      })

      cy.log('Card Number Validations - Invalid Card Number')
      cy.get('@UpdatePay').click()
      cy.verifyValidationMessage('Your card number is incomplete')
      cy.iframe('input[name="cardnumber"]').type('1111111111111111')
      cy.iframe('input[name="cardnumber"]').should('have.attr', 'aria-invalid', 'true')
      cy.verifyValidationMessage('Your card number is incomplete')

      cy.log('Card Number Validations - Invalid Expire Date is empty')
      cy.iframe('input[name="cardnumber"]').clear().type('4242424242424242')
      cy.get('@UpdatePay').click()
      cy.verifyValidationMessage('Your card’s expiration date is incomplete')

      cy.log('Card Number Validations - Invalid Expire Date')
      cy.iframe('input[name="exp-date"]').type('04/24')
      cy.get('@UpdatePay').click()
      cy.iframe('input[name="exp-date"]').should('have.attr', 'aria-invalid', 'true')
      cy.verifyValidationMessage('Your card’s expiration year is in the past')

      cy.log('Card Number Validations - CVC is empty')
      cy.iframe('input[name="exp-date"]').clear().type('04/29')
      cy.get('@UpdatePay').click()
      cy.verifyValidationMessage('Your card’s security code is incomplete')

      cy.log('Card Number Validations - CVC is not complete')
      cy.iframe('input[name="cvc"]').type('24')
      cy.get('@UpdatePay').click()
      cy.verifyValidationMessage('Your card’s security code is incomplete')
      cy.iframe('input[name="cvc"]').clear().type('242')

      cy.log('Change billing address and card info successfully and test billing address not changes settings info')
      cy.get('#addressLine1').clear().type('Test address line 1')
      cy.get('#addressLine2').clear().type('Test address line 2')
      cy.get('#city').clear().type('Test long city addres name')
      cy.get('#state').clear().type('Test long state')
      cy.get('#zip').clear().type('00000')
      cy.get('@UpdatePay').click()
      cy.verifyServerMessage('Payment updated')

      cy.log('Check Advisor Info not changed')
      cy.get('.title > .item').should('have.text','Settings').click()
      cy.readFile('cypress/fixtures/users.json').then((users) => {
        const lastUser = users.users[users.users.length - 1]
        cy.get('#addressLine1').should('have.value', lastUser.address_line_1)
        cy.get('#addressLine2').should('have.value', lastUser.address_line_2)
        cy.get('#city').should('have.value', lastUser.city)
        cy.get('#state').should('have.value', lastUser.state)
        cy.get('#zipCode').should('have.value', lastUser.zipCode)
        cy.get('#country').should('have.value', 'United States')
      })

      cy.log('Form and Card Info fields should be come empty in Billing page')
      st.clickUserEmailonMainPage()
      cy.contains("Profile").click();
      cy.get('@cardUpdateButton').click()
      cy.get('@addressCheckBox').click()
      cy.readFile('cypress/fixtures/users.json').then((users) => {
        const lastUser = users.users[users.users.length - 1]
        cy.get('#addressLine1').should('have.value', lastUser.address_line_1)
        cy.get('#addressLine2').should('have.value', lastUser.address_line_2)
        cy.get('#city').should('have.value', lastUser.city)
        cy.get('#state').should('have.value', lastUser.state)
        cy.get('#zip').should('have.value', lastUser.zipCode)
        cy.get('#country').should('have.value', 'United States')
      })

      cy.get("#name").should("not.have.value");
      cy.iframe('input[name="cardnumber"]').should("not.have.value");
      cy.iframe('input[name="exp-date"]').should("not.have.value");
      cy.iframe('input[name="cvc"]').should("not.have.value");
    })
  })
}
)
