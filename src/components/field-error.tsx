export default function FieldError({ message }: { message?: string }) {
  return message ? (
    <p className="text-destructive text-sm mt-1">{message}</p>
  ) : null;
}
