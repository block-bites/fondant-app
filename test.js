const { CasperServiceByJsonRPC, CLPublicKey } = require('casper-js-sdk');




async function main() {
    // Initialize the CasperServiceByJsonRPC with the URL of a Casper node
    const casperService = new CasperServiceByJsonRPC('http://localhost:5001');

    try {
        // Example: Get the latest block information
        const latestBlockInfo = await casperService.getLatestBlockInfo();
        console.log('Latest Block Info:', latestBlockInfo);

    } catch (error) {
        console.error('Error:', error);
    }
}

// Execute the main function
main();
