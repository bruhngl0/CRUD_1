const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const message = document.querySelector('#message')



update.addEventListener('click', _ =>{
    fetch('/quotes', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: 'Garth Vadar',
            quote: 'i find your lack of faith disturbing.'
        })  
     })

     .then(res=> {
        if(res.ok) return res.json()
        })
    
    .then(response =>{
       window.location.reload(true)
         })
  
})

deleteButton.addEventListener('click' , _ => {
    fetch('/quotes', {
        method: 'delete',
        headers: { 'Content-Type' : 'application/json'},
        body: JSON.stringyfy({
            name: 'mike tyson'
        })
    })
        .then(res=>{
            if(res.ok) return res.json()
        })
        .then(data => {
            window.location.reload()
        })
})