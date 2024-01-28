// src/components/AttributeList.js
import React from 'react';
import { useDrag } from 'react-dnd';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';


const AttributeList = ({ attributes }) => {
  return (
    <Stack direction="row" spacing={1} style={{ display: "flex", justifyContent: "center", padding: 10, flexWrap: "wrap" }}>
      {attributes.map((attribute, index) => (
        <Attribute key={index} attribute={attribute} />
      ))}
    </Stack>
  );
};

const Attribute = ({ attribute }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'ATTRIBUTE',
    item: { attribute },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <Chip
      style={{
        width: 150, margin: 5, backgroundColor: "#9DB2BF", fontFamily: "Roboto", fontSize: 14
      }}
      ref={drag}
      className={isDragging ? 'dragging' : ''}
      label={attribute}
    />
  );
};

export default AttributeList;
