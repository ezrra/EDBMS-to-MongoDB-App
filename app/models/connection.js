var mongoose 	= require('mongoose'),
	Schema 		= mongoose.Schema;

var ConnectionSchema   = new mongoose.Schema({
  name: String,
  type: String,
  host: String,
  username: String,
  password: String,
	created_at: Date,
	updated_at: Date
});

ConnectionSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

module.exports = mongoose.model('Connection', ConnectionSchema);