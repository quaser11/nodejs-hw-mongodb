import {Router} from 'express';
import {
    createContactController, deleteContactController,
    getAllContactsController,
    getContactByIdController, patchContactController,
    upsertContactController
} from "../controllers/contacts.js";
import {isValidId} from "../middlewares/isValidId.js";
import { validateBody} from "../middlewares/validateBody.js";
import {patchContactSchema, upsertContactSchema} from "../schemas/validationSchemas.js";

const router = new Router();

router.get('/', getAllContactsController)

router.get('/:id', isValidId, getContactByIdController)

router.post('/', validateBody(upsertContactSchema), createContactController)

router.put('/:id', isValidId, validateBody(upsertContactSchema), upsertContactController)

router.patch('/:id', isValidId, validateBody(patchContactSchema),  patchContactController)

router.delete('/:id', isValidId, deleteContactController)

export default router;