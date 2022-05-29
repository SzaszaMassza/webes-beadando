import mongoose from "mongoose"

const Gazda = mongoose.Schema({
	name: String,
	szuletesidatum: Date
},{
	versionKey: false
})

export default mongoose.model('Gazda', Gazda,'Gazda')