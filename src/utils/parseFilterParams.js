import {filterSchemas} from "../schemas/validationSchemas.js";

export const parseFilterParams = (req) => {
    const {isFavourite, contactType} = req;

    const {error: favouriteError, value: parsedIsFavourite} = filterSchemas.favoriteFilterSchema.validate(isFavourite, {abortEarly: false});
    const {error: contactTypeError, value:parsedContactType} = filterSchemas.contactTypeFilterSchema.validate(contactType, {abortEarly: false});

    return  {
        isFavourite: favouriteError ? undefined : parsedIsFavourite,
        contactType: contactTypeError ? undefined : parsedContactType
    }
}