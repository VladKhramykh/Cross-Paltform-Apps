import joi from "joi";

export default joi.object().keys({
  name: joi
    .string()
    .max(50)
    .min(1),
  price: joi.number(),
  id: joi.number()
});
