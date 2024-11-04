import {Router} from 'express';
import {
    createContactController, deleteContactController,
    getAllContactsController,
    getContactByIdController, patchContactController,
    upsertContactController
} from "../controllers/contacts.js";
import {isValidId} from "../middlewares/isValidId.js";
import {upsertContactValidation} from "../middlewares/upsertContactValidation.js";
import {patchContactValidation} from "../middlewares/patchContactValidation.js";

const router = new Router();

router.get('/', getAllContactsController)

router.get('/:id', isValidId, getContactByIdController)

router.post('/', upsertContactValidation, createContactController)

router.put('/:id', isValidId, upsertContactValidation, upsertContactController)

router.patch('/:id', isValidId, patchContactValidation,  patchContactController)

router.delete('/:id', isValidId, deleteContactController)

export default router;