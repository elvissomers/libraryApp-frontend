<template>
  <div class="Contact">
    <h1>Dit is een contactformulier voor gebruikers een boodschap hebben aan een beheerder van de website</h1>

    <div class="forms-container">
      <form class="feedback-form">
        <label for="name">Voornaam:</label><br>
        <input type="text" id="first_name" name="first_name"><br>

        <label for="name">Achternaam:</label><br>
        <input type="text" id="last_name" name="last_name"><br>

        <label for="feedback">Feedback:</label><br>
        <textarea id="feedback" name="feedback"></textarea><br>

        <input type="submit" value="Verzenden">
      </form>

      <form class="book-recommendation-form">
        <label for="book_title">Titel van het boek:</label><br>
        <input type="text" id="book_title" name="book_title"><br>

        <label for="author">Auteur:</label><br>
        <input type="text" id="author" name="author"><br>

        <label for="isbn">isbn:</label><br>
        <input type="number" id="isbn" name="isbn"><br>

        <input type="submit" value="Verzenden">
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
  margin: 0 10px;
}
textarea {
  height: 150px;
  width: 100%;
  resize: vertical;
}
</style>
