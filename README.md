# Soltice Programming Test by Lee Harris

### Overview:

This is a pair of programs used to generate and solve math expressions.

The Consumer is a server which accepts expressions through a socket. It calculates the expressions, logs them to console, then returns the answer to the Producer.

The Producer is an application which connects to a Consumer server. It generates expressions based on preset values or it can be altered through command line arguments.

### Instructions:

1. Run `node Consumer.js`
2. You can either:
  1. Run `node Producer.js` with 3 command line arguments. Example: `node Producer.js 100 1 5000` 
    * Argument 1 : How many expressions are generated & sent.
    * Argument 2 : The smallest integer used for an expression.
    * Argument 3 : The largest integer used for an expression.
  2. Run `node Producer.js` and use the default arguments.
    * Default Number of Expressions: 20,000
    * Default Smallest Integer: 1
    * Default Largest Integer: 10,000
