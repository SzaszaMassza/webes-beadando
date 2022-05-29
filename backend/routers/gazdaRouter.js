import Gazda from "../models/GazdaModel.js"
import express from "express"
import { body, validationResult } from 'express-validator';

const gazdaRouter = express.Router()

gazdaRouter.get("/", async (req,res)=>{
	const gazdak = await Gazda.find()
	res.send(gazdak)
})


gazdaRouter.get("/getGazdaById",body('gazdaId').notEmpty(),async(req,res)=>{

	const errors = validationResult(req)

	if(!errors.isEmpty())
		return res.status(400).json({errors: errors.array()})


		Gazda.findById(req.body.gazdaId).then(
		gazda => {
			if(gazda!=null){
				res.json(gazda)
			}
		

		}
		).catch(error => {
	
			res.status(500).json({error: "Miniszterelnök nem található!"})
		})

})

gazdaRouter.post("/createGazda",body('name').notEmpty(),body('szuletesidatum').notEmpty(),async(req,res)=>{

	const errors = validationResult(req)

	if(!errors.isEmpty())
		return res.status(400).json({errors: errors.array()})
	


	Gazda.count({name:req.body.name},function(error,count){
		if(count!=0){
			res.status(500).json("Ez a miniszterelnök már létezik!")
			return
		}else{
			Gazda.create({
				name: req.body.name,
                szuletesidatum: Date.parse(req.body.szuletesidatum)
			}).then(gazda => res.json(gazda)).catch(error => res.status(500).json(error))
		}

	})

})

gazdaRouter.delete("/deleteGazda",body('gazdaId').notEmpty(),async(req,res)=>{

	const errors = validationResult(req)

	if(!errors.isEmpty())
		return res.status(400).json({errors: errors.array()})

	Gazda.deleteOne({_id:req.body.gazdaId}).then(()=>{res.status(200).send()}).catch(error => res.status(500).json(error))

})

gazdaRouter.patch("/updateGazda",body('gazdaId').notEmpty(),async(req,res)=>{

	const errors = validationResult(req)

	if(!errors.isEmpty())
		return res.status(400).json({errors: errors.array()})



	Gazda.findByIdAndUpdate(req.body.gazdaId, req.body, {new: true}).then((gazda) => {
		if (!gazda) {
			return res.status(404).send();
		}
		res.send(gazda);
	}).catch((error) => {
		res.status(500).send(error);
	})	

})

export default gazdaRouter