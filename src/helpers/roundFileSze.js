
export default function roundFileSize(size){
    // kilo bytes
    const kb_size = Math.round(size / 1000) 
    //mega bytes
    if(kb_size > 1000){
        const mb_size = Math.round(size / 100000) / 10 
        // giga bytes
        if(mb_size > 2000){
            const gb_size = Math.round(size / 10000000) / 100 
            return gb_size + '  GB'
        }
        return mb_size + '  MB'
    }
    return kb_size + '  KB'
}