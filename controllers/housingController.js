const router = require('express').Router();
const { isAuth } = require('../middleware/authMiddleware');
const { isPreload, isHouseOwner } = require('../middleware/houseMiddleware');
const housingServices = require('../services/housingServices');

router.get('/', async (req, res) => {
    const housings = await housingServices.getAll().lean();
    res.render('offer', { housings });
});

router.get('/create', (req, res) => {
    res.render('offer/create');
});

router.post('/create', isAuth, async (req, res) => {
    const createdPublicData = { ...req.body, owner: req.user._id };
    await housingServices.create(createdPublicData);

    res.redirect('/');
});

router.get('/:houseId/details' , async (req, res) => {
    
    const house = await housingServices.getOneDetails(req.params.houseId).lean();
    const isOwner = house.owner._id == req.user?._id;

    res.render('offer/details', { house, isOwner });

});


router.get('/:houseId/edit', isAuth, isPreload, isHouseOwner,  (req, res) => {
    res.render('offer/edit', { ...req.house });
});

router.post('/:houseId/edit', isAuth, isPreload, isHouseOwner, async (req, res) => {

    try {
        await housingServices.updateOne(req.params.houseId, req.body);
        res.redirect(`/offers/${req.params.houseId}/details`);

    } catch (error) {
        res.render('offer/edit', { ...req.body, error: (error) });
    }
});

router.get('/:houseId/delete', isAuth, isPreload, isHouseOwner, async (req, res) => {
    await housingServices.delete(req.params.houseId);
    res.redirect('/offers');
});


module.exports = router;
