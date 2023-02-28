import React from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

function IngredientRow(props) {
    const handleChange = (event) => {
        props.handleRadioButtonChange(props.ingredientName + "/" + event.target.value);
    }
    return (
        <div className='ingredient-row'>
            <div style={{width:'25%', marginLeft:'2%'}}>
                <h3>{props.ingredientName}</h3>
                <h6>Needed quantity: {props.neededAmount}</h6>
                {(!props.quantityTypeMatching) ? <h6 style={{color:'red'}}>Missmatching quantity types!</h6> : <></>}
            </div>
            {props.isDetailsMissing ? 
            (<div>
                <h4 className="cannot-find-details-error">Cannot find ingredient details. Contact with the restaurant for more accurate information!</h4>
            </div>) :
            (<div>
                <FormControl>
                    <RadioGroup 
                        row
                        name="position"
                        defaultValue="medium"
                        onChange={handleChange}
                    >
                            <div style={{width:'300px', textAlign:'center'}}>
                            <FormControlLabel
                                sx={{
                                    '& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root)':
                                        {
                                            color: 'white',
                                        },
                                    '& .MuiSvgIcon-root + .MuiSvgIcon-root': {
                                        color: 'white',
                                    },
                                }}
                                value="low"
                                control={<Radio />}
                                label={<><p>{props.lowQualityName}</p><b>{props.lowQualityPrice}</b></>}
                                labelPlacement="top"
                            />
                            </div>
                            <div style={{width:'300px', textAlign:'center'}}>
                            <FormControlLabel
                                sx={{
                                    '& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root)':
                                        {
                                            color: 'white',
                                        },
                                    '& .MuiSvgIcon-root + .MuiSvgIcon-root': {
                                        color: 'white',
                                    },
                                }}
                                value="medium"
                                control={<Radio />}
                                label={<><p>{props.mediumQualityName}</p><b>{props.mediumQualityPrice}</b></>}
                                labelPlacement="top"
                            />
                            </div>
                            <div style={{width:'300px', textAlign:'center'}}>
                            <FormControlLabel
                                sx={{
                                    '& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root)':
                                        {
                                            color: 'white',
                                        },
                                    '& .MuiSvgIcon-root + .MuiSvgIcon-root': {
                                        color: 'white',
                                    },
                                }}
                                value="high"
                                control={<Radio />}
                                label={<><p>{props.highQualityName}</p><b>{props.highQualityPrice}</b></>}
                                labelPlacement="top"
                            />
                            </div>
                    </RadioGroup>
                </FormControl>
            </div>)}
        </div>
    )
}


export default IngredientRow
