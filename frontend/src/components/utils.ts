// function that takes long hash, and leaves X symbols on start and end
export const truncateToXSymbols = (inputString: string, distance: number) => {
    if (inputString.length <= 10 || distance === 0) {
        return inputString
    }
    return `${inputString.slice(0, distance)}...${inputString.slice(-distance)}`
}
