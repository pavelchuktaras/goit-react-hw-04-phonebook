import { useState, useEffect } from "react";
import { Section } from "./Section/Section";
import { Filter } from "./Filter/Filter";
import { nanoid } from 'nanoid';
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');


  useEffect(() => {
    const contactsFromLocalStorage = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contactsFromLocalStorage);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    if (findContact(name)) {
      return alert(`${name} is already in contacts`);
    }

    setContacts((prev) => [...prev, newContact]);
  };

  const filterChange = (e) => {
    setFilter(e.target.value);
  };

  const filterContacts = () => contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));

  const findContact = name => contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())

  const onDelete = (contactId) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== contactId))
  }

  const filteredContacts = filterContacts();
  return (
    <>
      <Section title="Phonebook">
        <ContactForm onSubmit={addContact} />
      </Section>
      <Section title="Contacts">
        <Filter
          filter={filter}
          handleChange={filterChange}
        />
        <ContactList contacts={filteredContacts} onDelete={onDelete} />
      </Section>
    </>
  );
};