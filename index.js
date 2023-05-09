const express = require('express');

const cors = require('cors');
const app = express();


app.use(cors());


app.use(express.json());

var id = 10003;

var products = [{
    id:10001,
    name: "Oven",
    description : "Basic electrical appliance used in cooking",
    price: 60000.00,
    category: "Cooking"
},{
    id:10002,
    name: "Ceiling-Fan",
    description : "Electrical fan placed on ceiling",
    price: 4000.50,
    category: "Daily Life"
}];

app.get('/products',(req,res)=>{
    try{
        return res.status(200).json({
            status: "success",
            products : products
        })
    }catch(e){
        return res.status(400).json({
            status: "failed",
            message: e.message
        })
    }
    
})

app.get("/products/:id",(req,res)=>{
    try{
        console.log(req.params.id);
        const result = products.find((e)=>{
            if(e.id==req.params.id){
                return e;
            }
        })
        console.log(result);
        if(!result){
            return res.status(400).json({
                status:"Failed",
                message: "No product found with the given id"
            })
        }else{
            return res.status(200).json({
                status:"Success",
                product: result
            })
        }
    }catch(e){
        return res.status(400).json({
            status: "failed",
            message: e.message
        })
    }

})

app.post("/products",(req,res)=>{
    try{    
        const reqBody = req.body;
        console.log(reqBody);
        console.log(typeof(reqBody.name));
        if(typeof(reqBody.name)==="string" && typeof(reqBody.description)==="string" && typeof(reqBody.price)==="number" && typeof(reqBody.category)==="string"   ){
            const newProd = {
                id : id,
                ...reqBody
            }
            id++;
            products.push(newProd);
            return res.status(200).json({
                status:"Success",
                newProduct : newProd
            })
        }else{
            return res.status(400).json({
                status:"Failed",
                message: "Give product details in valid format"
            })
        }
        
    }catch(e){
        return res.status(400).json({
            status: "failed",
            message: e.message
        })
    }
   
})

app.put("/products/:id",(req,res)=>{
    try{
        // console.log(req.params);
        var index = products.findIndex(x=>x.id==req.params.id);
        if(index!== -1){
            for ( const key in req.body){
                products[index][key] = req.body[key];
            }
            console.log(products[index]);
            return res.status(200).json({
                status: "Succcess",
                updatedProduct : products[index]
            })
        }else{
            return res.status(404).json({
                status : "Failed",
                message: "id not found"
            })
        }
        
    }catch(e){
        return res.status(400).json({
            status: "failed",
            message: e.message
        })
    }
   
})

app.delete("/products/:id",(req,res)=>{
    try{
        var index = products.findIndex(x=>x.id==req.params.id);
        if(index!==-1){
            products.splice(index,1);
            return res.status(200).json({
                status:"Success",
                message : "product deleted successfully"
            })
        }else{
            return res.status(404).json({
                status:"Failed",
                message:"id not found"
            })
        }
        

    }catch(e){
        return res.status(400).json({
            status: "failed",
            message: e.message
        })
    }
})

app.listen(5000,()=>{
    console.log('Server is up at 5000');
})