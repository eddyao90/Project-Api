const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { REQUIRED_FIELD, INVALID_FIELD, INVALID_LENGTH } = require('../config/errorMessages');

const ROUNDS = 10;

const EMAIL_PATTERN =
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, REQUIRED_FIELD]
    },
    lastName: {
      type: String,
      required: [true, REQUIRED_FIELD]
    },
    username: {
      type: String,
      required: [true, REQUIRED_FIELD]
    },
    email: {
      type: String,
      required: [true, REQUIRED_FIELD],
      match: [EMAIL_PATTERN, INVALID_FIELD],
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, REQUIRED_FIELD],
      minlength: [8, INVALID_LENGTH],
    },
    alreadyFollowed: {
      type: Boolean,
      default: false
    },
    image: {
      type: String,
      default: "https://res.cloudinary.com/dgnace8dp/image/upload/v1676728201/profile-default_zk16xw.jpg"
    },
    gender: {
      type: String,
      default: 'Prefer not to say',
      enum: ['Female', 'Male', 'Prefer not to say', 'Nonbinary']
  },
  countries: {
    type: String,
    default: 1,
    //required: [true, 'Required'],
  },
  cities: {
    type: String,
    default: 1,
    //required: [true, 'Required'],
  },
  level: {
  type: String,
  default: 'baby Traveler',
  enum: ['Baby Traveler', 'Explorer', 'Nomad', 'Cheap Traveler', 'Food Seeker', 'Adventurer']
  },
  birthday: {
      type: Date,
      //required: [true, 'Birthday is required']
  },
  language: {
      type: String,
      //required: [true, 'At least one language is required']
  },
  looking: {
      type: String,
      default: 'friends',
      //required: [true, 'Required'],
      enum: ["friends", "travel companionship", "travel bussiness partnership"]
  },
  travel: {
      type: String,
      //required: [true, 'Required'],
  },
  activities: {
      type: String,
      //required: [true, 'Required'],
  },
  books: {
      type: String,
      //required: [true, 'Required'],
  },
  music: {
      type: String,
      //required: [true, 'Required'],
  },
  food: {
      type: String,
      //required: [true, 'Required'],
  },
  top3: {
      type: String,
      //required: [true, 'Required'],
  },

  
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
      },
    toObject: { 
        virtuals: true
      },
    }
  }
)

UserSchema.virtual('pin', {
  ref: 'Pin',
  foreignField: 'user',
  localField: '_id',
  justOne: true
})

UserSchema.virtual("follow", {
  ref: "Follow",
  localField: "_id",
  foreignField: "follower",
  justOne: true,
});

UserSchema.virtual("follow", {
  ref: "Follow",
  localField: "_id",
  foreignField: "following",
  justOne: true,
});

UserSchema.virtual("comment", {
  ref: "Comment",
  localField: "_id",
  foreignField: "user",
  justOne: true,
});


UserSchema.virtual("comment", {
  ref: "Comment",
  localField: "_id",
  foreignField: "whoWrote",
  justOne: true,
});

UserSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    bcrypt.hash(this.password, ROUNDS)
      .then((hash) => {
        this.password = hash;
        next()
      })
  } else {
    next()
  }
})

UserSchema.methods.checkPassword = function(passwordToCompare) {
  return bcrypt.compare(passwordToCompare, this.password);
}

const User = mongoose.model('User', UserSchema);

module.exports = User