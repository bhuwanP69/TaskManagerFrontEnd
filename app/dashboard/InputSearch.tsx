import { useRouter } from "next/navigation";
import { useState, ChangeEvent } from "react";

interface iDefault {
    defaultValue: string | null
}
export default function SearchInput({ defaultValue}: iDefault) {
    
    const router = useRouter()
    const [inputValue, setValue] = useState(defaultValue)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setValue(inputValue);
        console.log(inputValue)
        
          // Trigger search on every input change
    router.push(`/?q=${inputValue}`);
    }

    const handleSearch = () => {
        if (inputValue) return router.push(`/?q=${inputValue}`);
        if (!inputValue) return router.push("/")
    }

    const handleKeyPress = (event: { key: any; }) => {
        if (event.key === "Enter") return handleSearch()
    }


  return (
    <div className="search__input border-[2px] border-solid border-slate-500
     flex flex-row items-center gap-5 p-1 rounded-[15px] w-96">
    <label htmlFor="inputId">
    <i className="fa-solid fa-magnifying-glass cursor-pointer pl-5"></i>
    </label>

    <input type="text"
        id="inputId"
        placeholder="Search here"
        value={inputValue ?? ""} onChange={handleChange}
        onKeyDown={handleKeyPress}
        className="bg-[transparent] outline-none border-none py-3 pl-2 pr-3" />

</div>
  )
}