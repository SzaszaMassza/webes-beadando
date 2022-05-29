import mongoose from "mongoose"

const Kutya = mongoose.Schema({
	name: String,
	fajta: String,
	neme: String,
	gazda: {type: mongoose.Schema.Types.ObjectId, ref:'Gazda'}
},{
	versionKey: false
})


export default mongoose.model('Kutya', Kutya,'Kutya')