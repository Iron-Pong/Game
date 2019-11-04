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
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

    <!-- IronPong CSS -->
    <link rel="stylesheet" href="./styles.css" type="text/css">

    <title>IronPong</title>
</head>

<body id="<?php echo $theme; ?>">
    <div class="container-fluid">
        <div class="row">
            <div class="col-12" id="game-notification">
                <button id="start-game">Start</button>
            </div>
        </div>
        <div class="row" id="main-board">
            <div class="col-3 player-card">
                <div class="row" id="player1">
                    <div class="col-12" id="name">
                        <?php echo strtoupper($player1name); ?>
                    </div>
                    <div class="col-12" id="player-score">
                        <span>0</span>
                    </div>
                </div>
            </div>
            <div class="col-6"><canvas id="game-board" class="<?php echo $theme; ?>-theme" width="600" height="400"></canvas></div>
            <div class="col-3 player-card">
                <div class="row" id="player2">
                    <div class="col-12" id="name">
                        <?php echo strtoupper($player2name); ?>
                    </div>
                    <div class="col-12" id="player-score">
                        <span>0</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" id="footer">
            <div class="col-3 player-controls d-flex flex-column">
                <div class="row">
                    <div class="col-12">Controls</div>
                    <div class="col-12  d-flex justify-content-around">
                        <div><img src="./images/computer_key_A.png"></div>
                        <div><img src="./images/computer_key_Z.png"></div>
                    </div>
                    <div class="col-12 d-flex justify-content-around">
                        <div>Up</div>
                        <div>Down</div>
                    </div>
                </div>
            </div>
            <div class="col-6" id="title">IronPong
                <input type="hidden" value="<?php echo $theme; ?>">
            </div>
            <div class="col-3 player-controls d-flex flex-column">
                <div class="row">
                    <div class="col-12">Controls</div>
                    <div class="col-12  d-flex justify-content-around">
                        <div><img src="./images/computer_key_Arrow_Up.png"></div>
                        <div><img src="./images/computer_key_Arrow_Down.png"></div>
                    </div>
                    <div class="col-12 d-flex justify-content-around">
                        <div>Up</div>
                        <div>Down</div>
                    </div>
                </div>
            </div>
            <!-- IronPong JS -->
            <script src="./script.js"></script>

            <!-- Optional JavaScript -->
            <!-- jQuery first, then Popper.js, then Bootstrap JS -->
            <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
</body>

</html>