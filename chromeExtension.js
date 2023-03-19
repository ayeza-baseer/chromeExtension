let myLeads = []
const inputElement = document.getElementById("input-el")
const saveBtnElement=document.getElementById('input-btn')
const ulElement = document.getElementById("ul-el")
let leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")


console.log(leadsFromLocalStorage)


if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}


deleteBtn.addEventListener("dblclick", function() {
   
    localStorage.clear()
    myLeads = []
    render(myLeads)
})
saveBtnElement.addEventListener('click',function(){
    myLeads.push(inputElement.value)
    inputElement.value=""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
 
})


tabBtn.addEventListener("click", function(){
    console.log('clicked')
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        console.log(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })

})


function render(leads){

    let listItems = ""
for (let i = 0; i < leads.length; i++) {
    listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
}
ulElement.innerHTML = listItems

}
