<template>
  <div class="Contact">
    <h1>Contactformulier voor beheerder</h1>
    <h2>Heb je feedback betreffende de website of catalogus? verstuur ze hier!</h2><br>

    <div class="forms-container">
      <form class="feedback-form">
        <label for="name">Voornaam:</label><br>
        <input type="text" id="first_name" name="first_name"><br>

        <label for="name">Achternaam:</label><br>
        <input type="text" id="last_name" name="last_name"><br>

        <label for="feedback">Feedback:</label><br>
        <textarea id="feedback" name="feedback" draggable="false"></textarea><br><br>

        <input type="submit" value="Verzenden" class="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-lime-500  hover:bg-lime-600 rounded-md h-fit" title="Send Feedback">
      </form>

      <form class="book-recommendation-form">
        <label for="book_title">Titel van het boek:</label><br>
        <input type="text" id="book_title" name="book_title"><br>

        <label for="author">Auteur:</label><br>
        <input type="text" id="author" name="author"><br>

        <label for="isbn">Isbn:</label><br>
        <input type="number" id="isbn" name="isbn" placeholder="0000000000000"><br><br>

        <input type="submit" value="Verzenden" class="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-lime-500  hover:bg-lime-600 rounded-md h-fit" title="Send Book Recommendation">
      </form>
    </div>

  </div>
</template>

<style>
.Contact {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.forms-container {
  display: flex;
  justify-content: center;
}

.feedback-form, .book-recommendation-form {
  margin: 0 100px;
}
textarea {
  height: 150px;
  width: 100%;
  resize: vertical;
}
h1 {
  font-size: 30px !important;
}
h2 {
  font-size: 25px !important;
}
input[type="text"], input[type="number"] {
  width: 400px;
}
</style>
