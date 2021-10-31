import React, {Suspense} from 'react'
import {useImage} from 'react-image'
 
const BackSize = {
  'width': '100%',
  'height': '100%',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'overflow': 'hidden',
}

function MyImageComponent() {
    const _width = window.screen.width + 200
    const _height = window.screen.height + 200
    //console.log( 'w . ', _width, ' h . ', _height)
    
    const {src} = useImage({
        srcList: `https://picsum.photos/${_width}/${_height}?random=1`,
    })

    
    return <div style={BackSize}><img src={src} /></div>
}
 //<MyImageComponent />
export default function Appbackground() {
  return (
    <Suspense fallback={<div style={{height: '100%', width:'100%', background:'black'}}></div>}>
      <MyImageComponent />
    </Suspense>
  )
}