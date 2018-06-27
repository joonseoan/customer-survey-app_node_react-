import React from 'react';

// export default (props) => {

    // console.log('"Field" props: ', props);

// destructuring to only get "input" out of props
// "meta" for error handling. It is a built in object
//      of redux-form.

// """~~~~~~~~~~~~ meta : { touched, error} => ES6 desconstructor ********
export default ({ input, label, meta : { touched, error } }) => {

    // Both are same
    //console.log('props in field: ', props);
    console.log('input: ', input);
    console.log('{...input}', {...input});

    // ******** { ...input } in JSX, to accompany with all properites of input
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