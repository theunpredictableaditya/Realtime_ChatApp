
const FieldError = ({error}: {error: string}) => {
  return (
    <p className="text-[(--font-size-xs)] text-[var(--color-danger)]">{error}</p>
  )
}

export default FieldError
