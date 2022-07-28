"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");

const userStore = {
  store: new JsonStore("./models/user-store.json", { users: [] }),
  collection: "users",

  getAllUsers() {
    return this.store.findAll(this.collection);
  },

  addUser(user) {
    this.store.add(this.collection, user);
    this.store.save();
  },

  getUserById(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },
  getUserByFirstName(firstName) {
    return this.store.findOneBy(this.collection, { firstName: firstName });
  },
  getUserByLastName(lastName) {
    return this.store.findOneBy(this.collection, { lastName: lastName });
  },
  getUserByEmail(email) {
    return this.store.findOneBy(this.collection, { email: email });
  },
  updateAccount(email, firstname, lastname) {
    const account = this.store.findOneBy(this.collection, { email: email });
    account.firstName = firstname;
    account.lastName = lastname;
    this.store.save();
  }
};

module.exports = userStore;
