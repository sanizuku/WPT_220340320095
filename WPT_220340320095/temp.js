const express = require('express');
 const app = express();
 const mysql = require('mysql2');
 app.use(express.static('abc'));

 app.listen(808, function () {
	    console.log("server listening at port 8081...");
 });

 const connection = mysql.createConnection({
    host: 'localhost',
    user: 'sandeep',
    password: 'welcome123',
    database: 'pleasework',
	port:3306
});
console.log("connection successfull")
app.get("/getdetails",(req,resp)=>{
console.log("inside get details");

let bookid=req.query.bookid;
console.log(bookid);


let output={status:false, bookdetails:{bookid:0,bookname:"",price:0}}

connection.query('select * from book where bookid=?',[bookid],(err,rows)=>{
 if(err){
	console.log("error");
 }
 else{
	if(rows.length>0){
		output.status=true;
		output.bookdetails=rows[0];
	}
	else{
		console.log("books detail not found");
	}
 }
 resp.send(output);
 console.log(output);
});

});


app.get("/adddetails",(req,resp)=>{
	console.log("inside add details");
	
	let bookdetails={bookid:req.query.bookid,bookname:req.query.bookname,price:req.query.price}
	
	
	
	let output={status:false};
	
	connection.query('insert into book(bookid,bookname,price) values(?,?,?)',[bookdetails.bookid, bookdetails.bookname, bookdetails.price],(err,res)=>{
	 if(err){
		console.log("error");
	 }
	 else{
		if(res.affectedRows>0){
			
		   console.log("added successfully");
		   output.status=true;
		}
		else{
			console.log("add failed");
		}
	 }
	 resp.send(output);
	 
	});
	
	});
















