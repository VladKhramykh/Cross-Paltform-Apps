import joi from "joi";

export default joi.object().keys({
  userId: joi
    .string()
    .required()
    .min(8)
    .max(28),

  buildingId: joi
    .string()
    .required()
    .min(8)
    .max(28),

  concertId: joi
    .string()
    .required()
    .min(8)
    .max(28),

  placeId: joi
    .string()
    .required()
    .min(8)
    .max(28),

  additionalIds: joi.array(),

  id: joi.string()
});
