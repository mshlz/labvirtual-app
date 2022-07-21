<Col>
            <Row gutter={[24, 24]} >
                <Col span={24}>
                    <Typography.Title level={2}>Atividade atividade {activityId}</Typography.Title>
                </Col>

                <Col sm={24} xl={16}>
                    <Card>
                        {/* header */}
                        <Row justify="space-between" style={{ marginBottom: '16px' }}>
                            <Col><Typography.Text type="secondary">Pontuação: 100 pontos</Typography.Text></Col>
                            <Col><Typography.Text type="secondary">Data de entrega: 24/02/2022</Typography.Text></Col>
                        </Row>

                        {/* description */}
                        <Row>
                            <Col>
                                <Typography.Text>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                                    It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                </Typography.Text>
                            </Col>
                        </Row>
                    </Card>
                </Col>

                <Col sm={24} xl={8} xxl={4}>
                    <Card>
                        <Typography.Paragraph>Para iniciar a atividade, clique no botão abaixo</Typography.Paragraph>
                        <Button type="primary" block>Iniciar atividade</Button>
                    </Card>
                </Col>
            </Row>
        </Col>