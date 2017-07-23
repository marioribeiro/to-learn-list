const mongoose = require('mongoose');
const Browser = require('zombie');
const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect;
var app = require('../app');

Browser.localhost('localhost', 7777);

describe('User creates list and is assigned as author', function() {
  const browser = new Browser();

  before((done) => {
    browser.visit('/users/new', done);
  });

  after((done) =>  {
    mongoose.connection.collections.lists.drop(() => {
      done();
    });
  });

  describe('User creates a new list', () => {
    before((done) => {
      browser
        .fill("name", "Jeff Chris")
        .fill("email", "jeff@gmail.com")
        .fill("password", "gangsta")
        .fill("password-confirm", "gangsta")
        .pressButton("Sign Up", done);
    });

    before((done) => {
      browser
        .clickLink('Create List', done);
    });

    before((done) => {
      browser
        .fill('name', 'Reading List')
        .pressButton('Create', () => {
          browser.visit('/lists', done);
        });
    });

    it('should display the new list and author', () => {
      browser.assert.text('h3', 'Reading List');
      browser.assert.text('p', 'Jeff Chris');
    });
  });
});
