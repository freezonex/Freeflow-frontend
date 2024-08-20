import MQTT from 'mqtt';
import { useEffect, useRef } from 'react';

function useMqtt({ uri, options = {}, onConnectedHandler = (client) => {} }) {
  const clientRef = useRef(null);

  useEffect(() => {
    console.log(clientRef.current);
    if (clientRef.current) return;

    try {
      console.log('connect mqtt');
      clientRef.current = MQTT.connect(uri);
      // options
      //   ? MQTT.connect(uri, options)
      //   : MQTT.connect(uri);
    } catch (error) {
      console.error('error', error);
    }

    const client = clientRef.current;
    console.log('client', client);

    client?.on('connect', () => {
      console.log('connecting... to', uri);
      if (onConnectedHandler) onConnectedHandler(client);
    });
    client?.on('error', (err) => {
      console.error('Connection error: ', err);
      client.end();
    });

    return () => {
      if (client) {
        client.end();
        clientRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default useMqtt;
