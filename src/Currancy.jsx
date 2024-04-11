import { useEffect, useState } from 'react'
import './Currancy.css'

function Currancy() {

  const[amount,Setamount]=useState(1)
  const[from,Setfrom]=useState("USD")
  const[to,Setto]=useState("INR")
  const[data,Setdata]=useState({})
  const[result,Setresult]=useState("")

  useEffect(()=>{
    const API=`https://api.exchangerate-api.com/v4/latest/${from}`
    fetch(API)
    .then((res)=>{
      res.json()
      .then((result)=>{
        Setdata(result.rates)
      })
    })
  },[from])

  useEffect(()=>{
    let join=data[to]
    if (join) {
      let sum=join*amount
      Setresult(sum.toFixed(2))
    }
  },[to,from,amount,data])


  function Change(e) {

    const {name,value}=e.target

    switch (name) {
      case "amount":
        Setamount(value)
        break;

        case "from":
        Setfrom(value)
        break;

        case "to":
        Setto(value)
        break;
    
      default:
        console.log("SELECT RIGHT INFORMATION")
        break;
    }
  }


  return (
    <>
    <div className="hero">

      <div className="box">

      <h3>Currancy converter</h3>

      <input type="number" placeholder='Enter number' value={amount} name='amount'  onChange={Change}  />

      <select name="from" id="sele" value={from} onChange={Change} >
      {
       Object.keys(data).map((e)=>(
          <option value={e} key={e}> {e} </option>
        ))
      }
      </select>

      <i className="fa-solid fa-shekel-sign"></i>

      <select name="to" id="sele" value={to} onChange={Change} >
      {
       Object.keys(data).map((e)=>(
          <option value={e} key={e}> {e} </option>
        ))
      }
      </select>

      <p>FINAL AMOUNT IS : <span> {result} </span>  </p>

      </div>
      
    </div>
    </>
  )
}

export default Currancy