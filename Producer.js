var net = require('net');

//For running the program locally we'll setup a server at localhost + port 1337. Change if 1337 is in use.
var HOST = '127.0.0.1';
var PORT = 1337;

var client = new net.Socket();

client.connect(PORT, HOST, function() 
{
    
    console.log('Connection successful: ' + HOST + ':' + PORT);
    
    /*/////////////////
    Runs through possible command line arguments (and sets defaults)
    Argument #1: Amount of expressions to generate.
    Argument #2: Smallest integer to use for expression generation.
    Argument #3: Largest integer to use for expression generation.
    /////////////////*/
    var amountToCalc = 20000;
    var smallestInt = 1;
    var largestInt = 10000;
    process.argv.forEach(function (val, index, array) 
    {
        switch(index)
        {
            case 2:
                amountToCalc = val;
                break;
            case 3: 
                smallestInt = val;
                break;
            case 4:
                largestInt = val;
                break;
        }
    });
    
    //Main loop to generate expressions.
    for (i = 0; i < amountToCalc; i++)
    {
        //Generates two random numbers within the floor/ceiling parameters.
        var num1 = getNumber(smallestInt, largestInt);
        var num2 = getNumber(smallestInt, largestInt);

        //Generates a string expression to send. I didn't use JSON because the test prompt gave a string example, but that would be better.
        var expressionToSend = num1 + "+" + num2 + "=";
        
        //Log sending the expression.
        console.log("Sending expression number " + i + ": " + expressionToSend);

        //Write the expression to the data stream.
        client.write(expressionToSend);
    }
});

client.on('data', function(data) 
{  
    console.log(data.toString());
});

client.on('close', function() 
{
    console.log('Connection closed');
});

function getNumber(min, max) 
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}