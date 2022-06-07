const path = require("path");
const fs = require("fs/promises");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const updateContacts = async(contacts) => {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

// TODO: задокументировать каждую функцию
const listContacts = async() => {
    console.log("listContacts");
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
}

const getContactById = async(contactId) => {
    const contacts = await listContacts();
    const contact = contacts.find(contact => contact.id === contactId);
    if (!contact) {
        return null;
    }
    return contact;
}

const removeContact = async(contactId) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await updateContacts(contacts);
    return result;
}

const addContact = async(name, email, phone) => {
    const contacts = await listContacts();
    const newContact = {
        name,
        email,
        phone,
        id: nanoid()
    };
    contacts.push(newContact)
    await updateContacts(contacts)
    return newContact
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}