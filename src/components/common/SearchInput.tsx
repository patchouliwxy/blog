interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchInput = ({ value, onChange, placeholder }: SearchInputProps) => (
  <label className="relative block">
    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35">⌕</span>
    <input
      type="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder ?? "搜索文章标题、内容或标签"}
      className="w-full rounded-2xl border border-white/8 bg-[#101010] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-[#d18b5f] focus:bg-[#0d0d0d]"
    />
  </label>
);
