 import React, { useEffect, useState } from "react";
import { getStockQuote } from "../services/api";


function PortfolioTable(){


const [portfolio,setPortfolio] = useState([]);


const [stock,setStock] = useState({

    name:"",
    symbol:"",
    quantity:"",
    buyPrice:""

});



// LOAD LOCAL STORAGE

useEffect(()=>{

const saved = localStorage.getItem("portfolio");

if(saved){

setPortfolio(JSON.parse(saved));

}

},[]);




// SAVE

const savePortfolio=(data)=>{

setPortfolio(data);

localStorage.setItem(
"portfolio",
JSON.stringify(data)
);

};




// ADD STOCK

const addStock=()=>{


if(
!stock.name ||
!stock.symbol ||
!stock.quantity ||
!stock.buyPrice
){

alert("Enter all details");
return;

}



const newStock={

id:Date.now(),

name:stock.name,

symbol:stock.symbol.toUpperCase(),

quantity:Number(stock.quantity),

buyPrice:Number(stock.buyPrice),

currentPrice:0

};



savePortfolio([

...portfolio,

newStock

]);



setStock({

name:"",
symbol:"",
quantity:"",
buyPrice:""

});


};






// FETCH LIVE PRICES

useEffect(()=>{


const updatePrices=async()=>{


const updated = await Promise.all(

portfolio.map(async(item)=>{


try{


const data =
await getStockQuote(item.symbol);



return{


...item,

currentPrice:

Number(data.close)


};



}

catch(error){


return item;


}



})


);



setPortfolio(updated);


localStorage.setItem(

"portfolio",

JSON.stringify(updated)

);


};




if(portfolio.length>0){

updatePrices();

}



},[]);






// DELETE

const deleteStock=(id)=>{


const updated = portfolio.filter(

item=>item.id!==id

);


savePortfolio(updated);


};






// CALCULATIONS


const investment=(item)=>{


return (

item.buyPrice *

item.quantity

);


};



const currentValue=(item)=>{


return (

item.currentPrice *

item.quantity

);


};



const profit=(item)=>{


return (

currentValue(item)

-

investment(item)

);


};




const returnPercent=(item)=>{


if(investment(item)===0)

return 0;



return (

profit(item)

/

investment(item)

*

100

);


};






return(


<div className="portfolio-container mt-4">


<h3>

Portfolio Management

</h3>




<div className="row g-3 mt-3 mb-4">


<div className="col-md-3">

<input

className="form-control"

placeholder="Company Name"

value={stock.name}

onChange={(e)=>

setStock({

...stock,

name:e.target.value

})

}

/>

</div>



<div className="col-md-2">


<input

className="form-control"

placeholder="Symbol"

value={stock.symbol}

onChange={(e)=>

setStock({

...stock,

symbol:e.target.value

})

}

/>


</div>




<div className="col-md-2">


<input

className="form-control"

placeholder="Quantity"

type="number"

value={stock.quantity}

onChange={(e)=>

setStock({

...stock,

quantity:e.target.value

})

}

/>


</div>





<div className="col-md-2">


<input

className="form-control"

placeholder="Buy Price"

type="number"

value={stock.buyPrice}

onChange={(e)=>

setStock({

...stock,

buyPrice:e.target.value

})

}

/>


</div>





<div className="col-md-3">


<button

className="add-stock-btn w-100"

onClick={addStock}

>

Add Stock

</button>


</div>



</div>






<div className="table-responsive">


<table className="table table-bordered portfolio-table">


<thead>

<tr>

<th>Stock</th>

<th>Symbol</th>

<th>Quantity</th>

<th>Buy Price</th>

<th>Current Price</th>

<th>Investment</th>

<th>Current Value</th>

<th>Profit/Loss</th>

<th>Return %</th>

<th>Action</th>


</tr>

</thead>



<tbody>


{

portfolio.length===0 ?


<tr>

<td colSpan="10"

className="text-center">

No stocks added yet

</td>

</tr>



:


portfolio.map(item=>(


<tr key={item.id}>


<td>{item.name}</td>


<td>{item.symbol}</td>


<td>{item.quantity}</td>



<td>

${item.buyPrice.toFixed(2)}

</td>



<td>

{

item.currentPrice ?

`$${item.currentPrice.toFixed(2)}`

:

"Loading..."

}

</td>




<td>

${investment(item).toFixed(2)}

</td>




<td>

${currentValue(item).toFixed(2)}

</td>




<td

className={

profit(item)>=0

?

"profit"

:

"loss"

}

>


${profit(item).toFixed(2)}


</td>





<td

className={

returnPercent(item)>=0

?

"profit"

:

"loss"

}

>


{returnPercent(item).toFixed(2)}%


</td>




<td>


<button

className="btn btn-danger btn-sm"

onClick={()=>deleteStock(item.id)}

>

Delete

</button>


</td>



</tr>


))


}



</tbody>


</table>


</div>



</div>


);


}


export default PortfolioTable;
