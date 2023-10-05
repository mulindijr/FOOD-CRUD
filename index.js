document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/foods')
    .then(res => res.json())
    .then(foods => {
        foods.forEach(food => {
            let foodDiv = document.createElement('div')
            let title = document.createElement('h2')
            title.textContent = food.name
            foodDiv.appendChild(title)
            let foodsDiv = document.querySelector('#foods')
            
            // Create Delete Button and Add EventListener
            let deleteBtn = document.createElement('button')
            deleteBtn.textContent = 'Delete'
            
            deleteBtn.addEventListener('click', () => {
                deleteButton(food.id, food.name)
            })
            foodDiv.appendChild(deleteBtn)

            // Create an Update Form and Add an EventListener
            let updateForm = document.createElement('form')
            updateForm.innerHTML = `
            <input type = 'text' id = 'updateName' placeholder = 'Update Name'>
            <input type = 'submit' id = 'update-button' value = 'update'>
            `
            updateForm.addEventListener('submit', (e) => {
                e.preventDefault()
                let updateVal = e.target.updateName.value
                let updateObj = {
                    name:updateVal
                }
                // Check for invalid and empty input
                if(updateVal.length < 2 && updateVal !==''){
                    alert('Invalid Name')
                    return
                }else if(updateVal === ''){
                    alert('Cannot Submit Blank Entry')
                    return
                }
                updateName(food.id, updateObj)
            })
            foodDiv.appendChild(updateForm)

            // Append the Child Div to the Main Div
            foodsDiv.appendChild(foodDiv)
        });
    })
    .catch((err) => console.log(err))

    // Adding addFood function
    function addFood(){
        let form = document.querySelector('#add-food')
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            let inputVal = e.target.foodinput.value
            let food = {
                name : inputVal
            }

            // Check for invalid and empty input
            if(inputVal.length < 2 && inputVal !==''){
                alert('Invalid Name')
                return
            }else if(inputVal === ''){
                alert('Cannot Submit Blank Entry')
                return
            }

            fetch('http://localhost:3000/foods',{
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/Json'
                },
                body: JSON.stringify(food)
            })
            .then(res => res.json())
            .then(food => {
                console.log('food added')
                window.location.reload(false)
            })
            
        })
    }
    addFood()

    // Adding Delete Function
    function deleteButton(id, name){
        fetch(`http://localhost:3000/foods/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(food => {
            console.log(`${name} delete`)
            window.location.reload(false)
        })
    }

    // Adding Update Function
    function updateName(id, updateObj){
        fetch(`http://localhost:3000/foods/${id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateObj)
        })
        .then(res => res.json())
        .then(food => {
            console.log(`${food.name} updated`)
            window.location.reload(false)
        })
    }

})