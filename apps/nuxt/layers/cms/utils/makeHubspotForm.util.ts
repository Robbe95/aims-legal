/* eslint-disable eslint-plugin-wisemen/explicit-function-return-type-with-regex */
import type {
  ClientHubspotForm,
  ClientHubspotFormField,
} from '@repo/models'
import type {
  ZodDefault,
  ZodObject,
  ZodSchema,
} from 'zod'
import {
  z,
  ZodAny,
  ZodBoolean,
  ZodNumber,
  ZodString,
} from 'zod'

export function getFieldValidation(field: ClientHubspotFormField) {
  if (field.fieldType === 'singlelineText') {
    return z.string()
  }

  if (field.fieldType === 'email') {
    return z.string().email()
  }

  if (field.fieldType === 'phone') {
    return z.string()
  }

  if (field.fieldType === 'multilineText') {
    return z.string()
  }

  if (field.fieldType === 'checkbox') {
    return z.boolean()
  }

  if (field.fieldType === 'number') {
    return z.number()
  }

  return z.any()
}

export function setRequiredFields(
  {
    field, zodShape,
  }: {
    field: ClientHubspotFormField
    zodShape: ZodAny | ZodBoolean | ZodNumber | ZodString
  },
) {
  if (field.isRequired && zodShape instanceof ZodString) {
    return zodShape.min(1)
  }
  if (field.isRequired && zodShape instanceof ZodAny) {
    return zodShape
  }
  if (field.isRequired && zodShape instanceof ZodNumber) {
    return zodShape.min(1)
  }
  if (field.isRequired && zodShape instanceof ZodBoolean) {
    return zodShape
  }

  return zodShape.nullish()
}

export function makeHubspotFormZodSchema(form: ClientHubspotForm) {
  const fields = form.fields.reduce<Record<string, ZodSchema>>((reducedField, field) => {
    const fieldValidation = getFieldValidation(field)
    const isRequiredField = setRequiredFields({
      field,
      zodShape: fieldValidation,
    })

    reducedField[field.name] = isRequiredField

    return reducedField
  }, {})

  // every field needs an objectTypeId string and then its fieldType
  // aka reduce this to { [key: string]: { objectTypeId: string, value: ZodSchema } }
  const mappedWithObjectTypeId = Object.entries(fields).reduce((reducedField, [
    key,
    value,
  ]) => {
    const field = form.fields.find((field) => field.name === key)

    if (!field) {
      return reducedField
    }
    const objectTypeId = field.objectTypeId
    const fieldValue = value
    const fieldObjectTypeId = z.object({
      objectTypeId: z.string().default(objectTypeId),
      value: fieldValue,
    })

    reducedField[key] = fieldObjectTypeId

    return reducedField
  }, {} as Record<string,
    ZodObject<{
      objectTypeId: ZodDefault<ZodString>
      value: ZodSchema
    }>>)

  return z.object(mappedWithObjectTypeId)
}
