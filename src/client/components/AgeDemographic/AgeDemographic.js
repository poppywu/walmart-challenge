import React, { useState, useEffect } from "react";
import MyTable from "../MyTable/MyTable";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import axios from "axios";
import "./AgeDemographic.css";
import { makeStyles } from "@material-ui/core/styles";
import { gql } from "@apollo/client";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));
// const GET_ITEMS=gql`
// {
//   getAllItems
// }
// `;

function AgeDemographic() {
  const [data, setData] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const classes = useStyles();

  useEffect(() => {
    
    axios
      .get("/users/age", {
        params: {
          item: selectedItem,
        },
      })
      .then((response) => setData(response.data));
  }, [selectedItem]);

  useEffect(() => {
    axios.get("/items").then((response) => setItems(response.data));
    //const {data}=await client.query({query:GET_ITEMS});
    //setUsers(data.getAllItems);
  }, []);

  const handleChange = ({ target }) => {
    setSelectedItem(target.value);
  };

  return (
    <div className="age__demographic">
      <h1>Age Demographic With Item:</h1>
      <FormControl className={classes.formControl}>
        <InputLabel>Age</InputLabel>
        <Select value={selectedItem} onChange={handleChange}>
          {items &&
            items.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <MyTable tableHeader={["Age", "Count"]} data={data} />
    </div>
  );
}

export default AgeDemographic;
