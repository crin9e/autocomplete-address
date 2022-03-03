import React, { useState, useEffect } from 'react';

const Options = (props) => {

    const handleDisabledCheckbox = (e) => {
        props.setDisabled(e.target.checked);
    }
    const handleReadonlyCheckbox = (e) => {
        props.setReadonly(e.target.checked);
    }
    const handleRequiredCheckbox = (e) => {
        props.setRequiered(e.target.checked);
    }

    const handleModeSelect = (e) => {
        props.setStrict(e.target.value === 'true' ? true : false);
    }

    return (
        <div className='options'>

            <h2>Options</h2>

            <br/>

            <label htmlFor="disabled">Disabled</label>
            <input type="checkbox" 
            id="disabled" 
            name="disabled"
            value="disabled"
            defaultChecked={false}
            onChange={handleDisabledCheckbox}
            ></input>

            <br/>

            <label htmlFor="readonly">Readonly</label>
            <input type="checkbox" 
            id="readonly" 
            name="readonly"
            value="readonly"
            defaultChecked={false}
            onChange={handleReadonlyCheckbox}
            ></input>

            <br/>

            <label htmlFor="required">Required</label>
            <input type="checkbox" 
            id="required" 
            name="required"
            value="required"
            defaultChecked={true}
            onChange={handleRequiredCheckbox}
            ></input>

            <br/>

            <label htmlFor="mode">Mode</label>
            <select name="mode" id="mode" onChange={handleModeSelect}>
                <option value={true} defaultValue="selected">strict</option>
                <option value={false}>soft</option>
            </select>
        </div>
    );
};

export default Options;