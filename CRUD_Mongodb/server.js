let httpModule = require ("http");
let fsModule = require("fs");



// POST Method
server = httpModule.createServer((request,response)=>{
    // response.write("<h1>Hello World</h1>")
    if (request.method === "POST" && request.url === "/students"){
       let chunkArray = [];
        request.on("data",(chunk)=>{
            chunkArray.push(chunk);
        })
        request.on("end",()=>{
            // console.log(chunkArray)
            let studentBuff = Buffer.concat(chunkArray);
            let studentObj = studentBuff .toString();
            fsModule.readFile("student.json",(err,fileData)=>{
                // console.log(fileData);
                fileData = fileData.toString();
                let fileDataJsArray = JSON.parse(fileData);
                let studentJsObj = JSON.parse(studentObj);
                studentJsObj.id = (Math.random() * 10000).toFixed(0);
                fileDataJsArray.push(studentJsObj);

                // console.log(fileDataJsArray);
                fsModule.writeFile("student.json" ,JSON.stringify(fileDataJsArray),()=>{
                })
            })
                response.writeHead(200,{
                    "Content.Type": "application/json"
                })
                response.write(JSON.stringify({
                    message:"Student created succesfullly",
                }));
                response.end();
           });
        

    //    GET One Student
    }else if (request.method === "GET" && request.url.includes("/students/")){
        let urlArray = request.url.split("/");
        let id = urlArray[2];
        fsModule.readFile("student.json",(err,data)=>{
            let students = JSON.parse(data.toString());
            let studentObj = students.find(single=>{
                return single.id == id;
            })
            response.writeHead(200,{
                "ContentType": "application/json"
            })
            response.write(JSON.stringify(studentObj));
            response.end();
        })
    
    // GET Method
        }else if(request.method === "GET" && request.url === "/students"){
        fsModule.readFile("./student.json",(err,data)=>{
            if(err){
                return
            }
            // console.log(data);
            response.writeHead(200,{
                "Content.Type" : "application/json"
            });
            response.write(data)
            response.end();
        });
    
    
    // PATCH Method
    
    }else if(request.method === "PATCH" && request.url.includes ("/students")){
        let urlArray =  request.url.split("/");
        let id = urlArray[2];
        let studentChunkArray = [];
        request.on("data",(chunk)=>{
            studentChunkArray.push(chunk)

        })
        request.on("end",()=>{
            let buff = Buffer.concat(studentChunkArray);
            let studentData = buff.toString();
            // console.log(studentData);
            fsModule.readFile("student.json",(err,data)=>{
                // console.log(data);
                let students = JSON.parse(data.toString());
                let studentObj = students.find(single=>{
                    return single.id == id;
                })
                // console.log(studentObj);
                Object.assign(studentObj, JSON.parse(studentData));
                fsModule.writeFile("student.json",JSON.stringify(students),()=>{
                    response.writeHead(201,{
                        "Content.Type":"text/html"
                    })
                    response.write("<h1>Student Updated Sucessfully</h1>");
                    response.end();
                })
            })
        })

        
    }else if(request.method === "DELETE" && request.url.includes("/students")){
        let urlArray = request.url.split("/")
        let id = urlArray[2];
        fsModule.readFile("student.json",(err,data)=>{
            let students = JSON.parse(data.toString());
            students = students.filter(single=>{
                return single.id !== id;
            })
            fsModule.writeFile("student.json",JSON.stringify(students),()=>{
                response.write("student Deleted Sucessfully");
                response.end();
            })
        })
    
    }
});
server.listen(3000,()=>{
    console.log("Server Started...")
})





