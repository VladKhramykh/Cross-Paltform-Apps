import joi from "joi";

export default joi.object().keys({
  rooms: joi
    .array()
    .min(1)
    .max(5),
  concerts: joi
    .array()
    .max(7)
    .min(1),
  additionalId: joi.array(),
  city: joi
    .string()
    .min(2)
    .max(40),
  name: joi
    .string()
    .min(2)
    .max(20),
  id: joi.string()
});
