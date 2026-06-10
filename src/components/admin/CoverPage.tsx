interface CoverPageProps {
  title: string;
  author: string;
}

export default function CoverPage({ title, author }: CoverPageProps) {
  return (
    <div className="w-full h-full bg-[#185A85] text-white flex flex-col items-center justify-center px-8 text-center gap-4">

      {/* Logo circle */}
      <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-2">
        <img
          src="/logo.png"
          alt="ZCAD"
          className="w-9 h-9 object-contain"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      </div>

      <h1 className="text-3xl font-semibold leading-tight tracking-tight">
        {title}
      </h1>

      <p className="text-base text-blue-200">{author}</p>

      <div className="w-8 h-px bg-white/30 my-1" />

      <span className="text-[10px] tracking-[3px] uppercase text-blue-300">
        Preview Edition
      </span>

      <p className="text-xs text-blue-300/70 mt-2">ZCAD Publications</p>
    </div>
  );
}