<?php
  require("server.php");

  $conn = new mysqli($servername, $username, $password, $dbname);

  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }

  $sql = "SELECT * FROM `notes` WHERE user_id = 1";
  $result = $conn->query($sql);

  if ($result->num_rows <= 0) {
    return;
  }

  while($row = $result->fetch_assoc()) {
    echo "Title: $row[note_title]<br/><textarea>Text: $row[note_text]</textarea>";
  }
  $conn->close();

?>
