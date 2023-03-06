function createUser() {
    // Formulier uitlezen
            let nameInvoer = document.getElementById('name').value
            let emailInvoer = document.getElementById('email').value

            let newUser = {
                name: nameInvoer,
                email: emailInvoer
            }

            fetch("http://localhost:8080/user/create", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            })
        }