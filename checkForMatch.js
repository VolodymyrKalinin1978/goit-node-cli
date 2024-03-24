export const checkForMatch = (contacts, name, email, phone) => {
  let isError = false;

  if (name !== null && name !== undefined) {
    const findName = contacts.find(
      (contact) =>
        contact &&
        contact.name &&
        contact.name.toLowerCase() === name.toLowerCase()
    );
    if (findName) {
      console.log(`Contact with name "${name}" already exists.`.bgRed.black);
      console.table(findName);
      isError = true;
    }
  }

  if (email !== null && email !== undefined) {
    const findEmail = contacts.find(
      (contact) =>
        contact &&
        contact.email &&
        contact.email.toLowerCase() === email.toLowerCase()
    );
    if (findEmail) {
      console.log(`Contact with email "${email}" already exists.`.bgRed.black);
      console.table(findEmail);
      isError = true;
    }
  }

  if (phone !== null && phone !== undefined) {
    const findPhone = contacts.find(
      (contact) => contact && contact.phone && contact.phone === phone
    );
    if (findPhone) {
      console.log(
        `Contact with phone number "${phone}" already exists.`.bgRed.black
      );
      console.table(findPhone);
      isError = true;
    }
  }

  if (isError) {
    process.exit();
  }
};
