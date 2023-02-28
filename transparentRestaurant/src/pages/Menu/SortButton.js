import React from 'react'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const SortButton = (props) => {

  return (
    <div>
      <b style={{color:'white'}}>Sort By Name</b>
      {props.sortOption === "ascending" ? 
      <ArrowUpwardIcon onClick={props.sortButtonClicked} style={{ color: 'white'}}/> : 
      <ArrowDownwardIcon onClick={props.sortButtonClicked} style={{ color: 'white' }}/>}
    </div>
  )
}

export default SortButton