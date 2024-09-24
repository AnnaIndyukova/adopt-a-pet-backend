const Pet = require("../models/pet");

const BadRequestError = require("../errors/BadRequestError");
const NotFoundError = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");

const getPets = (req, res, next) => {
  Pet.find({})
    .then((items) => res.send(items))
    .catch(next);
};

const createPet = (req, res, next) => {
  const {
    petNameID,
    animalType,
    petAge,
    petDescription,
    imageUrl,
    petStatus,
    shelter,
    city,
    coordinates,
    shelterEmail,
  } = req.body;
  const owner = req.user._id;
  Pet.create({
    petNameID,
    animalType,
    petAge,
    petDescription,
    imageUrl,
    petStatus,
    shelter,
    city,
    coordinates,
    shelterEmail,
    owner,
  })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid pet data"));
      } else {
        next(err);
      }
    });
};

const deletePet = (req, res, next) => {
  const { petId } = req.params;
  Pet.findById(petId)
    .orFail()
    .then((pet) => {
      if (String(pet.owner) !== req.user._id) {
        next(new ForbiddenError("User is not authorized to delete this pet"));
      }
      return pet.deleteOne().then(() => {
        res.send({ message: "Pet deleted" });
      });
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("There is no pet with the requested ID"));
      }
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid pet ID"));
      } else {
        next(err);
      }
    });
};

const updatePetStatus = (req, res, next) => {
  const { petStatus } = req.body;
  const { petId } = req.params;
  Pet.findById(petId)
    .orFail()
    .then((pet) => {
      if (String(pet.owner) !== req.user._id) {
        return next(
          new ForbiddenError("User is not authorized to update this pet"),
        );
      }
      return Pet.findByIdAndUpdate(
        petId,
        { petStatus: petStatus },
        {
          new: true,
          runValidators: true,
        },
      ).then((updatedPet) => {
        res.send({ message: "Pet status updated", data: updatedPet });
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("There is no pet with the requested ID"));
      } else if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid pet data"));
      } else if (err.name === "CastError") {
        next(new BadRequestError("Invalid pet ID"));
      } else {
        next(err);
      }
    });
};

const likePet = (req, res, next) => {
  const { petId } = req.params;
  Pet.findByIdAndUpdate(
    petId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("There is no pet with the requested ID"));
      }
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid pet ID"));
      } else {
        next(err);
      }
    });
};

const unlikePet = (req, res, next) => {
  Pet.findByIdAndUpdate(
    req.params.petId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("There is no pet with the requested ID"));
      }
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid pet ID"));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getPets,
  createPet,
  deletePet,
  updatePetStatus,
  likePet,
  unlikePet,
};
