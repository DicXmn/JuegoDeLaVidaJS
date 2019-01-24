var changeSquare = [];
var changeSquareCounter = 0;
var interval;
var totalSquares = 0;
var rows, columns = 0;

$(document).ready(function(){
    createBoard();   
    $("#start").click(function()
    {
        if ($(this).text()=="Iniciar")
        {
            interval = setInterval("startGame()",500);
            $(this).text("Detener");
        }
        else
        {
            clearInterval(interval);
            $(this).text("Iniciar");
        }
    });
    $("#clear").click(clearBoard);
    $("#create").click(createBoard);
    $("#random").click(randomFill); 
});

function createBoard()
{
    rows = $("#rows").val();
    columns = $("#columns").val();
    var totalWidth = columns*22;
    totalSquares = rows*columns;
    $("#content").empty();
    $("#content").css({"width":totalWidth+"px"});
    for (var i = 0; i<rows; i++)
    {
        for (var j = 0; j<columns; j++)
        {
            $("#content").append('<div id="'+i+'-'+j+'" class="square"></div>');
        }
    }
    squareClick();
}

function clearBoard()
{
    $(".square").removeClass("active");
}

function squareClick()
{
    $(".square").click(function()
    {
        $(this).toggleClass("active");
    });
}

function randomFill()
{
    var squaresToActivate = Math.floor((Math.random() * totalSquares) + 1);
    var randomColumn, randomRow = 0;
    clearBoard();
    for (var i=0; i<squaresToActivate; i++)
    {
        randomColumn = Math.floor((Math.random() * columns));
        randomRow = Math.floor((Math.random() * rows));
        $("#"+randomRow+"-"+randomColumn).addClass("active");
    }
}

function checkNeighbours(i, j, activeNeighbour)
{
    activeNeighbour = 0;
    if ($("#"+(i-1)+"-"+(j-1)).hasClass("active"))
        activeNeighbour++;
    if ($("#"+(i-1)+"-"+j).hasClass("active"))
        activeNeighbour++;
    if ($("#"+(i-1)+"-"+(j+1)).hasClass("active"))
        activeNeighbour++;
    if ($("#"+i+"-"+(j-1)).hasClass("active"))
        activeNeighbour++;
    if ($("#"+i+"-"+(j+1)).hasClass("active"))
        activeNeighbour++;
    if ($("#"+(i+1)+"-"+(j-1)).hasClass("active"))
        activeNeighbour++;
    if ($("#"+(i+1)+"-"+j).hasClass("active"))
        activeNeighbour++;
    if ($("#"+(i+1)+"-"+(j+1)).hasClass("active"))
        activeNeighbour++;

    return activeNeighbour;
}

function startGame()
{
    var currentSquare;
    var currentPosition;
    var activeNeighbour;
    for (var i = 0; i<rows; i++)
    {
        for (var j = 0; j<columns; j++)
        {
            currentPosition = i+"-"+j;
            currentSquare = $("#"+currentPosition);

            activeNeighbour = checkNeighbours(i, j, activeNeighbour);

            if (currentSquare.hasClass("active"))
            {
                if (activeNeighbour<2 || activeNeighbour>3)
                {
                    changeSquare[changeSquareCounter] = currentPosition;
                    changeSquareCounter++;
                }
            }
            else if (activeNeighbour==3)
            {
                changeSquare[changeSquareCounter] = currentPosition;
                changeSquareCounter++;
            }
        }
    }
    for (var i = 0; i<changeSquareCounter; i++)
    {
        $("#"+changeSquare[i]).toggleClass("active");
        changeSquare[i]=0;
    }
    changeSquareCounter=0;
}