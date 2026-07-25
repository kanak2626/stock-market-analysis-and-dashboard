 import React, { useEffect, useState } from "react";
import { getStockQuote } from "../services/api";


function DataCard({symbol,title}){


const [stock,setStock]=useState(null);

const [loading,setLoading]=useState(true);

const [error,setError]=useState("");




useEffect(()=>{

loadStock();

},[symbol]);





const loadStock=async()=>{


try{


setLoading(true);


const data = await getStockQuote(symbol);



if(!data){

throw new Error();

}



setStock(data);

setError("");



}

catch(error){


console.log(error);

setError("Unable to fetch stock");


}

finally{

setLoading(false);

}



};






if(loading)

return(

<div className="dashboard-card text-center">

<h5>{title}</h5>

<p>
Loading...
</p>

</div>

);






if(error)

return(

<div className="dashboard-card text-center">

<h5>{title}</h5>

<p className="text-danger">

{error}

</p>

</div>

);






const change =

Number(stock.percent_change || 0);





return(


<div className="dashboard-card">



<h5>

{title}

</h5>



<p className="text-muted">

{stock.symbol}

</p>




<h2 className="market-price">

${Number(stock.close || 0).toFixed(2)}

</h2>




<div className="row text-center mt-3">


<div className="col-6">

<small>
Open
</small>

<h6>

${stock.open || "-"}

</h6>


</div>



<div className="col-6">

<small>
Previous
</small>

<h6>

${stock.previous_close || "-"}

</h6>


</div>



</div>





<div className="row text-center mt-3">


<div className="col-6">

<small>
High
</small>

<h6>

${stock.high || "-"}

</h6>


</div>




<div className="col-6">

<small>
Low
</small>

<h6>

${stock.low || "-"}

</h6>


</div>



</div>





<p

className={

change>=0

?

"profit"

:

"loss"

}

>


{change>=0?"▲":"▼"}

{change}%


</p>



</div>


);


}



export default DataCard;
