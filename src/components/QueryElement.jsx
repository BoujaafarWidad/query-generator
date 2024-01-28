import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

const QueryElement = ({ index, element, handleElementChange, handleRemoveElement }) => {
  const attributes = [
    'Nom',
    'Prénom',
    'Email',
    'Âge',
    'Sexe',
    'Ville',
    'Code Postal',
    'Date de dernier achat',
    'Segment client',
  ];

  const conditions = [
    "equals", "contains", "lessThan", "moreThan"
  ]
  return (
    <Box style={{ display: "flex", margin: 10, marginLeft: 0 }}>
      <FormControl sx={{ minWidth: 100, marginRight: "5px" }} size="small">
        <InputLabel id="attribute">Attribute</InputLabel>
        <Select
          labelId="attribute"
          id="attribute"
          value={element.field}
          label="Attribute"
          onChange={(e) => handleElementChange(index, 'field', e.target.value)}
        >
          {attributes.map((attribute, index) => (
            <MenuItem value={attribute.toLowerCase()} key={index}>{attribute}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 100, marginRight: "5px" }} size="small">
        <InputLabel id="condition">Condition</InputLabel>
        <Select
          value={element.condition}
          onChange={(e) => handleElementChange(index, 'condition', e.target.value)}
          labelId="condition"
          id="condition"
          label="Condition"
        >
          {conditions.map((condition, index) => (
            <MenuItem value={condition} key={index}>{condition}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        id="value"
        label="Value"
        variant="outlined"
        size="small"
        onChange={(e) => handleElementChange(index, 'value', e.target.value)}
        value={element.value}
        style={{ marginRight: 5 }}
      />
      <Button variant="outlined" onClick={() => handleRemoveElement(index)} style={{ color: "#27374D", borderColor: "#27374D" }}>
        Remove
      </Button>
    </Box>
  );
};

export default QueryElement;