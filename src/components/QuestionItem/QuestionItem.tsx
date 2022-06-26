import { Avatar, Card, Col, Comment as AntComment, Divider, Form, Row, Typography } from "antd"
import { Comment } from "../../models/Comment"
import { Question } from "../../models/Question"
import { relativeDate } from "../../utils/date"
import { parseHtml } from "../../utils/parseHtml"
import { buildDissertative, buildMultipleChoiceAlternatives, buildSingleChoiceAlternatives } from "./AlternativesBuilder"

interface QuestionItemProps {
    fieldName?: any
    question: Question
    grade?: number
    comment?: Comment
}


export const QuestionItem = (props: QuestionItemProps) => {
    const { question, grade, comment } = props

    const renderAlternatives = () => {
        let Component = null
        let label = null

        switch (question.type) {
            case 'SINGLE_CHOICE':
                label = 'Selecione a resposta correta'
                Component = buildSingleChoiceAlternatives(question)
                break
            case 'MULTIPLE_CHOICE':
                label = 'Selecione as respostas corretas'
                Component = buildMultipleChoiceAlternatives(question)
                break
            case 'DISSERTATIVE':
                label = 'Digite sua resposta'
                Component = buildDissertative()
        }

        return <Form.Item label={label} name={[props.fieldName, 'answer']} rules={[{ required: true, message: 'Esta questão é obrigatória' }]}>
            {Component}
        </Form.Item>
    }

    return <Card style={{ marginBottom: '24px' }}>
        {/* header */}
        <Row>
            <Col span={22}>
                <Typography.Title level={4}>{question.name}</Typography.Title>
            </Col>

            {grade && <Col span={2}>
                <Typography.Text>{grade} Pontos</Typography.Text>
            </Col>}
        </Row >

        {/* text */}
        {question.text && <Row >
            <Col>
                <Typography.Paragraph>
                    {parseHtml(question.text)}
                </Typography.Paragraph>
            </Col>
        </Row >}

        <Divider />

        {/* alternatives */}
        <Row>
            <Col span={24}>
                {renderAlternatives()}
            </Col>
        </Row>


        {/* teacher comment */}
        {comment && <>
            <Divider />
            <Row>
                <Col>
                    {/* TODO user avatar */}
                    <AntComment
                        avatar={<Avatar src={comment.author._id || '/assets/images/blank-profile.png'} />}
                        author={<Typography.Text strong>{comment.author.name}</Typography.Text>}
                        datetime={<Typography.Text>{relativeDate(comment.createdAt)}</Typography.Text>}
                        content={<Typography.Text>{comment.text}</Typography.Text>}
                    />
                </Col>
            </Row>
        </>}
    </Card >
}