type MessageProps = {
  children: string | string[];
  backgroundColor: "success" | "warning" | "danger";
};

export const Message = ({
  children,
  backgroundColor
}: MessageProps) => {

  const backgroundColorOptions = {
    "warning": "bg-orange-200",
    "danger": "bg-rose-500",
    "success": "bg-green-500"
  }

  return <div className={`px-6 py-3 font-semibold text-xs rounded-sm ${backgroundColorOptions[backgroundColor]} text-white tracking-wide`}>
    {children}
  </div>
}