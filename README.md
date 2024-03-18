Forward Proxy
Forward Proxy is a simple forward proxy server implemented in Node.js that allows users to forward HTTP requests to other destinations.

Features
Forward HTTP requests to specified destinations
Specify custom port for the proxy server

Installation
To use the forward proxy server, follow these steps:

Clone the repository:

   git clone <repository_url>

Navigate to the project directory:
cd forward-proxy
Install dependencies:

npm install
Usage
To start the forward proxy server, run the following command:
./forward-proxy.js -p <port>
Replace <port> with the desired port number. If no port is specified, it will default to port 3456.

Once the server is running, you can use a tool like curl to forward HTTP requests. For example:
curl -x http://localhost/:<port> https://www.example.com/
Replace <port> with the port number specified when starting the server, and https://www.example.com/ with the desired destination URL. 

Muhamad Iqbal Faturrahman
