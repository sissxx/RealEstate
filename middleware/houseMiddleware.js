const housingServices = require('../services/housingServices');

exports.isPreload = async (req, res, next) => {
    const house = await housingServices.getOne(req.params.houseId).lean();
    req.house = house;
    
    next();
};

exports.isHouseOwner = (req, res, next) => {
    if (req.house.owner != req.user._id) {
        return next({ message: 'You are not allowed!', status: 401 });
    };
    
    next();
}