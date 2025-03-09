const Campground = require('../models/campground');
const { cloudinary } = require('../cloudinary/index');

module.exports.index = async (req, res) => {
    const campGroundList = await Campground.find({});
    res.render('campgrounds/index', { campGroundList })
}

module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new');
}

module.exports.createCampground = async (req, res, next) => {
    const newCampground = new Campground(req.body.campground);
    newCampground.images = req.files.map(file => ({ url: file.path, filename: file.filename }));
    newCampground.author = req.user._id;
    await newCampground.save();
    req.flash('success', "Successfully made a new Campground");
    res.redirect(`/campgrounds/${newCampground._id}`);
}

module.exports.showCampground = async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: "author"
        }
    }).populate('author');
    if (!campground) {
        req.flash('error', 'Cannot find campground');
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/show', { campground });
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
        req.flash('error', 'Cannot find campground');
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/edit', { campground });
}

module.exports.updateCampground = async (req, res) => {
    const { id } = req.params;
    const updatedCampground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    const imgs = req.files.map(file => ({ url: file.path, filename: file.filename }));
    updatedCampground.images.push(...imgs);
    if (req.body.deleteImages) {
        for(let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await updatedCampground.updateOne({
            $pull:
            {
                images:
                {
                    filename:
                    {
                        $in: req.body.deleteImages
                    }
                }
            }
        })
    }
    await updatedCampground.save();
    req.flash('success', "Successfully updated a Campground");
    res.redirect(`/campgrounds/${updatedCampground._id}`);
}

module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', "Successfully deleted a Campground");
    res.redirect('/campgrounds');
}