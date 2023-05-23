import React, { useState } from 'react'
import './index.css'
import AvatarEditor from 'react-avatar-editor'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import { Box } from '@mui/system'
import { PhotoCamera } from '@mui/icons-material'

const Uploader = ({ imageUrl, setImageUrl }) => {
  const [editor, setEditor] = useState(null)
  const [scale, setScale] = useState(1)
  const onFileChange = e => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      setImageUrl(file)
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
        {imageUrl ? (
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
              image={imageUrl}
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
    </Box>
  )
}

export default Uploader
