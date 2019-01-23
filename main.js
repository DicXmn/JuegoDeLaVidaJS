var changeSquare = [];
var changeSquareCounter = 0;
var interval;
var totalSquares = 0;
var rows, columns = 0;

$(document).ready(function(){
    createBoard();
    
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
    addEvents();
}

function addEvents()
{
    $(".square").click(function()
    {
        $(this).toggleClass("active");
    });
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
    $("#clear").click(function()
    {
        $(".square").removeClass("active");
    });
    $("#create").click(function()
    {
        createBoard();
    });
    $("#random").click(function()
    {
        randomFill();
    });
}

function randomFill()
{
    var squaresToActivate = Math.floor((Math.random() * totalSquares) + 1);
    var randomColumn, randomRow = 0;
    $(".square").removeClass("active");
    for (var i=0; i<squaresToActivate; i++)
    {
        randomColumn = Math.floor((Math.random() * columns));
        randomRow = Math.floor((Math.random() * rows));
        $("#"+randomRow+"-"+randomColumn).addClass("active");
    }
}

function startGame()
{
    var currentSquare;
    var currentPosition;
    for (var i = 0; i<rows; i++)
    {
        for (var j = 0; j<columns; j++)
        {
            var activeNeighbour = 0;            
            currentPosition = i+"-"+j;
            currentSquare = $("#"+currentPosition);
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
            
            if (currentSquare.hasClass("active"))
            {
                if (activeNeighbour<2 || activeNeighbour>3)
                    changeSquare[changeSquareCounter] = currentPosition;
                    changeSquareCounter++;
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