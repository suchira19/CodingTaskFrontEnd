# CodingTaskFrontEnd
This project is the client side implementation where user can see the output of the APIs /time and /metrics.
Download the code from this repository and open in VS code.
Run the command npm run start from the terminal
The url http://localhost:300 will show the results.
In the UI on the left hand side top it shows the most recetnly fetched server time and below that there is a time which shows the difference between the most recently fetched server time and the current client time and it keeps on incrementing every second.
There is a recurring call to the APIs every 30 seconds which will update most recently fetched server time and also the metrics data.
