const mongoose = require('mongoose');
const Review = require('./review');

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function() {
    return this.url.replace('/upload', '/upload/w_200');
})

const opts = {toJSON: {virtuals: true}};

const campGroundSchema = new Schema({
    title: {
        type: String
    },
    images: [ImageSchema],
    geometry: {
        type: {
          type: String, 
          enum: ['Point'],
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
    },
    price: {
        type: Number,
    },
    description: {
        type: String
    },
    location: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
}, opts);

campGroundSchema.virtual('properties.popUpMarkup').get(function() {
    return `<strong><a href = "/campgrounds/${this._id}">${this.title}</a></strong>
            <p>${this.description.substring(0, 30)}...</p>`
});

campGroundSchema.post('findOneAndDelete', async function (campground) {
    if (campground) {
        await Review.deleteMany({
            _id: {
                $in: campground.reviews
            }
        })
    }
})

module.exports = mongoose.model('Campground', campGroundSchema);