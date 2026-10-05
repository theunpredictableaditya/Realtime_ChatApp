interface ContactProps {
  name: string;
  lastMessage: string;
  time: string;
  avatarUrl: string;
  isOnline: boolean;
  isActive: boolean;
}

const Contact = ({
  name,
  lastMessage,
  time,
  avatarUrl,
  isOnline,
  isActive,
}: ContactProps) => {
  return (
    <div
      className={`flex cursor-pointer items-center border-b border-surface-light px-5 py-4 transition-colors duration-150 hover:bg-surface-light ${
        isActive ? "bg-surface-light" : ""
      }`}
    >
      <div className="relative mr-4 size-12 shrink-0">
        <img
          src={avatarUrl}
          alt={name}
          className="size-full rounded-full bg-surface-light object-cover"
        />
        <span
          aria-label={isOnline ? "Online" : "Offline"}
          className={`absolute right-0 bottom-0 size-3.5 rounded-full border-2 border-surface ${
            isOnline ? "bg-online" : "bg-offline"
          }`}
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center justify-between gap-2">
          <p className="truncate font-medium text-text-primary">
            {name}
          </p>
          <time className="shrink-0 text-xs text-text-muted">
            {time}
          </time>
        </div>
        <p
          className={`truncate text-sm ${
            isActive
              ? "text-primary"
              : "text-text-secondary"
          }`}
        >
          {lastMessage}
        </p>
      </div>
    </div>
  );
};

export default Contact;
