
export default function range(start, end){
    return Array.from({ length: end - start + 1 }, (_, i) => i)
}