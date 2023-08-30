import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from 'redux/rootReducer';

export const Filter = () => {
  const filter = useSelector(state => state.generalDetails.filter);
  const dispatch = useDispatch();

  const handleChangeFilter = event => {
    const { value } = event.currentTarget;
    dispatch(setFilter(value));
  };
  return (
    <>
      <label>
        Find contact by name
        <input
          type="text"
          name="filter"
          value={filter}
          onChange={handleChangeFilter}
        />
      </label>
    </>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
