import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, message, Upload } from 'antd'
import { RcFile, UploadChangeParam } from 'antd/lib/upload'
import { UploadFile } from 'antd/lib/upload/interface'
import React, { useEffect, useState } from 'react'
import { IMG_PICKER_UPLOAD_ENDPOINT } from '../../config/env'
import { LocalStorage } from '../../utils/LocalStorage'

interface ImagePickerProps {
    onChange?: (value: string) => void
    value?: string
}

export const ImagePicker = (props: ImagePickerProps) => {
    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState(props.value)

    useEffect(() => {
        props.onChange && props.onChange(imageUrl)
    }, [imageUrl])

    const beforeUpload = (file: RcFile) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
        if (!isJpgOrPng) {
            message.error('Você só pode carregar imagens JPG e PNG')
        }        
        return isJpgOrPng
    }

    const handleChange = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setLoading(true)
            return
        }
        if (info.file.status === 'done') {
            setImageUrl(info.file.response.url)
            setLoading(false)
        }
    }

    const uploadButton = (<div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Carregar...</div>
    </div>)

    return (
        <>
            <Upload
                listType="picture-card"
                showUploadList={false}
                action={IMG_PICKER_UPLOAD_ENDPOINT}
                headers={{
                    authorization: LocalStorage.get("app-token") as string

                }}
                beforeUpload={beforeUpload}
                onChange={handleChange}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
            {imageUrl && <Button onClick={() => setImageUrl(null)}>Remover imagem</Button>}
        </>
    )
}
