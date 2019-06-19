const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
}, {
    timestamps: true
});

let Category = mongoose.model('Category', CategorySchema);
exports.CategorySchema = Category;

exports.CreateCategory = (obj) => {
    let newCategory = new Category({...obj });
    return new Promise((resolve, reject) => {
        newCategory.save((err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
};

exports.UpdateCategory = (_category) => {
    return new Promise((resolve, reject) => {
        Category.update({ _id: _category._id }, _category)
            .exec((err, res) => {
                err ? reject(err) : resolve(res);
            });
    });
};

exports.DeleteCategory = (input) => {
    return new Promise((resolve, reject) => {
        Category.remove({ _id: input.id })
            .exec((err, res) => {
                err ? reject(err) : resolve(res);
            });
    });
};

exports.findAllCategory = (input) => {
    return new Promise((resolve, reject) => {
        Category.find({ _id: input._id }).exec((err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
};

exports.findByIdCategory = (id) => {
    return new Promise((resolve, reject) => {
        Category.findOne({
            _id: id
        }).exec((err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
};

exports.findByQuery = (Query, input) => {
    return new Promise((resolve, reject) => {
        Query = Query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        Category.find({
            $or: [
                { name: new RegExp(Query) }
            ]
        }).exec((err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
};

exports.findByIds = (input) => {
    return new Promise((resolve, reject) => {
        Category.find({ _id: { $in: input.ids } }).exec((err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
};