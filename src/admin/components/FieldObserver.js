import React, { useState, useEffect } from "react";

const FieldObserver = () => {
  const [fieldData, setFieldData] = useState({}); // Initialize state as an empty object

  useEffect(() => {
    const targetNode = document.querySelector("#_bppivimages_");

    if (!targetNode) return;

    // Function to update the state dynamically based on field changes
    const updateFieldData = () => {
      const inputs = targetNode.querySelectorAll("input, select");
      const updatedData = {};
      inputs.forEach((input) => {
        const name = input.name; // Use the field's 'name' attribute as the key
        const value = input.type === "number" ? parseFloat(input.value) || 0 : input.value; // Handle numbers, fall back to 0
        updatedData[name] = value;
      });

      setFieldData(updatedData); // Update the state with the collected field data
    };

    // Callback for the MutationObserver
    const handleMutations = () => {
      updateFieldData();
    };

    // Create the MutationObserver
    const observer = new MutationObserver(handleMutations);

    // Observer configuration
    const config = {
      attributes: true,
      childList: true,
      subtree: true,
    };

  
    observer.observe(targetNode, config);

  
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    
  }, [fieldData]);

  return (
    <div>
      <h3>Field Observer</h3>
      <pre>{JSON.stringify(fieldData, null, 2)}</pre>
    </div>
  );
};

export default FieldObserver;
