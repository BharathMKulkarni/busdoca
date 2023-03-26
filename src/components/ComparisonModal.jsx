import React from "react";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { useState } from "react";
//import Typography from '@mui/material/Typography';
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer";
// import Prism from "prismjs";
// import 'prismjs/components/prism-json';
import _ from "lodash";
import { Typography } from "@mui/material";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

const newStyles = {
  variables: {
    light: {
      codeFoldGutterBackground: "#6F767E",
      codeFoldBackground: "#E2E4E5"
    }
  }
};

export default function ComparisonModal({firstVariant, secondVariant, clausesList, setClausesList, clauseId}) {
  console.log('inside comparison modal: ', 'firstVariant: ', firstVariant, 'secondVariant: ', secondVariant)
  // const [selectedVariantName, setSelectedVariantName] = useState("")
  const [open, setOpen] = useState(false)
  const [variant1, setVariant1] = useState({})
  const [variant2, setVariant2] = useState({})

  const handleCompareButton = () => {
    setVariant1(firstVariant)
    setVariant2(secondVariant)
    setOpen(true)
  }

  const choseFirstVariant = () => {
    const clause = _.find(clausesList, {id: clauseId})
    const index = _.findIndex(clausesList, {id: clauseId})
    clause.paragraph = firstVariant.content
    const clausesListCopy = clausesList
    clausesListCopy.splice(index, 1, clause)
    setClausesList(clausesListCopy)
    setOpen(false)

    console.log(clausesList)
  }

  const choseSecondVariant = () => {
    const clause = _.find(clausesList, {id: clauseId})
    const index = _.findIndex(clausesList, {id: clauseId})
    clause.paragraph = secondVariant.content
    const clausesListCopy = clausesList
    clausesListCopy.splice(index, 1, clause)
    setClausesList(clausesListCopy)
    setOpen(false)

    console.log(clausesList)
  }

  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button 
        onClick={handleCompareButton}
        variant="contained"
        color="secondary"
      >
      Compare
      </Button>
      {
        (!_.isEmpty(variant1) && !_.isEmpty(variant2)) && 
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500
              }
            }}
          >
            <Fade in={open}>
              <Box sx={style}>
                <ReactDiffViewer
                  oldValue={JSON.stringify(_.get(variant1, 'content'), undefined, 3)}
                  newValue={JSON.stringify(_.get(variant2, 'content'), undefined, 3)}
                  splitView={true}
                  compareMethod={DiffMethod.WORDS}
                  styles={newStyles}
                  leftTitle={_.get(variant1, 'variantName')}
                  rightTitle={_.get(variant2, 'variantName')}
                  // renderContent={highlightSyntax}
                />
                <Button
                  style={{margin: '10px', textTransform: 'none'}} 
                  onClick={choseFirstVariant}
                  variant="outlined"
                  color="info"
                >
                  {`Choose ${variant1.variantName}`}
                </Button>
                <Button 
                  style={{margin: '10px', textTransform: 'none'}} 
                  onClick={choseSecondVariant}
                  variant="outlined"
                  color="info"
                >
                  {`Choose ${variant2.variantName}`}
                </Button>
              </Box>
            </Fade>
          </Modal>
      }
    </div>
  );
}
