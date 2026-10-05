import { useState, type FormEvent } from "react";
import Message from "./Message";

interface ChatMessage {
  id: number;
  content: string;
  time: string;
  isMine: boolean;
}

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    content: "Hey! Are we still on for the project review today?",
    time: "10:24 AM",
    isMine: false,
  },
  {
    id: 2,
    content: "Yes, definitely. I have all the slides ready to go.",
    time: "10:26 AM",
    isMine: true,
  },
  {
    id: 3,
    content:
      "Awesome. Can you send me a quick preview of the timeline slide? I just want to double-check the Q3 milestones.",
    time: "10:28 AM",
    isMine: false,
  },
  {
    id: 4,
    content: "For sure, give me one second to export it.",
    time: "10:30 AM",
    isMine: true,
  },
];

const Conversation = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");

  const sendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const content = draft.trim();
    if (!content) return;

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: Date.now(),
        content,
        time: new Intl.DateTimeFormat([], {
          hour: "numeric",
          minute: "2-digit",
        }).format(new Date()),
        isMine: true,
      },
    ]);
    setDraft("");
  };

  return (
    <main className="flex min-w-0 flex-1 flex-col bg-(color:--color-background)">
      <header className="flex h-[var(--header-height)] shrink-0 items-center justify-between border-b border-(color:--color-border) bg-(color:--color-surface) px-6">
        <div className="flex items-center">
          <div className="relative mr-3 size-10 shrink-0">
            <img
              src="https://placehold.co/100x100/6366f1/ffffff?text=ES"
              alt="Elena Smith"
              className="size-full rounded-(length:--radius-full) object-cover"
            />
            <span
              aria-label="Online"
              className="absolute right-0 bottom-0 size-3 rounded-(length:--radius-full) border-2 border-(color:--color-surface) bg-(color:--color-online)"
            />
          </div>
          <div>
            <p className="text-base font-semibold text-(color:--color-text-primary)">
              Elena Smith
            </p>
            <p className="text-xs text-(color:--color-online)">Online</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Call Elena Smith"
            className="flex size-9 items-center justify-center rounded-(length:--radius-full) text-(color:--color-text-secondary) transition-colors hover:bg-(color:--color-surface-light) hover:text-(color:--color-text-primary)"
          >
            <svg
              aria-hidden="true"
              className="size-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="More conversation options"
            className="flex size-9 items-center justify-center rounded-(length:--radius-full) text-(color:--color-text-secondary) transition-colors hover:bg-(color:--color-surface-light) hover:text-(color:--color-text-primary)"
          >
            <svg
              aria-hidden="true"
              className="size-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </button>
        </div>
      </header>
      <section
        aria-label="Message history"
        className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto p-6"
      >
        {messages.map((message) => (
          <Message key={message.id} {...message} />
        ))}
        <div
          aria-label="Elena is typing"
          className="flex w-fit items-center gap-1 rounded-(length:--radius-lg) rounded-bl-none bg-(color:--color-message-received) px-4 py-3"
        >
          <span className="size-1.5 animate-bounce rounded-(length:--radius-full) bg-(color:--color-text-secondary)" />
          <span className="size-1.5 animate-bounce rounded-(length:--radius-full) bg-(color:--color-text-secondary) [animation-delay:200ms]" />
          <span className="size-1.5 animate-bounce rounded-(length:--radius-full) bg-(color:--color-text-secondary) [animation-delay:400ms]" />
        </div>
      </section>
      <form
        onSubmit={sendMessage}
        className="flex h-[var(--input-height)] shrink-0 items-center gap-4 border-t border-(color:--color-border) bg-(color:--color-surface) px-6"
      >
        <button
          type="button"
          aria-label="Attach a file"
          className="flex size-9 shrink-0 items-center justify-center rounded-(length:--radius-full) text-(color:--color-text-secondary) transition-colors hover:bg-(color:--color-surface-light) hover:text-(color:--color-text-primary)"
        >
          <svg
            aria-hidden="true"
            className="size-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
          </svg>
        </button>
        <label className="sr-only" htmlFor="message-draft">
          Type a message
        </label>
        <input
          id="message-draft"
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Type a message..."
          className="min-w-0 flex-1 rounded-(length:--radius-full) border border-(color:--color-border) bg-(color:--color-surface-light) px-5 py-3 text-sm text-(color:--color-text-primary) outline-none transition-colors placeholder:text-(color:--color-text-muted) focus:border-(color:--color-primary)"
        />
        <button
          type="submit"
          aria-label="Send message"
          disabled={!draft.trim()}
          className="flex size-11 shrink-0 items-center justify-center rounded-(length:--radius-full) bg-(color:--color-primary) text-white transition-colors hover:bg-(color:--color-primary-hover) active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <svg
            aria-hidden="true"
            className="mr-0.5 size-[18px]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m22 2-7 20-4-9-9-4Z" />
            <path d="M22 2 11 13" />
          </svg>
        </button>
      </form>
    </main>
  );
};

export default Conversation;
