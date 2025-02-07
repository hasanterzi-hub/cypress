
import { faker } from '@faker-js/faker';
import Registration from '../../pages/Registration';

context('Create a new annual subscribed user', () => {

    describe('This test creates a new user for other tests and checks all registration pages.', function () {
        this.beforeEach(function () {
            cy.visit(Cypress.env('frontendUrl'))

        })
        var firstName = faker.person.firstName()
        var lastName = faker.person.lastName()
        let generatedPassword;
        var address_line_1 = faker.location.streetAddress()
        var email = faker.internet.email({ firstName: firstName, lastName: lastName, provider: 'lifeyield.com' }).toLowerCase();
        var company = faker.company.name();
        var phone = faker.phone.number('501-###-###');
        var address_line_2 = faker.location.secondaryAddress();
        var city = faker.location.city();
        var state = faker.location.state();
        var zipCode = faker.location.zipCode();
        var password = "Mark2009?";

        it('1 - Create a new user LY.TC.SSA.CL.02 -', () => {
            cy.get("a[autoid='Register']").click()


            cy.get('#firstName').type(firstName)
            cy.get('#lastName').type(lastName)
            cy.get('#company_name').type(company)
            cy.get('#phoneNumber').type(phone)
            cy.get('#email').type(email)
            cy.generatePassword(16).then((passwordObject) => {
                generatedPassword = passwordObject
                cy.get("#password").type(passwordObject);
                cy.get("#password-confirm").type(passwordObject);
               });
            cy.get('#address_line_1').type(address_line_1)
            cy.get('#address_line_2').type(address_line_2)
            cy.get('#city').type(city)
            cy.get('#state').type(state)
            cy.get('#postal_code').type(zipCode)

            cy.get('#submit').click()
            //remember address
            cy.wait(30000) // Increased delay to get first-time wakeup on architecture.
            cy.get('#btnAnnualSSAPurchase').click()
            cy.get('div > .checkbox > i').click()
            cy.get('#name').type(firstName)
            cy.iframe('input[name="cardnumber"]').type('4242424242424242')
            cy.iframe('input[name="exp-date"]').type('0428')
            cy.iframe('input[name="cvc"]').type('242')
            //Accept
            cy.get('fieldset > .checkbox > i').click()
            cy.get('button[type="submit"]')
                .should('have.text', 'Continue')
                .click()
            cy.get('button[type="submit"]')
                .should('have.text', 'Complete Purchase')
                .click()
            cy.wait(20000);
            cy.get('.very > h2').should('have.text', 'Purchase Complete')
            cy.get('header > .ui').should('have.text', 'Get Started').click()
            cy.fixture('profile').then((data) => {
                cy.get('#code').type(data.verificationCode)
            })
            cy.get('.primary').should('have.text', 'Activate').click()
            cy.get('.content > span').should('have.text', 'Social Security+™')

            cy.fixture('users.json').then((users) => {

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
                    zipCode: zipCode
                };

                // Fixture'a yeni kullanıcıyı ekleyin
                users.users.push(newUser);


                cy.writeFile('cypress/fixtures/users.json', users);
                cy.wait(2000);
            });

        })

        it('2 - Check form control', () => {
            const re = new Registration()
            var firstName = faker.person.firstName()
            var lastName = faker.person.lastName()
    
            var email = faker.internet.email({ firstName: firstName, lastName: lastName, provider: 'lifeyield.com' }).toLowerCase();
            cy.get("a[autoid='Register']").click()

            cy.log('LY.ANU.RI.01 - Verify that "New Customer?" link on the login page')
            re.verifyH2Header("Registration Information")

            cy.log('LY.ANU.RI.02 - Check the Registration Information form details')
            cy.xpath(re.formElements().textboxFirstName).should('be.visible');
            cy.xpath(re.formElements().textboxLastName).should('be.visible');
            cy.xpath(re.formElements().textboxCompanyName).should('be.visible');
            cy.xpath(re.formElements().textboxPhoneNumber).should('be.visible');
            cy.xpath(re.formElements().textboxEmailAddress).should('be.visible');
            cy.xpath(re.formElements().textboxPassword).should('be.visible');
            cy.xpath(re.formElements().textboxConfirmPassword).should('be.visible');
            cy.xpath(re.formElements().dropDownCountry).should('be.visible');
            cy.xpath(re.formElements().dropDownAffiliation).should('be.visible');
            cy.xpath(re.formElements().textboxTitle).should('be.visible');
            cy.xpath(re.formElements().textboxwebsiteUrl).should('be.visible');
            cy.xpath(re.formElements().textboxaddressLine1).should('be.visible');
            cy.xpath(re.formElements().textboxaddressLine2).should('be.visible');
            cy.xpath(re.formElements().textboxCity).should('be.visible');
            cy.xpath(re.formElements().textboxState).should('be.visible');
            cy.xpath(re.formElements().textboxPostCode).should('be.visible');


            cy.log("LY.ANU.RI.04 - Check when there aren't any information in Registration, form and user clicks the Plans button")
            cy.get('#submit').click();
            cy.xpath(re.formElements().textboxFirstName).should('have.attr', 'required');
            cy.xpath(re.formElements().textboxLastName).should('have.attr', 'required');
            cy.xpath(re.formElements().textboxCompanyName).should('have.attr', 'required');
            cy.xpath(re.formElements().textboxPhoneNumber).should('have.attr', 'required');
            cy.xpath(re.formElements().textboxEmailAddress).should('have.attr', 'required');
       
       
            cy.visit(Cypress.env('frontendUrl'))
            cy.get("a[autoid='Register']").click()

            cy.log("LY.ANU.RI.05 - Check when user doesn't fill at least one of the required fields in Registration form and clicks the Plans button")
            cy.xpath(re.formElements().textboxFirstName).type(firstName);
            cy.xpath(re.formElements().textboxCompanyName).type(company);
            cy.xpath(re.formElements().textboxPhoneNumber).type(phone);
            cy.xpath(re.formElements().textboxEmailAddress).type(email);
            cy.fixture('profile').then((data) => {
                cy.xpath(re.formElements().textboxPassword).type(data.password)
                cy.xpath(re.formElements().textboxConfirmPassword).type(data.password)
            })
            cy.get('#submit').click();

            //Verify?

            cy.visit(Cypress.env('frontendUrl'))
            cy.get("a[autoid='Register']").click()

            cy.log("LY.ANU.RI.06 - Check when user enter the same e-mail address on the e-mail address field")
            cy.xpath(re.formElements().textboxFirstName).type(firstName);
            cy.xpath(re.formElements().textboxLastName).type(lastName);
            cy.xpath(re.formElements().textboxCompanyName).type(company);
            cy.xpath(re.formElements().textboxPhoneNumber).type(phone);
            cy.getFirstEmail().then((firstEmail) => {
                cy.xpath(re.formElements().textboxEmailAddress).type(firstEmail);
            });

            cy.fixture('profile').then((data) => {
                cy.xpath(re.formElements().textboxPassword).type(data.password)
                cy.xpath(re.formElements().textboxConfirmPassword).type(data.password)
            })
            cy.get('#submit').click();
            re.verifyValidationMessageForm3("User already exists for given e-mail address.");

            cy.visit(Cypress.env('frontendUrl'))
            cy.get("a[autoid='Register']").click()

            cy.log("LY.ANU.RI.07 - Check when user enter the invalid e-mail address on the e-mail address field")
            cy.xpath(re.formElements().textboxFirstName).type(firstName);
            cy.xpath(re.formElements().textboxLastName).type(lastName);
            cy.xpath(re.formElements().textboxCompanyName).type(company);
            cy.xpath(re.formElements().textboxPhoneNumber).type(phone);
            cy.xpath(re.formElements().textboxEmailAddress).type("abc");

            cy.fixture('profile').then((data) => {
                cy.xpath(re.formElements().textboxPassword).type(data.password)
                cy.xpath(re.formElements().textboxConfirmPassword).type(data.password)
            })
            cy.get('#submit').click();
            //Verify?
            //re.verifyValidationMessageForm3("Please include an '@' in the email address.'abc' is missing an '@'.");


            cy.visit(Cypress.env('frontendUrl'))
            cy.get("a[autoid='Register']").click()

            cy.log("LY.ANU.RI.08 - Check when user enter a invalid password")
            cy.xpath(re.formElements().textboxFirstName).type(firstName);
            cy.xpath(re.formElements().textboxLastName).type(lastName);
            cy.xpath(re.formElements().textboxCompanyName).type(company);
            cy.xpath(re.formElements().textboxPhoneNumber).type(phone);
            cy.xpath(re.formElements().textboxEmailAddress).type(email);


            cy.xpath(re.formElements().textboxPassword).type("password")
            cy.xpath(re.formElements().textboxConfirmPassword).type("password")

            cy.get('#submit').click();
            re.verifyValidationMessageForm3("Password cannot be used because it belongs to a list of commonly used passwords.");

            cy.visit(Cypress.env('frontendUrl'))
            cy.get("a[autoid='Register']").click()

            cy.log("LY.ANU.RI.8.1 - Check when user enter a invalid password")
            cy.xpath(re.formElements().textboxFirstName).type(firstName);
            cy.xpath(re.formElements().textboxLastName).type(lastName);
            cy.xpath(re.formElements().textboxCompanyName).type(company);
            cy.xpath(re.formElements().textboxPhoneNumber).type(phone);
            cy.xpath(re.formElements().textboxEmailAddress).type(email);


            cy.xpath(re.formElements().textboxPassword).type("Mark2009")
            cy.xpath(re.formElements().textboxConfirmPassword).type("Mark2009")

            cy.get('#submit').click();
            re.verifyValidationMessageForm3("Password cannot be used because it belongs to a list of commonly used passwords.");

            cy.visit(Cypress.env('frontendUrl'))
            cy.get("a[autoid='Register']").click()

            cy.log("LY.ANU.RI.09 - Check when user enter different password on the password and confirm password field")
            cy.xpath(re.formElements().textboxFirstName).type(firstName);
            cy.xpath(re.formElements().textboxLastName).type(lastName);
            cy.xpath(re.formElements().textboxCompanyName).type(company);
            cy.xpath(re.formElements().textboxPhoneNumber).type(phone);
            cy.xpath(re.formElements().textboxEmailAddress).type(email);


            cy.xpath(re.formElements().textboxPassword).type("Mark2009")
            cy.xpath(re.formElements().textboxConfirmPassword).type("Mark2008")

            cy.get('#submit').click();
            re.verifyValidationMessageForm3("Password cannot be used because it belongs to a list of commonly used passwords.Password does not match Confirm password.");

            cy.visit(Cypress.env('frontendUrl'))
            cy.get("a[autoid='Register']").click()

            cy.log("LY.ANU.RI.10 - Verify that when user select an affiliate which can not registered with form, a pop-up and warning message showed up in a page.")
            cy.xpath(re.formElements().textboxFirstName).type(firstName);
            cy.xpath(re.formElements().textboxLastName).type(lastName);
            cy.xpath(re.formElements().textboxCompanyName).type(company);
            cy.xpath(re.formElements().textboxPhoneNumber).type(phone);
            cy.xpath(re.formElements().textboxEmailAddress).type(email);
            cy.xpath(re.formElements().textboxPassword).type(password)
            cy.xpath(re.formElements().textboxConfirmPassword).type(password)
            cy.xpath(re.formElements().dropDownAffiliation).select("Allianz Life");
            cy.wait(1000);
            cy.get('#submit').click();
            cy.get('.modal-dialog').should('exist');
            cy.get('.modal-title').should('have.text', 'Please confirm');
            cy.get('.modal-body').should('have.text', 'Are you sure you are affiliated with Allianz Life?');
            cy.get('.confirm').should('be.visible');
            cy.get('.cancel').should('be.visible');


            cy.log("LY.ANU.RI.11 - Verify that cancel button close the popup.")
            cy.get('.cancel').click();
            cy.get('.modal-dialog').should('not.exist');

            cy.log("LY.ANU.RI.12 - Verify that Affiliates registered by the LifeYield support team, which cannot be registered with the form, see the warning message after clicking the confirm button and can not go further.")
            cy.get('#submit').click();
            cy.get('.confirm').click();
            cy.wait(20000) // Increased timeout for first time architecture wakeup
            cy.get('.id').compareSnapshot(
                {
                  name: "subscriptionSetup",
                  testThreshold: 0.05,
                  recurseOptions: { limit: 3, delay: 500 }
                }
              )
        })

        it('3 - Check payment control', () => {
            const re = new Registration()
            var firstName = faker.person.firstName()
            var lastName = faker.person.lastName()
    
            var email = faker.internet.email({ firstName: firstName, lastName: lastName, provider: 'lifeyield.com' }).toLowerCase();
            cy.get("a[autoid='Register']").click()

            cy.log('LY.ANU.RI.01 - Verify that "New Customer?" link on the login page')
            re.verifyH2Header("Registration Information")

            cy.xpath(re.formElements().textboxFirstName).type(firstName);
            cy.xpath(re.formElements().textboxLastName).type(lastName);
            cy.xpath(re.formElements().textboxCompanyName).type(company);
            cy.xpath(re.formElements().textboxPhoneNumber).type(phone);
            cy.xpath(re.formElements().textboxEmailAddress).type(email);


            cy.xpath(re.formElements().textboxPassword).type("Mark2009?")
            cy.xpath(re.formElements().textboxConfirmPassword).type("Mark2009?")
            cy.xpath(re.formElements().dropDownAffiliation).select("None");
            cy.get('#submit').click();

            cy.log("LY.ANU.PP.01 -Check the line which shows shopping process when user on the Plan Options page.")

            cy.log("LY.ANU.PP.02 -Check when the user registers as a new customer and clicks the Continue button the registration form")
            cy.verifyTextPresent('Compare our plans')

            cy.log("LY.ANU.PP.04 - Check the Promotional Code section in the Plans page")
            cy.verifyTextPresent('Have a Promotional Code?')
            cy.xpath("//button[text()='Apply Coupon']").should('exist');

            cy.log("LY.ANU.PP.05 - Check the Contact information section in the Plans page")
            cy.verifyTextPresent('GET IN TOUCH')
            cy.verifyTextPresent('info@lifeyield.com')

            cy.log("LY.ANU.PP.07 - Verify that when user use an invalid coupon, there should not discount on order summary items.")
            cy.xpath("//input[@placeholder='Coupon Code']").type("invalid code")
            cy.xpath("//button[text()='Apply Coupon']").click()
            cy.verifyValidationMessage("This Coupon Code is not valid.")

            cy.log("LY.ANU.PP.08 - Check when the user navigates to the Pricing page")
            cy.verifyTextPresent('Monthly')
            cy.verifyTextPresent('Annual')
            cy.verifyTextPresent('MOST POPULAR')
            cy.get(':nth-child(1) > .planContainerBox > .priceLine > .priceLabel').should('exist');
            cy.get(':nth-child(3) > .planContainerBox > .priceLine > .priceLabel').should('exist');
            cy.verifyTextPresent('The plan for advisors who want the basics. Includes unlimited cases and reports, but no support or marketing resources other than the self-serve knowledge base.')
            cy.verifyTextPresent('The plan for advisors who want more. Includes white-glove support, the Income Layers add-on, a promotional video, website widgets, unlimited cases and unlimited reports.')
            cy.verifyTextPresent('Compare our plans')
            cy.xpath("//table[@id='tblPlanFeatures']").should('exist');

            cy.log("LY.ANU.PP.09 - Check the price offered for the monthly SS+ subscription")
            cy.get(':nth-child(1) > .planContainerBox > .priceLine > .priceLabel').should('have.text', '$35');

            cy.log("LY.ANU.PP.10 - Check the price offered for the Annual SS+ subscription")
            cy.get(':nth-child(3) > .planContainerBox > .priceLine > .priceLabel').should('have.text', '$350');

            cy.log("LY.SSP.S.P.S.02 - For Social Security+ , check the Plans page upon new user registration")
            cy.verifyTextPresent('The plan for advisors who want the basics. Includes unlimited cases and reports, but no support or marketing resources other than the self-serve knowledge base.')
            cy.verifyTextPresent('The plan for advisors who want more. Includes white-glove support, the Income Layers add-on, a promotional video, website widgets, unlimited cases and unlimited reports.')
            cy.xpath("//*[@id='btnMonthlySSAPurchase']").should('exist');
            cy.xpath("//*[@id='btnAnnualSSAPurchase' and contains(.,'BUY NOW')]").should('exist');

            cy.log("LY.SSP.S.P.S.03 - Check the Comparison table displayed in the Plans page")
            cy.verifyTextPresent("Social Security Optimizer");
            cy.verifyTextPresent("Income Layers");
            cy.verifyTextPresent("White-Glove Support");
            cy.verifyTextPresent("Promotional Video Use");
            cy.verifyTextPresent("Website Lead Gen Widget");
            cy.verifyTextPresent("Social Security Filing Checklist");
            cy.verifyTextPresent("~20% Annual Savings");
            cy.verifyTextPresent("Unlimited Social Security Cases");
            cy.verifyTextPresent("Unlimited Reports");

            cy.log("LY.SSP.S.P.S.05 - Check when the user enters  a valid promotional code and clicks the Apply Coupon")

            cy.xpath("//input[@placeholder='Coupon Code']").clear()
            cy.xpath("//input[@placeholder='Coupon Code']").type("LIFEYIELD_50")
            cy.xpath("//button[text()='Apply Coupon']").click()
            cy.get(':nth-child(1) > .planContainerBox > .discountPriceLineSpacing > div > .priceLabel').should('have.text', '$18');
            cy.get(':nth-child(3) > .planContainerBox > .discountPriceLineSpacing > div > .priceLabel').should('have.text', '$175');


        })

        it('4 - Check plan control', () => {
            const re = new Registration()
            var firstName = faker.person.firstName()
            var lastName = faker.person.lastName()
    
            var email = faker.internet.email({ firstName: firstName, lastName: lastName, provider: 'lifeyield.com' }).toLowerCase();
            cy.get("a[autoid='Register']").click()


            re.verifyH2Header("Registration Information")

            cy.xpath(re.formElements().textboxFirstName).type(firstName);
            cy.xpath(re.formElements().textboxLastName).type(lastName);
            cy.xpath(re.formElements().textboxCompanyName).type(company);
            cy.xpath(re.formElements().textboxPhoneNumber).type(phone);
            cy.xpath(re.formElements().textboxEmailAddress).type(email);


            cy.xpath(re.formElements().textboxPassword).type("Mark2009?")
            cy.xpath(re.formElements().textboxConfirmPassword).type("Mark2009?")
            cy.xpath(re.formElements().dropDownAffiliation).select("None");
            cy.get('#submit').click();
            cy.xpath("//*[@id='btnMonthlySSAPurchase']").click()


            cy.log('LY.ANU.PI.04');
            cy.log('Check the Terms of Use link');//TO DO

            cy.log('LY.ANU.PI.02 - Check the line which shows shopping process when user on the Payment Information page.')
            cy.verifyTextPresent("PAYMENT INFORMATION");

            cy.log('LY.ANU.PI.01 - Check the Payment Information page when the user clicks the Buy Now button')
            cy.verifyTextPresent("My billing information is the same as my advisor information");
            cy.xpath("//p[text()='Payment Information']").should('exist');
            cy.xpath("//p[text()='Billing Address']").should('exist');
            cy.xpath("//*[@placeholder='Address Line 1']").should('exist');
            cy.xpath("//*[@placeholder='City']").should('exist');
            cy.xpath("//*[@placeholder='State / Province']").should('exist');
            cy.xpath("//*[@placeholder='Post code']").should('exist');
            cy.xpath("//select[@id='country']").should('exist');
            cy.xpath("//button[text()='Continue']").should('exist');
            cy.xpath("//button[text()='Back']").should('exist');
            cy.xpath("//*[@id='name']").should('exist');
            cy.get('.__PrivateStripeElement > iframe').should('exist');

            cy.log('LY.ANU.PI.03 - Verify if there is a privacy statement in Payment Information page')
            cy.verifyTextPresent("This is a secure site. All your information is transmitted via SSL with 128-bit encryption.");
            cy.get('#divTextBillingPrivacyInfoOnCheckout').should('contain', 'LifeYield respects and protects your privacy.');
            cy.get('#divTextBillingPrivacyInfoOnCheckout').should('contain', 'The financial information you provided will be used only to process your order and will not be shared with outside companies for their promotional use.');
            cy.get('#divTextBillingPrivacyInfoOnCheckout').find('a').should('have.attr', 'href', 'https://www.lifeyield.com/privacy-policy/');

            cy.log("LY.ANU.PI.06 - Check when there aren't any information in Payment Information and user clicks the Continue button ")
            cy.xpath("//button[text()='Continue']").click();
            cy.verifyValidationMessage("The Address Line 1 field is required");
            cy.verifyValidationMessage("The City field is required")
            cy.verifyValidationMessage("The State/Province field is required")
            cy.verifyValidationMessage("The Post Code field is required")
            cy.verifyValidationMessage("The Country field is required")
            cy.verifyValidationMessage("The Cardholder's Name field is required")

            cy.log("LY.ANU.PI.08 - Check If the user doesn't check the Terms of Use checkbox")
            cy.verifyValidationMessage("Must accept Terms of Use")
            cy.xpath("//fieldset/label[@class='checkbox']/i").click();
            cy.xpath("//span[@autoid='termsOfServiceValidation']").should('not.exist')

            cy.log("LY.ANU.PI.13 - Check the Back button")
            cy.xpath("//button[text()='Back']").click();
            cy.xpath("//*[@id='btnMonthlySSAPurchase']").should('exist');
            cy.xpath("//*[@id='btnMonthlySSAPurchase']").click();

            cy.log("LY.ANU.PI.07 - Check when user doesn't fill at least one of the required fields in Payment Information form and clicks the Continue button")
            cy.xpath("//*[@placeholder='Address Line 1']").type("Address test test");
            cy.xpath("//*[@placeholder='City']").type("New York");
            cy.xpath("//*[@placeholder='Post code']").type("05497");
            cy.xpath("//button[text()='Continue']").click();
            cy.verifyValidationMessage("The State/Province field is required")

            cy.xpath("//fieldset/label[@class='checkbox']/i").click();

            cy.xpath("//*[@placeholder='Address Line 1']").clear()
            cy.xpath("//*[@placeholder='City']").clear()
            cy.xpath("//*[@placeholder='Post code']").clear()
            cy.xpath("//*[@placeholder='Address Line 1']").type(address_line_1)
            cy.xpath("//*[@placeholder='Address Line 2']").type(address_line_2)
            cy.xpath("//*[@placeholder='City']").type(city)
            cy.xpath("//*[@placeholder='State / Province']").type(state)
            cy.xpath("//*[@placeholder='Post code']").type(zipCode)
            cy.xpath("//select[@id='country']").select("United States")

            cy.log("LY.ANU.PI.09 - Check Card Number's validation")
            cy.get('#name').type(firstName)
            cy.iframe('input[name="cardnumber"]').type('1234123412341234')
            cy.xpath("//button[text()='Continue']").click();
            cy.iframe('input[name="cardnumber"]').should('have.class', 'is-invalid');
            cy.verifyValidationMessage("Your card number is invalid.")

            cy.log("LY.ANU.PI.10 - Check if user entered card's expiration date.")
            cy.iframe('input[name="cardnumber"]').clear()
            cy.iframe('input[name="cardnumber"]').type('4242424242424242')
            cy.xpath("//button[text()='Continue']").click();
            cy.verifyValidationMessage("Your card’s expiration date is incomplete.")

            cy.log("LY.ANU.PI.11 - Check if user entered valid expiration date.")
            cy.iframe('input[name="exp-date"]').type('0320')
            cy.xpath("//button[text()='Continue']").click();
            cy.verifyValidationMessage("Your card’s expiration year is in the past.")

            cy.log("LY.ANU.PI.12 - Check if user entered security code")
            cy.iframe('input[name="exp-date"]').clear()
            cy.iframe('input[name="exp-date"]').type('0242')
            cy.iframe('input[name="cvc"]').type('242')
            cy.xpath("//button[text()='Continue']").click();
            cy.xpath("//*[text()='Complete Purchase']").should('exist');
        })

        it('5 - Check confirm control', () => {
            var firstName = faker.person.firstName()
            var lastName = faker.person.lastName()
    
            var email = faker.internet.email({ firstName: firstName, lastName: lastName, provider: 'lifeyield.com' }).toLowerCase();
            const re = new Registration()
            cy.get("a[autoid='Register']").click()
            cy.xpath(re.formElements().textboxFirstName).type(firstName);
            cy.xpath(re.formElements().textboxLastName).type(lastName);
            cy.xpath(re.formElements().textboxCompanyName).type(company);
            cy.xpath(re.formElements().textboxPhoneNumber).type(phone);
            cy.xpath(re.formElements().textboxEmailAddress).type(email);


            cy.xpath(re.formElements().textboxPassword).type("Mark2009?")
            cy.xpath(re.formElements().textboxConfirmPassword).type("Mark2009?")
            cy.xpath(re.formElements().dropDownAffiliation).select("None");
            cy.get('#submit').click();
            cy.xpath("//*[@id='btnMonthlySSAPurchase']").click()


            cy.xpath("//*[@placeholder='Address Line 1']").type(address_line_1)
            cy.xpath("//*[@placeholder='Address Line 2']").type(address_line_2)
            cy.xpath("//*[@placeholder='City']").type(city)
            cy.xpath("//*[@placeholder='State / Province']").type(state)
            cy.xpath("//*[@placeholder='Post code']").type(zipCode)
            cy.xpath("//select[@id='country']").select("United States")
            cy.xpath("//fieldset/label[@class='checkbox']/i").click();

            cy.get('#name').type(firstName)
            cy.iframe('input[name="cardnumber"]').type('4242424242424242')
            cy.iframe('input[name="exp-date"]').type('0242')
            cy.iframe('input[name="cvc"]').type('242')
            cy.xpath("//button[text()='Continue']").click();


            cy.log("LY.ANU.RF.01 - Check the line which shows shopping process when user on the Review and Finalize page.")
            cy.verifyTextPresent("PLAN OPTIONS");
            cy.verifyTextPresent("PAYMENT INFORMATION");
            cy.verifyTextPresent("REVIEW AND FINALIZE");
            cy.verifyTextPresent("COMPLETE");


            cy.log("LY.ANU.RF.10 - Check the Terms of Use and Privacy Policy link")
            cy.get('div[style="margin-top: 8px;"] a[href="https://www.lifeyield.com/privacy-policy/"]')
                .should('exist')
                .should('have.attr', 'target', '_blank')
                .should('have.attr', 'rel', 'noreferrer');

            cy.get('div[style="margin-top: 8px;"] a[href="https://www.lifeyield.com/terms-of-use/"]')
                .should('exist')
                .should('have.attr', 'target', '_blank')
                .should('have.attr', 'rel', 'noreferrer');

            cy.log("LY.ANU.RF.02 - Check the Review and Finalize page")
            cy.verifyTextPresent("Billing Information");
            cy.verifyTextPresent("Order Summary");
            cy.verifyTextPresent("Payment Information");
            cy.verifyTextPresent("By clicking on Complete Purchase you agree to our Privacy Policy and Terms of Use.");


            cy.log("LY.ANU.RF.03 - Check the Billing Information details")
            cy.get('.stackable > :nth-child(1) > :nth-child(1) > :nth-child(1)').within(() => {

                cy.contains('Address Line 1').next('td').should('contain', address_line_1);
                cy.contains('City').next('td').should('contain', city);
                cy.contains('State').next('td').should('contain', state);
                cy.contains('Postal code').next('td').should('contain', zipCode);
                cy.contains('Country').next('td').should('contain', 'United States');
            });

            cy.log("LY.ANU.RF.04 - Check the Payment Information details ")
            cy.get('.stackable > :nth-child(1) > :nth-child(1) > :nth-child(2)').within(() => {
                cy.contains("Cardholder's name").invoke('next', 'td').should('contain', firstName);
                cy.contains('Card number').invoke('next', 'td').should('contain', 'Visa ending with 4242');
                cy.contains('Expiration date').invoke('next', 'td').should('contain', '2 / 2042');
            });

            cy.log("LY.ANU.RF.05 - Check the Order Summary details")
            cy.get(':nth-child(2) > [style="border: 1px solid rgba(0, 0, 0, 0.1); overflow: auto; margin-bottom: 30px;"]').within(() => {

                cy.get('thead').contains('Description').should('exist');
                cy.get('thead').contains('Period').should('exist');
                cy.get('thead').contains('Amount').should('exist');

                cy.get('tbody').contains('SS+').parent('tr').within(() => {
                    cy.get('td.right.aligned').should('contain', '$35.00');
                });
                cy.get('tfoot').contains('Total: $35.00').should('exist');

            });

            cy.log("LY.ANU.RF.11 - Check the Back button in Review and Finalize page")
            cy.verifyTextPresent("Have a Promotional Code?");
            cy.xpath("//button[text()='Apply Coupon']").should('exist')
            cy.xpath("//input[@placeholder='Coupon Code']").type("12345")
            cy.xpath("//button[text()='Apply Coupon']").click()
            cy.verifyValidationMessage("This Coupon Code is not valid")


            cy.log("LY.ANU.RF.09 - Verify that when user use a coupon, there should be discount on order summary items.")
            cy.xpath("//button[text()='Back']").click();
            cy.xpath("//button[@id='btnChangeStripeCard']").should('exist');
            cy.xpath("//button[text()='Back']").click();


            cy.xpath("//*[@id='btnAnnualSSAPurchase' and contains(.,'BUY NOW')]").click();
            cy.xpath("//fieldset/label[@class='checkbox']/i").click();
            cy.xpath("//button[text()='Continue']").click();


            cy.log("LY.ANU.RF.07 - Verify that the items ordered on the Plan Options page are on the Review and Finalize page.")
            cy.get(':nth-child(2) > [style="border: 1px solid rgba(0, 0, 0, 0.1); overflow: auto; margin-bottom: 30px;"]').within(() => {

                cy.get('thead').contains('Description').should('exist');
                cy.get('thead').contains('Period').should('exist');
                cy.get('thead').contains('Amount').should('exist');

                cy.get('tbody').contains('SS+').parent('tr').within(() => {
                    cy.get('td.right.aligned').should('contain', '$350.00');
                });
                cy.get('tfoot').contains('Total: $350.00').should('exist');



            });
            cy.xpath("//button[text()='Back']").click();
            cy.xpath("//button[text()='Back']").click();


            cy.xpath("//*[@id='btnAnnualSSAPurchase' and contains(.,'BUY NOW')]").click();
            cy.get('#btnChangeStripeCard').click();
            cy.get('#name').click()
            cy.iframe('input[name="cardnumber"]').type('4242424242424200')
            cy.iframe('input[name="exp-date"]').type('0329')
            cy.iframe('input[name="cvc"]').type('216')
            cy.get('fieldset > .checkbox > i').click()
            cy.xpath("//button[text()='Continue']").click();

            cy.log("LY.ANU.RF.13 - Check warning text when unable complete payment.")
            cy.xpath("//*[text()='Complete Purchase']").click()
            cy.verifyTextPresent("Unable to process payment, please verify your billing information and try again.");
        })

    })
})