const http = require('http');
const fs = require("fs");

const server = http.createServer((req, res) => {
    // Your code here
    
    // GET /static
    if (req.method === 'GET' && req.url.startsWith('/static')) {
	const reqDataPath = req.url.split('/');
	const dirName = './assets';
	const fileName = reqDataPath.slice(-1).join('');

	let fileContents = null;
	res.statusCode = 200;
	
	// image
	if (fileName.includes('.jpg')) {
	    fileContents = fs.readFileSync(dirName + '/images/' + fileName);	    
	    res.setHeader('content-Type', 'image/jpeg');
	}

	// css
	if (fileName.includes('.css')) {
	    fileContents = fs.readFileSync(dirName + '/css/' + fileName);

	    res.setHeader('content-Type', 'text/css');
	}
	
	return res.end(fileContents, 'utf-8');
    }
    
    const fileContents = fs.readFileSync('./index.html', 'utf-8');

    res.statusCode = 200;
    res.setHeader('content-Type', 'text/html');
    return res.end(fileContents, 'utf-8');
});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));
