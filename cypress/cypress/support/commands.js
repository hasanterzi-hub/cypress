const compareSnapshotCommand = require('cypress-image-diff-js/command');
compareSnapshotCommand();
import QuestionnaireElements from "../pages/Questionnaire.js"
import { getFirstEmail, getFirstUserPassword, getLastEmail, getLastUserPassword } from './utils';
const moment = require("moment");

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false
})

Cypress.Commands.add('isVisible', selector => {
  cy.get(selector).should('be.visible')
  cy.log("The selector: " + selector + " is visible")
})

Cypress.Commands.add('isHidden', selector => {
  cy.get(selector).should('not.exist')
  cy.log("The selector: " + selector + " is not presented at the page")
})


Cypress.Commands.add('getFirstEmail', () => {
  getFirstEmail().then((firstEmail) => {
    cy.wrap(firstEmail).as('firstUserEmail');
  });
});

Cypress.Commands.add('getFirstPassword', () => {
  getFirstUserPassword().then((firstPassword) => {
    cy.wrap(firstPassword).as('firstUserPassword');
  });
});

Cypress.Commands.add('getLastEmail', () => {
  getLastEmail().then((lastEmail) => {
    cy.wrap(lastEmail).as('lastUserEmail');
  });
});

Cypress.Commands.add('getLastPassword', () => {
  getLastUserPassword().then((lastPassword) => {
    cy.wrap(lastPassword).as('lastUserPassword');
  });
});


Cypress.Commands.add('randomBetween', (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
});


Cypress.Commands.add('clickButtonMultipleTimes', (buttonSelector, times) => {
  for (let i = 0; i < times; i++) {
    cy.get(buttonSelector).click();
    cy.wait(1000);
  }
});


Cypress.Commands.add("minusYear", (x) => {
  const currentYear = new Date().getFullYear();
  const previousYear = currentYear - x;
  return cy.wrap(previousYear);
});


///It enters iframe in payment page.
Cypress.Commands.add('iframe', (subElementPath) => {
  const iframe = cy.xpath('//iframe[@title="Secure card payment input frame"]')
    .its('0.contentDocument.body')
    .then(cy.wrap)
    .find(subElementPath)
    .should('be.visible')
  return iframe
})

Cypress.Commands.add('verifyServerMessage', (expectedMessage) => {
  cy.get('.Toastify__toast-body > :nth-child(2)')
    .should('be.visible') // Ensure that the message container is visible
    .invoke('text')
    .should('include', expectedMessage)
    .then((message) => {
      if (message.includes(expectedMessage)) {
        cy.log(`Server message "${expectedMessage}" is displayed.`);
      } else {
        cy.log(`Server message "${expectedMessage}" is NOT displayed.`);
      }
    });
});

Cypress.Commands.add('clickToText', (text) => {
  cy.contains(text) // Find the element containing the specified text
    .should('be.visible') // Ensure that the element is visible
    .click(); // Perform the click operation on the element
    cy.log('Clicked on '+ text +' page.')
});

Cypress.Commands.add('verifyTextPresent', (expectedText) => {
  cy.get('body')
    .should('contain', expectedText);
  cy.log('"' + expectedText + '" has seen on page')
});

Cypress.Commands.add('verifyTextNotPresent', (expectedText) => {
  cy.get('body')
    .should('not.contain', expectedText);
  cy.log(expectedText + 'text not present in page')
});

Cypress.Commands.add('verifyLabel', (text) => {
  try {
    const element = cy.xpath("//label[contains(text(),'" + text + "') or contains(.,'" + text + "')]")
    element.eq(0).should('be.visible').should('have.text', text)
    cy.log(text + ' have been seen on page')
  } catch {
    cy.log(text + ' has not seen on page')
  }
})

Cypress.Commands.add('verifyH2Text', (text) => {
  try {
    const element = cy.xpath("//h2[contains(text(),'" + text + "') or contains(.,'" + text + "')]")
    element.eq(0).should('be.visible').should('have.text', text)
    cy.log('Header type text: ' + text + ' have been seen on page')
  } catch {
    cy.log('Header type text: ' + text + ' has not seen on page')
  }
})


