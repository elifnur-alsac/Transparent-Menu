import "./Filter.css"
import NativeSelect from '@mui/material/NativeSelect';

let FilterGroups = (props) => {
    const styles = theme => ({
        root: {
          background: "blue",
        },
        whiteColor: {
          color: "white"
        }
      });

    function onFilterValueChanged(event){
        props.filterValueSelected(event.target.value)

    }
    return<>
    <NativeSelect
    style={{background:'white'}}
    onChange={onFilterValueChanged}
    defaultValue={"all"}
  >
            <option value="all">all</option>
            <option value="vegan">vegan</option>
            <option value="vegetarian">vegetarian</option>
  </NativeSelect></>

}
export default FilterGroups