import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { IconButton, Stack, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import Checkbox from '@mui/material/Checkbox';
import ComparisonModal from './ComparisonModal';
import { variants } from '../data/variants'
import _ from "lodash";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 50,
    },
  },
};

export default function SelectVariants() {
  const [firstVariantName, setfirstVariantName] = useState("")
  const [secondVariantName, setSecondVariantName] = useState("")

  const [firstVariant, setFirstVariant] = useState({})
  const [secondVariant, setSecondVariant] = useState({})
  const [variantSelected, setVariantSelected] = useState(false);

  // TODO: fix : push the values to state instead to avoid first value not getting stored
  const handleChangeFirstVariant = (event) => {
    console.log(event.target.value)
    const selectedValue = event.target.value
    setfirstVariantName(selectedValue)
    // console.log("firstVariantName: ", firstVariantName);
  };
  const handleChangeSecondVariant = (event) => {
    console.log(event.target.value)
    const selectedValues = event.target.value
    setSecondVariantName(selectedValues)
    // console.log("secondVariantName: ", secondVariantName)
  };
  useEffect(() => {
    const firstVariantSelected = _.find(variants, {variantName: firstVariantName});
    setFirstVariant(firstVariantSelected);
    const secondVariantSelected = _.find(variants, {variantName: secondVariantName})
    setSecondVariant(secondVariantSelected)
    console.log("firstVariantName: ", firstVariantName);
    console.log("secondVariantName: ", secondVariantName);
    // console.log(firstVariantName.length);
    if(firstVariantName.length != 0 && secondVariantName.length != 0){
      console.log("1st",firstVariant);
      console.log("2nd",secondVariant);
      setVariantSelected(true);
    } 

 }, [firstVariantName, secondVariantName])

  return (
    <div>
      <Typography mt={2} ml={1} >
        Select Variants to Compare
      </Typography>
      {/* Selection of 1st Variant to compare */}
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label" >Select 1st Variant</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label-1"
          id="demo-multiple-checkbox-1"
          value={firstVariantName}
          onChange={handleChangeFirstVariant}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected}
          MenuProps={MenuProps}
        >
          {variants.map((variant) => (
            <MenuItem key={variant.variantName} value={variant.variantName}>
              <Checkbox checked={firstVariantName.indexOf(variant.variantName) > -1} />
              <ListItemText primary={variant.variantName} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Selection of 2nd Variant to compare */}
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Select 2nd Variant</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label-2"
          id="demo-multiple-checkbox-2"
          value={secondVariantName}
          onChange={handleChangeSecondVariant}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selectedVariantName) => selectedVariantName}
          MenuProps={MenuProps}
        >
          {variants.map((variant) => (
            <MenuItem key={variant.variantName} value={variant.variantName}>
              <Checkbox checked={secondVariantName.indexOf(variant.variantName) > -1} />
              <ListItemText primary={variant.variantName} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {
        (variantSelected) && <ComparisonModal firstVariant={firstVariant}  secondVariant={secondVariant} />
      }
    </div>
  );
}
