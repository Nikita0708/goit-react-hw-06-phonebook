import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { Section } from 'components/Section/Section';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts !== null) {
      const parsedContacts = JSON.parse(savedContacts);
      return parsedContacts;
    }
    return [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ];
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const hasName = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (hasName) {
      alert(`${name} is alredy in contacts`);
      return;
    }

    const newContact = { name: name, id: nanoid(), number: number };

    setContacts(prevContacts => [newContact, ...prevContacts]);
  };

  const deleteContact = idContact => {
    setContacts(prevContacts =>
      prevContacts.filter(({ id }) => id !== idContact)
    );
  };

  const handleChangeFilter = event => {
    const { value } = event.currentTarget;
    setFilter(value);
  };

  const getVisibelContats = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const visibleContacts = getVisibelContats();

  return (
    <>
      <Section title={'Phonebook'}>
        <ContactForm onSubmit={addContact} />
      </Section>

      <Section title={'Contacts'}>
        <Filter value={filter} onChange={handleChangeFilter}></Filter>
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={deleteContact}
        />
      </Section>
    </>
  );
};
