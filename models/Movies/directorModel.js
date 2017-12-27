import mongoose from 'mongoose';

let DirectorSchema = mongoose.Schema(
  {
    first_name: {type: String, required: true, max: 100},
    last_name: {type: String, required: true, max: 100}
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.last_name + ', ' + this.first_name;
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

export default mongoose.model('Director', DirectorSchema);