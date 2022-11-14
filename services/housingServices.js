const Housing = require('../models/Housing');

exports.getAll = () => Housing.find();
exports.create = (publicData) => Housing.create(publicData);
exports.getOne = (houseId) => Housing.findById(houseId);
exports.getOneDetails = (houseId) => Housing.findById(houseId).populate('owner');
exports.updateOne = (houseId, publicData) => Housing.updateOne({ _id: houseId }, { $set: publicData }, { runValidators: true });
exports.delete = (houseId) => Housing.deleteOne({ _id: houseId });