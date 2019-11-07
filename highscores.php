<?php

include('config.php');
$playerNameSet = $_GET['player1name'];
$playerScoreSet = $_GET['playerScore'];
$modeSet = $_GET['theme'];

if (isset($_POST['submitscore'])) {
    $playerName = trim(mysqli_real_escape_string($con, $_POST['player1name']));
    $playerScore = trim(mysqli_real_escape_string($con, $_POST['playerScore']));
    $mode = trim(mysqli_real_escape_string($con, $_POST['theme']));
    $submitSuccess = mysqli_query($con, "
		insert ironpong set  
		playerName='$playerName',
		playerScore='$playerScore', 
		mode='$mode'");
    if ($submitSuccess == 1) {
        header('Location:highscores.php');
        exit();
    } else {
        echo '<script>alert("Info Not Successful! Error description: ' . mysqli_error($con) . '")</script>';
    }
}

$query = "
      SELECT
      *
    FROM
      ironpong 
    ORDER BY playerScore DESC";

$search_sql = $con->query($query);
if ($search_sql->num_rows != 0) {
    $search_rs = $search_sql->fetch_object();
    // 					var_dump($searche_rs);exit;
}

?>


<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>IronPong</title>
    <!-- IronPong CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" href="./styles.css" type="text/css">
    <script src="https://kit.fontawesome.com/ea74f168d9.js" crossorigin="anonymous"></script>

</head>

<body id="landing">

    <div class="container">
        <div class="highscores">
            <div class="col-12" id="title">
                <div class="flip-container" ontouchstart="this.classList.toggle('hover');">
                    <div class="flipper">
                        <div class="front">
                            <img src="./images/pong-logo3.png" height="170px">
                        </div>
                        <div class="back">
                            <img src="./images/pong-logo4.png" height="170px">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12" id="sub-title">
                <form action="highscores.php" method="POST">
                    <input type="text" id="player1name" disabled name="player1name" value="<?php echo $playerNameSet; ?>">
                    <input type="text" id="playerScore" disabled name="playerScore" value="<?php echo $playerScoreSet; ?>">
                    <input type="hidden" id="theme" name="theme" value="<?php echo $modeSet; ?>">
                    <input type="submit" id="submitscore" name="submitscore" value="submit">
                </form>
            </div>
            <div class="col-12" id="sub-title">
                Submit Your Highscore
            </div>
            <div class="col-12">
                <table class="table table-dark">
                    <thead>
                        <th>Player Name</th>
                        <th>Player Score</th>
                        <th>Mode</th>
                    </thead>
                    <tbody>
                        <?php if ($search_sql->num_rows != 0) {
                            do { ?>
                                <tr>
                                    <td><?php echo ucwords($search_rs->playerName); ?>
                                    </td>
                                    <td><?php echo $search_rs->playerScore; ?>
                                    </td>
                                    <td><?php echo ucwords($search_rs->mode); ?>
                                    </td>
                                </tr>
                        <?php } while ($search_rs = $search_sql->fetch_object());
                        } ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>




    <!-- IronPong JS -->
    <script src="./script.js"></script>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous">
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous">
    </script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous">
    </script>
</body>

</html>