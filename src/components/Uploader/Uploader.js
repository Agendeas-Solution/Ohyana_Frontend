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
//       debugger
//     }
//   }
//   const onButtonClick = () => {
//     inputFile.current.click()
//   }
//   return (
//     <div>
//       <input
//         style={{ display: 'none' }}
//         // accept=".zip,.rar"
//         ref={inputFile}
//         onChange={handleFileUpload}
//         type="file"
//       />
//       <div className="button" onClick={onButtonClick}>
//         Upload
//       </div>
//     </div>
//   )
// }

// export default Uploader

import React, { useState } from 'react'
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
    <div>
      <div
        style={{
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          overflow: 'hidden',
        }}
      >
        {image ? (
          <AvatarEditor
            ref={setEditor}
            image={image}
            width={150}
            height={150}
            border={0}
            color={[255, 255, 255, 0.6]}
            borderRadius={100}
            scale={scale}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* <Box className="inner_icon_style">
              <label htmlFor="file" style={{ cursor: 'pointer' }}>
                <PhotoCamera />
              </label>
            </Box> */}
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={onFileChange}
              style={{ display: 'none' }}
            />
            <Box className="user_profile_icon">
              <label htmlFor="file-input">
                <AccountCircleRoundedIcon className="user_profile_icon" />
              </label>
            </Box>
          </div>
        )}
      </div>

      {image && (
        <div>
          {/* <input
            type="range"
            min="1"
            max="2"
            step="0.01"
            value={scale}
            onChange={handleScaleChange}
          /> */}
          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </div>
  )
}

export default Uploader
