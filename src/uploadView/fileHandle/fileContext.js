
import { v4 as uuidv4 } from 'uuid';

const CHUNK_SIZE = 1048576 * 1 // 1 MB 

 // ********************
    // *******FIIE*********
    // ********************
export default function fileContext(input){
    if(input.target.files.length>1){
        return getFileContextFolder(input)
    }else{
        return getFileContext(input)
    }
}

function getFileContext(input){
        const files = []
        const file_arr = Array.from(input.target.files)
        var size = 0
        file_arr.forEach(file=>{
            const _file = file;
            const _totalCount =  Math.ceil(file.size / CHUNK_SIZE) // counts of cjunks
            const _fileID = uuidv4() 
            const file_json = {
                chunk_count: _totalCount,
                file_size: _file.size,
                origin_name: _file.name,
                file_guid: _fileID,
                file_data: _file,
                folder_name:[],
                chunks: []
            }
            files.push(file_json)
            size = size + _file.size
        })
        return {files, size}
        
    }

    // ********************
    // *******FOLDER*********
    // ********************
function getFileContextFolder(input){
        const files = []
        const file_arr = Array.from(input.target.files)
        var size = 0
        file_arr.forEach(file=>{
            const _file = file;
            const _totalCount =  Math.ceil(file.size / CHUNK_SIZE) // counts of cjunks
            const _fileID = uuidv4() 
            const _folderName = file.webkitRelativePath.split("/")
            const popped = _folderName.pop()
            const file_json = {
                chunk_count: _totalCount,
                file_size: _file.size,
                origin_name: _file.name,
                file_guid: _fileID,
                file_data: _file,
                folder_name: _folderName,
                chunks: []
            }
            files.push(file_json)
            size = size + _file.size
        })
        return {files, size}
        
    }