Cypress.Commands.add('verifyInputAndContent', (elementId, text) => {
  try {
    const element = cy.xpath("//input[@id='" + elementId + "']")
    element.should('be.visible').and('have.value', text)
    cy.log(text + ' has seen on input: ' + elementId)
  } catch {
    cy.log(text + ' have not seen on page')
  }
})

/**
 * @param {string} expectedMessage - Expected message from validation string on page 
 */
Cypress.Commands.add('verifyValidationMessage', (expectedMessage) => {
  cy.get('.ui.red.basic.label')
    .should('be.visible')
    .invoke('text')
    .should('include', expectedMessage)
    .then((message) => {
      if (message.includes(expectedMessage)) {
        cy.log(`Input validation message "${expectedMessage}" is displayed.`);
      } else {
        cy.log(`Input validation message "${expectedMessage}" is NOT displayed.`);
      }
    });
});


Cypress.Commands.add('verifyElementContainsText', (expectedText, selector) => {
  try {
    cy.get(selector).should('be.visible').and('contain', expectedText)
    cy.log(expectedText + ' has seen on page at intended place.')
  } catch (error) {
    cy.log(expectedText + ' has not seen on page at intended place. ' + error)
  }
})

Cypress.Commands.add('selectOptionByText', (selectElement, externalValue) => {
  cy.get(selectElement).select(externalValue);
  cy.log('Option text: ' + selectElement + ' selected.')
})

Cypress.Commands.add('verifyOptionTexts', (selector, expectedTexts) => {
  cy.get(selector) // Get the select element using the provided selector
    .find('option') // Find all option elements within the select
    .each(($option, index) => {
      expect($option.text()).to.equal(expectedTexts[index]); // Assert the text of each option at its corresponding index
      cy.log(expectedTexts[index] + ' has seen on dropdown.')
    });
})


Cypress.Commands.add('verifyGetElement', (element) => {
  cy.get(element).should('be.visible')
  cy.log(element + " has seen.")
})

Cypress.Commands.add('clickPencilIcon', (text) => {
  cy.contains('tr', text)
    .find('i.pencil.link.icon')
    .click();
})

Cypress.Commands.add('clickNTimes', (elementText, n) => {
  for (let i = 0; i < n; i++) {
    cy.contains('button', elementText).click()
    cy.wait(250)
  }
  cy.log(`Clicked ${n} times on "${elementText}".`);
})

Cypress.Commands.add('verifyTableRow', (tableSelector, rowNumber, dataLabel, expectedValue) => {
  cy.get(`${tableSelector} tr:nth-child(${rowNumber}) td:nth-child(1)`).should('contain', dataLabel);
  cy.get(`${tableSelector} tr:nth-child(${rowNumber}) td:nth-child(2)`).should('contain', expectedValue);
});


/**
  * Create a social security scenario with given info.
  * @typedef {'Single' | 'Divorced' | 'Married'| 'Widowed'} optionsOfMartialStatus
  * @param {string} CaseName - Social security scenario name.
  * @param {string} martialStat - Scenario created according to martial status: Single, Divorced, Married, Widowed. 
  * @param {string} BoDPrimary - Primary client birth of date
  * @param {string} salary1 - Primary client benefit
  * @param {string} BodSecondary - Secondary client benefit
  * @param {string} salary2 - Secondary client birth of date
 */
