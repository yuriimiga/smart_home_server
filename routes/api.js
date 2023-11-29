var express = require('express');
var router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()

router.get('/get_all_devices', async function(req, res, next) {
    res.send(await prisma.device.findMany())
});

router.get('/get_all_favorite_devices', async function(req, res, next) {
    res.send(await prisma.device.findMany({where: {favorite: true}}))
});

router.post('/find', async function(req, res,next){
    let query = {where:{

        }};
    if(req.body.id !== "all"){
        query.where.id = {in: req.body.id};
    }
    if(req.body.status !== "all"){
        query.where.status = req.body.status;
    }
    if(req.body.room !== "all"){
        query.where.room = {in: req.body.room};
    }
    if(req.body.name !== ''){
        query.where.name = {contains: req.body.name};
    }
    try{
        res.send(prisma.device.findMany(query));
    } catch (e){
        e.status = 500;
        next(e);
    }
})
router.post('/create', async function(req, res, next){
    let data = req.body;
    const prisma_req = {room: {connect: {id: data.roomId}}, ...data.body}
    data.status = true;
    try{
        res.send(await prisma.device.create({data: prisma_req}));
    } catch (e){
        e.status = 500;
        next(e);
    }
})
router.post("/delete", async function (req, res, next){
    try{
        res.send(await prisma.device.delete({where: {id: req.body.id}}));
    } catch (e){
        e.status = 500;
        next(e);
    }
})
router.post("/update", async function (req, res, next){
    let data = req.body;
    try{
        res.send(await prisma.device.update(data));
    } catch (e){
        e.status = 500;
        next(e);
    }
})

router.get('/get_all_rooms', async function(req, res, next) {
    res.send(await prisma.room.findMany())
});

router.post('/get_devices_in_room', async function(req, res,) {
    const prisma_res = await prisma.device.findMany({where : {roomId: req.body.id}});
    res.send({devices: prisma_res, roomName: (await prisma.room.findUnique({where: {id: req.body.id}})).name});
});

router.post('/create_room', async function(req, res, next){
    let data = req.body;
    try{
        res.send(await prisma.room.create({data: data}));
    } catch (e){
        e.status = 500;
        next(e);
    }
})
router.post("/delete_room", async function (req, res, next){
    try{
        const delete_devices = prisma.device.deleteMany({where: {roomId: req.body.id}});
        const delete_room = prisma.room.delete({where: {id: req.body.id}});
        res.send(await prisma.$transaction([delete_devices, delete_room]));
    } catch (e){
        e.status = 500;
        next(e);
    }
})
router.post("/update_room", async function (req, res, next){
    let data = req.body;
    try{
        res.send(await prisma.room.update({where: {id: data.id}, data: data.data}));
    } catch (e){
        e.status = 500;
        next(e);
    }
})

router.post("/get_devices_with_category", async function(req, res, next) {
    let data = req.body;
    try{
        res.send(await prisma.device.findMany({where: data}));
    } catch (e){
        e.status = 500;
        next(e);
    }
})

module.exports = router;