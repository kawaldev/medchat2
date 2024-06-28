import React, { useState, useEffect, useRef } from 'react';

const CustomDropdown = ({ getValue, updateValue }) => {
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Fetch initial data when component mounts
    const fetchData = async () => {
      const data = await getValue();
      setOptions(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Add event listener to handle click outside the dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (value) => {
    setSelectedValue(value);
    setIsOpen(false);
    updateValue(value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setIsOpen(true); // Open dropdown when user starts typing
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const newValue = e.target.value;
      if (!options.includes(newValue)) {
        updateValue(newValue);
        setSelectedValue(newValue);
        setIsOpen(false);
      }
    }
    // Handle up and down arrow keys
    else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault(); // Prevent scrolling of the page
      const currentIndex = options.indexOf(selectedValue);
      let newIndex;
      if (e.key === 'ArrowUp') {
        newIndex = currentIndex === -1 ? options.length - 1 : (currentIndex - 1 + options.length) % options.length;
      } else {
        newIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % options.length;
      }
      setSelectedValue(options[newIndex]);
    }
  };

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <div className="dropdown-header" onClick={handleToggleDropdown}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress}
          placeholder="Search or add new..."
          onFocus={handleToggleDropdown}
        />
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>&#9660;</span>
      </div>
      {isOpen && (
        <div className="dropdown-options">
          {filteredOptions.map(option => (
            <div
              key={option}
              onClick={() => handleSelectOption(option)}
              className={`dropdown-option ${option === selectedValue ? 'selected' : ''}`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