Cypress.Commands.add('addACustomSSscenario', (CaseName, martialStat, BoDPrimary, salary1, BodSecondary, salary2) => {
  cy.log("Questionnaire_ReviewSingle");
  const qs = new QuestionnaireElements()

  cy.log("Create a scenario for martial status: " + martialStat);
  //Step1
  qs.getNameInput().type(CaseName + ' Case')
  qs.getPrimaryInput().type('John')
  qs.getDateOfBirthInput().type('04/15/' + BoDPrimary + '{enter}')
  qs.getNameInput().click();
  cy.selectItemInDropdownList(0, martialStat)
  cy.get('.modal > .header').click()
  qs.getNextButton().click()
  //step2
  qs.getPrimaryMemberSalary().type(salary1)
  qs.getNextButton().click()
  if (martialStat === "Single") {
    //step3
    qs.getNonCoveredPension().clear();
    qs.getNonCoveredPension().type("1000")
    qs.getNextButton().click()

    //step4
    qs.selectDropdownList("John's expected retirement age", "65 years")
    qs.getNextButton().click()

    qs.getNextButton().click()
    qs.getSSCH1().contains('Review').should('exist')
    qs.getNextButton().click()
    qs.getSaveButton().click()
    cy.log('Single scenario is created.')
  } else if (martialStat === "Divorced") {
    //spouse
    qs.getSecondaryMemberName().type("Jane");
    qs.getSecondaryMemberDateOfBirthInput().type('08/20/' + BodSecondary + '{enter}');
    cy.get('.modal > .header').click()
    qs.getNextButton().click()

    //step4
    qs.getSecondaryMemberSalary().type(salary2);

    //step,5,6,7
    cy.clickNTimes("Next", 5)
    qs.getSaveButton().click()
    cy.log('Divorced scenario is created')
  } else if (martialStat === "Widowed") {
    qs.getSecondaryMemberName().type("Jane")
    qs.getSecondaryMemberDateOfBirthInput().type('11/13/' + BodSecondary + '{enter}');
    cy.get('.modal > .header').click()
    qs.getSecondaryMemberDeceasedDate().type('11/10/2021')
    qs.getSecondaryMemberName().click()
    qs.getNextButton().click()
    //step4
    qs.getSecondaryMemberSalary().type(salary2)
    //step,5,6,7
    cy.clickNTimes("Next", 5)
    qs.getSaveButton().click()
    cy.log('Widowed case is created')
  }
  //Married 
  else {
    //spouse
    qs.getSecondaryMemberName().type("Jane")
    // TODO: All dates should be relative to current date
    const currentMonth = new Date().getMonth();
    if(currentMonth >= 10)
      qs.getSecondaryMemberDateOfBirthInput().type('11/13/' + (BodSecondary+1) + '{enter}')
    else
      qs.getSecondaryMemberDateOfBirthInput().type('11/13/' + BodSecondary + '{enter}')
    cy.get('.modal > .header').click()
    qs.getNextButton().click()
    //step4
    qs.getSecondaryMemberSalary().type(salary2)
    //step,5,6,7
    cy.clickNTimes("Next", 5)
    qs.getSaveButton().click()
    cy.log('Married scenario is created')
  }

})

Cypress.Commands.add('verifyDropdownList', (index, expectedItems) => {
  cy.get('.ui.selection.dropdown').eq(index).each(($dropdown) => {
    // open dropdown
    cy.wrap($dropdown).click();
    //Find .menu.transition get inside
    cy.wrap($dropdown).find('.menu.transition').then(($menu) => {
      //Find items in array
      expectedItems.forEach((item) => {
        cy.wrap($menu).contains('.item', item).should('exist').and('have.text', item);
        cy.log(item + ' has seen in list')
      })
    })
    //Dropdown'u kapat
    cy.wait(500)
    cy.wrap($dropdown).click()
    // cy.wrap($dropdown).click()
  })
})

Cypress.Commands.add('verifyItemsNotInDropdownList', (index, notExpectedItems) => {
  cy.get('.ui.selection.dropdown').eq(index).each(($dropdown) => {
    // Dropdown'u aç
    cy.wrap($dropdown).click()

    // Dropdown içinde .menu.transition bul, içine gir
    cy.wrap($dropdown).find('.menu.transition').then(($menu) => {
      // Olmaması gereken item'ları .itemları içinde bulunmamaları gerektiğini kontrol et
      notExpectedItems.forEach((item) => {
        cy.wrap($menu).contains('.item', item).should('not.exist')
        cy.log(item + ' has not been seen in the list')
      });
    });
    // Dropdown'u kapat
    cy.wait(500)
    cy.wrap($dropdown).click();
  })
})

