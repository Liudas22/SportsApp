import "./LevelsListPage.css";
import LevelsData from "../../LevelsData.json"
import { Col, Container, Row } from 'react-bootstrap';
import { Card,
         CardBody,
         Button,
         Image,
         Text,
         Divider, 
         SimpleGrid,
         Box} from '@chakra-ui/react';
import { Link } from "react-router-dom";

function LevelsListPage(){
    return(
        <div className="LevelsListPage" >
            <SimpleGrid columns={3} spacing={10}>
                {LevelsData.map(level => (
                    <Box>
                        <Card className="card" maxW='sm' bg="white">
                            <CardBody>
                                <Image
                                src={level.logo}
                                borderRadius='sm'
                                sizes='sm'
                                />
                                <div className="stack">
                                    <div className="exercises">
                                        <Text className="text" mr='2'>
                                            Prisitraukimai:
                                        </Text>
                                        <Text>
                                            {level.PullUps}
                                        </Text>
                                    </div>
                                    <div className="exercises">
                                        <Text className="text" mr='2'>
                                            Atsispaudimai:
                                        </Text>
                                        <Text>
                                            {level.PushUps}
                                        </Text>
                                    </div>
                                    <div className="exercises">
                                        <Text className="text" mr='2'>
                                            Atsispaudimai lygiagretėse:
                                        </Text>
                                        <Text>
                                            {level.Dips}
                                        </Text>
                                    </div>
                                    <div className="exercises">
                                        <Text className="text" mr='2'>
                                            Pritūpimai:
                                        </Text>
                                        <Text>
                                            {level.Squats}
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
                    </Box>
                ))}
            </SimpleGrid>
        </div>
    );
}

export default LevelsListPage;