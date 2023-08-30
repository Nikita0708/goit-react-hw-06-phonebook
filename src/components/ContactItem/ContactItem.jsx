import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { setContacts } from 'redux/rootReducer';

export const ContactItem = ({ id, name, number }) => {
  const contacts = useSelector(state => state.generalDetails.contacts);
  const dispatch = useDispatch();

  const deleteContact = idContact => {
    dispatch(setContacts(contacts.filter(({ id }) => id !== idContact)));
  };
  return (
    <li>
      <p>
        {name}: {number}
      </p>
      <button type="button" onClick={() => deleteContact(id)}>
        Delete contact
      </button>
    </li>
  );
};

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
