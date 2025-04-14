let Events=[
    {
        name: "Tổ chức sinh nhật cho Mochi",
        date: "2025-04-24",
        address: "Queen Bee Palace",
        host: "Bố Cường"
    },
    {
        name: "Tổ chức đi du lịch",
        date: "2025-03-08",
        address: "khu du lịch đại nam",
        host: "Mẹ Loan"
    },
    {
        name: "xem duyệt binh Việt Nam",
        date: "2025-2-9",
        address: "Hà Nội",
        host: "Ông nội"
    }
]

const tbodyEl = document.querySelector('tbody')
const formEL = document.querySelector('form')

tbodyEl.innerHTML = `

`

function renderEvent(List = Events){
    let dataHTML = ``;
    for(let i = 0; i < List.length; i++){
        dataHTML += `
            <tr>
                <td>${List[i].name}</td>
                <td>${List[i].date}</td>
                <td>${List[i].address}</td>
                <td>${List[i].host}</td>
                <td>
                    <button type="button" class="btn btn-primary" onclick="loadEvent(${i})">Sửa</button>
                    <button type="button" class="btn btn-danger" onclick="deleteEvent(${i})">Xóa</button>
                </td>
              </tr>
        `
    }
    tbodyEl.innerHTML=dataHTML
}

function addEvent(event){
    event.preventDefault();
    Events.push({
        name: event.target.inputname.value,
        date: event.target.inputdate.value,
        address: event.target.inputaddress.value,
        host: event.target.inputhost.value
    })
    formEL.reset()
    renderEvent()
}

function deleteEvent(index){
    if(confirm('xác nhận xóa')){
        Events.splice(index,1)
        renderEvent()
    }
}

let currentEditIndex = null;
function loadEvent(index){
    formEL.inputname.value=Events[index].name
    formEL.inputdate.value=Events[index].date
    formEL.inputaddress.value=Events[index].address
    formEL.inputhost.value=Events[index].host
    currentEditIndex = index;
}

function editEvent(event){
    event.preventDefault();
    if(currentEditIndex != null){
        Events[currentEditIndex]={
            name: formEL.inputname.value,
            date: formEL.inputdate.value,
            address: formEL.inputaddress.value,
            host: formEL.inputhost.value
        }
    }
    currentEditIndex = null;
    formEL.reset();
    renderEvent()
}

function handleSubmit(event){
    event.preventDefault();
    console.log(currentEditIndex)
    if(currentEditIndex!=null){
        editEvent(event)
    }else{
        addEvent(event)
    }
}

function searchEvent(){
    let eventSearch=document.querySelector(`#searchEvent`).value.toLowerCase()
    let arrayResult=Events.filter((Events) => {
        return Events.name.toLowerCase().includes(eventSearch)
    })
    renderEvent(arrayResult);
}
renderEvent()