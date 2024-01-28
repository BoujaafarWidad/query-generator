import React, { useState } from 'react';
import QueryGroup from "./QueryGroup";
import { Box, Button } from '@mui/material';
import QueryDialog from './Dialog';
import { Bars } from 'react-loader-spinner'

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

  const handleAddGroup = () => {
    setGroups([...groups, { status: 'AND', elements: [] }]);
  };

  const handleRemoveGroup = (index) => {
    const newGroups = [...groups];
    newGroups.splice(index, 1);
    setGroups(newGroups);
  };

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
      const tableName = 'your_table';
      const selectColumns = ['column1', 'column2', 'column3'];
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

      const finalSQL = sqlQueries.join(' AND ');

      const fullSQL = `SELECT ${selectColumns.join(', ')} FROM ${tableName} WHERE ${finalSQL};`;

      setGeneratedRequest(fullSQL)
      setLoading(false);
      setOpen(true)
    }, 1000);
  };


  return (
    <Box>
      <Box style={{ display: "flex", marginBottom: 20 }}>
        <Button variant="contained" onClick={handleAddGroup} style={{ backgroundColor: "#27374D" }}>
          Add Group
        </Button>
      </Box>
      {groups.map((group, groupIndex) => (
        <QueryGroup
          key={groupIndex}
          group={group}
          handleAddElement={() => handleAddElement(groupIndex)}
          handleRemoveGroup={() => handleRemoveGroup(groupIndex)}
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
