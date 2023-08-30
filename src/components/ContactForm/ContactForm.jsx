// import { useState } from 'react';
import { nanoid } from 'nanoid';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setName, setNumber } from 'redux/contactFormReducer';
import { setContacts } from 'redux/rootReducer';

export const ContactForm = () => {
  const name = useSelector(state => state.contactFormDetails.name);
  const number = useSelector(state => state.contactFormDetails.number);
  const contacts = useSelector(state => state.generalDetails.contacts);

  const dispatch = useDispatch();

  const idInputName = nanoid();
  const idInputNumber = nanoid();

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

  const handleChange = event => {
    const { name, value } = event.target;
    if (name === 'name') {
      dispatch(setName(value));
    } else if (name === 'number') {
      dispatch(setNumber(value));
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    addContact({ name, number });
    reset();
  };

  const reset = () => {
    dispatch(setName(''));
    dispatch(setNumber(''));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={idInputName}>Name</label>
      <input
        id={idInputName}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={name}
        onChange={handleChange}
      />

      <label htmlFor={idInputNumber}>Number</label>
      <input
        id={idInputNumber}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={number}
        onChange={handleChange}
      />

      <button type="submit">Add contact</button>
    </form>
  );
};
