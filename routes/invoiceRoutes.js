import express from 'express';
import {
    createInvoice,
    getAllInvoices,
    getInvoiceById,
    updatePaymentStatus,
    deleteInvoice
} from '../controllers/invoiceController.js';

const invoiceRouter = express.Router();

invoiceRouter.post('/add', createInvoice);
invoiceRouter.get('/getAll', getAllInvoices);
invoiceRouter.get('/get/:id', getInvoiceById);
invoiceRouter.put('/update/:id/payment', updatePaymentStatus);
invoiceRouter.delete('/delete/:id', deleteInvoice);

export default invoiceRouter;
