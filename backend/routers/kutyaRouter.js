import express from "express"
import { body, validationResult } from 'express-validator';
import Kutya from "../models/KutyaModel.js"


const kutyaRouter = express.Router()


kutyaRouter.get("/", async (req,res)=>{
	const kutyak = await Kutya.find().populate('gazda')
	res.send(kutyak)
})

kutyaRouter.get("/getKutyaById",body('kutyaId').notEmpty(),async(req,res)=>{

	const errors = validationResult(req)

	if(!errors.isEmpty())
		return res.status(400).json({errors: errors.array()})


	Kutya.findById(req.body.kutyaId).populate('gazda').then(kutya => res.json(kutya)).catch(error => res.status(400).json({error: "Orszag not found!"}))



})

kutyaRouter.post("/createKutya",body('name').notEmpty(),body('fajta').notEmpty(),body('neme').notEmpty(),body('gazdaId').notEmpty(),async(req,res)=>{

	const errors = validationResult(req)

	if(!errors.isEmpty())
		return res.status(400).json({errors: errors.array()})
	


	Kutya.count({name:req.body.name},function(error,count){
		if(count!=0){
			res.status(500).json("Ez a kutya már létezik!")
			return
		}else{
			Kutya.create({
				name: req.body.name,
				fajta: req.body.fajta,
				neme: req.body.neme,
				gazda: req.body.gazdaId
			}).then(kutya => res.json(kutya)).catch(error => res.status(500).json(error))
		}

	})

	})

	


	kutyaRouter.delete("/deleteKutya",body('kutyaId').notEmpty(),async(req,res)=>{

	const errors = validationResult(req)

	if(!errors.isEmpty())
		return res.status(400).json({errors: errors.array()})

	Kutya.deleteOne({_id:req.body.kutyaId}).then(()=>{res.status(200).json("Deleted kutya: "+res.body.kutyaId)}).catch(error => res.status(500).json(error))

})

kutyaRouter.patch("/updateKutya",body('kutyaId').notEmpty(),async(req,res)=>{

	const errors = validationResult(req)

	if(!errors.isEmpty())
		return res.status(400).json({errors: errors.array()})



	Kutya.findByIdAndUpdate(req.body.kutyaId, req.body, {new: true}).then((kutya) => {
		if (!kutya) {
			return res.status(404).send();
		}
		res.send(kutya);
	}).catch((error) => {
		res.status(500).send(error);
	})	

})

	


export default kutyaRouter