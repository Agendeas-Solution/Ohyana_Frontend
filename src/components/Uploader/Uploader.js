// import React, { useState, useRef } from 'react'
// const Uploader = () => {
//   const [image, setImage] = useState('')
//   const inputFile = useRef(null)

//   const handleFileUpload = e => {
//     const { files } = e.target
//     if (files && files.length) {
//       const filename = files[0].name
//       var parts = filename.split('.')
//       const fileType = parts[parts.length - 1]
//       console.log('fileType', fileType)
//       setImage(files[0])
//
//     }
//   }
//   const onButtonClick = () => {
//     inputFile.current.click()
//   }
//   return (
//     <Box>
//       <input
//         style={{ display: 'none' }}
//         // accept=".zip,.rar"
//         ref={inputFile}
//         onChange={handleFileUpload}
//         type="file"
//       />
//       <Box className="button" onClick={onButtonClick}>
//         Upload
//       </Box>
//     </Box>
//   )
// }

// export default Uploader

import React, { useState } from 'react'
import './index.css'
import AvatarEditor from 'react-avatar-editor'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import { Box } from '@mui/system'
import { PhotoCamera } from '@mui/icons-material'

const Uploader = () => {
  const [image, setImage] = useState(null)
  const [editor, setEditor] = useState(null)
  const [scale, setScale] = useState(1)

  const onFileChange = e => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      setImage(file)
    }
  }

  const handleScaleChange = e => {
    const scale = parseFloat(e.target.value)
    setScale(scale)
  }

  const handleSave = () => {
    if (editor) {
      const canvas = editor.getImage().toDataURL()
      // do something with the canvas
    }
  }

  return (
    <Box>
      <Box
        style={{
          width: '130px',
          height: '130px',
          margin: '15px 10px',
          borderRadius: '50%',
          overflow: 'hidden',
        }}
      >
        {image ? (
          <Box
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AvatarEditor
              ref={setEditor}
              image={image}
              // width={140}
              // height={140}
              style={{
                width: '100%',
                height: '100%',
              }}
              border={0}
              color={[255, 255, 255, 0.6]}
              borderRadius={100}
              scale={scale}
            />
            <input
              type="file"
              accept="image/*"
              name="image"
              id="file"
              onChange={onFileChange}
              style={{ display: 'none' }}
            />
            <Box className="inner_icon_style">
              <label htmlFor="file" style={{ cursor: 'pointer' }}>
                <PhotoCamera />
              </label>
            </Box>
          </Box>
        ) : (
          <Box
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <input
              type="file"
              accept="image/*"
              name="image"
              id="file"
              onChange={onFileChange}
              style={{ display: 'none' }}
            />
            <Box className="inner_icon_style">
              <label htmlFor="file" style={{ cursor: 'pointer' }}>
                <PhotoCamera />
              </label>
            </Box>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={onFileChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="file-input">
              <AccountCircleRoundedIcon
                sx={{
                  height: '150px',
                  width: '150px',
                  color: '#f1f2f6',
                }}
              />
            </label>
          </Box>
        )}
      </Box>

      {image && (
        <Box>
          {/* <input
            type="range"
            min="1"
            max="2"
            step="0.01"
            value={scale}
            onChange={handleScaleChange}
          /> */}
          {/* <button onClick={handleSave}>Save</button> */}
        </Box>
      )}
    </Box>
  )
}

export default Uploader
