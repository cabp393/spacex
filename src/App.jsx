import * as API from './services/launches';
import logo from './assets/SpaceX_Logo_Black.png';
import { useState, useEffect } from 'react';
import { Heading, Box, Image, Flex, Text, Spacer, Tag, Icon } from '@chakra-ui/react';
import { HiCalendar } from 'react-icons/hi';

export function App() {
  const [launches, setLaunches] = useState([]);

  useEffect(()=> {
    API.getAllLaunches().then(setLaunches);
  }, []);

  return (
  <>
  <Image src={logo} width={300} m={4} />
    <Heading as='h1' size='lg' m={4} align='center'>
      SpaceX Launches
    </Heading>
    <section>
      {launches.map( (launch) => (
        <Box
          key={launch.flight_number}
          bg='gray.100'
          p={4} m={4}
          borderRadius='lg'
        >
            <Flex display='flex'>
              <Text fontSize='2xl' maxWidth={300}>
                Mission <strong>{launch.mission_name}</strong> ({launch.launch_year})
              </Text>
              <Spacer />
              <Tag p={4} maxHeight={30} colorScheme={launch.launch_success ? 'green' : 'red'}>
                {launch.launch_success ? 'Success' : 'Failure'}
              </Tag>
            </Flex>
          <Flex>
            <Icon as={HiCalendar} color='gray.400' />
            <Text fontSize='sm' ml={1} mt={-0.5} color='gray.400'>
              {launch.launch_date_local.split('T')[0]}
            </Text>
          </Flex>
        </Box>
      ))}
    </section>
  </>
  )
}
