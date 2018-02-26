$(document).ready(function () {
    // Variable to check if player 1 has been selected
    var isClicked = false;
    var fighting = false;

    // Variable to store Health Points
    var p1_health;
    var p2_health;

    // Variable to store selected players
    var player1;
    var player2;

    // Variables for counter attack power
    var counterAttack;
    var attack = Math.floor((Math.random() * 20) + 1);
    var damage = 0;

    $(".characters").on("click", selectPlayer);

    p1_health = parseInt(p1_health);
    p2_health = parseInt(p2_health);


    // Select players to face off against each other
    function selectPlayer() {
        $("#attack").off();
        counterAttack = Math.floor((Math.random() * 20) + 1);

        // If the characther has not been selected, assigned selected character to player 1
        if (isClicked === false) {
            // Find the element with the id healthPoints and assign it to p1_health
            p1_health = $(this).find('p#healthPoints').text();

            $(this).siblings().addClass("enemy");
            $(this).siblings().removeClass("characters");
            $(".enemies").append($(this).siblings());
            $("#player1").html($(this));
            player1 = $(this).attr('name');
            isClicked = true;
            $(".characters").off();

        }
        // Else, assign selected character to player 2
        else {
            // Find the element with the id healthPoints and assign it to p1_health
            p2_health = $(this).find('p#healthPoints').text();

            $(this).removeClass("enemy");
            $(this).addClass("defender");
            $("#player2").html($(this));
            player2 = $(this).attr('name');

            // Stop listening for event trigger
            $(".enemy").off();
            $(".characters").off();
            $("#attack").on("click", characterFight);
        }

        return;
    }

    // Battle function
    function characterFight() {
        damage += attack;

        p2_health -= damage;
        p1_health -= counterAttack;

        console.log("Attack: " + attack + " Damage: " + damage + " Counter: " + counterAttack);

        $("#player1").find("p#healthPoints").text(p1_health);
        $("#player2").find("p#healthPoints").text(p2_health);

        $("#status").html("You attacked " + player2 + " for " + damage + " damage.\r" + player2 + " attacked you back for " + counterAttack + " damage.");

        if (p2_health <= 0 && p1_health > p2_health) {
            // $("#status").empty();
            $("#status").text("You have defeated " + player2 + ", choose another opponent.");
            gameWon();
        }
        if (p1_health <= 0 && p1_health < p2_health) {
            $("#status").html("You have been defeated...GAME OVER!!!");
            isClicked = false;
            gameLost();
        }
        return;
    }


    // Remove gameWon player from game and display button to start new game with existing characters
    function gameWon() {
        var noPlayer2 = true;
        $("#attack").off();
        $("#player2").empty();
        $(".enemy").click(selectPlayer);
    }


    function gameLost() {
        var noPlayer1 = true;
        $("#attack").off();
        $("div.defender").off();
        $("#player1").empty();
        $("#player1").append('<button id="restart">Restart Game</button>');
        $("#attack").click(function () {
            if (noPlayer1) {
                $("#status").text("Please restart game to continue.");
            }
        });
        $("#restart").click(function () {
            location.reload();
        });
    }
});