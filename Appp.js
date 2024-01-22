import {Canvas, RoundedRect} from '@shopify/react-native-skia';
import React, {useEffect, useMemo, useState} from 'react';
import {Button, Dimensions, SafeAreaView, Text, View} from 'react-native';

const {width: sW, height: sH} = Dimensions.get('screen');

const sw = sW;
const sh = sH / 8;

const r = 3; //Spike border radius
const w = 5; //Spike width
const d = 5; //Distance between two spikes

//min & max value for generating random height spike
const min = 5;
const max = sh;

const Draw = React.memo(({spikes}) => {
  return <>{spikes.map(item => item)}</>;
});

let spikes = [];

export default () => {
  const [start, setStart] = useState(false);
  const [count, setCount] = useState(0);

  const [amplitudes, setAmplitudes] = useState([]);
  const maxSpikes = useMemo(() => (sw / (w + d)).toFixed(0), []);

  const takeLast = (array, n) => {
    if (n >= array.length) {
      return array.slice();
    } else {
      return array.slice(array.length - n, array.length);
    }
  };

  const addAmplitudes = React.useCallback(
    amp => {
      var norm = Math.min(amp.toFixed(0) / 2, sh);

      setAmplitudes(prev => [...prev, norm]);
      spikes = [];
      const amps = takeLast(amplitudes, maxSpikes); // Use prev instead of prevAmplitudes
      const newSpikes = amps.map((value, i) => {
        const key = `Spikes-${i}`;
        const x = sw - i * (w + d);
        return (
          <RoundedRect
            key={key}
            x={x}
            y={sh / 2 - value / 2}
            width={w}
            height={value}
            r={r}
            color={'black'}
          />
        );
      });
      spikes = [...spikes.slice(-maxSpikes), ...newSpikes];
    },
    [amplitudes, maxSpikes],
  );

  useEffect(() => {
    let interval;
    if (start) {
      interval = setInterval(() => {
        setCount(count + 1);
        addAmplitudes(Math.floor(Math.random() * (max - min + 1) + min));
      }, 30);
    }
    return () => clearInterval(interval);
  }, [start, count, addAmplitudes]);
  //transform: [{rotateY: '180deg'}] for starting left side
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Canvas style={{flex: 1}}>
          <Draw spikes={spikes} />
        </Canvas>
        <Text>{count}</Text>
        <Button
          title={start ? 'stop' : 'start'}
          onPress={() => {
            setStart(!start);
          }}
        />
      </View>
    </SafeAreaView>
  );
};
