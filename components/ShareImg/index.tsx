import html2canvas from 'html2canvas';
import React from 'react';

interface Props {
  container: React.RefObject<HTMLDivElement>
}

const ShareImg = (props: Props) => {
  const { container } = props;
  if(!container.current) return null;
  const [imgUrl, setImgUrl] = React.useState('');
  html2canvas(container.current).then(canvas => {
    const img = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    setImgUrl(img)
  });

  return (<div>
    <img style={{ width: '100%' }} src={imgUrl} />
  </div>)
}

export default ShareImg;