$(document).ready(function () {
    var healthPoints;
    var attackPower;
    var counterAttackPower;

    healthPoints = Math.floor((Math.random() * 150) + 200);

    $('.characters').on("click", function () {
        $('.healthPoints').html(healthPoints);
    });
});