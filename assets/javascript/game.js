$(document).ready(function () {
    // Variable to check if player 1 has been selected
    var isClicked = false;

    // Variable to store Health Points
    var p1_health;
    var p2_health;

    // Variable to store selected players
    var player1;
    var player2;

    // Variables for counter attack power
    var counterAttack = Math.floor((Math.random() * 20) + 1);
    var attack = Math.floor((Math.random() * 10) + 1);


    $(".characters").click(selectPlayer);

    p1_health = parseInt(p1_health);
    p2_health = parseInt(p2_health);

    $("#attack").click(characterFight);

    // Select players to face off against each other
    function selectPlayer(player) {
        // If the characther has not been selected, assigned selected character to player 1
        if (isClicked === false) {
            // Find the element with the id healthPoints and assign it to p1_health
            p1_health = $(this).find('p#healthPoints').text();

            $(this).siblings().addClass("enemy");
            $(".enemies").append($(this).siblings());
            $("#player1").html($(this));
            player1 = $(this).attr('name');

            isClicked = true;
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
            $(".characters").off();
        }
        // characterFight();

        return player;
    }

    // Battle function
    function characterFight() {
        p2_health -= attack;
        p1_health -= counterAttack;

        var health1 = $("#player1").find("#healthPoints").text(p1_health);
        var health2 = $("#player2").find("#healthPoints").text(p2_health);

        $("#status").html("You attacked " + player2 + " for " + attack + " damage.\r" + player2 + " attacked you back for " + counterAttack + " damage.");

        attack += attack;

        if (p2_health <= 0) {
            $("#status").empty();
            $("#status").html("You win!");
            // create a new function that will create the button below, and remove the child element
            // $("#status").append().html('<button id="next_game">Next Game</button>');
        }
        if (p1_health <= 0) {
            $("#status").html("You have been defeated...GAME OVER!!!")
        }
    }
});