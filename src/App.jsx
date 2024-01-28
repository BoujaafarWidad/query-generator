import './App.css';
import Header from './components/Header';
import React from "react";
import Attributes from './components/Attributes';
import QueryGenerator from "./components/QueryGenerator"
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Box, Typography } from '@mui/material';

function App() {

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

  return (
    <DndProvider backend={HTML5Backend}>
      <Box className="App">
        <Header />
        <Box style={{ maxWidth: "80%", margin: "auto" }}>
          <Typography variant='h5' style={{ margin: 10, color: "#747264" }}>Drag from the list below and drop in the frame</Typography>
          <Attributes attributes={attributes} onDragStart={(e, attribute) => e.dataTransfer.setData('ATTRIBUTE', attribute)} />
          <QueryGenerator />
        </Box>
      </Box>
    </DndProvider>
  );
}

export default App;
