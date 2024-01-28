
import React from "react";
import QueryElement from "./QueryElement"
import { Box, Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Divider from '@mui/material/Divider';


const QueryGroup = ({ group, handleAddElement, handleRemoveGroup, handleElementChange, handleRemoveElement }) => {
  return (
    <div>
      <Box style={{ display: "flex", marginBottom: 20, marginTop: 20 }}>
        <FormControl sx={{ minWidth: 100 }} size="small">
          <InputLabel id="operator">Operator</InputLabel>
          <Select
            labelId="operator"
            id="operator"
            value={group.status}
            label="Age"
            onChange={(e) => handleElementChange(-1, 'status', e.target.value)}
          >
            <MenuItem value={"AND"}>AND</MenuItem>
            <MenuItem value={"OR"}>OR</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={() => handleAddElement()} style={{ marginLeft: 5, backgroundColor: "#27374D" }}>Add</Button>
        <Button variant="outlined" onClick={handleRemoveGroup} style={{ marginLeft: 5, color: "#27374D", borderColor: "#27374D" }}>Remove</Button>
      </Box>
      {group.elements.map((element, index) => (
        <QueryElement
          key={index}
          index={index}
          element={element}
          handleElementChange={handleElementChange}
          handleRemoveElement={() => handleRemoveElement(index)}
        />
      ))}
      <Divider />
    </div>
  );
};

export default QueryGroup;