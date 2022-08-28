import { Button, Card, Form, Space, Switch, Tooltip } from "antd"
import { MinusCircleOutlined } from "@ant-design/icons"
import { RichTextSunEditor } from "../../../../UI/RichTextSunEditor"
import { FormListFieldData, FormListOperation } from "antd/lib/form/FormList"

interface IAlternativeItemProps {
  index: number
  field: FormListFieldData
  remove: FormListOperation["remove"]
}

export const AlternativeItem = ({
  index,
  field,
  remove,
}: IAlternativeItemProps) => {
  return (
    <Form.Item>
      <Card
        title={`Alternativa #${index + 1}`}
        extra={
          <Space>
            <Tooltip title="Esta alternativa é correta?">
              <Form.Item
                name={[field.name, "correct"]}
                valuePropName="checked"
                noStyle
              >
                <Switch
                  checkedChildren="Correta"
                  unCheckedChildren="Incorreta"
                />
              </Form.Item>
            </Tooltip>

            <Tooltip title="Remover alternativa">
              <Button
                type="text"
                shape="circle"
                icon={<MinusCircleOutlined />}
                onClick={() => remove(field.name)}
              />
            </Tooltip>
          </Space>
        }
        style={{ boxShadow: "rgb(229 229 229 / 60%) 5px 8px 24px 5px" }}
      >
        <Form.Item name={[field.name, "text"]}>
          <RichTextSunEditor
            buttons={[
              [
                "bold",
                "underline",
                "italic",
                "strike",
                "subscript",
                "superscript",
                "removeFormat",
              ],
              ["fontColor", "hiliteColor", "outdent", "indent", "align"],
              ["link", "image", "showBlocks", "codeView"],
            ]}
          />
          {/* <QuillEditor /> */}
        </Form.Item>
      </Card>
    </Form.Item>
  )
}
