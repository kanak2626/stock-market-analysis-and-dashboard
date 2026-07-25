// ==========================================
// LOCAL STORAGE HELPERS
// ==========================================


// SAVE DATA

export const saveData = (key, data) => {

    localStorage.setItem(
        key,
        JSON.stringify(data)
    );

};




// GET DATA

export const getData = (key) => {

    const data = localStorage.getItem(key);


    if(data){

        return JSON.parse(data);

    }


    return null;

};




// REMOVE DATA

export const removeData = (key) => {

    localStorage.removeItem(key);

};




// CLEAR ALL STORAGE

export const clearStorage = () => {

    localStorage.clear();

};




// USER LOGIN STORAGE

export const saveUser = (user) => {

    localStorage.setItem(
        "stockvisionUser",
        JSON.stringify(user)
    );

};



export const getUser = () => {


    const user = 

    localStorage.getItem(
        "stockvisionUser"
    );


    return user 
    ? JSON.parse(user)
    : null;


};




// PORTFOLIO STORAGE

export const savePortfolio = (portfolio)=>{


    localStorage.setItem(

        "portfolio",

        JSON.stringify(portfolio)

    );


};



export const getPortfolio = ()=>{


    const portfolio =

    localStorage.getItem(
        "portfolio"
    );



    return portfolio

    ?

    JSON.parse(portfolio)

    :

    [];



};




// REMOVE PORTFOLIO

export const clearPortfolio =()=>{


    localStorage.removeItem(
        "portfolio"
    );


};