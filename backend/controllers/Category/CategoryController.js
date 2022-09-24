const expressAsyncHandler = require("express-async-handler");
const Category = require("../../model/category/category");
const validateMongodbId = require("../../utils/validateMongodbID");



const categoryCtrl = expressAsyncHandler(async (req,res)=>{ 
    try {
        const category =await Category.create({
            user:req?.user?._id,
            title:req?.body?.title,
        });
        res.json({category})
    } catch (error) {
        res.json(error)
    }
})

const fetchCategoriesCtrl= expressAsyncHandler(async(req,res)=>{
try {
    const Categories=await Category.find({})
    .populate("user")
    .sort("-createdAt")
    res.json(Categories)
} catch (error) {
    res.json(error)
}
})

const fetchcategoryctrl = expressAsyncHandler(async(req,res)=>{
    const {id}= req.params
    validateMongodbId(id);

    try {
        const category = await Category.findById(id).populate('user');
        res.json(category);
    } catch (error) {
        res.json(error)
    }
})

const categoryUpdateCtrl = expressAsyncHandler(async (req,res)=>{
    const {id}=req.params;
    validateMongodbId(id);
    try {
        const category = await Category.findByIdAndUpdate(id,{
            title: req?.body?.title,
        },{
            new:true,
        })
        res.json(category)
    } catch (error) {
        res.json(error);
        
    }
})

 const deleteCategoryCtrl = expressAsyncHandler(async (req,res)=>{
    const {id}=req.params
    validateMongodbId(id);
    try {
        const category = await Category.findByIdAndDelete(id)
        res.json(category);
    } catch (error) {
        res.json(error)
    }
 })

module.exports = {categoryCtrl,fetchCategoriesCtrl,fetchcategoryctrl,categoryUpdateCtrl,deleteCategoryCtrl}