import yup from "yup";
import permissions from "./permissions.js";
import { restrictUserDate } from "../utils/enums.js";
import { Schema } from "mongoose";
const editGroupPermsAndExps = yup.object({
  permissions: permissions,
  exceptions: yup.array().of(
    yup.object().shape({
      userId: yup.string().required(),
      restrictUntil: yup
        .string()
        .oneOf(restrictUserDate)
        .required(),
      specificTime:yup.date().when("restrictUntil",{
        is:"specificTime",
        then:(schema)=>schema.required()
      

      }),
      permissions: permissions,
    })
  ),
});

export default editGroupPermsAndExps;
