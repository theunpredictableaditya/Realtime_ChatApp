import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { ChatContextType, ContactData, GetConversationsResponse } from "../../types";
import { getConversations } from "./Services/chat.api";
import { useAuth } from "../Auth/Hooks/useAuth";

export const ChatContext = createContext<ChatContextType | undefined>(
  undefined,
);

const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [contacts, setContacts] = useState<ContactData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response: GetConversationsResponse = await getConversations();

        const filtered: ContactData[] = response.data.map((convers) => {
          const contact = convers.participants.find(
            (participant) => participant._id !== user?._id,
          );

          const initial = contact?.fullname?.charAt(0).toUpperCase() ?? "?";

          const timestamp = convers.updatedAt;

          const formattedTime = timestamp
            ? new Date(timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "";

          return {
            name: contact?.fullname ?? contact?.username ?? "Unknown User",

            lastMessage: convers.lastMessage?.content ?? "No messages yet",

            time: formattedTime,

            avatarUrl: `https://placehold.co/100x100/6366f1/ffffff?text=${encodeURIComponent(initial)}`,

            isOnline: true,
            isActive: true,
          };
        });

        setContacts(filtered)
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <ChatContext.Provider
      value={{ contacts, setContacts, loading, setLoading, error, setError }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export { ChatProvider };
