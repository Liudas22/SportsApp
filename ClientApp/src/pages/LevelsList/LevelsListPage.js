import "./LevelsListPage.css";
import { Col, Container, Row } from 'react-bootstrap';
import { Card,
         CardBody,
         Button,
         Image,
         Text,
         Divider } from '@chakra-ui/react';
import { Link } from "react-router-dom";

function LevelsListPage(){
    return(
        <div className="LevelsListPage" style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/Photos/background.jpg')`, height: "100vh" }}>
            <Container>
                <Row>
                    <Col>
                        <Card className="card" maxW='sm' bg="white">
                            <CardBody>
                                <Image
                                    src='../../../Photos/number_one.png'
                                    alt='Green double couch with wooden legs'
                                    borderRadius='lg'
                                    sizes='sm'
                                />
                                <div className="stack">
                                    <div className="exercises">
                                        <Text className="text" mr='2'>
                                            Prisitraukimai:
                                        </Text>
                                        <Text>
                                            10
                                        </Text>
                                    </div>
                                    <div className="exercises">
                                        <Text className="text" mr='2'>
                                            Atsispaudimai:
                                        </Text>
                                        <Text>
                                            20
                                        </Text>
                                    </div>
                                    <div className="exercises">
                                        <Text className="text" mr='2'>
                                            Atsispaudimai lygiagretėse:
                                        </Text>
                                        <Text>
                                            15
                                        </Text>
                                    </div>
                                    <div className="exercises">
                                        <Text className="text" mr='2'>
                                            Pritūpimai:
                                        </Text>
                                        <Text>
                                            50
                                        </Text>
                                    </div>
                                    <Divider mt='5' />
                                    <Link>
                                        <Button variant='solid' colorScheme='blue' mt='5' >
                                            Įkelti video
                                        </Button>
                                    </Link>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="card" maxW='sm' bg="white">
                            <CardBody>
                                <Image
                                    src='../../../Photos/number_two.png'
                                    alt='Green double couch with wooden legs'
                                    borderRadius='lg'
                                />
                                <div className="stack">
                                    <div className="exercises">
                                        <Text className="text" mr='2'>
                                            Prisitraukimai:
                                        </Text>
                                        <Text>
                                            10
                                        </Text>
                                    </div>
                                    <div className="exercises">
                                        <Text className="text" mr='2'>
                                            Atsispaudimai:
                                        </Text>
                                        <Text>
                                            20
                                        </Text>
                                    </div>
                                    <div className="exercises">
                                        <Text className="text" mr='2'>
                                            Atsispaudimai lygiagretėse:
                                        </Text>
                                        <Text>
                                            15
                                        </Text>
                                    </div>
                                    <div className="exercises">
                                        <Text className="text" mr='2'>
                                            Pritūpimai:
                                        </Text>
                                        <Text>
                                            50
                                        </Text>
                                    </div>
                                    <Divider mt='5' />
                                    <Link>
                                        <Button variant='solid' colorScheme='blue' mt='5' >
                                            Įkelti video
                                        </Button>
                                    </Link>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="card" maxW='sm' bg="white">
                            <CardBody>
                                <Image
                                    src='../../../Photos/number_three.png'
                                    alt='Green double couch with wooden legs'
                                    borderRadius='lg'
                                />
                                <div className="stack">
                                    <div className="exercises">
                                        <Text className="text" mr='2'>
                                            Prisitraukimai:
                                        </Text>
                                        <Text>
                                            10
                                        </Text>
                                    </div>
                                    <div className="exercises">
                                        <Text className="text" mr='2'>
                                            Atsispaudimai:
                                        </Text>
                                        <Text>
                                            20
                                        </Text>
                                    </div>
                                    <div className="exercises">
                                        <Text className="text" mr='2'>
                                            Atsispaudimai lygiagretėse:
                                        </Text>
                                        <Text>
                                            15
                                        </Text>
                                    </div>
                                    <div className="exercises">
                                        <Text className="text" mr='2'>
                                            Pritūpimai:
                                        </Text>
                                        <Text>
                                            50
                                        </Text>
                                    </div>
                                    <Divider mt='5' />
                                    <Link>
                                        <Button variant='solid' colorScheme='blue' mt='5' >
                                            Įkelti video
                                        </Button>
                                    </Link>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card className="card" maxW='sm' bg="white">
                            <CardBody>
                                <Image
                                    src='../../../Photos/number_six.png'
                                    alt='Green double couch with wooden legs'
                                    borderRadius='lg'
                                />
                                <div className="stack">
                                    <div className="exercises">
                                        <Text className="text" mr='2'>
                                            Prisitraukimai:
                                        </Text>
                                        <Text>
                                            10
                                        </Text>
                                    </div>
                                    <div className="exercises">
                                        <Text className="text" mr='2'>
                                            Atsispaudimai:
                                        </Text>
                                        <Text>
                                            20
                                        </Text>
                                    </div>
                                    <div className="exercises">
                                        <Text className="text" mr='2'>
                                            Atsispaudimai lygiagretėse:
                                        </Text>
                                        <Text>
                                            15
                                        </Text>
                                    </div>
                                    <div className="exercises">
                                        <Text className="text" mr='2'>
                                            Pritūpimai:
                                        </Text>
                                        <Text>
                                            50
                                        </Text>
                                    </div>
                                    <Divider mt='5' />
                                    <Link>
                                        <Button variant='solid' colorScheme='blue' mt='5' >
                                            Įkelti video
                                        </Button>
                                    </Link>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="card" maxW='sm' bg="white">
                            <CardBody>
                                <Image
                                    src='../../../Photos/number_four.png'
                                    alt='Green double couch with wooden legs'
                                    borderRadius='lg'
                                />
                                <div className="stack">
                                    <div className="exercises">
                                        <Text className="text" mr='2'>
                                            Prisitraukimai:
                                        </Text>
                                        <Text>
                                            10
                                        </Text>
                                    </div>
                                    <div className="exercises">
                                        <Text className="text" mr='2'>
                                            Atsispaudimai:
                                        </Text>
                                        <Text>
                                            20
                                        </Text>
                                    </div>
                                    <div className="exercises">
                                        <Text className="text" mr='2'>
                                            Atsispaudimai lygiagretėse:
                                        </Text>
                                        <Text>
                                            15
                                        </Text>
                                    </div>
                                    <div className="exercises">
                                        <Text className="text" mr='2'>
                                            Pritūpimai:
                                        </Text>
                                        <Text>
                                            50
                                        </Text>
                                    </div>
                                    <Divider mt='5' />
                                    <Link>
                                        <Button variant='solid' colorScheme='blue' mt='5' >
                                            Įkelti video
                                        </Button>
                                    </Link>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="card" maxW='sm' bg="white">
                            <CardBody>
                                <Image
                                    src='../../../Photos/number_five.png'
                                    alt='Green double couch with wooden legs'
                                    borderRadius='lg'
                                />
                                <div className="stack">
                                    <div className="exercises">
                                        <Text className="text" mr='2'>
                                            Prisitraukimai:
                                        </Text>
                                        <Text>
                                            10
                                        </Text>
                                    </div>
                                    <div className="exercises">
                                        <Text className="text" mr='2'>
                                            Atsispaudimai:
                                        </Text>
                                        <Text>
                                            20
                                        </Text>
                                    </div>
                                    <div className="exercises">
                                        <Text className="text" mr='2'>
                                            Atsispaudimai lygiagretėse:
                                        </Text>
                                        <Text>
                                            15
                                        </Text>
                                    </div>
                                    <div className="exercises">
                                        <Text className="text" mr='2'>
                                            Pritūpimai:
                                        </Text>
                                        <Text>
                                            50
                                        </Text>
                                    </div>
                                    <Divider mt='5' />
                                    <Link>
                                        <Button variant='solid' colorScheme='blue' mt='5' >
                                            Įkelti video
                                        </Button>
                                    </Link>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card className="card" maxW='sm' bg="white">
                            <CardBody>
                                <Image
                                    src='../../../Photos/number_seven.png'
                                    alt='Green double couch with wooden legs'
                                    borderRadius='lg'/>
                                <div className="stack">
                                    <div className="exercises">
                                        <Text className="text" mr='2'>
                                            Prisitraukimai:
                                        </Text>
                                        <Text>
                                            10
                                        </Text>
                                    </div>
                                    <div className="exercises">
                                        <Text className="text" mr='2'>
                                            Atsispaudimai:
                                        </Text>
                                        <Text>
                                            20
                                        </Text>
                                    </div>
                                    <div className="exercises">
                                        <Text className="text" mr='2'>
                                            Atsispaudimai lygiagretėse:
                                        </Text>
                                        <Text>
                                            15
                                        </Text>
                                    </div>
                                    <div className="exercises">
                                        <Text className="text" mr='2'>
                                            Pritūpimai:
                                        </Text>
                                        <Text>
                                            50
                                        </Text>
                                    </div>
                                    <Divider mt='5' />
                                    <Link>
                                        <Button variant='solid' colorScheme='blue' mt='5' >
                                            Įkelti video
                                        </Button>
                                    </Link>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="card" maxW='sm' bg="white">
                            <CardBody>
                                <Image
                                    src='../../../Photos/number_eight.png'
                                    alt='Green double couch with wooden legs'
                                    borderRadius='lg'
                                />
                                <div className="stack">
                                    <div className="exercises">
                                        <Text className="text" mr='2'>
                                            Prisitraukimai:
                                        </Text>
                                        <Text>
                                            10
                                        </Text>
                                    </div>
                                    <div className="exercises">
                                        <Text className="text" mr='2'>
                                            Atsispaudimai:
                                        </Text>
                                        <Text>
                                            20
                                        </Text>
                                    </div>
                                    <div className="exercises">
                                        <Text className="text" mr='2'>
                                            Atsispaudimai lygiagretėse:
                                        </Text>
                                        <Text>
                                            15
                                        </Text>
                                    </div>
                                    <div className="exercises">
                                        <Text className="text" mr='2'>
                                            Pritūpimai:
                                        </Text>
                                        <Text>
                                            50
                                        </Text>
                                    </div>
                                    <Divider mt='5' />
                                    <Link>
                                        <Button variant='solid' colorScheme='blue' mt='5' >
                                            Įkelti video
                                        </Button>
                                    </Link>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="card" maxW='sm' bg="white">
                            <CardBody>
                                <Image
                                    src='../../../Photos/number_nine.png'
                                    alt='Green double couch with wooden legs'
                                    borderRadius='lg'
                                />
                                <div className="stack">
                                    <div className="exercises">
                                        <Text className="text" mr='2'>
                                            Prisitraukimai:
                                        </Text>
                                        <Text>
                                            10
                                        </Text>
                                    </div>
                                    <div className="exercises">
                                        <Text className="text" mr='2'>
                                            Atsispaudimai:
                                        </Text>
                                        <Text>
                                            20
                                        </Text>
                                    </div>
                                    <div className="exercises">
                                        <Text className="text" mr='2'>
                                            Atsispaudimai lygiagretėse:
                                        </Text>
                                        <Text>
                                            15
                                        </Text>
                                    </div>
                                    <div className="exercises">
                                        <Text className="text" mr='2'>
                                            Pritūpimai:
                                        </Text>
                                        <Text>
                                            50
                                        </Text>
                                    </div>
                                    <Divider mt='5' />
                                    <Link>
                                        <Button variant='solid' colorScheme='blue' mt='5' >
                                            Įkelti video
                                        </Button>
                                    </Link>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default LevelsListPage;