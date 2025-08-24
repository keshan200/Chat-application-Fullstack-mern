import { Router } from "express";
import { getMessagesByConversation } from "../controller/message.controller";

const messageRouter =  Router()
messageRouter.get("/messages/:conversationId",getMessagesByConversation)


export default messageRouter