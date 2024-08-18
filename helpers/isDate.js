const moment = require('moment');

const isDate = (value, {req}) => {

    if(!value || isNaN(new Date(value))){         
        return false;     
    }     
    return true; 

    // ! Moment esta desactualizada, este es el enfoque de moment
    //  Si el value no existe que retorne false
    // if(!value) return false;

    // const fecha = moment(value);

    //  isValid() es una función propia de moment 
    // if (fecha.isValid()) {
    //     return true
    // }else{
    //     return false;
    // }

};

module.exports = {
    isDate,
}