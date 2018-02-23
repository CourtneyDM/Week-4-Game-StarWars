$(document).ready(function () {
    // Randomly generate health points for each character
    var character1 = Math.floor((Math.random() * 300));
    var character2 = Math.floor((Math.random() * 300));
    var character3 = Math.floor((Math.random() * 300));
    var character4 = Math.floor((Math.random() * 300));

    // Assign health points to each character
    $("#character1").html(character1);
    $("#character2").html(character2);
    $("#character3").html(character3);
    $("#character4").html(character4);

    $(".characters").on("click", function () {
        $(this).siblings().removeClass("characters");
        $(this).siblings().addClass("enemy");

        $(".enemies").append($(this).siblings());
        $("#player1").prepend($(this));
        // $(this).siblings().detach();
    });

    $(".enemies").on("click", function () {
        $("#player2").append($(this));
        // $(".enemies").append($(this).siblings());
    });
});