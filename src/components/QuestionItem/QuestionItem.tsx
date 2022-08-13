import {
  Avatar,
  Card,
  Col,
  Comment as AntComment,
  Divider,
  Form,
  Input,
  Row,
  Tooltip,
  Typography,
} from "antd"
import { Comment } from "../../models/Comment"
import { Question } from "../../models/Question"
import { relativeDate } from "../../utils/date"
import { parseHtml } from "../../utils/parseHtml"
import {
  buildDissertative,
  buildMultipleChoiceAlternatives,
  buildSingleChoiceAlternatives,
} from "./AlternativesBuilder"

interface QuestionItemProps {
  renderType?: "FORM" | "READ" | "TEACHER"
  fieldName?: any
  question: Question
  grade?: number
  comment?: Comment

  styles?: React.CSSProperties
}

export const QuestionItem = (props: QuestionItemProps) => {
  const { question, grade, comment, renderType = "TEACHER" } = props

  const renderGrade = () => {
    return renderType === "TEACHER" ? (
      <Tooltip title="Nota da questão">
        <Input
          value={grade}
          suffix={<span style={{ color: "gray" }}>{`/ ${grade}`}</span>}
        />
      </Tooltip>
    ) : (
      <Typography.Text>{grade} Pontos</Typography.Text>
    )
  }

  const renderAlternatives = () => {
    let Component = null
    let label = null

    switch (question.type) {
      case "SINGLE_CHOICE":
        label = "Selecione a resposta correta"
        Component = buildSingleChoiceAlternatives(question)
        break
      case "MULTIPLE_CHOICE":
        label = "Selecione as respostas corretas"
        Component = buildMultipleChoiceAlternatives(question)
        break
      case "DISSERTATIVE":
        label = "Digite sua resposta"
        Component = buildDissertative()
    }

    return renderType === "FORM" ? (
      <Form.Item
        label={label}
        name={[props.fieldName, "answer"]}
        rules={[{ required: true, message: "Esta questão é obrigatória" }]}
      >
        {Component}
      </Form.Item>
    ) : (
      Component
    )
  }

  const renderCommentSection = () => {
    const localComments = [props.comment]

    return (
      (renderType === "READ" || renderType === "TEACHER") && (
        <>
          <Divider />
          <Row>
            <Col>
              {localComments.map((comment) => (
                <AntComment
                  avatar={
                    <Avatar
                      src={
                        comment.author?._id ||
                        "/assets/images/blank-profile.png"
                      }
                    />
                  }
                  author={
                    <Typography.Text strong>
                      {comment.author.name}
                    </Typography.Text>
                  }
                  datetime={
                    <Typography.Text>
                      {relativeDate(comment.createdAt)}
                    </Typography.Text>
                  }
                  content={<Typography.Text>{comment.text}</Typography.Text>}
                />
              ))}
              {/* TODO this should be a common component */}
              {renderType === "TEACHER" && (
                <AntComment
                  avatar={<Avatar src={"/assets/images/blank-profile.png"} />}
                  content={<Input placeholder="inserir comentário" />}
                />
              )}
            </Col>
          </Row>
        </>
      )
    )
  }

  return (
    <Card style={{ marginBottom: "24px", ...(props.styles || {}) }}>
      {/* header */}
      <Row>
        <Col span={22}>
          <Typography.Title level={4}>{question.name}</Typography.Title>
        </Col>

        <Col span={2}>{renderGrade()}</Col>
      </Row>

      {/* text */}
      {question.text && (
        <Row>
          <Col>
            <Typography.Paragraph>
              {parseHtml(question.text)}
            </Typography.Paragraph>
          </Col>
        </Row>
      )}

      <Divider />

      {/* alternatives */}
      <Row>
        <Col span={24}>{renderAlternatives()}</Col>
      </Row>

      {/* teacher comments */}
      {renderCommentSection()}
    </Card>
  )
}
