import { program } from "commander";
import "colors";

import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.log("Contact List".green);
      return console.table(contacts);

    case "get":
      const oneContact = await getContactById(id);
      console.log("One contact from List".green);
      return console.table(oneContact);

    case "add":
      const addContacts = await addContact(name, email, phone);
      console.log("Contact Addet".green);
      return console.table(addContacts);

    case "remove":
      const deleteContact = await removeContact(id);
      console.log("Contact Removed".green);
      return console.table(deleteContact);

    default:
      console.warn("\x1B[31m Unknown action type!".red);
  }
}

invokeAction(options);
