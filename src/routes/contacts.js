import {Router} from 'express';
import {
    createContactController, deleteContactController,
    getAllContactsController,
    getContactByIdController, patchContactController,
    upsertContactController
} from "../controllers/contacts.js";
import {isValidId} from "../middlewares/isValidId.js";
import { validateBody} from "../middlewares/validateBody.js";
import {patchContactSchema, upsertContactSchema} from "../schemas/contactsValidationSchemas.js";
import {authenticate} from "../middlewares/authenticate.js";

const router = new Router();

router.get('/', authenticate, getAllContactsController)

router.get('/:id', authenticate, isValidId, getContactByIdController)

router.post('/', authenticate, validateBody(upsertContactSchema), createContactController)

router.put('/:id', authenticate, isValidId, validateBody(upsertContactSchema), upsertContactController)

router.patch('/:id', authenticate, isValidId, validateBody(patchContactSchema),  patchContactController)

router.delete('/:id', authenticate, isValidId, deleteContactController)

export default router;