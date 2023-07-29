import yup from "yup";
import permissions from "./permissions.js";
import { restrictUserDate } from "../utils/enums.js";
import { Schema } from "mongoose";
const editGroupPermsAndExps = yup.object({
  permissions: permissions,
  exceptions: yup.array().of(
    yup.object().shape({
      userId: yup.string().required("EmptyError"),
      restrictUntil: yup
        .string()
        .oneOf(restrictUserDate)
        .required("EmptyError"),
      specificTime:yup.date().when("restrictUntil",{
        is:"specificTime",
        then:(schema)=>schema.required("EmptyError")
      

      }),
      permissions: permissions,
    })
  ),
});

export default editGroupPermsAndExps;
