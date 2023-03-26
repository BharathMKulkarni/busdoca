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


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const columnsFromBackend = {
  1: {
    name: "New Document",
    items: [],
  },
  2: {
    name: "Clause Library",
    items: clauses,
  },
};



function ClauseDnd() {
  const [columns, setColumns] = useState(columnsFromBackend);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [fieldsData, setFieldsData] = useState([]);
  const [selectedClause, setSelectedClause] = useState(null);
  
   

  // const [selectedVariants, setSelectedVariants] = useState([]);
  // const [variants, setVariants] = useState([
  //   "Hi I am variant1",
  //   "Hi I am variant2",
  //   "variant3",
  // ]);

  // const compareVariants = () => {
  //   const words1 = selectedVariants[0].split(" ");
  //   const words2 = selectedVariants[1].split(" ");
  //   let str = "";
  //   const diff = words1.map((word, i) => {
  //     if (word !== words2[i]) {
  //       str += `<span key=${i} style="background-color:yellow;">${word}${" "}</span>`;
  //       return (
  //         <span key={i} style={{ backgroundColor: "yellow" }}>
  //           {word}{" "}
  //         </span>
  //       );
  //     } else {
  //       str += `<span key=${i}>${word} </span>`;
  //       return <span key={i}>{word} </span>;
  //     }
  //   });
  //   console.log(str);
  //   document.getElementById("compare").innerHTML = str;
  //   // diff.map((data)=>{

  //   // })
  // };
  
  const getFieldValues = (paragraph, fields) => {
    // fields.forEach((ele) => {}
    fields.forEach((ele) => {
      paragraph = paragraph.replaceAll(ele.id, ele.value);
    });
    return paragraph;
  };

  const onDragEnd = (result, columns, setColumns) => {
    const { source, destination } = result;
    if (!destination || source.droppableId === destination.droppableId) return;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      let removed = sourceItems[source.index];
      removed = { id: uuid(), ...removed };
      destItems.push(removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    }
    //  else {
    //   const column = columns[source.droppableId];
    //   const copiedItems = [...column.items];
    //   const [removed] = copiedItems.splice(source.index, 1);
    //   copiedItems.splice(destination.index, 0, removed);
    //   setColumns({
    //     ...columns,
    //     [source.droppableId]: {
    //       ...column,
    //       items: copiedItems,
    //     },
    //   });
    // }
  };
  const onFieldValueChange = (e, index) => {
    fieldsData[index].value = e.target.value;
    setFieldsData([...fieldsData]);
  };

  // const MultiSelect = () =>{
  //   <ReactMultiSelectCheckboxes options={options}/>
  // };
 
 return (
    <div style={{ display: "flex", justifyContent: "right", height: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "25vw",
        }}
      >
        <Stack>
          {/* <div
                  // className="hideScroll"
                  style={{
                    background: "lightgrey",
                    padding: 8,
                    width: "18vw",
                    maxHeight: 800,
                    minHeight: 800,
                    // overflowY: "scroll",
                  }}
                > */}
          {selectedClause && (
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
          )}
          {/* </div> */}
        </Stack>
      </div>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2>Create New Document</h2>
          <div className="hideScroll" style={{ margin: 8 }}>
            <Droppable droppableId="1">
              {(provided, snapshot) => (
                <div
                  className="hideScroll"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    background: snapshot.isDraggingOver
                      ? "lightblue"
                      : "lightgrey",
                    padding: 8,
                    width: "50vw",
                    maxHeight: 800,
                    minHeight: 800,
                    overflowY: "scroll",
                  }}
                >
                  {columns["1"].items.map((item, index) => (
                    <div
                      className="hideScroll"
                      style={{
                        userSelect: "none",
                        padding: 16,
                        margin: "0 0 8px 0",
                        minHeight: "100px",
                        backgroundColor: "#757475",
                        color: "white",
                      }}
                    >
                      <Stack alignItems="center" justifyContent="center">
                        {item.name}

                        <Stack
                          direction="row"
                          justifyContent="space-around"
                          alignItems="center"
                        >
                          <IconButton>
                            <VisibilityOutlinedIcon size="small" />
                          </IconButton>

                          <IconButton
                            onClick={() => {
                              setSelectedClause({ data : item, index : index});
                              let fields = structuredClone(item.dynamicFields);
                              setFieldsData(fields);
                            }}
                            size="small"
                          >
                            <ModeEditOutlinedIcon size ="small"/>
                          </IconButton>
                          <IconButton>
                            <DeleteOutlineOutlinedIcon size="small" />
                          </IconButton>
                          
                          {/* <IconButton onClick={compareVariants}>
                            <CompareIcon />
                          </IconButton> */}
                          <div id="compare"></div>
                        </Stack>
                      </Stack>
                      <div>
                        <Accordion>
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>
                              Terms and Policies .....xyzabc
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>
                              {getFieldValues(
                                item.paragraph,
                                item.dynamicFields
                              )}
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      </div>
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="title"
                        aria-describedby="description"
                      >
                        <Box sx={style}></Box>
                      </Modal>
                      <SelectVariants />
                    </div>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2>Clause Library</h2>
          <div className="hideScroll" style={{ margin: 8 }}>
            <Droppable droppableId="2">
              {(provided, snapshot) => (
                <div
                  className="hideScroll"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    background: snapshot.isDraggingOver
                      ? "lightblue"
                      : "lightgrey",
                    padding: 8,
                    width: "25vw",
                    maxHeight: 800,
                    minHeight: 800,
                    overflowY: "scroll",
                  }}
                >
                  {columns["2"].items.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          className="hideScroll"
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          style={{
                            userSelect: "none",
                            padding: 16,
                            margin: "0 0 8px 0",
                            minHeight: "100px",
                            backgroundColor: snapshot.isDragging
                              ? "#263B4A"
                              : "#456C86",
                            color: "white",
                            ...provided.draggableProps.style,
                          }}
                        >
                          <Stack alignItems="center" justifyContent="center">
                            {item.name}
                          </Stack>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}

export default ClauseDnd;
