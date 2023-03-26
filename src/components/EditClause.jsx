import { IconButton, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Collapse from "@kunukn/react-collapse";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import SelectVariants from "./SelectVariants";
import { clauses } from '../data/clauses'


export default function EditClause ({fieldsData, setFieldsData}) {
  const [selectedClause, setSelectedClause] = useState(null);

  const onFieldValueChange = (e, index) => {
    fieldsData[index].value = e.target.value;
    setFieldsData([...fieldsData]);
  };
  return (
      <Box>
        <h2>Field Settings</h2>

        {fieldsData.map((ele, index) => (
          <Box key={index}>
            <Typography variant="subtitle1">{ele.label}</Typography>
            <TextField
              variant="outlined"
              value={ele.value}
              onChange={(e) => onFieldValueChange(e, index)}
            />
          </Box>
        ))}
        <Stack spacing={2} mt="1rem" direction="row">
          <Button
            onClick={() => {
              clauses[selectedClause.index].dynamicFields =
                fieldsData;
              setSelectedClause(null);
              setFieldsData([]);
            }}
          >
            Save
          </Button>
          <Button
            onClick={() => {
              setSelectedClause(null);
              setFieldsData([]);
            }}
          >
            Discard
          </Button>
        </Stack>
      </Box>
  )
}