import React from 'react';

// destructuring to only get "input" out of props
// "meta" for error handling. It is a built in object
//      of redux-form.

export default ({ input, label, meta : { touched, error } }) => {

    return (

        <div>
            <label>{ label }</label>
            <input style = {{ marginBottom : '5px' }} { ...input } />
            <div className = 'red-text' style = {{ marginBottom : '20px' }}>
                {/* ES6 touched == true, error == true execute error. */}
             { touched && error }
            </div>    
         </div>

    );

}   