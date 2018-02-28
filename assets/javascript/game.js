$(document).ready(function () {
    /* Global Variables */

    // Start music upon page load
    var audioTrack = new Audio("http://www.dmeb2.com/media/sounds/duelofthefates.mp3");
    audioTrack.play();

    var isClicked = false; // Checks if player 1 has been chosen
    var noEnemy = true; // Checks if player 2 has been chosen

    var p1_health; // Player 1 Health Points
    var p2_health; // Player 2 Health Points

    var player1; // My selected player's name
    var player2; // Selected enemy's name

    var counterAttack; // Stores enemy counter attack power
    var attack = Math.floor((Math.random() * 20) + 1); // Randomly assign number for attack power
    var damage = 0; // Tracks damage enemy has taken

    // Audio sound bites
    var playerSelected_Audio = new Audio("http://www.mediacollege.com/downloads/sound-effects/star-wars/lightsaber/lightsaber_04.wav");
    var lightSaber_Audio = new Audio("http://www.mediacollege.com/downloads/sound-effects/star-wars/lightsaber/lightsaber_01.wav");
    var darthVader_Audio = new Audio("http://www.mediacollege.com/downloads/sound-effects/star-wars/darthvader/darthvader_yourfather.wav");
    var lukeSkywalker_Audio = new Audio("http://www.mediacollege.com/downloads/sound-effects/star-wars/luke/luke_learntheways.wav");
    var obiWanKenobi_Audio = new Audio("http://www.mediacollege.com/downloads/sound-effects/star-wars/obiwan/obiwan_stretchout.wav");
    var darthMaul_Audio = new Audio("http://www.dmeb2.com/media/sounds/atlast.wav");


    // If user clicks "Attack" button without selecting characters,
    // Prompt user to make a selection
    $("#attack").click(function () {
        if (isClicked === false) {
            $("#status").text("Please choose your players.");
        } else return;
    });

    // Listen to the click event on any character and run the selectPlayer function
    $(".characters").on("click", selectPlayer);

    // Change player's health from String data type to Integer data type
    p1_health = parseInt(p1_health);
    p2_health = parseInt(p2_health);


    // Select players to face off against each other
    function selectPlayer() {
        $("#attack").off();
        counterAttack = Math.floor((Math.random() * 20) + 1);


        // If player 1 has not been chosen,
        // Assigned clicked character to player 1
        if (isClicked === false) {

            // Find element with id "healthPoints", assign it to p1_health
            p1_health = $(this).find('p.healthPoints').text();

            $(this).siblings().addClass("enemy");
            $(this).siblings().removeClass("characters");
            $(".enemies").append($(this).siblings());
            $("#player1").html($(this));
            // player1 = $(this).attr('value');
            player1 = $(this).find('p.name');

            playerSelected_Audio.play();

            // Since player1 is chosen, change isClicked flag to "true"
            isClicked = true;

            // Do not allow character(s) to be changed once selected
            $(".characters").off();
        }

        // Otherwise, assign clicked character to player 2
        else {
            // Clear message
            $("#status").empty();

            // Find element with id "healthPoints", assign it to p1_health
            p2_health = $(this).find('p.healthPoints').text();

            $(this).removeClass("enemy");
            $(this).addClass("defender");
            $("#player2").html($(this));
            // player2 = $(this).attr('value');
            player2 = $(this).find('p.name');

            playerSelected_Audio.play();

            // Since player2 is chosen, change noEnemy flag to "false"
            noEnemy = false;

            // Do not allow character(s) to be changed once selected
            $(".enemy").off();
            $(".characters").off();
            $("#attack").on("click", characterFight);
        }
        return;
    }

    // Players Attack
    function characterFight() {
        lightSaber_Audio.play();

        // Store attack power in damage; increment by attack when "Attack" button is clicked
        damage += attack;

        // Update health of both players
        p2_health -= damage;
        p1_health -= counterAttack;

        // Display updated health points for both players
        $("#player1").find("p.healthPoints").text(p1_health);
        $("#player2").find("p.healthPoints").text(p2_health);

        // Show amount of damage each player endured
        $("#status").append().html("<p>You attacked " + player2 + " for " + damage + " damage.</p><br><p>" + player2 + " attacked you back for " + counterAttack + " damage.</p>");

        // If player1's health is greater than player2 health, execute gameWon function
        if (p2_health <= 0 && p1_health > p2_health) {
            gameWon();
        }
        // If player1's health is less than 0 and player2 health, execute gameLost function
        if (p1_health <= 0 && p1_health <= p2_health) {
            gameLost();
        }
        return;
    }

    // Player 1 win
    function gameWon() {

        // Since player2 is not chosen, change noEnemy flag to "true"
        noEnemy = true;
        $("#attack").off();
        $("#player2").empty();

        // Check if there are any remaining enemies
        if ($(".enemy").length > 0) {
            // If enemies remain, prompt user to select another opponent
            $("#status").text("You have defeated " + player2 + ", choose another opponent.");
        } else {

            // Stop background music
            audioTrack.pause();

            // If there are no enemies - play winner audio, end game and display "Restart Game" button
            $(".characters").css({
                "backgroundColor": "#090",
                "color": "#FFF",
                "font-weight": "bold"
            });
            $("#status").css("color", "#090");
            $("#status").text("You win! Click 'Restart Game' button to play again.");
            $("#status").append('<br><button id="restartBtn">Restart Game</button>');
            characterWinAudio(player1);
            $("#restartBtn").click(function () {
                location.reload();
            })
            return;
        }

        // If the attack button is clicked and no player2 is selected, display message to select enemy
        $("#attack").click(function () {
            if (noEnemy) {
                $("#status").text("No enemy selected.");
            }
        });

        // Assigns next enemy as defender
        $(".enemy").click(selectPlayer);
    }

    // Enemy win
    function gameLost() {

        // Stop background music
        audioTrack.pause();
        characterWinAudio(player2);

        // Since player1 is not chosen, change isClicked flag to "false"
        isClicked = false;
        $("#status").text("You have been defeated...GAME OVER!!!").css("color", "#F00");

        // Do not allow character(s) to be changed once game is over
        $("#attack").off();
        $("div.defender").off();
        $(".characters").css({
            "backgroundColor": "#F00",
            "border": "#F00",
            "color": "#FFF",
            "font-weight": "bold"
        });
        $("#restart").append('<button id="restartBtn">Restart Game</button>');

        // If user clicks attack button, prompt to restart game
        $("#attack").click(function () {
            if (isClicked === false) {
                $("#status").text("Please click 'Restart Game' to continue.");
            }
        });

        // Restart game if "Restart Button" is clicked
        $("#restart").click(function () {
            location.reload();
        });
        return;
    }

    // Play soundbyte based on player that wins
    function characterWinAudio(player_audio) {
        switch (player_audio) {
            case "Darth Vader":
                darthVader_Audio.play();
                return;
            case "Darth Maul":
                darthMaul_Audio.play();
                return;
            case "Luke Skywalker":
                lukeSkywalker_Audio.play();
                return;
            case "Obi Wan Kenobi":
                obiWanKenobi_Audio.play();
                return;
            default:
                break;
        }
    }
});