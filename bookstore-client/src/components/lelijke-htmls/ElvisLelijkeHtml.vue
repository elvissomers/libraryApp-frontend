<template>
    Hello world!
    <table id="book-table">
        <tr>
            <td>ISBN:</td>
            <td>Titel:</td>
            <td>Auteur:</td>
        </tr>
    </table>
</template>

<style>


</style>

<script>
    function getAllBooks(){
            fetch('http://localhost:8080/book')
                .then(res => res.json())
                .then(data => {
                    console.log(data)

                    data.forEach(book => {
                        document.getElementById('book-table').innerHTML += `
                        <tr>
                            <td>${book.isbn}</td>
                            <td>${book.title}</td>
                            <td>${book.author}</td>
                        <tr>
                    `
                    })
                })
        }
    getAllBooks()
    
    

</script>