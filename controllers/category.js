const Category = require('../models/category')
const {errorHandler} = require('../helpers/dbErrorHandler')

exports.create = (req,res) => {
    const category = new Category(req.body)
    category.save((err,data)=>{
        if(err || !data) {
            res.status(400).json({
                error : errorHandler(err)
            })
        }
        res.json({data})
    })
}

exports.categoryById = (req,res,next,id)=>{
    Category.findById(id).exec((err,category)=>{
        if (err) {
            return res.status(400).json({
                error : "Category not found"
            })
        }
        req.category = category
        next()
    })
}

exports.remove = (req,res) =>{
    let category = req.category
    category.remove((err,result)=>{
        if (err) {
            return res.status(400).json({
                error : errorHandler(err)
            })
        }
        res.json({
            message : "Category has been deleted!"
        })
    })
}

exports.update = (req,res) =>{
    const category = req.category
    category.name = req.body.name
    category.save((err,updated)=>{
        if(err) {
            return res.status(400).json({
                error : "Something gone wrong"
            })
        }
        res.json({updated})
    })
}

exports.read = (req,res) =>{
    return res.json(req.category)
}

exports.list = (req,res) =>{
    Category.find().exec((err,data)=>{
        if (err) {
            return res.status(400).json({
                error : errorHandler(err)
            })
        }
        res.json(data)
    })
}