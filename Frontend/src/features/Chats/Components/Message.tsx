interface MessageProps {
  content: string;
  time: string;
  isMine: boolean;
}

const Message = ({ content, time, isMine }: MessageProps) => {
  return (
    <div
      className={`max-w-[75%] rounded-(length:--radius-lg) px-5 py-3 text-[0.95rem] leading-6 ${
        isMine
          ? "self-end rounded-br-none bg-(color:--color-message-sent) text-white"
          : "self-start rounded-bl-none bg-(color:--color-message-received) text-(color:--color-text-primary)"
      }`}
    >
      <p className="whitespace-pre-wrap break-words">{content}</p>
      <time
        className={`mt-2 block text-right text-[0.7rem] opacity-80 ${
          isMine ? "text-white/80" : "text-(color:--color-text-secondary)"
        }`}
      >
        {time}
      </time>
    </div>
  );
};

export default Message;
