const URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const droupdowns = document.querySelectorAll(".droupdown select")
const btn=document.querySelector("button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const dispRate=document.querySelector(".msg");
let amut=document.querySelector("input");

for (select of droupdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText=currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }
        if (select.name==="to" && currCode==="INR") {
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evnt)=>{
        flagChange(evnt.target)
    })
}


let flagChange=(element)=>{
    let currCode=element.value;
    let countCode=countryList[currCode];
    let countryFlag=`https://flagsapi.com/${countCode}/shiny/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=countryFlag;
}

btn.addEventListener("click", async(evnt)=>{
    evnt.preventDefault();
    
    let amutValue=amut.value;
    if (amutValue ==0 || amutValue < 1) {
        amut.value=1;
        amutValue=1;
    }
    console.log(fromCurr.value, toCurr.value );
    const updateURl=`${URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response=await fetch(updateURl);
    let data=await response.json();
    let rate=data[toCurr.value.toLowerCase()]
    console.log(rate);
    dispRate.innerText=`${amut.value} ${fromCurr.value} = ${amutValue*rate} ${toCurr.value}`

})
