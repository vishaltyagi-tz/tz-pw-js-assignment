function isValidPassword (password)
{
    const lenghOfPassword=8;
    const  message1="Your password is correct";
    const  message2="Number value not allowed";
    const  message3="Your password is Short";
    if (password.length<8)
    {
        return message3
    }
    else if(typeof password=="number"){
        return message2;
    }
    else if(password.length>8)
    {
        return message1
    }
}

console.log(isValidPassword("viraj"));
console.log(isValidPassword("Customerhub987654321"));
console.log(isValidPassword(1234));