Cypress.Commands.add('selectItemInDropdownList', (index, itemToClick) => {

  cy.get('.ui.selection.dropdown').eq(index).each(($dropdown) => {
    // Dropdown'un aç
    cy.wrap($dropdown).click();
    cy.wait(500)
    //Dropdown içinde .menu.transition bul içine gir
    cy.wrap($dropdown).find('.menu.transition').then(($menu) => {
      //Doğrulanacak item ları .itemları içinde var mı kontrol et
      cy.wrap($menu).contains('.item', itemToClick).click();
      cy.log(itemToClick + ' has been clicked');
    })
    //Dropdown'u kapat
    cy.wait(500)
    // cy.wrap($dropdown).click()
  })
})

Cypress.Commands.add('selectedTextInDropdownList', (index, text) => {

  cy.get('.ui.selection.dropdown').eq(index).each(($dropdown) => {
    // Dropdown'un aç
    cy.wrap($dropdown).click();
    cy.wait(500)
    //Dropdown içinde .menu.transition bul içine gir
    cy.wrap($dropdown).find('.menu.transition').then(($menu) => {
      //Doğrulanacak item ları .itemları içinde var mı kontrol et
      cy.wrap($menu).find('[aria-selected="true"]>span').then(($selected) => {
        cy.wrap($selected).should('have.text', text)
      })
      cy.log(text + ' is selected in dropdown list');
    })
    //Dropdown'u kapat
    cy.wait(500)
    cy.wrap($dropdown).click()
  })
})

//For List elements ul>li 
Cypress.Commands.add('verifyListItemAtIndex', (index, expectedText) => {
  // Belirtilen indeksteki liste öğesini seçin
  try {
    cy.get('ul > li').eq(index).should('have.text', expectedText);
    cy.log('List has been found. ' + index + ' item: ' + expectedText + ' verified.')
  } catch (error) {
    cy.log('List has been found. ' + index + ' item: ' + expectedText + ' not verified.' + error)
  }

});

Cypress.Commands.add('clickSwitchILToSS', () => {
  cy.get('body').then($body => {
    if ($body.find('.react-toggle--checked.toggleIncomeLayers').length) {
      cy.get('.react-toggle--checked.toggleIncomeLayers').as('IncomeToSS').click()
      cy.log('Income Layer toggle has clicked to go to SS Detail page.')
      cy.wait(2000)
    }
  })
})

Cypress.Commands.add('clickSwitchSSToIL', () => {
  cy.get('body').then($body => {
    if ($body.find('.react-toggle--checked.toggleIncomeLayers').length) {
      cy.log('Not action taken. Already in IL')
    } else {
      cy.xpath("//div[@class='react-toggle toggleIncomeLayers'] | //div[@class='react-toggle react-toggle--checked toggleIncomeLayers']").click()
      cy.log('Toggle has clicked to go to Income Layer page.')
      cy.wait(2000)
    }
  })
})


/**
 * It checks the affiliate name on Profile page. It opens Profile page
 * @param {string} AffiliateName - Write the Affiliate Name correctly.
 */
Cypress.Commands.add('checkProfilePage', (AffiliateName) => {
  cy.get('.text').click()
  cy.verifyTextPresent(AffiliateName)
  cy.contains('Profile').click()
  cy.verifyTextPresent('User')
  cy.verifyTextPresent('Subscription')
  cy.verifyElementContainsText(AffiliateName, ':nth-child(2) > .nine')
  cy.verifyElementContainsText(AffiliateName + ' SS+ License', 'p')
  cy.verifyElementContainsText('Active', 'p > :nth-child(1)')
  cy.verifyElementContainsText('Licensed', 'p > :nth-child(2)')
  cy.log('Profile page controlled and affiliate name: ' + AffiliateName + ' has checked on the page.')
})

Cypress.Commands.add('verifyValueInput', (xpath, expectedValue) => {
  try {
    cy.get(xpath).should('be.visible').invoke('val').then((value) => {
      expect(value).to.equal(expectedValue);
      cy.log(expectedValue + ' has been seen on input with XPath: ' + xpath);
    });
  } catch (error) {
    cy.log(expectedValue + ' has not been seen on page');
  }
});

Cypress.Commands.add('verifySelectedOption', { prevSubject: 'element' }, (selectElement, expectedValue) => {
  cy.wrap(selectElement).invoke('val').should('eq', expectedValue);
  cy.log('Sected Option is ' + expectedValue)
});



/**
 * This used for download report. it expect a report download request in network and verifies the message. 
 */
