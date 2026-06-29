import { localStorageService } from "@/lib/storage/local-storage";
import type { AiContext, AiMessage } from "@/types/ai";

const conversationsKey = "nexus.ai.conversations";

function getContextKey(context: AiContext) {
  return [
    context.source,
    context.semester?.id,
    context.subject?.id,
    context.skill?.id,
    context.module?.id,
    context.topic?.id,
    context.subtopic?.id,
  ]
    .filter(Boolean)
    .join("|");
}

function getAllConversations() {
  return localStorageService.get<Record<string, AiMessage[]>>(conversationsKey) ?? {};
}

export const aiConversationService = {
  getMessages(context: AiContext) {
    return getAllConversations()[getContextKey(context)] ?? [];
  },

  saveMessages(context: AiContext, messages: AiMessage[]) {
    localStorageService.set(conversationsKey, {
      ...getAllConversations(),
      [getContextKey(context)]: messages,
    });
  },

  clear(context: AiContext) {
    const conversations = getAllConversations();
    delete conversations[getContextKey(context)];
    localStorageService.set(conversationsKey, conversations);
  },

  delete(context: AiContext) {
    this.clear(context);
  },

  export(context: AiContext) {
    return {
      contextKey: getContextKey(context),
      messages: this.getMessages(context),
    };
  },
};
