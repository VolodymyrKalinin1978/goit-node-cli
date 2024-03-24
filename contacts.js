import "colors";
import { promises as fs } from "fs";
import { nanoid } from "nanoid";

import { checkForMatch } from "./checkForMatch.js";

import path from "path";

const { readFile, writeFile } = fs;

const contactsPath = path.join("db", "contacts.json");

export async function listContacts() {
  const data = await readFile(contactsPath);
  return JSON.parse(data);
}

export async function getContactById(contactId) {
  const contact = await listContacts();
  const result = contact.find((item) => item.id === contactId);
  return result || null;
}

export async function addContact(name, email, phone) {
  const contacts = await listContacts();

  checkForMatch(contacts, name, email, phone);

  const newContacts = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContacts);
  await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContacts;
}

export async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}
