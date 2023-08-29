import React from 'react';
import { nanoid } from 'nanoid';
import { useSelector, useDispatch } from 'react-redux';
import { setContacts, setFilter } from 'redux/appReducer';

import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { Section } from 'components/Section/Section';

export const App = () => {
  const contacts = useSelector(state => state.appDetails.contacts);
  const filter = useSelector(state => state.appDetails.filter);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   localStorage.setItem('contacts', JSON.stringify(contacts));
  // }, [contacts]);

  const addContact = ({ name, number }) => {
    const hasName = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (hasName) {
      alert(`${name} is already in contacts`);
      return;
    }

    const newContact = { name, id: nanoid(), number };

    dispatch(setContacts([newContact, ...contacts]));
  };

  const deleteContact = idContact => {
    dispatch(setContacts(contacts.filter(({ id }) => id !== idContact)));
  };

  const handleChangeFilter = event => {
    const { value } = event.currentTarget;
    dispatch(setFilter(value));
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <>
      <Section title={'Phonebook'}>
        <ContactForm onSubmit={addContact} />
      </Section>

      <Section title={'Contacts'}>
        <Filter value={filter} onChange={handleChangeFilter} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={deleteContact}
        />
      </Section>
    </>
  );
};
