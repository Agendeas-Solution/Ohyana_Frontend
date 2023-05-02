import React, { useState, useRef } from 'react'
const Uploader = () => {
  const [image, setImage] = useState('')
  const inputFile = useRef(null)

  const handleFileUpload = e => {
    const { files } = e.target
    if (files && files.length) {
      const filename = files[0].name
      var parts = filename.split('.')
      const fileType = parts[parts.length - 1]
      console.log('fileType', fileType)
      setImage(files[0])
      debugger
    }
  }
  const onButtonClick = () => {
    inputFile.current.click()
  }
  return (
    <div>
      <input
        style={{ display: 'none' }}
        // accept=".zip,.rar"
        ref={inputFile}
        onChange={handleFileUpload}
        type="file"
      />
      <div className="button" onClick={onButtonClick}>
        Upload
      </div>
    </div>
  )
}

export default Uploader
