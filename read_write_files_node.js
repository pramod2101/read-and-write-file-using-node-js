const http=require('http');
const fs=require('fs')
const server=http.createServer((req,res)=>{
    // console.log(req.url,req.method,req.headers);
    
    if(req.url==='/'){
        fs.readFile('message.txt', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            }
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>')
        res.write('<title>hello message</title>')
       
        res.write('<body>')
        if (data) {
            res.write(`<p>${data}</p>`); // Display message if exists
        }
        res.write('<form action="/message" method="POST"><input type="text><button type="submit" name="message">send</button></form></body>')
        res.write('</html>')
        return res.end()
        });
    }

    else if(req.url==='/message' && req.method==="POST"){
        const body=[];
        req.on("data",(chunk)=>{
            console.log(chunk);
            body.push(chunk);
            
        })
        return req.on("end",()=>{
            const parsedBody=Buffer.concat(body).toString();
            // console.log(parsedBody);
            const message=parsedBody.split("=")[1];
            fs.writeFile("message.txt",message, err=>{
                res.statusCode=302;
                res.setHeader("Location","/");
                return res.end() 
                
            });
           
        });
    }
    else{
    res.setHeader('Content-Type','text/html')
    res.write('<html>')
    res.write('<title>node server</title>')
    res.write('<body><h1>Hello from node server</h1></body>')
    res.write('</html>')
    res.end()
    }
})
server.listen(3000)