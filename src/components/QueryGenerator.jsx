import React, { useState } from 'react';
import QueryGroup from "./QueryGroup";
import { Box, Button, Chip, Stack } from '@mui/material';
import QueryDialog from './Dialog';
import { Bars } from 'react-loader-spinner'
import { useDrop } from 'react-dnd';

const QueryGenerator = () => {
  const [groups, setGroups] = useState([
    {
      status: 'AND',
      elements: [{ field: 'nom', condition: 'equals', value: '' }],
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [generatedRequest, setGeneratedRequest] = useState("")
  const [open, setOpen] = React.useState(false);
  const [attributes, setAttributes] = useState([]);

  const handleAddElement = (groupIndex) => {
    const newGroups = [...groups];
    newGroups[groupIndex].elements.push({ field: 'nom', condition: 'equals', value: '' });
    setGroups(newGroups);
  };

  const handleRemoveElement = (groupIndex, elementIndex) => {
    const newGroups = [...groups];
    newGroups[groupIndex].elements.splice(elementIndex, 1);
    setGroups(newGroups);
  };

  const handleElementChange = (groupIndex, elementIndex, field, value) => {
    const newGroups = [...groups];
    if (!newGroups[groupIndex]) {
      newGroups[groupIndex] = { status: 'AND', elements: [] };
    }
    if (field === 'status') {
      newGroups[groupIndex][field] = value;
    } else {
      if (!newGroups[groupIndex].elements[elementIndex]) {
        newGroups[groupIndex].elements[elementIndex] = { field: 'nom', condition: 'equals', value: '' };
      }
      newGroups[groupIndex].elements[elementIndex][field] = value;
    }
    setGroups(newGroups);
  };

  const generateSQL = () => {
    setLoading(true);

    setTimeout(() => {
      const tableName = 'client_table';
      const sqlQueries = groups.map((group) => {
        const groupConditions = group.elements.map((element) => {
          const fieldName = element.field;
          const condition = element.condition;
          const value = element.value;

          const conditionMap = {
            equals: '=',
            contains: 'LIKE',
            lessThan: '<',
            moreThan: '>',

          };

          return `${fieldName} ${conditionMap[condition]} '${value}'`;
        });

        const groupSQL = groupConditions.join(` ${group.status} `);

        return `(${groupSQL})`;
      });
      let fullSQL = "";
      if (groups[0].elements.length === 1 && groups[0].elements[0].value === "") {
        fullSQL = `SELECT ${attributes.join(', ')} FROM ${tableName}`;
      } else {
        fullSQL = `SELECT ${attributes.join(', ')} FROM ${tableName} WHERE ${sqlQueries};`;

      }
      setGeneratedRequest(fullSQL)
      setLoading(false);
      setOpen(true)
    }, 1000);
  };

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'ATTRIBUTE',
    drop: (item) => handleDrop(item.attribute),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const handleDrop = (attribute) => {
    if (!attributes.includes(attribute)) {
      setAttributes([...attributes, attribute]);
    }
  };

  const handleDelete = (attribute) => {
    const newList = attributes.filter((item) => item !== attribute);
    setAttributes(newList);
  }


  return (
    <Box>
      <Box style={{ display: "flex", marginBottom: 20 }}>
      </Box>
      <div ref={drop} style={{ border: '1px solid #ccc', padding: '20px' }}>
        <div>
          <strong>Selected Attributes:</strong>
          <Stack direction="row" spacing={1} style={{ display: "flex", justifyContent: "center", padding: 10, flexWrap: "wrap" }}>
            {attributes.map((attribute, index) => (
              <Chip
                key={index}
                style={{
                  minWidth: 150, margin: 5, backgroundColor: "#9DB2BF", fontFamily: "Roboto", fontSize: 14
                }}
                label={attribute}
                onDelete={() => handleDelete(attribute)}
              />
            ))}
          </Stack>
        </div>
        {isOver && canDrop && <div>Drop here</div>}
      </div>
      {groups.map((group, groupIndex) => (
        <QueryGroup
          key={groupIndex}
          group={group}
          handleAddElement={() => handleAddElement(groupIndex)}
          handleElementChange={(elementIndex, field, value) =>
            handleElementChange(groupIndex, elementIndex, field, value)
          }
          handleRemoveElement={(elementIndex) => handleRemoveElement(groupIndex, elementIndex)}
        />
      ))}
      <Button variant="contained" onClick={generateSQL}
        style={{ marginTop: 20, marginBottom: 20, backgroundColor: "#EA168E", minWidth: 160 }}>
        {loading ? <Bars
          height="20"
          width="20"
          color="#27374D"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        /> : "Generate SQL"}
      </Button>
      <QueryDialog SQLRequest={generatedRequest} open={open} handleClose={() => setOpen(false)} />
    </Box>
  );
};



export default QueryGenerator;
