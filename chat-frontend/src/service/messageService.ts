import type { Conversation } from "../types/Conversation";
import type { Messages } from "../types/Messages";
import apiClient, { BASE_URL } from "./apiClient";

const MESSAGE_URL = `${BASE_URL}/chat`



export const getAllMessageByConversation = async (conversationId: string): Promise<Messages[]> => {
    const res = await apiClient.get(`${MESSAGE_URL}/messages/${conversationId}`);
    return res.data;
}
