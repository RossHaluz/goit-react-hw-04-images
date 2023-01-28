import { useState } from 'react';
import {
  SearchbarHeader,
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
} from './Searchbar.styled';
import { FaSearch } from 'react-icons/fa';

const Searchbar = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const onChangeInput = e => {
    const { value } = e.currentTarget;
    setName(value);
  };

  const onSubmitForm = e => {
    e.preventDefault();
    onSubmit(name);
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={onSubmitForm}>
        <SearchFormBtn type="submit">
          <FaSearch color="black" />
        </SearchFormBtn>
        <SearchFormInput
          type="text"
          value={name}
          onChange={onChangeInput}
          autocomplete="off"
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarHeader>
  );
};

export default Searchbar;
