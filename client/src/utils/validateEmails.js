// In order to pull out each email from one string list.

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


export default  (emails) =>{

    const emailInvalid = emails
        .split(',') // return object/array
        .map(email => email.trim()) // retunr object/array

        // In order to show the client invalid email list
        // regex.test() return boolean value
        .filter(email => emailRegex.test(email) === false ); 

    // if length is "0" => false
    if (emailInvalid.length) return `${ emailInvalid } are invalid emails.`;

    return;
}