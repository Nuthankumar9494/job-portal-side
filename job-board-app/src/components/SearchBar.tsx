import React, { useState, useMemo, useCallback } from 'react';
import { Input, FormGroup, Label } from 'reactstrap';
import { debounce } from '../utils/utils';

interface SearchBarProps {
  onSearch: (value: string) => void;
  delay?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, delay = 500 }) => {
  const [term, setTerm] = useState('');

  // Create the debounced version of onSearch
  const debouncedSearch = useMemo(() => debounce(onSearch, delay), [onSearch, delay]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setTerm(value);
      debouncedSearch(value); // use debounced version
    },
    [debouncedSearch]
  );

  return (
    <FormGroup>
      <Label for="search" className="fw-medium">Search Job Title or Company</Label>
      <Input
        id="search"
        type="text"
        placeholder="e.g. Frontend, Google..."
        value={term}
        onChange={handleChange}
      />
    </FormGroup>
  );
};

export default SearchBar;
