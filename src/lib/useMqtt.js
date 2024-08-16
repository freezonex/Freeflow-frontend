import MQTT from 'mqtt';
import { useEffect, useRef } from 'react';

function useMqtt({
  uri,
  options = {},
  topicHandlers = [{ topic: '', handler: ({ topic, payload, packet }) => {} }],
  onConnectedHandler = (client) => {},
}) {
  const clientRef = useRef(null);

  useEffect(() => {
    console.log(clientRef.current);
    // if (clientRef.current) return;
    if (!topicHandlers || topicHandlers.length === 0) return () => {};

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
    topicHandlers.forEach((th) => {
      client?.subscribe(th.topic);
      console.log('subscribed to', th.topic);
    });
    client?.on('message', (topic, rawPayload, packet) => {
      const th = topicHandlers.find((t) => t.topic === topic);
      let payload;
      try {
        payload = JSON.parse(rawPayload);
      } catch {
        payload = rawPayload;
      }
      if (th) th.handler({ topic, payload, packet });
    });

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
        topicHandlers.forEach((th) => {
          client.unsubscribe(th.topic);
        });
        client.end();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default useMqtt;
