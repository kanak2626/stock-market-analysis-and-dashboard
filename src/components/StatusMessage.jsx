import React from "react";


function StatusMessage({
    type = "info",
    message
}){


    const icons = {

        success:"bi bi-check-circle",

        error:"bi bi-exclamation-triangle",

        loading:"bi bi-arrow-repeat",

        info:"bi bi-info-circle"

    };



    const colors = {

        success:"text-success",

        error:"text-danger",

        loading:"text-primary",

        info:"text-info"

    };



    return(


        <div className="card p-3 text-center">


            <i

            className={

                `${icons[type]} fs-2 ${colors[type]}`

            }

            ></i>




            <h5 className="mt-2">

                {
                    message
                }

            </h5>


        </div>


    );

}



export default StatusMessage;
