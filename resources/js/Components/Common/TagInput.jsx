import React, { useEffect, useRef } from 'react';
import TomSelect from 'tom-select';

// Tom Select's CSS is usually handled globally,
// but for component-specific usage, you can import it here.
// Ensure you have tom-select installed via npm or linked in your main HTML file.
import 'tom-select/dist/css/tom-select.bootstrap5.css';

const TagInput = ({ value = [], onChange, ...props }) => {
  const selectRef = useRef(null);
  const tomSelectInstance = useRef(null);

  useEffect(() => {
    if (selectRef.current) {
      tomSelectInstance.current = new TomSelect(selectRef.current, {
        plugins: ['remove_button'],
        create: true,
        persist: false,
        items: value,
        onItemAdd: (itemValue) => {
          if (!value.includes(itemValue)) {
            onChange([...value, itemValue]);
          }
        },
        onItemRemove: (itemValue) => {
          onChange(value.filter(v => v !== itemValue));
        },
        ...props
      });
    }

    return () => {
      if (tomSelectInstance.current) {
        tomSelectInstance.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (tomSelectInstance.current) {
      // Sync TomSelect with external value changes
      if (JSON.stringify(tomSelectInstance.current.items) !== JSON.stringify(value)) {
        tomSelectInstance.current.clear(true); // silent clear
        tomSelectInstance.current.addItems(value, true); // silent add
      }
    }
  }, [value]);

  return <input ref={selectRef} defaultValue={value.join(',')} />;
};

export default TagInput; 
