import React, {Suspense} from 'react'
import {useImage} from 'react-image'
 
function MyImageComponent() {
    const _width = window.screen.width
    const _height = window.screen.height
    //console.log( 'w . ', _width, ' h . ', _height)
    
    const {src} = useImage({
        srcList: `https://picsum.photos/${_width}/${_height}?random=1`,
    })

    
    return <img src={src} />
}
 //<MyImageComponent />
export default function Appbackground() {
  return (
    <Suspense fallback={<div style={{height: '100%', width:'100%', background:'black'}}></div>}>
      <MyImageComponent />
    </Suspense>
  )
}