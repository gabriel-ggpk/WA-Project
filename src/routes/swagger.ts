/**
 * @swagger
 * components:
 *  schemas:
 *    Laboratory:
 *      type: object
 *      required:
 *        - name
 *        - address
 *      properties:
 *        id:
 *          type: string
 *          description: Auto-generated id
 *        name:
 *          type: string
 *          description: Laboratory name
 *        address:
 *          type: string
 *          description: Laboratory address
 *        removed:
 *          type: boolean
 *          description: Logical removal atribute
 *        status:
 *          type: string
 *          enum:
 *            - ativo
 *            - inativo
 *          description: activity status - ativo||inativo
 *    Exam:
 *      type: object
 *      required:
 *        - name
 *        - type
 *      properties:
 *        id:
 *          type: string
 *          description: Auto-generated id
 *        name:
 *          type: string
 *          description: Exam name
 *        type:
 *          type: string
 *          enum:
 *            - imagem
 *            - analise clinica
 *          description: Exam type
 *        removed:
 *          type: boolean
 *          description: Logical removal atribute
 *        status:
 *          type: string
 *          enum:
 *            - ativo
 *            - inativo
 *          description: activity status - ativo||inativo
 *        laboratories:
 *          type: array
 *          items:
 *            type: string
 */

/**
 * @swagger
 * tags:
 *  name: Exam
 *  description: Exam managing routes
 */
/**
 * @swagger
 * tags:
 *  name: Laboratory
 *  description: Laboratory managing routes
 */
/**
 * @swagger
 * tags:
 *  name: Association
 *  description: Association managing routes
 */
/**
 * @swagger
 * components:
 *  schemas:
 *
 */
/**
 * @swagger
 * components:
 *  schemas:
 *    LaboratoryUpdateForm:
 *      type: object
 *      properties:
 *        ids:
 *          type: array
 *          items:
 *            type: string
 *        name:
 *          type: string
 *          description: Laboratory name
 *        address:
 *          type: string
 *          description: Laboratory address
 *        status:
 *          type: string
 *          enum:
 *            - ativo
 *            - inativo
 *          description: activity status - ativo||inativo
 */
/**
 * @swagger
 * components:
 *  schemas:
 *    LaboratoryCreateForm:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: Laboratory name
 *        address:
 *          type: string
 *          description: Laboratory address
 */
/**
 * @swagger
 * components:
 *  schemas:
 *    ExamUpdateForm:
 *      type: object
 *      properties:
 *        ids:
 *          type: array
 *          items:
 *            type: string
 *        name:
 *          type: string
 *          description: Exam's name
 *        type:
 *          type: string
 *          enum:
 *            - imagem
 *            - analise clinica
 *          description: Exam type
 *        status:
 *          type: string
 *          enum:
 *            - ativo
 *            - inativo
 *          description: activity status - ativo||inativo
 */
/**
 * @swagger
 * components:
 *  schemas:
 *    ExamCreateForm:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: Exam's name
 *        type:
 *          type: string
 *          enum:
 *            - imagem
 *            - analise clinica
 *          description: Exam type
 */
/**
 * @swagger
 * components:
 *  schemas:
 *    BatchResponse:
 *      type: object
 *      properties:
 *       acknowledged:
 *         type: boolean
 *         description: If the DB recognized the operation
 *       modifiedCount:
 *         type: number
 *         description: Number of modified documents
 *       upsertedId:
 *         type: string
 *         description: The id of an upserted document if it exists
 *       upsertedCount:
 *         type: number
 *         description: Number of upserted documents
 *       matchedCount:
 *         type: number
 *         description: number of documents that matched the research criteria
 */
