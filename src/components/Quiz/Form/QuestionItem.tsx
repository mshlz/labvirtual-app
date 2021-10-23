import MinusCircleOutlined from '@ant-design/icons/lib/icons/MinusCircleOutlined';
import PlusOutlined from '@ant-design/icons/lib/icons/PlusOutlined';
import { Button, Card, Empty, Form, Input, Radio, Space, Switch, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { RichTextSunEditor } from '../../UI/RichTextSunEditor';

export const QuestionItem = () => {
    const [type, setType] = useState(null)
 
    return <>
        <Form.Item label="Título da questão" name="name" rules={[{ required: true }]}>
            <Input />
        </Form.Item>

        <Form.Item label="Texto da questão (opcional)" name="text">
            <RichTextSunEditor buttons={[
                ['font', 'fontSize', 'formatBlock'],
                ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'removeFormat'],
                ['fontColor', 'hiliteColor', 'outdent', 'indent', 'align', 'horizontalRule', 'list', 'table'],
                ['link', 'image', 'video', 'showBlocks', 'codeView']
            ]} />
        </Form.Item>

        <Form.Item label="Tipo de alternativa" name="type" rules={[{ required: true }]}>
            <Radio.Group options={[
                { label: 'Dissertativa', value: 'dissertative' },
                { label: 'Múltipla escolha', value: 'single-choice' },
                { label: 'Múltipla escolha (multi resposta)', value: 'multiple-choice' }
            ]} />
        </Form.Item>

        {type === 'dissertative'
            ? <h5>Questão dissertativa</h5>
            : <div className="form-group">
                <h4 className="mb-2">Alternativas</h4>

                <Form.List
                    name="alternatives"
                    rules={[
                        {
                            validator: async (_, alternatives) => {
                                if (!alternatives || alternatives.length < 2) {
                                    return Promise.reject(new Error('Você precisa adicionar ao menos 2 alternativas'));
                                }
                            },
                        },
                    ]}
                >
                    {(fields, { add, remove }, { errors }) => (
                        <>
                            {fields.length === 0 && <Empty description="Não há alternativas" />}
                            {fields.map((field, index) => (
                                <Form.Item key={field.key}>
                                    <Card
                                        title={`Alternativa #${index + 1}`}
                                        extra={
                                            <Space>
                                                <Tooltip title="Esta alternativa é correta?">
                                                    <Form.Item name={[field.name, "correct"]} valuePropName="checked" noStyle>
                                                        <Switch checkedChildren="Correta" unCheckedChildren="Incorreta" />
                                                    </Form.Item>
                                                </Tooltip>

                                                <Tooltip title="Remover alternativa">
                                                    <Button type="text" shape="circle" icon={<MinusCircleOutlined />} onClick={() => remove(field.name)} />
                                                </Tooltip>
                                            </Space>
                                        }
                                        style={{ boxShadow: "rgb(229 229 229 / 60%) 5px 8px 24px 5px" }}
                                    >
                                        <Form.Item name={[field.name, "text"]}>
                                            <RichTextSunEditor buttons={[
                                                ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'removeFormat'],
                                                ['fontColor', 'hiliteColor', 'outdent', 'indent', 'align'],
                                                ['link', 'image', 'showBlocks', 'codeView']
                                            ]} />
                                            {/* <QuillEditor /> */}
                                        </Form.Item>

                                    </Card>
                                </Form.Item>
                            ))}
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    icon={<PlusOutlined />}
                                >
                                    Adicionar outra alternativa
                                </Button>
                                <Form.ErrorList errors={errors} />
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </div>
        }
    </>
}