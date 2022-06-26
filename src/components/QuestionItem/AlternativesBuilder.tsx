import { Checkbox, Input, Radio, Space } from "antd"
import { Question } from "../../models/Question"
import { parseHtml } from "../../utils/parseHtml"

export function buildSingleChoiceAlternatives(question: Question) {
    return <Radio.Group>
        <Space direction="vertical">
            {question.alternatives.map(alternative =>
                <Radio key={alternative.code} value={alternative.code}>{parseHtml(alternative.text)}</Radio>
            )}
        </Space>
    </Radio.Group>
}

export function buildMultipleChoiceAlternatives(question: Question) {
    return <Checkbox.Group>
        <Space direction="vertical">
            {question.alternatives.map(alternative =>
                <Checkbox key={alternative.code} value={alternative.code}>{parseHtml(alternative.text)}</Checkbox>
            )}
        </Space>
    </Checkbox.Group>
}

export function buildDissertative() {
    return <Input placeholder="Insira sua resposta" />
}
