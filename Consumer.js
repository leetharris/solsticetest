var net = require('net');

//For running the program locally we'll setup a server at localhost + port 1337. Change if 1337 is in use.
var HOST = '127.0.0.1';
var PORT = 1337;

net.createServer(function(sock) 
{
    
    console.log('Connected to: ' + sock.remoteAddress +':'+ sock.remotePort);
           
    //Set a buffer to dump the incoming data stream to. 
    var buffer = "";

    sock.on('data', function(data) 
    {

        //Turn the data stream into a string and add it to the buffer.
        buffer += data.toString(); 

        //We use the equals sign ('=') as the delimiter since every expression ends with it.
        delimiter = buffer.indexOf('=');

        //Runs a continuous loop on the current buffer pool. Breaks the buffer into expressions and evaluates each one. 
        while (delimiter > -1) 
        {         
            try 
            {
                //We grab the expression from the buffer and put it into a temporary string.
                var tempString = buffer.substring(0,delimiter);
                console.log("Received the expression: " + tempString + ". Calculating now.")

                //Split the expression using the + character and put them into an array of values.
                var values = tempString.split("+");

                //Calculate the result. The array values must each be cast as a number as it comes originally from a string.
                result = Number(values[0]) + Number(values[1]); 

                //Log the result and return the result to the Producer program.
                console.log("The answer to expression " + tempString + " is " + result + ".");
                sock.write("The answer to expression " + tempString + " is " + result + ".\n");
            }
            catch(err)
            {
                console.log(err);
            }
            buffer = buffer.substring(delimiter+1); 
            delimiter = buffer.indexOf('='); 
        }  
        
    });
    
    sock.on('close', function(data) 
    {
        console.log('Connection closed: ' + sock.remoteAddress +' '+ sock.remotePort);
    });
    
}).listen(PORT, HOST);

console.log('Consumer listening on ' + HOST +':'+ PORT + '. Waiting for expressions.');