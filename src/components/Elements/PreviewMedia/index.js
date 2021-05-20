/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { IconUpload } from "assets/images";
import { Image } from "react-bootstrap";
import { PreviewMediaContainer } from "./style";

function PreviewMedia({
    imageUrl = null,
    contentType = null
}) {
    let addClass = ''
    let mediaType = 'image'
    if(imageUrl){
        if(contentType.includes('image/')) {
            addClass = 'embed-image'
        }else if(contentType.includes('video/')){
            addClass = 'embed-video'
            mediaType = 'video'
        }else if(contentType.includes('audio/')){
            addClass = 'embed-audio'
            mediaType = 'audio'
        }
    }
    console.log({mediaType})
  return (
    <PreviewMediaContainer className={addClass}>
        {mediaType === 'image' && (
            imageUrl ? <Image src={imageUrl} /> : <Image src={IconUpload} />)}
        {mediaType === 'video' && <h3 className='text-blue'>Uploaded Video</h3>}
        {mediaType === 'audio' && <h3 className='text-blue'>Uploaded Music</h3>}
    </PreviewMediaContainer>
  );
}

export default PreviewMedia;