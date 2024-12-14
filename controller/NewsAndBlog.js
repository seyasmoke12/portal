const path = require("path")

const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

const getBlog = async (req,res)=>{
    try {
        const data = await prisma.blog.findMany();
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

const getBlogById = async (req,res)=>{
    if(!req.params) {
        res.status(400).json({error:"id required"})
        }
    try {
        const blogId = await prisma.blog.findUnique({
            where:{
                id: Number(req.params.id)
            }
        })
        if (!blogId) {
    return res.status(404).json({ error: 'blog and news not found' });
    }
        res.status(200).json(blogId)
    } catch (error) {
        res.status(404).json({msg: error.message});
    }
}


const createBlogItem = async (req, res) => {
    const {title,description} = req.body
    const image = req.file?.filename;
    try{
        if(!title || !description || !image){
            res.status(400).json({msg:"fill all required fillds"})
            return
        }
        
    const blog = await prisma.blog.create({
        data: { title:title, description:description,image:image, },
    })
    res.status(200).json(blog)
    console.log(blog)
    } catch(error){
        console.error(error)
        res.status(400).json({msg:"create blog faild, plase try agin later"})
    }
};


const updateBlog = async(req,res)=>{
    const {title,description} = req.body;
    try {
        const image = req.file?.filename;
        const updateBlog = await prisma.blog.update({
            where:{
                id: Number(req.params.id)
            },
            data:{
                title:title,
                image:image,
                description:description,
            }
        })
        res.status(200).json(updateBlog)
    } catch (error) {
        res.status(400).json({msg:"update failed"})
    }
}

const deleteBlog = async (req,res)=>{
    try{
        const service = await prisma.blog.delete({
            where:{
                id: Number(req.params.id)
            }
        })
        if (!service) {
      return res.status(404).json({ error: 'blog not found' });
    }
        res.status(200).json(service)
    } catch(error){
        res.status(400).json({msg: error.message})
    }
}



module.exports = {getBlog,createBlogItem,updateBlog,getBlogById,deleteBlog}