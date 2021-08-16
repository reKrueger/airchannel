import React, {Suspense} from 'react'
import {useImage} from 'react-image'
 
function MyImageComponent() {
    const _width = window.innerWidth
    const _height = window.innerHeight
    console.log( 'w . ', _width, ' h . ', _height)
    const {src} = useImage({
        srcList: `https://picsum.photos/${_width}/${_height}?random=1`,
    })
 
    return <img src={src} />
}
 
export default function Mybackground() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyImageComponent />
    </Suspense>
  )
}