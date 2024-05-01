"use client";

import { SetStateAction, useRef, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
} from '@chakra-ui/react'

import {
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'
import { FaTimes } from "react-icons/fa";

export default function Intro() {
  const libraries = ['places'];
  const googleMapsApiKey = 'AIzaSyD9YrY4EzXon6_8L-AdvEhYcV2uh_GdFxs';
  const position = { lat: 15.8700, lng: 100.9925 };
  const [open, setOpen] = useState(false);
  const [directionsResponse, setDirectionsResponse] = useState(null)
  // const [map, setMap] = useState(/** @type google.maps.Map */ (null))

   /** @type React.MutableRefObject<HTMLInputElement> */
   const originRef = useRef()
   /** @type React.MutableRefObject<HTMLInputElement> */
   const destiantionRef = useRef()

  // async function calculateRoute() {
  //   if (originRef.current.value === '' || destiantionRef.current.value === '') {
  //     return
  //   }
  //   // eslint-disable-next-line no-undef
  //   const directionsService = new google.maps.DirectionsService()
  //   const results = await directionsService.route({
  //     origin: originRef.current.value,
  //     destination: destiantionRef.current.value,
  //     // eslint-disable-next-line no-undef
  //     travelMode: google.maps.TravelMode.DRIVING,
  //   })
  //   setDirectionsResponse(results)
  //   setDistance(results.routes[0].legs[0].distance.text)
  //   setDuration(results.routes[0].legs[0].duration.text)
  // }

  // function clearRoute() {
  //   setDirectionsResponse(null)
  //   setDistance('')
  //   setDuration('')
  //   originRef.current.value = ''
  //   destiantionRef.current.value = ''
  // }

  return (
    <div className="mt-20">
    <APIProvider apiKey={googleMapsApiKey} libraries={libraries}>
      <Flex
          position='relative'
          flexDirection='column'
          alignItems='center'
          h='100vh'
          w='100vw'
        >
      <Box position='absolute' left={0} top={0} h='100%' w='100%'>
      <div style={{ height: "100vh", width: "100%" }}>
      <Map center={position} mapId={process.env.NEXT_PUBLIC_MAP_ID} defaultZoom={8} >
          <AdvancedMarker position={position} onClick={() => setOpen(true)}>
            <Pin
              background={"grey"}
              borderColor={"green"}
              glyphColor={"purple"}
            />
          </AdvancedMarker>
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}

          {open && (
            <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
              <p>I'm in Hamburg</p>
            </InfoWindow>
          )}
      </Map> </div>
      </Box>
      <Box
        p={4}
        borderRadius='lg'
        m={4}
        bgColor='white'
        shadow='base'
        minW='container.md'
        zIndex='1'
      >
        <HStack spacing={2} justifyContent='space-between'>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input type='text' placeholder='Origin'  />
            </Autocomplete>
          </Box>
          <Box flexGrow={1}>
            
              <Input
                type='text'
                placeholder='Destination'
                
              />
            
        </Box>
        <ButtonGroup>
            <Button colorScheme='pink' type='submit' >
              Calculate Route
            </Button>
            <IconButton
              aria-label='center back'
              icon={<FaTimes />}
              
            />
          </ButtonGroup>
        </HStack>
        </Box>
      </Flex>
    </APIProvider>
    </div>
  );
}