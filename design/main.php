<?php
$player1name = $_GET['player1name'];

$player2name = $_GET['player2name'];

$theme = $_GET['theme'];

?>

<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="./css/bootstrap.css">

    <!-- IronPong CSS -->
    <link rel="stylesheet" href="./styles.css" type="text/css">

    <title>IronPong</title>
</head>

<body>
    <div class="container-fluid">
        <div class="row" id="title">
            <div class="col-12">
                IronPong
            </div>
        </div>
        <div class="row" id="main-board">
            <div class="col-3 player-card">
                <div class="row" id="player1">
                    <div class="col-12">
                        <?php echo $player1name; ?>
                    </div>
                    <div class="col-12">
                        Score <span>0</span>
                    </div>
                </div>
            </div>
            <div class="col-6" id="game-board">Canvas</div>
            <div class="col-3 player-card">
                <div class="row" id="player2">
                    <div class="col-12">
                        <?php echo $player2name; ?>
                    </div>
                    <div class="col-12">
                        Score <span>0</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" id="footer">
            <div class="col-3 player-controls">
                <div class="row">
                    <div class="col-12">
                        Button Controls
                    </div>
                    <div class="col-12">
                        Up and Down
                    </div>
                </div>
            </div>
            <div class="col-6" id="gameNotification">Message Box</div>
            <div class="col-3 player-controls">
                <div class="row">
                    <div class="row">
                        <div class="col-12">
                            Button Controls
                        </div>
                        <div class="col-12">
                            Up and Down
                        </div>
                    </div>
                </div>
            </div>
            <!-- IronPong JS -->
            <script src="./script.js"></script>

            <!-- Optional JavaScript -->
            <!-- jQuery first, then Popper.js, then Bootstrap JS -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous">
            </script>
            <script src="./js/bootstrap.js"></script>
            <script src="./js/bootstrap.min.js"></script>
</body>

</html>