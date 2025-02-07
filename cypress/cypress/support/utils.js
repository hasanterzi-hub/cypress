export function getFirstEmail() {
  return cy.readFile('cypress/fixtures/users.json').then((users) => {
    const firstUser = users.users[0];
    const firstEmail = firstUser.email;
    return firstEmail;
  });
}

export function getFirstUserPassword() {
  return cy.readFile('cypress/fixtures/users.json').then((users) => {
    const firstUser = users.users[0];
    const firstPassword = firstUser.password;
    return firstPassword;
  });
}

export function getLastEmail() {
  return cy.readFile('cypress/fixtures/users.json').then((users) => {
    const lastUser = users.users[users.users.length - 1];
    const lastEmail = lastUser.email;
    return lastEmail;
  });
}

export function getLastUserPassword() {
  return cy.readFile('cypress/fixtures/users.json').then((users) => {
    const lastUser = users.users[users.users.length - 1];
    const lastPassword = lastUser.password;
    return lastPassword;
  });
}
