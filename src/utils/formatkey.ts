function formatKey(key: string): string {
    // Split the string by underscore
    const words = key.split('_');
    
    // Capitalize each word and join them with space
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    
    // Join the words with space and return
    return capitalizedWords.join(' ');
}
export {formatKey}