Cypress.Commands.add('downloadReport', (filename) => {
  //Intercept the report request
  cy.wait("@buttonRequest", { timeout: 20000 }).then((interception) => {
    const fileName = interception.response.headers["content-disposition"].split("filename=")[1];
    // Assert or use the file name as needed
    expect(interception.response.statusCode).to.eq(200);
    expect(fileName).to.contain(filename + 'Report.pdf');
    cy.verifyServerMessage('Report Generated');
  });

  cy.task('downloads', 'cypress/downloads').then(before => {
    cy.log(before.length)
    if (before.length != 0) {
      cy.task('deleteFolder', 'cypress/downloads/' + filename + '.pdf')
      cy.log('Dowload folder has ' + filename + '.pdf and now removed')

    } else {
      cy.log('Folder is clean. No file.')
    }
  })
})

Cypress.Commands.add('generateRandomString', (length) => {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  cy.wrap(result).as('randomString');
})

Cypress.Commands.add('generatePassword', (length) => {
  // Ensure length is between 8 and 64
  length = Math.max(8, Math.min(length, 64));

  const characterTypes = ["lowercase", "uppercase", "number", "symbol"];
  const characterSets = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    number: "0123456789",
    symbol: "!@#$%^&*()-_=+[]{};':,.<>/?",
  };

  // Guaranteed characters (at least one from each type)
  let guaranteedChars = "";
  characterTypes.forEach((type) => {
    guaranteedChars += characterSets[type][Math.floor(Math.random() * characterSets[type].length)];
  });

  // Remaining characters from the combined set
  const remainingChars = characterTypes.reduce((acc, type) => acc + characterSets[type], "");

  // Generate password with guaranteed characters and remaining random characters
  let password = guaranteedChars;
  password += remainingChars.slice(0, length - guaranteedChars.length)
    .split('')
    .sort(() => Math.random() - 0.5) // Shuffle remaining characters
    .join('');

  // Return the generated password
  return password
});

Cypress.Commands.add('CalculateAgeByBOD', (dob) => {
  const today = moment();
  const birthDate = moment(dob, 'MM/DD/YYYY');

  let results = [];
  const currentAge = today.diff(birthDate, 'years');

  for (let age = currentAge; age <= 70; age++) {
    let year = birthDate.clone().add(age, 'years').year();
    results.push(`${age} (${year})`);
  }
  return results;
})

Cypress.Commands.add('ProductSubscriptionLogin', (product) => {
  cy.get('#UserId').select('Test Automation')
  cy.get('#PlanId').select(product)
  cy.get('#Environment').select(Cypress.env('devAWSPA'))
  cy.get('form[action="/Plan/Submit"]').invoke('removeAttr', 'target')

  cy.intercept('GET', '**/api/Subscription/Customer').as('customerApiCall');
  cy.get('.btn').should('have.text', 'Submit').click()

  // Wait API call and verify the call completed successfully max wait time 8 seconds
  cy.wait('@customerApiCall',{responseTimeout: 8000}).then((interception) => {
    // API call completed successfully
    
    // Do performans measure
    cy.window().then((win) => {
      try {
        // Start processing
        win.performance.mark('start');
        
        // Make sure page loaded successfully
        cy.document().its('readyState').should('eq', 'complete');
        expect(interception.response.statusCode).to.eq(200);
        // Last element timing
        win.performance.mark('end');
  
        // Calculate the duration
        win.performance.measure('pageLoad', 'start', 'end');
        const measures = win.performance.getEntriesByName('pageLoad');
  
        // Loggin the duration
        if (measures.length > 0) {
          cy.log(`Page load time: ${measures[0].duration} ms`);
          expect(measures[0].duration).to.be.lessThan(8000);
        } else {
          cy.log("Performance measurament can not be done.");
        }
      } catch (error) {
        cy.log(`Performance Error: ${error.message}`);
      }
    });
  });

  cy.log(product + ' subscription user logged in.')
  cy.wait(7000)
})



Cypress.Commands.add('smallHeader', (text) => {
  cy.get('.small > .header').should('exist').and('contain.text',text)
  cy.log('Small Popup has seen on page and header text is '+ text)
});

