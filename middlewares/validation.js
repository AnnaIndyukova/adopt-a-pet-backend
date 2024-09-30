const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validatePetCardBody = celebrate({
  body: Joi.object().keys({
    petNameID: Joi.string().required().max(30).messages({
      "string.max": 'The maximum length of the "petNameID" field is 30',
      "string.empty": 'The "petNameID" field must be filled in',
    }),
    animalType: Joi.string()
      .valid("dog", "cat", "bird", "other")
      .required()
      .messages({
        "any.requared": 'The "animalType" field must be filled in',
        "any.only":
          'The "animalType" field must be one of "dog", "cat", "bird", or "other"',
      }),
    petAge: Joi.string()
      .valid("junior", "adult", "senior")
      .required()
      .messages({
        "any.requared": 'The "petAge" field must be filled in',
        "any.only":
          'The "petAge" field must be one of "junior", "adult", or "senior"',
      }),
    petDescription: Joi.string().required().messages({
      "string.empty": 'The "petDescription" field must be filled in',
    }),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),
    petStatus: Joi.string()
      .valid("available", "notAvailable")
      .required()
      .messages({
        "any.requared": 'The "petStatus" field must be filled in',
        "any.only":
          'The "petAge" field must be one of "available" or "notAvailable"',
      }),
    shelter: Joi.string().required().messages({
      "string.empty": 'The "shelter" field must be filled in',
    }),
    city: Joi.string().required().messages({
      "string.empty": 'The "city" field must be filled in',
    }),
    coordinates: Joi.string().required().messages({
      "string.empty": 'The "coordinates" field must be filled in',
    }),
    shelterEmail: Joi.string().required().email().messages({
      "string.empty": 'The "shelterEmail" field must be filled in',
      "string.email": 'the "shelterEmail" field must be a valid email',
    }),
  }),
});

const validatePetStatus = celebrate({
  body: Joi.object().keys({
    petStatus: Joi.string()
      .valid("available", "notAvailable")
      .required()
      .messages({
        "any.requared": 'The "petStatus" field must be filled in',
        "any.only":
          'The "petAge" field must be one of "available" or "notAvailable"',
      }),
  }),
});

const validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'the "email" field must be a valid email',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
    city: Joi.string().required().messages({
      "string.empty": 'The "city" field must be filled in',
    }),
    coordinates: Joi.string().required().messages({
      "string.empty": 'The "coordinates" field must be filled in',
    }),
    userType: Joi.string().valid("shelter", "petParent").required().messages({
      "any.requared": 'The "userType" field must be filled in',
      "any.only":
        'The "userType" field must be one of "shelter" or "petParent"',
    }),
  }),
});

const validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'the "email" field must be a valid email',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

const validateUserProfileData = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),

    city: Joi.string().required().messages({
      "string.empty": 'The "city" field must be filled in',
    }),
    coordinates: Joi.string().required().messages({
      "string.empty": 'The "coordinates" field must be filled in',
    }),
  }),
});

const validateId = celebrate({
  params: Joi.object().keys({
    petId: Joi.string().hex().length(24).messages({
      "string.hex": 'the "ID" field must be a a hexadecimal value',
      "string.length": 'The  length of the "ID" field must be 24',
    }),
  }),
});

const validateNewsBody = celebrate({
  body: Joi.object().keys({
    articleDate: Joi.string().required().messages({
      "string.empty": 'The "articleDate" field must be filled in',
    }),
    articleCaption: Joi.string().required().messages({
      "string.empty": 'The "articleCaption" field must be filled in',
    }),
    articleText: Joi.string().required().messages({
      "string.empty": 'The "articleText" field must be filled in',
    }),
    articleAuthor: Joi.string().required().messages({
      "string.empty": 'The "articleAuthor" field must be filled in',
    }),
  }),
});

module.exports = {
  validatePetCardBody,
  validatePetStatus,
  validateUserBody,
  validateUserLogin,
  validateUserProfileData,
  validateId,
  validateNewsBody,
};
