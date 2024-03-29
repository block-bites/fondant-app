import { createContext, useContext, useState, ReactNode } from "react"

interface SearchContextType {
    searchValue: string
    setSearchValue: React.Dispatch<React.SetStateAction<string>>
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export const useSearchContext = () => {
    const context = useContext(SearchContext)
    if (!context) {
        throw new Error("useSearchContext must be used within a SearchProvider")
    }
    return context
}

interface SearchProviderProps {
    children: ReactNode
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
    const [searchValue, setSearchValue] = useState<string>("")

    return (
        <SearchContext.Provider value={{ searchValue, setSearchValue }}>
            {children}
        </SearchContext.Provider>
    )
}
