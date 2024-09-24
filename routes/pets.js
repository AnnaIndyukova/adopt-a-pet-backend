const router = require("express").Router();
const { auth } = require("../middlewares/auth");
const {
  validatePetCardBody,
  validatePetStatus,
  validateId,
} = require("../middlewares/validation");

const {
  getPets,
  createPet,
  deletePet,
  updatePetStatus,
  likePet,
  unlikePet,
} = require("../controllers/pets");

router.get("/", getPets);

router.use(auth);
router.post("/", validatePetCardBody, createPet);
router.delete("/:petId", validateId, deletePet);
router.patch("/:petId", validatePetStatus, updatePetStatus);
router.put("/:petId/likes", validateId, likePet);
router.delete("/:petId/likes", validateId, unlikePet);

module.exports = router;
