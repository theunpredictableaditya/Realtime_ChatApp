import { useState } from "react";
import Contact from "./Contact";
import { useChat } from "../Hooks/useChat";

const Contactbar = () => {
  const { contacts } = useChat()

  const [search, setSearch] = useState("");
  const filteredContacts = (contacts ?? []).filter((contact) =>
    contact.name.toLowerCase().includes(search.trim().toLowerCase()),
  );

  if(!contacts){
    return
  }

  return (
    <aside className="z-10 flex w-(--sidebar-width) shrink-0 flex-col border-r border-border bg-surface">
      <header className="flex h-(--header-height) shrink-0 items-center border-b border-border px-6">
        <h1 className="flex items-center gap-2 text-xl font-semibold text-text-primary">
          <svg
            aria-hidden="true"
            className="size-6 text-primary"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Messages
        </h1>
      </header>
      <div className="shrink-0 border-b border-border p-4">
        <label className="sr-only" htmlFor="conversation-search">
          Search conversations
        </label>
        <input
          id="conversation-search"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search conversations..."
          className="w-full rounded-md border border-border bg-surface-light px-4 py-2.5 text-sm text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-primary"
        />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => (
            <Contact key={contact.name} {...contact} />
          ))
        ) : (
          <p className="px-5 py-6 text-sm text-text-secondary">
            No conversations found.
          </p>
        )}
      </div>
    </aside>
  );
};

export default Contactbar;
