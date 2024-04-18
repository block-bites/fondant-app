
    Health Check:
        Endpoint: GET /health
        Description: Check if the service is up and running.
        Response: Plain text message "Service is up and running".
    Run Command:
        Endpoint: POST /run/<command>?<args..>
        Description: Execute a command with optional arguments.
        Parameters:
            command: The command to execute.
            args: Optional command arguments.
        Response: JSON object containing the command result or an error message.
    Get Events:
        Endpoint: GET /cache/events/<node_number>
        Description: Retrieve cached events for a specific node.
        Parameters:
            node_number: The node number.
        Response: JSON array of event strings or a 404 Not Found status if not available.
    Get Deploys:
        Endpoint: GET /cache/deploys/<node_number>
        Description: Retrieve cached deploys for a specific node.
        Parameters:
            node_number: The node number.
        Response: JSON array of deploy strings or a 404 Not Found status if not available.
    Search Events:
        Endpoint: GET /cache/events/<node_number>/search?<query>
        Description: Search for events within the cached events for a specific node.
        Parameters:
            node_number: The node number.
            query: The search query.
        Response: JSON array of matching event strings or a 404 Not Found status if not available.
    Search Deploys:
        Endpoint: GET /cache/deploys/<node_number>/search?<query>
        Description: Search for deploys within the cached deploys for a specific node.
        Parameters:
            node_number: The node number.
            query: The search query.
        Response: JSON array of matching deploy strings or a 404 Not Found status if not available.
    Launch Network:
        Endpoint: POST /launch
        Description: Launch the network.
        Response: JSON object indicating the success status and a message.
    Stop Network:
        Endpoint: POST /stop
        Description: Stop the network.
        Response: JSON object indicating the success status and a message.
    Start Network:
        Endpoint: POST /start
        Description: Start the network.
        Response: JSON object indicating the success status and a message.
    Get Network Status:
        Endpoint: GET /status
        Description: Get the current status of the network.
        Response: JSON object containing the success status and the current network status message.
