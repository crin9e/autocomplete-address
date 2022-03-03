import React, {useEffect, useState} from 'react';

const Model = (props) => {

    // function sortObjectByKeys(o) {
    //     return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
    // }

    const [outputObj, setOutputObj] = useState({});
    const [testObj, setTestObj] = useState(JSON.stringify(outputObj, null, '\t'));
 

    useEffect(() => {
        outputObj.disabled = props.isDisabled;
        outputObj.readonly = props.isReadonly;
        outputObj.required = props.isRequired;
        outputObj.mode = props.isStrict ? 'strict' : 'soft';
        const inputObj = props.suggestionObj.data;
        outputObj.selectedAddress = inputObj
        setOutputObj(outputObj);
        setTestObj(JSON.stringify(outputObj, null, '\t'));
        
      }, [props]);

      console.log(outputObj);


    return (
            <div className='model__container'>
                <h2>Model</h2>
                <div className="suggestionObj">
                    <code className='json-object'>{JSON.stringify(outputObj, null, '\t')}</code>
                </div>
            </div>
    );
};

export default Model;