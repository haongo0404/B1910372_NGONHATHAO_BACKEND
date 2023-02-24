const req = require("express/lib/request");
const ApiError = require("../api-error");
const ContactService = require("../services/contact.service");
const MongoDB=require("../utils/mongodb.util")

exports.create =async(req,res,next) =>{
    if(!req.body?.name){
        return next(new ApiError(400,"Nmae can not be empty"));
    }
    try {
        const contactService =new ContactService(MongoDB.client);
        const document = await contactService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500,"An error occurred while creating the contact")
        );
    }
};
exports.findALL=async(req,res,next) =>{
    let document=[];
    try {
        const contactService=new ContactService(MongoDB.client);
        const {name}=req.query;
        if(name){
            document=await contactService.findByName(name);
        } else {
            document=await contactService.find({});
        }
    } catch (error) {
        return next(
        new ApiError(500,"An error occur ehile retrieving contacts")
        );
    }
    return res.send(document);
};
exports.findOne=async(req,res,next) =>{
    let document=[];
    try {
        const contactService=new ContactService(MongoDB.client);
        const document=await contactService.findById(req.params.id);
        if(!document){
            return next (new ApiError(404,"contact not found"));

        } 
        return res.send(document);
    } catch (error) {
        return next(
        new ApiError(
            500,
            `error retrieving contact with id=${req.params.id}`
        )
        );
    }
};
exports.update=async(req,res,next)=>{
    if(Object.keys(req.body).length===0){
        return next(new ApiError(400,"Data to update can not be empty"));
    }

    try {
        const contactService=new ContactService(MongoDB.client);
        const document=await contactService.update(req.params.id);
        if(!document){
            return next (new ApiError(404,"contact not found"));

        } 
        return res.send({message: "Contact was seleted duccessfully"});
    } catch (error) {
        return next(
            new ApiError(
                500,
                `error updateing contact with id=${req.params.id}`
            ) 
        );
    }
};
exports.delete=async(req,res,next)=>{
    try {
        const contactService=new ContactService(MongoDB.client);
        const document=await contactService.delete(req.params.id);
        if(!document){
            return next (new ApiError(404,"contact not found"));

        } 
        return res.send({message: "Contact was seleted duccessfully"});
    } catch (error) {
        return next(
            new ApiError(
                500,
                `error retrieving contact with id=${req.params.id}`
            ) 
        );
    }
};
exports.deleteALL=async (_req,res,next) =>{
    try {
        const contactService=new ContactService(MongoDB.client);
        const document=await contactService.deleteALL(); 
        return res.send({message:`${deleteCount} contacts were deleted successfully`,});
    } catch (error) {
        return next(
            new ApiError(
                500,
                "AN error occurred while removing all contacts"
            ) 
        );
    }
};
exports.findALLFavorite=async (_req,res,next) =>{
    try {
        const contactService=new ContactService(MongoDB.client);
        const document=await contactService.findALLFavorite(); 
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500,
                "AN error occurred while retriveing favorite contacts"
            ) 
        );
    }
};